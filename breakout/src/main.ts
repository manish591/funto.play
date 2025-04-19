function drawBall(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false)
  context.fillStyle = "black";
  context.fill()
  context.closePath()
}

function drawPaddle(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fillStyle = "blue";
  context.fill();
  context.closePath();
}

function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }

  // canvas
  let context = canvas.getContext("2d") as CanvasRenderingContext2D;
  let canvasWidth = 800;
  let canvasHeight = 500;

  // ball
  let ballRadius = 10;
  let ballX = canvasWidth / 2;
  let ballY = canvasHeight - 30
  let dx = 2;
  let dy = -2;

  // paddle
  let paddleWidth = 100;
  let paddleHeight = 10;
  let paddleX = (canvasWidth - paddleWidth) / 2;
  let paddleY = canvasHeight - paddleHeight;
  let leftPressed = false;
  let rightPressed = false;

  // game
  let timerID = 0;

  timerID = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(context, ballX, ballY, ballRadius);
    drawPaddle(context, paddleX, paddleY, paddleWidth, paddleHeight);
    ballX += dx;
    ballY += dy;

    if (ballY < ballRadius) {
      dy = -dy;
    } else if (ballY > canvas.height - ballRadius) {
      if (ballX > paddleX && ballX < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        clearInterval(timerID);
      }
    }

    if (ballX >= canvas.width - ballRadius || ballX < ballRadius) {
      dx = -dx;
    }

    if (leftPressed) {
      if (paddleX - 7 < 0) {
        paddleX = 0;
      } else {
        paddleX -= 7;
      }
    }

    if (rightPressed) {
      if (paddleX + paddleWidth + 7 > canvasWidth) {
        paddleX = canvasWidth - paddleWidth;
      } else {
        paddleX += 7;
      }
    }
  }, 10);

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Right" || key === "ArrowRight") {
      rightPressed = true;
    } else if (key === "Left" || key == "ArrowLeft") {
      leftPressed = true;
    }
  });

  document.addEventListener("keyup", (e) => {
    const key = e.key;

    if (key === "Right" || key === "ArrowRight") {
      rightPressed = false;
    } else if (key === "Left" || key == "ArrowLeft") {
      leftPressed = false;
    }
  });
}

init()