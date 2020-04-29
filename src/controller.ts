import { ISimpleEvent } from 'strongly-typed-events'

export interface Controller {
    readonly leftStickChanged: ISimpleEvent<number>;
    readonly rightStickChanged: ISimpleEvent<number>;
}


