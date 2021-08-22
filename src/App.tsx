import React, {Component} from 'react';
import './App.css';
import './draw';
import { CanvasElement } from './draw';

type inputError = {
  [key: string]: boolean;
}

interface IDataInputProps {
}

interface IDataInputState  {
  animeting: boolean;
  error?: inputError;
}

class DataInput extends Component<IDataInputProps, IDataInputState> {
  amountInput: React.RefObject<HTMLInputElement>;
  speedDiffInput: React.RefObject<HTMLInputElement>;
  sizeDiffInput: React.RefObject<HTMLInputElement>;
  canvas?: CanvasElement;

  constructor(props: any) {
    super(props);

    this.state = {
      animeting: false,
    }

    this.amountInput = React.createRef();
    this.speedDiffInput = React.createRef();
    this.sizeDiffInput = React.createRef();

    this.handleDataSet = this.handleDataSet.bind(this);
    this.handleDataInput = this.handleDataInput.bind(this);
  }

  componentDidMount() {
    this.canvas = new CanvasElement();
    this.canvas.draw();

    window.addEventListener('resize', () => {
      this.canvas?.resize();
    })
  }

  handleDataSet(event: any) {
    event.preventDefault();

    const amount = Number(this.amountInput.current?.value) || 1;
    const speedDiff = Number(this.speedDiffInput.current?.value) || 1;
    const sizeDiff = Number(this.sizeDiffInput.current?.value) || 2;
    const animeting = !this.state.animeting;

    const error = this.state.error;

    if ((error && !Object.keys(error).some(key => error[key] === true)) || !error) {
      this.canvas?.draw(amount, speedDiff, sizeDiff);

      this.setState({
        animeting,
      });
    }
  }

  handleDataInput(event: any) {
    const input = event.currentTarget;
    const name = input.name;
    console.log(name);

    let error: inputError = this.state.error || {};

    if (input.value.length && isNaN(input.value)) {
      error[name] = true;
      this.setState({
        error: error,
      })
    } else {
      error[name] = false;
      this.setState({
        error: error,
      })
    }
  }

  render() {
    return [
      <div className="formContainer" id="formContainer">
        <form className="data" onSubmit={this.handleDataSet}>
          <div className="inputItem">
            <label htmlFor="amount">Количество векторов: </label>
            <input
              className={this.state.error && this.state.error[0] ? 'incorrect input' : 'input'}
              placeholder='1'
              name="amount" 
              onChange={this.handleDataInput}
              ref={this.amountInput}
            >
            </input>
          </div>

          <div className="inputItem">
            <label htmlFor="speed">Разница в скорости: </label>
            <input 
              className={this.state.error && this.state.error[1] ? 'incorrect input' : 'input'}
              placeholder='1'
              name="speed" 
              onChange={this.handleDataInput}
              ref={this.speedDiffInput}
            >
            </input>
          </div>

          <div className="inputItem">
            <label htmlFor="size">Разница в размере: </label>
            <input 
              className={this.state.error && this.state.error[2] ? 'incorrect input' : 'input'}
              placeholder='2'
              name="size" 
              onChange={this.handleDataInput}
              ref={this.sizeDiffInput}
            >
            </input>
          </div>

          <input type="submit" className="submit" value="Сгенерировать" />
        </form>
      </div>,
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
