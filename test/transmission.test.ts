import { StandardTransmission } from '../src/standardTransmission';

describe('transmission initialization', () => {
    test('should throw exception if less than 1 gear', () => {
        expect(() => new StandardTransmission(0)).toThrow();
    });

    test('should be set to first gear', () => {
        expect(new StandardTransmission(3).selectedGear).toBe(1);
    });

    test('gears count', () => {
        expect(new StandardTransmission(1).gears).toBe(1);
        expect(new StandardTransmission(3).gears).toBe(3);
        expect(new StandardTransmission(6).gears).toBe(6);
    });
});

describe('shifting', () => {
    test('should select proper gear', () => {
        const transmission = new StandardTransmission(3);
        transmission.selectGear(3)
        expect(transmission.selectedGear).toBe(3);
        transmission.selectGear(2)
        expect(transmission.selectedGear).toBe(2);
    });

    test('should throw error when improper gear is selected', () => {
        const transmission = new StandardTransmission(3);
        expect(() => transmission.selectGear(4)).toThrow();
        expect(() => transmission.selectGear(0)).toThrow();
    });

    test('shift up', () => {
        const transmission = new StandardTransmission(3);
        expect(transmission.shiftUp()).toBe(2);
        expect(transmission.shiftUp()).toBe(3);
    });

    test('shift down', () => {
        const transmission = new StandardTransmission(3);
        transmission.selectGear(3);
        expect(transmission.shiftDown()).toBe(2);
        expect(transmission.shiftDown()).toBe(1);
    });

    test('shift overflow', () => {
        const transmission = new StandardTransmission(3);
        expect(transmission.shiftDown()).toBe(1);
        transmission.selectGear(3);
        expect(transmission.shiftUp()).toBe(3);
    });
});

describe('final drive speed', () => {
    const transmission = new StandardTransmission(3);
    test('first gear', () => {
        transmission.selectGear(1);
        expect(transmission.getFinalDriveSpeed(50)).toBe(50/3);
        expect(transmission.getFinalDriveSpeed(100)).toBe(100/3);
        expect(transmission.getFinalDriveSpeed(200)).toBe(200/3);
    });

    test('second gear', () => {
        transmission.selectGear(2);
        expect(transmission.getFinalDriveSpeed(50)).toBe(50*2/3);
        expect(transmission.getFinalDriveSpeed(100)).toBe(100*2/3);
        expect(transmission.getFinalDriveSpeed(200)).toBe(200*2/3);
    });

    test('last gear', () => {
        transmission.selectGear(3);
        expect(transmission.getFinalDriveSpeed(50)).toBe(50);
        expect(transmission.getFinalDriveSpeed(100)).toBe(100);
        expect(transmission.getFinalDriveSpeed(200)).toBe(200);
    });

    test('two speed transmission', () => {
        const twoSpeedTransmission = new StandardTransmission(2);
        twoSpeedTransmission.selectGear(1);
        expect(twoSpeedTransmission.getFinalDriveSpeed(100)).toBe(50);
        expect(twoSpeedTransmission.getFinalDriveSpeed(50)).toBe(25);

        twoSpeedTransmission.selectGear(2);
        expect(transmission.getFinalDriveSpeed(100)).toBe(100);
        expect(transmission.getFinalDriveSpeed(40)).toBe(40);
    });
})