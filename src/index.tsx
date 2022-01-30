import ReactDOM from "react-dom";
import React from "react";
import DeliveryFeeCalculator from "./components/DeliveryFeeCalculator";

class App extends React.Component {
  render() {
    return (
      <div>
        <DeliveryFeeCalculator />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
