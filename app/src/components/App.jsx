import React from 'react';
import Grid from './Grid';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            width: 70,
            height: 50
        };
    }
    resizeGrid(width, height) {
        this.setState({ width, height });
    }
    render() {
        return (
            <div>
                <Grid
                    width={this.state.width}
                    height={this.state.height}
                />
                <button onClick={() => this.resizeGrid(50, 30)}>50 x 30</button>
                <button onClick={() => this.resizeGrid(70, 50)}>70 x 50</button>
                <button onClick={() => this.resizeGrid(100, 80)}>100 x 80</button>
            </div>
        );
    }
}

export default App;
