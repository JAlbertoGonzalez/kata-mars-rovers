import Rover, { Facing } from "./Rover"

describe('Mars Rovers', function () {
    it('should create rover instance', function () {
        const rover = new Rover(123, [4, 4])
        expect(rover).toBeInstanceOf(Rover)
    })

    it('should create grid', function () {
        const rover = new Rover(123, [13, 21])
        const map = rover.getMap()
        expect(map[0]).toBe(13)
        expect(map[1]).toBe(21)
    })

    it('should set initial position', () => {
        const rover1 = new Rover(123, [5, 5])
        expect(rover1.getPosition()).toBe([0, 0])
        const rover2 = new Rover(123, [5, 5], [2, 2])
        expect(rover2.getPosition()).toBe([2, 2])
        const rover3 = new Rover(123, [5, 5], [5, 5], Facing.NORTH)
        expect(rover3.getPosition()).toBe([0, 0])
    })

    it('should move', function () {
        const rover1 = new Rover(123, [5, 5], [1, 1], Facing.NORTH)
        rover1.move("F")
        expect(rover1.getPosition()).toBe([1, 0])

        const rover2 = new Rover(123, [5, 5], [1, 1], Facing.SOUTH)
        rover2.move("F")
        expect(rover2.getPosition()).toBe([1, 2])
    })

    it('should validate rover input commands', function () {
        const rover = new Rover(123, [13, 21])
        expect(rover.move("FLFRBBBRRRLLLF")).toBeCalled()
        expect(rover.move("INVALID COMMAND")).toThrow()
    })

    it('should handle map boundaries on move', function () {
        const rover = new Rover(123, [4, 4], [0, 0], Facing.NORTH)
        rover.move("F")
        expect(rover.getPosition()).toBe([0, 3])
    })

})