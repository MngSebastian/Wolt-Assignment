import ReactDOM from "react-dom";
import React from "react";

class App extends React.Component {
    render() {
    return (
        <div>
            <p>Hello world.</p>
        </div>
        );
    }
}

ReactDOM.render(
<App/>,
document.getElementById('root')
);