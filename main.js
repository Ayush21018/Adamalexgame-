<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Car Dodging Game</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #333;
    }
    #gameArea {
      position: relative;
      width: 400px;
      height: 600px;
      margin: 20px auto;
      background: #555;
      border: 3px solid #fff;
      overflow: hidden;
    }
    #car {
      position: absolute;
      bottom: 20px;
      left: 180px;
      width: 40px;
      height: 80px;
      background: red;
      border-radius: 5px;
    }
    .obstacle {
      position: absolute;
      width: 40px;
      height: 80px;
      background: yellow;
      top: -100px;
    }
    #score {
      color: white;
      text-align: center;
      font-size: 24px;
      margin-top: 10px;
      font-family: sans-serif;
    }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <div id="gameArea">
    <div id="car"></div>
  </div>

  <script>
    const gameArea = document.getElementById('gameArea');
    const car = document.getElementById('car');
    const scoreDisplay = document.getElementById('score');

    let carX = 180;
    let obstacles = [];
    let gameSpeed = 4;
    let score = 0;
    let gameOver = false;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        carX -= 20;
        if (carX < 0) carX = 0;
      } else if (e.key === 'ArrowRight') {
        carX += 20;
        if (carX > 360) carX = 360;
      }
      car.style.left = carX + 'px';
    });

    function createObstacle() {
      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      obstacle.style.left = Math.floor(Math.random() * (gameArea.clientWidth - 40)) + 'px';
      obstacle.style.top = '-100px';
      gameArea.appendChild(obstacle);
      obstacles.push(obstacle);
    }

    function updateObstacles() {
      obstacles.forEach((obs, index) => {
        let top = parseInt(obs.style.top);
        obs.style.top = top + gameSpeed + 'px';

        // Collision detection
        const carRect = car.getBoundingClientRect();
        const obsRect = obs.getBoundingClientRect();

        if (
          obsRect.bottom > carRect.top &&
          obsRect.top < carRect.bottom &&
          obsRect.right > carRect.left &&
          obsRect.left < carRect.right
        ) {
          endGame();
        }

        if (top > 600) {
          obs.remove();
          obstacles.splice(index, 1);
          score++;
          scoreDisplay.textContent = 'Score: ' + score;
        }
      });
    }

    function gameLoop() {
      if (gameOver) return;
      updateObstacles();
      if (Math.random() < 0.02) {
        createObstacle();
      }
      requestAnimationFrame(gameLoop);
    }

    function endGame() {
      gameOver = true;
      alert('Game Over! Your score was: ' + score);
      location.reload();
    }

    gameLoop();
  </script>
</body>
</html>