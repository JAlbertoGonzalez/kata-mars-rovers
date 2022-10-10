import Rover from "./Rover.js"
import * as readline from 'readline'

function matprint(mat) {
    mat.forEach(row => console.log(row.join(' ')))
}


(() => {
    const rl = readline.createInterface(process.stdin, process.stdout);

    rl.setPrompt('ROVER> ')
    console.info('Press Control+C to exit')

    const rover = new Rover(12345, [10, 10])

    rl.prompt();

    rl.on('line', (data) => {
        rover.move(data)

        const currentPosition = rover.getPosition()
        const map = rover.getMap()
        const x = currentPosition[0]
        const y = currentPosition[1]

        const arrow = {
            [Rover.Facing.NORTH]: '^',
            [Rover.Facing.SOUTH]: 'V',
            [Rover.Facing.EAST]: '>',
            [Rover.Facing.WEST]: '<'
        }
        
        map[y][x] = arrow[rover.direction]
        matprint(map)
        console.log(currentPosition)
        rl.prompt()
    })

})()