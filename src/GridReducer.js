import { config } from './configs/config.js';
import { initial_state } from './configs/store.js';

const MOVEMENT_VECTORS = {
    'N': [ 0,  1],
    'E': [ 1,  0],
    'S': [ 0, -1],
    'W': [-1,  0]
}

// Grid reducer, react to actions and modify state.
export const gridReducer = (state, action) => {

    let new_state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'ON_TICK':
            new_state.tick++;
            return roverTick(new_state);
        case 'START':
            new_state = JSON.parse(JSON.stringify(initial_state));
            new_state.rovers.forEach((r) => {
                validateInstructions(r.movements);
                validateMovements(r);
            });
            new_state = JSON.parse(JSON.stringify(initial_state));
            new_state.ticking = true;
            return new_state;
        case 'PAUSE':
            return new_state;
        case 'RESET':
            new_state = JSON.parse(JSON.stringify(initial_state));
            new_state.ticking = false;
            return new_state;
        default:
            return state;
    }
};

// Determine the new heading of the rover after rotating L/R 90 deg.
const rotateRover = (heading, direction) => {

    let movement_keys = Object.keys(MOVEMENT_VECTORS);
    let heading_index = movement_keys.indexOf(heading);
    heading_index += direction;
    heading_index = (heading_index >= movement_keys.length) ? 0 :
                    (heading_index < 0) ? movement_keys.length - 1 :
                    heading_index;

    return movement_keys[heading_index];
}

// Process an instruction.
const processInstruction = (rover_state, instruction) => {

    // Either rotate L/R or move forward.
    switch(instruction) {
        case 'L':
            rover_state.heading = rotateRover(rover_state.heading, -1);
            break;
        case 'R':
            rover_state.heading = rotateRover(rover_state.heading, 1);
            break;
        case 'M':
            const movement_vector = MOVEMENT_VECTORS[rover_state.heading];
            if (validateMovement(rover_state.position, movement_vector)) {
                rover_state.position[0] += movement_vector[0];
                rover_state.position[1] += movement_vector[1];
            }
            break;
        default:
            break;
    }

    return rover_state;
}

// Move the rover along a main compass heading.
const roverTick = (state) => {

    if (state.ticking)  {

        let rover = state.rovers[state.active_rover];
        const instruction = rover.movements.charAt(state.tick);
        console.log("Move rover", state.active_rover, rover.heading, instruction);

        // Process instruction.
        rover = processInstruction(rover, instruction);

        // Move to the next rover?
        if (state.tick >= rover.movements.length) {

            state.tick = 0;
            state.active_rover++;
            console.log("Switching to rover", state.active_rover);

            // Have we completed movements for all rovers?
            if (state.active_rover >= state.rovers.length) {

                state.ticking = false;
                console.log("End of movements", state);
            }
        }
    }

    return state;
};

// Validate full list of movement instructions against an initial state.
export const validateMovements = (state) => {

    for (let i = 0; i < state.movements.length; i++) {
        state = processInstruction(state, state.movements.charAt(i));
    }

    return true;
}

// Validate the given movement.
export const validateMovement = (position, movement) => {

    for (const i in position) {

        const np = position[i] + movement[i];
        if (np < 0 || np >= config.grid_size[i])  {
            throw new Error(config.errors.out_of_bounds);
        };
    };

    return true;
}

// Validate instructions.
export const validateInstructions = (instructions) => {

    if (instructions.match('[^LRM]')) {
        throw new Error(config.errors.invalid_instructions);
    }

    return true;
}
