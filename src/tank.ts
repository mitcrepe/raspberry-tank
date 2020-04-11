export class Tank {
    public get currentSpeed(): TankSpeed {
        return this._currentSpeed;
    }
    
    public get selectedGear(): number {
        return this._selectedGear;
    }

    private _currentSpeed: TankSpeed = {leftWheel: 0, rightWheel: 0}
    private _selectedGear: number = 1;

    public constructor(private transmission: Transmission) { }

    public setSpeed(speed: TankSpeed): void {
        if (speed.leftWheel > 100) {
            this._currentSpeed.leftWheel = 100
        } else if (speed.leftWheel < -100) {
            this._currentSpeed.leftWheel = -100
        } else {
            this._currentSpeed.leftWheel = speed.leftWheel
        }

        if (speed.rightWheel > 100) {
            this._currentSpeed.rightWheel = 100
        } else if (speed.rightWheel < -100) {
            this._currentSpeed.rightWheel = -100
        } else {
            this._currentSpeed.rightWheel = speed.rightWheel
        }
    }

    public selectFirstGear(): void {
        this._selectedGear = 1;
    }

    public selectFinalGear(): number {
        this._selectedGear = 3;
        return this._selectedGear;
    }

    public shiftUp(): number {
        if (this._selectedGear < 3) {
            this._selectedGear++;
        }
        
        return this._selectedGear;
    }

    public shiftDown(): number {
        if (this._selectedGear > 1) {
            this._selectedGear--;
        }
        
        return this._selectedGear;
    }

}

export interface TankSpeed {
    leftWheel: number,
    rightWheel: number
}

export interface Transmission {
    gears: number;
    selectedGear: number;
    selectGear(gear: number): void;
    shiftUp(): number;
    shiftDown(): number;
    getFinalDriveSpeed(inputSpeed: number): number;
}

// export interface Wheel {
//     setSpeed(): void;
// }