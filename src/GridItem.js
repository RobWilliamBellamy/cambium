import React from 'react';
import Rover from './Rover';

import './css/GridItem.css';

const GridItem = (props) => {

    let rovers = [];
    props.rovers.forEach((r, i) => {

        // Check if we need to render a Rover on this grid item,
        // by virtue of matching coordinates.
        if (r.position[0] === props.x && r.position[1] === props.y) {

            rovers.push(<Rover key={ 'rover_' + i++}
                               heading={ r.heading }
                               name={ r.name } />)
        }
    });

    return (<div className="grid-item">
                <span>({ props.x },{ props.y })</span>
                { rovers }
            </div>);
};

export default GridItem;
