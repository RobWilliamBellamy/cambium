import React, { useState, useReducer, createContext } from 'react';
import { gridReducer } from './GridReducer';
import Grid from './Grid';

import { config } from './configs/config.js';
import { initial_state } from './configs/store.js';
import './css/App.css';

// Create context to share state.
export const AppContext = createContext();

// Create App.
const App = () => {

    const [timerId, setTimerId] = useState(-1);
    const [state, dispatch] = useReducer(
        gridReducer,
        initial_state
    );

    const startTimer = () => {

        clearInterval(timerId);
        const timer_id = setInterval(() => {
            dispatch({ type: 'ON_TICK'});
        }, config.tick_rate_ms);
        setTimerId(timer_id);
    };

    const start = () => {

        dispatch({ type: 'START' });
        startTimer();
    };

    const pause = () => {
        dispatch({ type: 'PAUSE' });
        clearInterval(timerId);
    };

    const resume = () => {
        dispatch({ type: 'RESUME' });
        startTimer();
    };

    const reset = () => {
        dispatch({ type: 'RESET' });
        clearInterval(timerId);
    };

    const stateText = () => {

        let state_text = 'Stopped';
        if (state.ticking) {
            const rover = state.rovers[state.active_rover];            
            state_text = `Running - ${ rover.name }: 
                                    (${ rover.position }), 
                                    ${ rover.heading }`;
        }
        else if (state.paused) {
            state_text = 'Paused';
        }

        return state_text;
    };

    // Stop the timer.
    if (state.ticking === false) {
        clearInterval(timerId);
    }

    // Define pause button text.
    let pause_text = 'Pause';
    let pause_func = pause;

    if (state.paused) {
        pause_text  = 'Resume';
        pause_func  = resume;
    }

    return (

        <AppContext.Provider value={ [state, dispatch] }>
            <div className="buttons">
                <button id="start" className="button" onClick={ () => start() }>Start</button>
                <button id="pause" className="button" onClick={ () => pause_func() }>{ pause_text }</button>
                <button id="reset" className="button" onClick={ () => reset() }>Reset</button>
            </div>
            <div className="state-text">App Status: { stateText() }</div>
            <Grid />
        </AppContext.Provider>
    );
};

export default App;