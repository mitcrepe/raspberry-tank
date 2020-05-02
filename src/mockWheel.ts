import { Wheel } from "./tank";

export class MockWheel implements Wheel {
    public get currentSpeed() {
        return this._speed;
    }

    private _speed = 0;

    setSpeed(speed: number): void {
        this._speed = speed;
        console.log('wheel:' + this._speed);
    }
}