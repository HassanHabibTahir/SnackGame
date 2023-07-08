export const clearBoard = (
  context: CanvasRenderingContext2D | null | undefined
) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

interface ISnakeCoord {
  x: number;
  y: number;
}

export interface IGlobalState {
  snake: ISnakeCoord[] | [];
  disallowedDirection: string;
  score: number;
}

export interface IObjectBody {
  x: number;
  y: number;
}

function randomNumber(min: number, max: number) {
  const random = Math.random() * max;
  return random - (random % 20);
}

export const generateRandomPosition = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

interface IObject {
  context: CanvasRenderingContext2D | null;
  objectBody: IObjectBody[];
  fillColor: string;
  strokeStyle: string;
}

export const DrawObject = (
  context,
  objectBody,
  fillColor,
  strokeStyle = "#146356"
) => {
  if (context) {
    objectBody.forEach((object: IObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(object.x, object.y, 20, 20);
      context?.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

export const hasSnakeCollided = (
  snake: IObjectBody[],
  currentHeadPos: IObjectBody
) => {
  let flag = false;
  snake.forEach((pos: IObjectBody, index: number) => {
    if (
      pos.x === currentHeadPos.x &&
      pos.y === currentHeadPos.y &&
      index !== 0
    ) {
      flag = true;
    }
  });

  return flag;
};
