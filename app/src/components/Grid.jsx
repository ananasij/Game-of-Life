import React from 'react';

class Grid extends React.Component {
    constructor() {
        super();
        this.state = {
            width: 50,
            height: 30,
            currentGrid: [],
            runningID: null
        };
    }

    componentWillMount() {
        this.initGrid();
    }

    initGrid() {
        const { width, height } = this.state;
        const initialPopulation = (width * height) / 4;
        let x;
        let y;
        let count = 0;
        const grid = [];

        for (let i = 0; i < width; i += 1) {
            grid[i] = [];
            for (let j = 0; j < height; j += 1) {
                grid[i][j] = 0;
            }
        }

        while (count < initialPopulation) {
            x = Math.floor(Math.random() * width);
            y = Math.floor(Math.random() * height);
            if (!grid[x][y]) {
                grid[x][y] = 1;
                count += 1;
            }
        }
        this.setState({ currentGrid: grid }, () => this.startGame());
    }

    calculateNextGenerationGrid() {
        const newGenerationGrid = [];
        for (let i = 0; i < this.state.width; i += 1) {
            newGenerationGrid[i] = [];
            for (let j = 0; j < this.state.height; j += 1) {
                newGenerationGrid[i][j] = this.calculateNextGenerationCell(i, j);
            }
        }
        this.setState({ currentGrid: newGenerationGrid });
    }

    calculateNextGenerationCell(x, y) {
        const neighboursNumber = this.countCellNeighbours(x, y);

        if ((this.getCell(x, y) && (neighboursNumber >= 2 && neighboursNumber <= 3)) ||
            (!this.getCell(x, y) && neighboursNumber === 3)) {
            return 1;
        }
        return 0;
    }

    countCellNeighbours(x, y) {
        let count = 0;
        let correctedX;
        let correctedY;
        for (let i = -1; i <= 1; i += 1) {
            for (let j = -1; j <= 1; j += 1) {
                correctedX = this.correctCoordinate(x, i, this.state.width);
                correctedY = this.correctCoordinate(y, j, this.state.height);

                if (this.getCell(correctedX, correctedY)) {
                    count += 1;
                }
            }
        }

        if (this.getCell(x, y)) {
            count -= 1;
        }

        return count;
    }

    correctCoordinate(coordinate, offset, length) {
        let corrected = coordinate + offset;

        if (corrected === -1) {
            corrected = length - 1;
        } else if (corrected === length) {
            corrected = 0;
        }

        return corrected;
    }

    getCell(x, y) {
        return this.state.currentGrid[x][y];
    }

    startGame() {
        if (!this.state.runningID) {
            const runningID = setInterval(() => this.calculateNextGenerationGrid(), 500);
            this.setState({ runningID });
        }
    }

    pauseGame() {
        if (this.state.runningID) {
            clearInterval(this.state.runningID);
            this.setState({ runningID: null });
        }
    }

    render() {
        const renderedGrid = [];

        for (let y = 0; y < this.state.height; y += 1) {
            const row = [];
            for (let x = 0; x < this.state.width; x += 1) {
                row.push(
                    <div
                        key={''.concat(x, y)}
                        className={'grid-cell'.concat((this.getCell(x, y) ? ' grid-cell-alive' : ' grid-cell-dead'))}
                    />
                );
            }
            renderedGrid.push(<div className="grid-row" key={y}>{row}</div>);
        }

        return (
            <div>
                {renderedGrid}
                <button onClick={() => this.startGame()}>Start</button>
                <button onClick={() => this.pauseGame()}>Pause</button>
                <button onClick={() => this.initGrid()}>Reset</button>
            </div>
        );
    }
}

export default Grid;
