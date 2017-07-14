import React from 'react';
import Grid from './Grid';
import Constants from './../Constants';

class App extends React.Component {
    static generateBoard(width, height, populationIndex) {
        const grid = [];
        for (let i = 0; i < width; i += 1) {
            grid[i] = [];
            for (let j = 0; j < height; j += 1) {
                grid[i][j] = Math.round(Math.random() * populationIndex);
            }
        }
        return grid;
    }

    static correctCoordinate(coordinate, offset, length) {
        let corrected = coordinate + offset;

        if (corrected === -1) {
            corrected = length - 1;
        } else if (corrected === length) {
            corrected = 0;
        }

        return corrected;
    }

    constructor() {
        super();
        this.state = {
            width: Constants.gridSize.medium.width,
            height: Constants.gridSize.medium.height,
            currentGrid: [],
            speed: Constants.speed.normal,
            runningID: null,
            currentGeneration: 1
        };
    }

    componentWillMount() {
        this.initGrid(this.state.width, this.state.height);
    }

    initGrid(width, height) {
        const grid = App.generateBoard(width, height, Constants.populationIndex);
        this.setState(
            { width, height, currentGrid: grid, currentGeneration: 1 },
            this.startGame
        );
    }

    calculateNextGenerationGrid() {
        const newGenerationGrid = [];
        const currentGeneration = this.state.currentGeneration + 1;
        for (let i = 0; i < this.state.width; i += 1) {
            newGenerationGrid[i] = [];
            for (let j = 0; j < this.state.height; j += 1) {
                newGenerationGrid[i][j] = this.calculateNextGenerationCell(i, j);
            }
        }
        this.setState({ currentGrid: newGenerationGrid, currentGeneration });
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
                correctedX = App.correctCoordinate(x, i, this.state.width);
                correctedY = App.correctCoordinate(y, j, this.state.height);

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

    getCell(x, y) {
        return this.state.currentGrid[x][y];
    }

    setCellAlive(x, y) {
        const currentGrid = this.state.currentGrid;
        currentGrid[x][y] = 1;
        this.setState({ currentGrid });
    }

    startGame() {
        if (!this.state.runningID) {
            const runningID = setInterval(
                () => this.calculateNextGenerationGrid(),
                this.state.speed
            );
            this.setState({ runningID });
        }
    }

    pauseGame() {
        if (this.state.runningID) {
            clearInterval(this.state.runningID);
            this.setState({ runningID: null });
        }
    }

    clearGrid() {
        this.pauseGame();
        this.setState(
            {
                currentGrid: App.generateBoard(this.state.width, this.state.height, 0),
                currentGeneration: 1
            }
        );
    }

    changeSpeed(speed) {
        if (speed !== this.state.speed) {
            if (this.state.runningID) {
                this.pauseGame();
                this.setState({ speed }, this.startGame);
            } else {
                this.setState({ speed });
            }
        }
    }

    resizeGrid(size) {
        const { width, height } = size;
        if (width !== this.state.width) {
            this.initGrid(width, height);
        }
    }

    render() {
        const { width, height } = this.state;
        return (
            <div>
                <Grid
                    currentGrid={this.state.currentGrid}
                    width={width}
                    height={height}
                    handleCellClick={this.setCellAlive.bind(this)}
                />
                <p>Current generation: {this.state.currentGeneration}</p>
                <button
                    onClick={() => this.state.runningID ? this.pauseGame() : this.startGame()}
                >
                    { this.state.runningID ? 'Pause' : 'Run' }
                </button>
                <button onClick={() => this.initGrid(width, height)}>Reset</button>
                <button onClick={() => this.clearGrid()}>Clear</button>
                <button onClick={() => this.changeSpeed(Constants.speed.slow)}>Slow</button>
                <button onClick={() => this.changeSpeed(Constants.speed.normal)}>Normal</button>
                <button onClick={() => this.changeSpeed(Constants.speed.fast)}>Fast</button>
                <button onClick={() => this.resizeGrid(Constants.gridSize.small)}>Small</button>
                <button onClick={() => this.resizeGrid(Constants.gridSize.medium)}>Medium</button>
                <button onClick={() => this.resizeGrid(Constants.gridSize.large)}>Large</button>
            </div>
        );
    }
}

export default App;
