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
        const initPopulation = (this.state.width * this.state.height) / 5;
        let x;
        let y;
        let count = 0;
        const grid = [];

        for (let i = 0; i < this.state.height; i += 1) {
            grid[i] = [];
            for (let j = 0; j < this.state.width; j += 1) {
                grid[i][j] = 0;
            }
        }
        while (count < initPopulation) {
            x = Math.floor(Math.random() * this.state.width);
            y = Math.floor(Math.random() * this.state.height);
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
                if (this.state.currentGrid[i][j]) {
                    row.push(<div className="grid-cell grid-cell-alive" />);
                } else {
                    row.push(<div className="grid-cell grid-cell-dead" />);
                }
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
