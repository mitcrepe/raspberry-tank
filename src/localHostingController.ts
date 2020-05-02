import { Controller } from "./controller";
import { SimpleEventDispatcher, ISimpleEvent, ISignal, SignalDispatcher } from 'strongly-typed-events';
import * as express from 'express';
import { Express } from 'express';
import * as path from 'path';


//Later when adding camera, add interface for Monitor. This class can implement both
export class LocalHostingController implements Controller {
    private server: Express;
    private _leftStickChanged = new SimpleEventDispatcher<number>();
    private _rightStickChanged = new SimpleEventDispatcher<number>();
    private _upShift = new SignalDispatcher();
    private _downShift = new SignalDispatcher();

    public get leftStickChanged(): ISimpleEvent<number> {
        return this._leftStickChanged.asEvent()
    }

    public get rightStickChanged(): ISimpleEvent<number> {
        return this._rightStickChanged.asEvent()
    }

    public get upShift(): ISignal {
        return this._upShift.asEvent();
    }

    public get downShift(): ISignal {
        return this._downShift.asEvent()
    }

    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.static(path.join(__dirname, '/../public')));

        this.configureServerApi();
    }

    public listen(port: number): void {
        this.server.listen(port, "0.0.0.0", () => console.log(`Local hosting listening on port ${port}!`));
    }

    private configureServerApi(): void {
        this.server.post('/api/sticksInput', (req, res) => {
            res.sendStatus(200);
            console.log('Sticks input: ' + JSON.stringify(req.body));
            
            this._leftStickChanged.dispatchAsync(this.capStickInput(req.body.leftStick));
            this._rightStickChanged.dispatchAsync(this.capStickInput(req.body.rightStick));
        });          

        this.server.post('/api/shift', (req, res) => {
            res.sendStatus(200);

            if (req.body.shift === 'up') {               
                this._upShift.dispatchAsync();
            } else if (req.body.shift === 'down') {
                this._downShift.dispatchAsync();
            }
        });       
    }

    private capStickInput(input: number): number {
        return Math.min(Math.max(input, -100), 100);
    }
    
}
