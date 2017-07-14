import React from 'react';
import Grid from './Grid';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            width: 50,
            height: 33,
            currentGrid: [],
            speed: 1000,
            runningID: null,
            currentGeneration: 0
        };
    }

    componentWillMount() {
        this.initGrid(this.state.width, this.state.height);
    }

    initGrid(width, height) {
        const grid = generateBoard(width, height, 0.65);

        this.setState(
            { width, height, currentGrid: grid, currentGeneration: 0 },
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
                correctedX = correctCoordinate(x, i, this.state.width);
                correctedY = correctCoordinate(y, j, this.state.height);

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
                currentGrid: generateBoard(this.state.width, this.state.height, 0),
                currentGeneration: 0
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

    resizeGrid(width, height) {
        if (width !== this.state.width) {
            this.initGrid(width, height);
        }
    }

    render() {
        const {width, height} = this.state;
        return (
            <div>
                <Grid
                    currentGrid={this.state.currentGrid}
                    width={width}
                    height={height}
                    handleCellClick={this.setCellAlive.bind(this)}
                />
                <p>Current generation: {this.state.currentGeneration}</p>
                <button onClick={() => this.startGame()}>Start</button>
                <button onClick={() => this.pauseGame()}>Pause</button>
                <button onClick={() => this.initGrid(width, height)}>Reset</button>
                <button onClick={() => this.clearGrid()}>Clear</button>
                <button onClick={() => this.changeSpeed(1000)}>Slow</button>
                <button onClick={() => this.changeSpeed(500)}>Normal</button>
                <button onClick={() => this.changeSpeed(250)}>Fast</button>
                <button onClick={() => this.resizeGrid(50, 30)}>50 x 30</button>
                <button onClick={() => this.resizeGrid(70, 50)}>70 x 50</button>
                <button onClick={() => this.resizeGrid(100, 80)}>100 x 80</button>
            </div>
        );
    }
}

function generateBoard(width, height, populationIndex) {
    const grid = [];
    for (let i = 0; i < width; i += 1) {
        grid[i] = [];
        for (let j = 0; j < height; j += 1) {
            grid[i][j] = Math.round(Math.random() * populationIndex);
        }
    }
    return grid;
}

function correctCoordinate(coordinate, offset, length) {
    let corrected = coordinate + offset;

    if (corrected === -1) {
        corrected = length - 1;
    } else if (corrected === length) {
        corrected = 0;
    }

    return corrected;
}

export default App;
