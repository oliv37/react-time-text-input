# react-time-text-input
A react text input to handle time format HH:mm

[Demo](https://oliv37.github.io/react-time-text-input/)

## Installation

`npm install react-time-text-input`

## Usage

```javascript

import TimeTextInput from "react-time-text-input";

const defaultTime = "00:00";

function App() {
  const [time, setTime] = useState(defaultTime);

  function handleChange(val) {
    setTime(val);
  }

  function handleReset() {
    handleChange(defaultTime);
  }

  return (
    <div>
      <span>Time is {time}</span>
      <br />
      <TimeTextInput
        clock={24}
        value={time}
        onChange={handleChange}
      />
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

```
