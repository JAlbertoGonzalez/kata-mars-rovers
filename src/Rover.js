export default class Rover {
    static Directions = {
        FORWARD: 0,
        RIGHT: 1,
        BACKWARD: 2,
        LEFT: 3
    }

    static Facing = {
        NORTH: 0,
        EAST: 1,
        SOUTH: 2,
        WEST: 3
    }

    static Commands = {
        L: Rover.Directions.LEFT,
        R: Rover.Directions.RIGHT,
        F: Rover.Directions.FORWARD,
        B: Rover.Directions.BACKWARD
    }

    constructor(roverId, gridSize, initialPosition, initialDirection) {
        this.roverId = roverId
        this.gridSize = gridSize
        this.currentPosition = initialPosition || [0, 0]
        this.direction = initialDirection || Directions.FORWARD

        this._generateMap()
        this._fixPosition()
    }

    _fixPosition() {
        while (this.currentPosition[0] < 0)
            this.currentPosition[0] += this.map[0].length

        while (this.currentPosition[1] < 0)
            this.currentPosition[1] += this.map[1].length

        while (this.currentPosition[0] >= this.map[0].length)
            this.currentPosition[0] -= this.map[0].length

        while (this.currentPosition[1] >= this.map[1].length)
            this.currentPosition[1] -= this.map[1].length

    }

    _generateMap() {
        this.map = Array(this.gridSize[1]).fill(Array(this.gridSize[0]).fill('.'))
    }

    _validateCommands(commands) {
        return !!/^(f|b|l|r|F|B|L|R)+$/.exec(commands)
    }

    _parseCommands(commands) {
        const actions = commands.toUpperCase().split("")

        return actions.map(c => Rover.Commands[c])
    }

    _calculateNextPosition(movement) {
        if (this.direction === Facing.NORTH) {
            if (movement === Directions.FORWARD) {
                return [this.currentPosition[0], this.currentPosition[1] - 1, Facing.NORTH]
            }
            if (movement === Directions.BACKWARD) {
                return [this.currentPosition[0], this.currentPosition[1] + 1, Facing.SOUTH]
            }
            if (movement === Directions.LEFT) {
                return [this.currentPosition[0] - 1, this.currentPosition[1], Facing.WEST]
            }
            if (movement === Directions.RIGHT) {
                return [this.currentPosition[0] + 1, this.currentPosition[1], Facing.EAST]
            }
        }
        if (this.direction === Facing.SOUTH) {
            if (movement === Directions.FORWARD) {
                return [this.currentPosition[0], this.currentPosition[1] + 1, Facing.SOUTH]
            }
            if (movement === Directions.BACKWARD) {
                return [this.currentPosition[0], this.currentPosition[1] - 1, Facing.NORTH]
            }
            if (movement === Directions.LEFT) {
                return [this.currentPosition[0] + 1, this.currentPosition[1], Facing.EAST]
            }
            if (movement === Directions.RIGHT) {
                return [this.currentPosition[0] - 1, this.currentPosition[1], Facing.WEST]
            }
        }
        if (this.direction === Facing.WEST) {
            if (movement === Directions.FORWARD) {
                return [this.currentPosition[0] - 1, this.currentPosition[1], Facing.WEST]
            }
            if (movement === Directions.BACKWARD) {
                return [this.currentPosition[0] + 1, this.currentPosition[1], Facing.EAST]
            }
            if (movement === Directions.LEFT) {
                return [this.currentPosition[0], this.currentPosition[1] + 1, Facing.SOUTH]
            }
            if (movement === Directions.RIGHT) {
                return [this.currentPosition[0], this.currentPosition[1] - 1, Facing.NORTH]
            }
        }
        if (this.direction === Facing.EAST) {
            if (movement === Directions.FORWARD) {
                return [this.currentPosition[0] + 1, this.currentPosition[1], Facing.EAST]
            }
            if (movement === Directions.BACKWARD) {
                return [this.currentPosition[0] - 1, this.currentPosition[1], Facing.WEST]
            }
            if (movement === Directions.LEFT) {
                return [this.currentPosition[0], this.currentPosition[1] - 1, Facing.NORTH]
            }
            if (movement === Directions.RIGHT) {
                return [this.currentPosition[0], this.currentPosition[1] + 1, Facing.SOUTH]
            }
        }
    }

    move(commands) {
        const isValid = this._validateCommands(commands)

        if (!isValid) {
            return false
        }

        const parsedCommands = this._parseCommands(commands)

        parsedCommands.forEach(command => {
            const nextPosition = this._calculateNextPosition(command)

            this.currentPosition = [nextPosition[0], nextPosition[1]]
            this._fixPosition()

            this.direction = nextPosition[2]
        })

        return true
    }

    getMap() {
        return JSON.parse(JSON.stringify(this.map))
    }

    getPosition() {
        return this.currentPosition
    }
}

export const Directions = Rover.Directions
export const Facing = Rover.Facing