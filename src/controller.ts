import { ISimpleEvent, ISignal } from 'strongly-typed-events'

export interface Controller {
    readonly sticksChanged: ISimpleEvent<SticksValues>;
    readonly upShift: ISignal;
    readonly downShift: ISignal;
}

export interface SticksValues {
    leftStick: number;
    rightStick: number
}
