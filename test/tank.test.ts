import { Tank } from '../src/tank';
import { StandardTransmission } from '../src/standardTransmission';

function initializeTank(): Tank {
    return new Tank(new StandardTransmission(3));
}

describe('Tank initialization', () => {
    const tank = initializeTank();

    test('speed should be 0', () => {
        expect(tank.currentSpeed).toEqual({leftWheel: 0, rightWheel: 0});
    });

    test('gear should be first', () => {
        expect(tank.selectedGear).toBe(1);
    });
});

describe('tank moving', () => {
    const tank = initializeTank();
    test('set speed', () => {
        tank.setSpeed({leftWheel: 0, rightWheel: 0});
        expect(tank.currentSpeed).toEqual({leftWheel: 0, rightWheel: 0});

        tank.setSpeed({leftWheel: 0, rightWheel: 50});
        expect(tank.currentSpeed).toEqual({leftWheel: 0, rightWheel: 50});

        tank.setSpeed({leftWheel: 60, rightWheel: 0});
        expect(tank.currentSpeed).toEqual({leftWheel: 60, rightWheel: 0});

        tank.setSpeed({leftWheel: 40, rightWheel: 80});
        expect(tank.currentSpeed).toEqual({leftWheel: 40, rightWheel: 80});
    });

    test('set negative speed', () => {
        tank.setSpeed({leftWheel: 0, rightWheel: -50});
        expect(tank.currentSpeed).toEqual({leftWheel: 0, rightWheel: -50});

        tank.setSpeed({leftWheel: -60, rightWheel: 0});
        expect(tank.currentSpeed).toEqual({leftWheel: -60, rightWheel: 0});

        tank.setSpeed({leftWheel: -40, rightWheel: -80});
        expect(tank.currentSpeed).toEqual({leftWheel: -40, rightWheel: -80});
    });

    test('set overflow speed', () => {
        tank.setSpeed({leftWheel: -500, rightWheel: 500});
        expect(tank.currentSpeed).toEqual({leftWheel: -100, rightWheel: 100});

        tank.setSpeed({leftWheel: 220, rightWheel: -200});
        expect(tank.currentSpeed).toEqual({leftWheel: 100, rightWheel: -100});
    });
});

describe('tank transmission', () => {
    const tank = initializeTank();

    test('shift up', () => {
        expect(tank.shiftUp()).toBe(2);
        expect(tank.selectedGear).toBe(2);
        expect(tank.shiftUp()).toBe(3);
        expect(tank.selectedGear).toBe(3);
    });

    test('select first gear', () => {
        tank.selectFirstGear();
        expect(tank.selectedGear).toBe(1);
        expect(tank.shiftUp()).toBe(2);

        tank.selectFirstGear();
        expect(tank.selectedGear).toBe(1);

        tank.shiftUp();
        tank.shiftUp();
        expect(tank.selectedGear).toBe(3);

        tank.selectFirstGear();
        expect(tank.selectedGear).toBe(1);
    });

    test('select final gear', () => {
        tank.selectFirstGear();
        expect(tank.selectedGear).toBe(1);
        expect(tank.selectFinalGear()).toBe(3);
    });

    test('shift down', () => {
        tank.selectFinalGear();
        expect(tank.shiftDown()).toBe(2);
        expect(tank.selectedGear).toBe(2);
        expect(tank.shiftDown()).toBe(1);
        expect(tank.selectedGear).toBe(1);
    });

    test('shift overflow', () => {
        tank.selectFirstGear();
        expect(tank.shiftDown()).toBe(1);
        
        tank.selectFinalGear();
        expect(tank.shiftUp()).toBe(3);
    });
});
