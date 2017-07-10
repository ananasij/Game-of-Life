import React from 'react';

class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            width: 50,
            height: 30,
            currentGrid: []
        };
    }

    componentWillMount() {
        this.initGrid();
    }

    initGrid() {
        const { width, height } = this.state;
        const initialPopulation = (width * height) / 5;
        let x;
        let y;
        let count = 0;
        const grid = [];

        for (let i = 0; i < height; i += 1) {
            grid[i] = [];
            for (let j = 0; j < width; j += 1) {
                grid[i][j] = 0;
            }
        }
        while (count < initialPopulation) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
            if (!grid[y][x]) {
                grid[y][x] = 1;
                count += 1;
            }
        }

        this.setState({ currentGrid: grid });
    }

    render() {
        const renderedGrid = [];
        for (let i = 0; i < this.state.height; i += 1) {
            const row = [];
            for (let j = 0; j < this.state.width; j += 1) {
                row.push(<div className={'grid-cell'.concat((this.state.currentGrid[i][j] ? ' grid-cell-alive' : ' grid-cell-dead'))} />);
            }
            renderedGrid.push(<div className="grid-row">{row}</div>);
        }
        return (
            <div>
                {renderedGrid}
            </div>
        );
    }
}

export default Grid;
