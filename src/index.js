import Rover from "./Rover.js"
import * as readline from 'readline'

function matprint(mat) {
    mat.forEach(row => console.log(row.join(' ')))
}

function renderMap(map, position, direction) {
    const x = position[0]
    const y = position[1]

    const arrow = {
        [Rover.Facing.NORTH]: '^',
        [Rover.Facing.SOUTH]: 'V',
        [Rover.Facing.EAST]: '>',
        [Rover.Facing.WEST]: '<'
    }
    
    map[y][x] = arrow[direction]

    return map
}

function printRoverPosition(rover) {
    const currentPosition = rover.getPosition()
    const map = rover.getMap()

    renderMap(map, currentPosition, rover.direction)
    matprint(map)
}


(() => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('ROVER> ')
    console.info('Press Control+C to exit')

    const rover = new Rover(12345, [10, 10])
    printRoverPosition(rover)

    rl.prompt();

    rl.on('line', (data) => {
        rover.move(data)

        printRoverPosition(rover)

        console.log('current position: ', rover.getPosition())
        rl.prompt()
    })

})()