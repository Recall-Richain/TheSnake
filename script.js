const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
let snake = [{x: 200, y: 200}];
let direction = {x: 0, y: 0};
let food = {x: 0, y: 0};
let score = 0;

function main() {
    updateGame();
    drawGame();
    setTimeout(main, 100);
}

function updateGame() {
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = {...snake[i]};
    }
    snake[0].x += direction.x * 20;
    snake[0].y += direction.y * 20;

        if (snake[0].x === food.x && snake[0].y === food.y) {
        score += 5;
        scoreElement.innerText = 'Score: ' + score;
        snake.push({...snake[snake.length - 1]});
        placeFood();
    }

    if (snake[0].x < 0 || snake[0].x >= 400 || snake[0].y < 0 || snake[0].y >= 400) {
        alert("Game Over");
        window.location.reload();
    }
}

function drawGame() {
    gameArea.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = segment.x + 'px';
        snakeElement.style.top = segment.y + 'px';
        snakeElement.classList.add('snake');
        gameArea.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.left = food.x + 'px';
    foodElement.style.top = food.y + 'px';
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

function placeFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': direction = {x: 0, y: -1}; break;
        case 'ArrowDown': direction = {x: 0, y: 1}; break;
        case 'ArrowLeft': direction = {x: -1, y: 0}; break;
        case 'ArrowRight': direction = {x: 1, y: 0}; break;
    }
});

placeFood();
main();