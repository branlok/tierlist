import React, { useState } from "react";

//Local State Example
function Counter() {
  let [counter, setCount] = useState(0);

  return (
    <div data-test="counter">
      <h1>Counter amount:</h1> <br />
      <p data-test="count">{counter}</p>
      <button
        data-test="increment-button"
        onClick={() => setCount((preCount) => ++preCount)}
      >
        + 1
      </button>{" "}
      <br />
      <button
        data-test="decrement-button"
        onClick={() => setCount((preCount) => --preCount)}
      >
        - 1
      </button>
      <button data-test="increment" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
