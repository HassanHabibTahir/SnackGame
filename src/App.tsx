import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { useAppDispatch, useAppSelector } from "./store/app/hook";
// import {  selectCount } from "./store/raducer/game";
import { CanvasBoard } from "./components/Board";
import { ChakraProvider, Container, Heading } from "@chakra-ui/react";
function App() {
  // const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  // const count = useAppSelector(selectCount);

  return (
    <>
      <div>
        <h1>starter</h1>
        <div>
          <button
            // className={styles.button}
            aria-label="Decrement value"
            // onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <span
          // className={styles.value}
          >
            {/* {count} */}
          </span>
          <button
            // className={styles.button}
            aria-label="Increment value"
            // onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>
        <div>
          <Container maxW="container.lg" centerContent>
            <Heading as="h1" size="xl">
              SNAKE GAME
            </Heading>
            <CanvasBoard height={600} width={1000} />
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
