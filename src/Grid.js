import React from 'react';
import GridItem from './GridItem.js';

import { config } from './configs/config.js';
import './css/Grid.css';

export default function Grid(props) {

    const grid = [];
    const grid_size = config.grid_size;
    const num_grid_items = grid_size[0] * grid_size[1];

    // Render all the grid square elements.
    for (let i = 0; i < num_grid_items; i++) {

        const x = i % grid_size[0];
        const y = grid_size[1] - Math.floor(i / grid_size[1]) - 1;

        grid.push(<GridItem key={ 'grid-item' + i }
                            width={ 10 }
                            x={ x }
                            y={ y }
                            rovers={ props.store.rovers } />);
    }

    const gridTemplateColumns = [];
    for (let i = 0; i < grid_size[0]; i++) {
        gridTemplateColumns.push('auto');
    }

    const style = {
          gridTemplateColumns: gridTemplateColumns.join(' ')
    }

    return (<div className="grid-background">
                <div style={ style } className="grid-container">
                    { grid }
                </div>
            </div>
    )
}
