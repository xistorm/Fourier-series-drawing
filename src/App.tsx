import React, {Component} from 'react';
import Header from './Header';
import { CanvasElement } from './draw';
import './App.css';
import './draw';

type inputError = {
  [key: string]: boolean;
}

interface IDataInputProps {
}

interface IDataInputState  {
}

class DataInput extends Component<IDataInputProps, IDataInputState> {

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
