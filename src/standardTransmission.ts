import { Transmission } from "./tank";

export class StandardTransmission implements Transmission {

    private _gears: number;
    public get gears(): number {
        return this._gears;
    }

    private _selectedGear: number;
    public get selectedGear(): number {
        return this._selectedGear;
    }

    public constructor(gears: number) {
        if (gears < 1) {
            throw new Error('Transmission should have at least 1 gear');
        }
        this._gears = gears
        this._selectedGear = 1;
    }

    public selectGear(gear: number): void {
        if (gear > this._gears) {
            throw new Error(`Cannot shift to gear ${gear}. Max transmission gear is ${this.gears}`)
        }
        if (gear < 1) {
            throw new Error(`Cannot shift to gear lower than 1`)
        }
        this._selectedGear = gear;
    }

    public shiftUp(): number {
        return this._selectedGear < this._gears ? ++this._selectedGear : this._selectedGear;
    }

    public shiftDown(): number {
        return this._selectedGear > 1 ? --this._selectedGear : this._selectedGear;
    }

    public getFinalDriveSpeed(inputSpeed: number): number {
        return inputSpeed * this._selectedGear / 3;
    }
}