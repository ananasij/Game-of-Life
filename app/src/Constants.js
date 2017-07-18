const Constants = {
    gridSize: {
        small: { width: 50, height: 30 },
        medium: { width: 70, height: 50 },
        large: { width: 100, height: 80 }
    },
    speed: {
        slow: 700,
        normal: 350,
        fast: 100
    },
    populationIndex: 0.65,
    descriptionText: '<p>Here is a Conway&rsquo;s Game of Life. It&rsquo;s a cellular automaton devised by the British mathematician John Horton Conway in 1970.<br /> The &ldquo;game&rdquo; is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced &ldquo;players&rdquo;, by creating patterns with particular properties.<br />  You can read more about it <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" rel="noopener noreferrer" target="_blank">here</a>.</p>' +
    '<p>You can add live cells - just click on the grid. Add them to already running game or clear the grid and create your own setup.</p>'
};

export default Constants;