export class Tank {
    private currentLeftWheelSpeed = 0;
    private currentRightWheelSpeed = 0;

    public constructor(private transmission: Transmission, private leftWheel: Wheel, private rightWheel: Wheel) { }

    public setSpeed(leftWheelSpeed: number, rightWheelSpeed: number): void{        
        this.currentLeftWheelSpeed = this.returnSpeedInBounds(leftWheelSpeed);
        this.leftWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentLeftWheelSpeed));

        this.currentRightWheelSpeed = this.returnSpeedInBounds(rightWheelSpeed);
        this.rightWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentRightWheelSpeed));
    }

    public shiftUp(): number {
        const gear = this.transmission.shiftUp();
        this.leftWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentLeftWheelSpeed));
        this.rightWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentRightWheelSpeed));
        return gear;
    }

    public shiftDown(): number {
        const gear = this.transmission.shiftDown();
        this.leftWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentLeftWheelSpeed));
        this.rightWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentRightWheelSpeed));
        return gear;
    }

    public selectGear(gear: number): void {
        this.transmission.selectGear(gear);
    }

    private returnSpeedInBounds(speed: number): number {
        if (speed > 100) {
            return 100
        } else if (speed < -100) {
            return -100
        } else {
            return speed;
        }
    }
}

export interface TankSpeed {
    leftWheel: number,
    rightWheel: number
}

export interface Wheel {
    setSpeed(speed: number): void;
}

export interface Transmission {
    gears: number;
    selectedGear: number;
    selectGear(gear: number): void;
    shiftUp(): number;
    shiftDown(): number;
    getFinalDriveSpeed(inputSpeed: number): number;
}