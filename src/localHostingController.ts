import { Controller } from "./controller";
import { SimpleEventDispatcher, ISimpleEvent } from 'strongly-typed-events';
import * as express from 'express';
import { Express } from 'express';
import * as path from 'path';


//Later when adding camera, add interface for Monitor. This class can implement both
export class LocalHostingController implements Controller {
    private server: Express;
    private _leftStickChanged = new SimpleEventDispatcher<number>();
    private _rightStickChanged = new SimpleEventDispatcher<number>();

    public get leftStickChanged(): ISimpleEvent<number> {
        return this._leftStickChanged.asEvent()
    }

    public get rightStickChanged(): ISimpleEvent<number> {
        return this._rightStickChanged.asEvent()
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
            console.log('Sticks input:' + JSON.stringify(req.body));
            res.sendStatus(200);
        });          
    }
    
}
