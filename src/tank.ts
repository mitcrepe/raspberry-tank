export class Tank {
    private currentLeftWheelSpeed = 0;
    private currentRightWheelSpeed = 0;

    public constructor(private transmission: Transmission, private leftWheel: Wheel, private rightWheel: Wheel) { }

    public setSpeed(leftWheelSpeed: number, rightWheelSpeed: number): void {  
        this.currentLeftWheelSpeed = this.capSpeed(leftWheelSpeed);
        this.currentRightWheelSpeed = this.capSpeed(rightWheelSpeed);
        this.updateWheels();
    }

    public shiftUp(): number {
        const gear = this.transmission.shiftUp();
        this.updateWheels();
        return gear;
    }

    public shiftDown(): number {
        const gear = this.transmission.shiftDown();
        this.updateWheels();
        return gear;
    }

    public selectGear(gear: number): void {
        this.transmission.selectGear(gear);
    }

    private updateWheels(): void {
        this.leftWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentLeftWheelSpeed));
        this.rightWheel.setSpeed(this.transmission.getFinalDriveSpeed(this.currentRightWheelSpeed));
    }

    private capSpeed(speed: number): number {
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