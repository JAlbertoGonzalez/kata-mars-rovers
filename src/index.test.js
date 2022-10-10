import { Rover } from "./Rover"

describe('Mars Rovers', function () {
    it('should create rover instance', function() {
        const rover = new Rover(123, [4, 4])
        expect(rover).toBeInstanceOf(Rover)
    })
})