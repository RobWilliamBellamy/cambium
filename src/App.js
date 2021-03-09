import React from 'react';
import { gridReducer } from './GridReducer';
import Grid from './Grid';

import { config } from './configs/config.js';
import { initial_state } from './configs/store.js';
import './css/App.css';

let timer_id;

const App = () => {

    const [store, dispatch] = React.useReducer(
        gridReducer,
        initial_state
    );

    const startTimer = () => {

        clearInterval(timer_id);
        timer_id = setInterval(() => {
            dispatch({ type: 'ON_TICK'});
        }, config.tick_rate_ms);
    }

    const start = () => {

        dispatch({
            type: 'START'
        });
        startTimer();
    };

    const pause = () => {
        dispatch({
            type: 'PAUSE'
        });
        clearInterval(timer_id);
    }

    const resume = () => {
        dispatch({
            type: 'RESUME'
        });
        startTimer();
    }

    const reset = () => {
        dispatch({
            type: 'RESET'
        });
        clearInterval(timer_id);
    }

    // Stop the timer.
    if (store.ticking === false) {
        clearInterval(timer_id);
    }

    // Define pause button text.
    const pause_text = (store.paused) ? 'Resume' : 'Pause';
    const pause_func = (store.paused) ? resume : pause;

    return (

        <div>
            <div className="buttons">
                <button id="start" className="button" onClick={ () => start() }>Start</button>
                <button id="pause" className="button" onClick={ () => pause_func() }>{ pause_text }</button>
                <button id="reset" className="button" onClick={ () => reset() }>Reset</button>
            </div>
            <Grid store={ store } />
        </div>
    );
};

export default App;
