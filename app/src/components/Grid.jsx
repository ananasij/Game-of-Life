import React from 'react';
import PropTypes from 'prop-types';

function Grid(props) {
    const width = props.width;
    const height = props.height;
    const renderedGrid = [];

    for (let y = 0; y < height; y += 1) {
        const row = [];
        for (let x = 0; x < width; x += 1) {
            row.push(
                <div
                    key={''.concat(x, y)}
                    className={'grid-cell'.concat(props.currentGrid[x][y] ? ' grid-cell-alive' : ' grid-cell-dead')}
                    onClick={props.handleCellClick.bind(null, x, y)}
                />
            );
        }
        renderedGrid.push(<div className="grid-row" key={y}>{row}</div>);
    }

    return (
        <div>
            {renderedGrid}
        </div>
    );
}

Grid.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    currentGrid: PropTypes.array.isRequired,
    handleCellClick: PropTypes.func.isRequired
};

export default Grid;
