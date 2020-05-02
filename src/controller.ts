import { ISimpleEvent, ISignal } from 'strongly-typed-events'

export interface Controller {
    readonly leftStickChanged: ISimpleEvent<number>;
    readonly rightStickChanged: ISimpleEvent<number>;
    readonly upShift: ISignal;
    readonly downShift: ISignal;
}


