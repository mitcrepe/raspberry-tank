import { Controller } from "./controller";
import { SimpleEventDispatcher } from 'strongly-typed-events';
import * as express from 'express';
import { Express } from 'express';
import * as path from 'path';


//Later when adding camera, add interface for Monitor. This class can implement both
export class LocalHostingController implements Controller {
    private server: Express;
    private _leftStickChanged: SimpleEventDispatcher<number> = new SimpleEventDispatcher<number>();
    private _rightStickChanged: SimpleEventDispatcher<number> = new SimpleEventDispatcher<number>();

    public get leftStickChanged() {
        return this._leftStickChanged.asEvent()
    }

    public get rightStickChanged() {
        return this._rightStickChanged.asEvent()
    }

    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(express.static(path.join(__dirname, '/../public')));

        this.server.post('/api/sticksInput', (req, res) => {
            console.log('Sticks input:' + req.body.name);
            res.sendStatus(200);
        });          
    }

    public listen(port: number): void {
        this.server.listen(port, () => console.log('Example app listening on port 3000!'));
    }
    
}