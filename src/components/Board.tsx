import { useState, useRef, useEffect, useCallback } from "react";
import {
  DrawObject,
  IGlobalState,
  IObjectBody,
  clearBoard,
  generateRandomPosition,
  hasSnakeCollided,
} from "../utilities";
import { useAppDispatch, useAppSelector } from "../store/app/hook";
import { inCreaseSnake, makeMove } from "../store/raducer/game";
import { useInterval } from "../utilities/interval";
export interface ICanvasBoard {
  height: number;
  width: number;
}

export const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const [context, setContext] = useState<CanvasRenderingContext2D>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useAppDispatch();
  const snake1 = useAppSelector((state: IGlobalState) => state.snake);
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const { snake, score, disallowedDirection } = snake1;
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );
  let inverval;
  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      console.log(dx, dy, ds, "--------->");
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove([dx, dy]));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove([dx, dy]));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove([dx, dy]));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove([dx, dy]));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      console.log(event);
      if (event.key !== "d") {
        console.log(event.key, "eventKet");
        switch (event.key) {
          case "ArrowUp":
            clearInterval(inverval);
            inverval = setInterval(() => moveSnake(0, -20, "ArrowUp"), 100);

            break;
          case "ArrowDown":
            clearInterval(inverval);
            inverval = setInterval(() => moveSnake(0, 20, "ArrowDown"), 100);

            break;
          case "ArrowLeft":
            clearInterval(inverval);
            inverval = setInterval(() => moveSnake(-20, 0, "ArrowLeft"), 100);

            break;
          case "ArrowRight":
            event.preventDefault();
            clearInterval(inverval);
            inverval = setInterval(() => moveSnake(20, 0, "ArrowRight"), 100);

            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        )
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake]
  );

  useEffect(() => {
    let twoDContext;
    if (canvasRef.current) {
      twoDContext = canvasRef.current.getContext("2d") as HTMLCanvasElement;

      // do something here with the canvas
    }
    setContext(twoDContext);
    clearBoard(twoDContext);
    DrawObject(twoDContext, snake, [pos], "#676FA3"); //Draws object randomly
    DrawObject(twoDContext, [pos], "#676FA3"); //Draws object randomly

    // //When the object is consumed
    if (snake[0].x === pos?.x && snake[0].y === pos?.y) {
      setIsConsumed(true);
    }

    if (
      hasSnakeCollided(snake, snake[0]) ||
      snake[0].x >= width ||
      snake[0].x <= 0 ||
      snake[0].y <= 0 ||
      snake[0].y >= height
    ) {
      // console.log(interval);
      // clearInterval(interval);
      setGameEnded(true);
      // dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
    } else setGameEnded(false);
  }, [context, pos, snake1, height, width, dispatch]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyEvents);

    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
    };
  }, [disallowedDirection, , handleKeyEvents]);

  useEffect(() => {
    //Generate new object
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
      setIsConsumed(false);

      //Increase snake size when object is consumed successfully
      dispatch(inCreaseSnake());

      //Increment the score
      // dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [isConsumed, pos, height, width, dispatch]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "3px solid black",
      }}
      height={height}
      width={width}
    />
  );
};
