import { LocalHostingController } from "./localHostingController";
import { Tank } from './tank';
import { StandardTransmission } from './standardTransmission';
import { L298NWheel } from "./L298NWheel";
import { MockWheel } from "./mockWheel";

let controller = new LocalHostingController();
let tank = new Tank(new StandardTransmission(3), new MockWheel(), new MockWheel());
controller.sticksChanged.subscribe((values) => tank.setSpeed(values.leftStick, values.rightStick));
controller.downShift.subscribe(() => tank.shiftDown());
controller.upShift.subscribe(() => tank.shiftUp());

controller.listen(3000);