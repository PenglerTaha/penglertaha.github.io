window.onload = () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const resolution = 12;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLS = Math.floor(canvas.width / resolution);
    const ROWS = Math.floor(canvas.height / resolution);

    // --- State ---
    let grid = buildEmptyGrid();
    let running = false;
    let animFrameId = null;
    let isDrawing = false;
    let drawValue = 1; // 1 = paint alive, 0 = erase

    // --- Grid Helpers ---
    function buildEmptyGrid() {
        return new Array(COLS).fill(null).map(() => new Array(ROWS).fill(0));
    }

    // --- Drawing the grid ---
    function draw(grid) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw faint grid lines while in edit mode
        if (!running) {
            ctx.strokeStyle = 'rgba(0, 255, 0, 0.07)';
            ctx.lineWidth = 0.5;
            for (let c = 0; c <= COLS; c++) {
                ctx.beginPath();
                ctx.moveTo(c * resolution, 0);
                ctx.lineTo(c * resolution, canvas.height);
                ctx.stroke();
            }
            for (let r = 0; r <= ROWS; r++) {
                ctx.beginPath();
                ctx.moveTo(0, r * resolution);
                ctx.lineTo(canvas.width, r * resolution);
                ctx.stroke();
            }
        }

        // Draw alive cells
        for (let col = 0; col < COLS; col++) {
            for (let row = 0; row < ROWS; row++) {
                if (grid[col][row] === 1) {
                    const brightness = running ? 1 : 0.85;
                    ctx.fillStyle = running
                        ? `rgba(0, 255, 80, ${brightness})`
                        : `rgba(0, 220, 60, ${brightness})`;
                    ctx.shadowColor = running ? '#00ff50' : 'transparent';
                    ctx.shadowBlur = running ? 4 : 0;
                    ctx.fillRect(
                        col * resolution + 1,
                        row * resolution + 1,
                        resolution - 2,
                        resolution - 2
                    );
                }
            }
        }
        ctx.shadowBlur = 0;
    }

    // --- Game of Life Logic ---
    function nextGeneration(grid) {
        const next = grid.map(arr => [...arr]);
        let anyCellAlive = false;

        for (let col = 0; col < COLS; col++) {
            for (let row = 0; row < ROWS; row++) {
                const cell = grid[col][row];
                let neighbors = 0;

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        const nc = col + i;
                        const nr = row + j;
                        if (nc >= 0 && nr >= 0 && nc < COLS && nr < ROWS) {
                            neighbors += grid[nc][nr];
                        }
                    }
                }

                if (cell === 1 && (neighbors < 2 || neighbors > 3)) {
                    next[col][row] = 0;
                } else if (cell === 0 && neighbors === 3) {
                    next[col][row] = 1;
                }

                if (next[col][row] === 1) anyCellAlive = true;
            }
        }

        return { next, anyCellAlive };
    }

    // --- Game Loop ---
    let lastTime = 0;
    const INTERVAL = 80; // ms between generations

    function gameLoop(timestamp) {
        if (!running) return;

        if (timestamp - lastTime >= INTERVAL) {
            const { next, anyCellAlive } = nextGeneration(grid);
            grid = next;
            draw(grid);
            lastTime = timestamp;

            if (!anyCellAlive) {
                stopGame();
                showMessage('All cells are dead. Draw to restart.', 3000);
                return;
            }
        }

        animFrameId = requestAnimationFrame(gameLoop);
    }

    function startGame() {
        const hasLiveCells = grid.some(col => col.some(cell => cell === 1));
        if (!hasLiveCells) {
            showMessage('Draw some cells first!', 1500);
            return;
        }
        running = true;
        updateUI();
        lastTime = 0;
        animFrameId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
        running = false;
        if (animFrameId) cancelAnimationFrame(animFrameId);
        updateUI();
        draw(grid);
    }

    function resetGame() {
        stopGame();
        grid = buildEmptyGrid();
        draw(grid);
    }

    // --- Mouse / Touch Input ---
    function getCellFromEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const col = Math.floor((clientX - rect.left) / resolution);
        const row = Math.floor((clientY - rect.top) / resolution);
        return { col, row };
    }

    function paintCell(e) {
        if (running) return;
        const { col, row } = getCellFromEvent(e);
        if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
            grid[col][row] = drawValue;
            draw(grid);
        }
    }

    canvas.addEventListener('mousedown', (e) => {
        if (running) return;
        isDrawing = true;
        const { col, row } = getCellFromEvent(e);
        // If clicking an alive cell, switch to erase mode
        if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
            drawValue = grid[col][row] === 1 ? 0 : 1;
        }
        paintCell(e);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDrawing) paintCell(e);
    });

    canvas.addEventListener('mouseup', () => { isDrawing = false; });
    canvas.addEventListener('mouseleave', () => { isDrawing = false; });

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (running) return;
        isDrawing = true;
        const { col, row } = getCellFromEvent(e);
        if (col >= 0 && col < COLS && row >= 0 && row < ROWS) {
            drawValue = grid[col][row] === 1 ? 0 : 1;
        }
        paintCell(e);
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (isDrawing) paintCell(e);
    }, { passive: false });

    canvas.addEventListener('touchend', () => { isDrawing = false; });

    // --- Keyboard Shortcuts ---
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            running ? stopGame() : startGame();
        }
        if (e.code === 'KeyR') resetGame();
    });

    // --- UI Controls ---
    const startBtn = document.getElementById('startBtn');
    const resetBtn = document.getElementById('resetBtn');
    const statusEl = document.getElementById('status');
    const msgEl = document.getElementById('message');

    startBtn.addEventListener('click', () => {
        running ? stopGame() : startGame();
    });

    resetBtn.addEventListener('click', resetGame);

    function updateUI() {
        if (running) {
            startBtn.textContent = '⏸ Pause';
            startBtn.classList.add('active');
            statusEl.textContent = 'Running';
            statusEl.className = 'status running';
        } else {
            startBtn.textContent = '▶ Start';
            startBtn.classList.remove('active');
            statusEl.textContent = 'Draw mode';
            statusEl.className = 'status paused';
        }
    }

    function showMessage(text, duration) {
        msgEl.textContent = text;
        msgEl.classList.add('visible');
        setTimeout(() => msgEl.classList.remove('visible'), duration);
    }

    // --- Resize ---
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Grid stays the same logical size; just redraw
        draw(grid);
    });

    // --- Init ---
    updateUI();
    draw(grid);
};
