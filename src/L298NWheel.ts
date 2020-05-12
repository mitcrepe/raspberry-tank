import { Wheel } from "./tank";
import { Gpio } from "pigpio";

export class L298NWheel implements Wheel {
    private motorEnablePin: Gpio;
    private forwardPin: Gpio;
    private backwardPin: Gpio;

    constructor(motorEnablePin: number, forwardPin: number, backwardPin: number) {
        this.motorEnablePin = new Gpio(motorEnablePin, {mode: Gpio.OUTPUT});
        this.forwardPin = new Gpio(forwardPin, {mode: Gpio.OUTPUT});
        this.backwardPin = new Gpio(backwardPin, {mode: Gpio.OUTPUT});
    }

    public setSpeed(speed: number): void {
        let forward = speed >= 0;
        if (forward) {
            this.forwardPin.digitalWrite(1);
            this.backwardPin.digitalWrite(0);
        } else {
            this.forwardPin.digitalWrite(0);
            this.backwardPin.digitalWrite(1);
        }

        this.motorEnablePin.pwmWrite(this.getPwmSpeed(speed));
    }

    private getPwmSpeed(speed: number) {
        speed = Math.abs(speed);
        speed = Math.min(speed, 100);
        return speed * 255 / 100;
    }
}