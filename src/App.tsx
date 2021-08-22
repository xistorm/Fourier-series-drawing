import React, {Component} from 'react';
import Header from './Headers/Header';
import './App.css';
import './draw';

class DataInput extends Component {

  constructor(props: any) {
    super(props);
  }

  render() {
    return [
      <Header />,
      <canvas id="vectors"></canvas>,
      <canvas id="figure"></canvas>,
      <canvas id="graph"></canvas>
    ];
  }
}

class App extends Component {
  canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props) {
    super(props);

    this.canvas = React.createRef();
  }

  render() {
    return (
      <div className="container" id="container">
        <DataInput />
      </div>
    );
  }
}

export default App;
