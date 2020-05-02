import { Tank } from '../src/tank';
import { StandardTransmission } from '../src/standardTransmission';
import { MockWheel } from '../src/mockWheel';


describe('Tank initialization', () => {
    const transmission = new StandardTransmission(3);
    transmission.selectGear(1);
    const leftWheel = new MockWheel();
    leftWheel.setSpeed(0);
    const rightWheel = new MockWheel();
    rightWheel.setSpeed(0);
    const tank = new Tank(transmission, leftWheel, rightWheel);

    test('speed should be 0', () => {
        expect(leftWheel.currentSpeed).toEqual(0);
        expect(rightWheel.currentSpeed).toEqual(0);
    });

    test('gear should be first', () => {
        expect(transmission.selectedGear).toBe(1);
    });
});

describe('tank moving', () => {
    const transmission = new StandardTransmission(1);
    const leftWheel = new MockWheel();
    const rightWheel = new MockWheel();
    const tank = new Tank(transmission, leftWheel, rightWheel);

    test('set speed', () => {
        tank.setSpeed(0, 0);
        expect(leftWheel.currentSpeed).toEqual(0);
        expect(rightWheel.currentSpeed).toEqual(0);

        tank.setSpeed(0, 50);
        expect(leftWheel.currentSpeed).toEqual(0);
        expect(rightWheel.currentSpeed).toEqual(50);

        tank.setSpeed(60, 0);
        expect(leftWheel.currentSpeed).toEqual(60);
        expect(rightWheel.currentSpeed).toEqual(0);

        tank.setSpeed(40, 80);
        expect(leftWheel.currentSpeed).toEqual(40);
        expect(rightWheel.currentSpeed).toEqual(80);
    });

    test('negative speed', () => {
        tank.setSpeed(-30, 0);
        expect(leftWheel.currentSpeed).toEqual(-30);
        expect(rightWheel.currentSpeed).toEqual(0);

        tank.setSpeed(-10, -40);
        expect(leftWheel.currentSpeed).toEqual(-10);
        expect(rightWheel.currentSpeed).toEqual(-40);
    });

    test('speed overflow', () => {
        tank.setSpeed(300, 70);
        expect(leftWheel.currentSpeed).toEqual(100);
        expect(rightWheel.currentSpeed).toEqual(70);

        tank.setSpeed(-220, 777);
        expect(leftWheel.currentSpeed).toEqual(-100);
        expect(rightWheel.currentSpeed).toEqual(100);
    })
});

describe('tank transmission shifting', () => {
    const transmission = new StandardTransmission(3);
    const leftWheel = new MockWheel();
    const rightWheel = new MockWheel();
    const tank = new Tank(transmission, leftWheel, rightWheel);

    test('shift up', () => {
        expect(tank.shiftUp()).toBe(2);
        expect(transmission.selectedGear).toBe(2);
        expect(tank.shiftUp()).toBe(3);
        expect(transmission.selectedGear).toBe(3);
    });

    test('select gear', () => {
        tank.selectGear(1);
        expect(transmission.selectedGear).toBe(1);

        tank.selectGear(3);
        expect(transmission.selectedGear).toBe(3);
    });

    test('shift down', () => {
        tank.selectGear(3);
        expect(tank.shiftDown()).toBe(2);
        expect(transmission.selectedGear).toBe(2);
        expect(tank.shiftDown()).toBe(1);
        expect(transmission.selectedGear).toBe(1);
    });
});

describe('transmission power delivery', () => {
    const transmission = new StandardTransmission(3);
    const leftWheel = new MockWheel();
    const rightWheel = new MockWheel();
    const tank = new Tank(transmission, leftWheel, rightWheel);

    test('transmission power delivery', () => {
        tank.selectGear(1);
        tank.setSpeed(50, 100);
        expect(leftWheel.currentSpeed).toBe(50/3);
        expect(rightWheel.currentSpeed).toBe(100/3);

        tank.shiftUp();
        expect(leftWheel.currentSpeed).toBe(50*2/3);
        expect(rightWheel.currentSpeed).toBe(100*2/3);

        tank.setSpeed(-100, 60);
        expect(leftWheel.currentSpeed).toBe(-100*2/3);
        expect(rightWheel.currentSpeed).toBe(60*2/3);
    });
});
