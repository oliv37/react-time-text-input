import React, { useState } from "react";
import ReactDOM from "react-dom";

import InputTime from "../src/index";

const defaultTime = "00:00";

function App() {
  const [time, setTime] = useState(defaultTime);

  function handleChange(val: string) {
    setTime(val);
  }

  function handleReset() {
    handleChange(defaultTime);
  }

  return (
    <div>
      <span>Time is {time}</span>
      <br />
      <InputTime
        name="timeInput"
        clock={24}
        size={4}
        value={time}
        onChange={handleChange}
      />
      &nbsp;
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
