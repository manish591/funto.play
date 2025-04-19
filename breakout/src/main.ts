type BrickCell = { x: number, y: number; color: string };

function drawBall(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false)
  context.fillStyle = color;
  context.fill()
  context.closePath()
}

function drawPaddle(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  context.beginPath();
  context.rect(x, y, w, h);
  context.fillStyle = color;
  context.fill();
  context.closePath();
}

function drawBricks(
  context: CanvasRenderingContext2D,
  brickWidth: number,
  brickHeight: number,
  brickGutter: number,
  rows: number,
  cols: number,
  bricksData: BrickCell[][]
) {
  let y = 20;

  for (let i = 0; i < rows; i++) {
    let x = 45;
    for (let j = 0; j < cols; j++) {
      bricksData[i][j].x = x;
      bricksData[i][j].y = y;
      context.beginPath();
      context.rect(x, y, brickWidth, brickHeight);
      context.fillStyle = bricksData[i][j].color;
      context.fill();
      context.closePath();
      x += (brickGutter + brickWidth);
    }
    y += brickHeight + brickGutter;
  }
}

function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    return;
  }

  // canvas
  let context = canvas.getContext("2d") as CanvasRenderingContext2D;
  let canvasWidth = canvas.width;
  let canvasHeight = canvas.height;

  // colors
  const BALL_COLOR = "black";
  const BRICK_COLOR = "red";
  const PADDLE_COLOR = "red";

  // ball
  let ballRadius = 10;
  let ballX = canvasWidth / 2;
  let ballY = canvasHeight - 30
  let dx = 2;
  let dy = -2;

  // paddle
  let paddleWidth = 100;
  let paddleHeight = 15;
  let paddleX = (canvasWidth - paddleWidth) / 2;
  let paddleY = canvasHeight - paddleHeight;
  let leftPressed = false;
  let rightPressed = false;

  // game
  let timerID = 0;

  // brick define
  let brickWidth = 80;
  let brickHeight = 30;
  let brickGutter = 10;
  let brickRows = 4;
  let brickCols = 8;
  let bricksData: BrickCell[][] = [];

  for (let i = 0; i < brickRows; i++) {
    bricksData[i] = [];
    for (let j = 0; j < brickCols; j++) {
      bricksData[i][j] = {
        x: 0,
        y: 0,
        color: BRICK_COLOR
      }
    }
  }


  timerID = setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(context, ballX, ballY, ballRadius, BALL_COLOR);
    drawPaddle(context, paddleX, paddleY, paddleWidth, paddleHeight, PADDLE_COLOR);
    drawBricks(context, brickWidth, brickHeight, brickGutter, brickRows, brickCols, bricksData);
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