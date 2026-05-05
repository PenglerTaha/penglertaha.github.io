const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const resolution = 10; // Size of each cell in pixels
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const COLS = Math.floor(canvas.width / resolution);
const ROWS = Math.floor(canvas.height / resolution);

// Create the grid
function buildGrid() {
    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
        .map(() => Math.floor(Math.random() * 2))); // Randomly seed 0 or 1
}

let grid = buildGrid();

function update() {
    grid = nextGeneration(grid);
    draw(grid);
    requestAnimationFrame(update);
}

function nextGeneration(grid) {
    const nextGrid = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbors = 0;

            // Check all 8 neighbors
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) continue;
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                        numNeighbors += grid[x_cell][y_cell];
                    }
                }
            }

            // Rules of Life
            if (cell === 1 && (numNeighbors < 2 || numNeighbors > 3)) {
                nextGrid[col][row] = 0;
            } else if (cell === 0 && numNeighbors === 3) {
                nextGrid[col][row] = 1;
            }
        }
    }
    return nextGrid;
}

function draw(grid) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution);
            ctx.fillStyle = cell ? '#00ff00' : '#000'; // Matrix green for alive cells
            ctx.fill();
        }
    }
}

requestAnimationFrame(update);
