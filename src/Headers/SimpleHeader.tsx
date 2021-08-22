import React from "react";
import { Component } from "react";

type ReactRef<T> = {
    [key: string]: React.RefObject<T>,
}

interface IInputItemProps {
    name: string;
    defaultValue: number;
}

interface IInputItemState {
    error: boolean;
}

interface IHeaderFormProps {
    draw: (amount?: number, speedDiff?: number, sizeDiff?: number) => void;
}

interface IHeaderFormState {
}

class InputItem extends Component<IInputItemProps, IInputItemState> {
    private _value?: React.RefObject<HTMLInputElement> = React.createRef();

    public get value(): number {
        console.log(this._value);
        return Number(this._value?.current?.value) || this.props.defaultValue;
    }

    public get error() {
        return this.state.error;
    }

    constructor(props) {
        super(props);

        this.state = {
            error: false,
        }
    }
    
    private handleDataInput = (event: any) => {
        const input = event.currentTarget;

        if (input.value.length && isNaN(input.value)) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                error: false,
            });
        }
    }

    render() {
        return (
            <div className="inputItem">
                <label htmlFor={this.props.name}>Количество векторов: </label>
                <input
                    className={this.state.error ? 'incorrect input' : 'input'}
                    placeholder='1'
                    name={this.props.name}
                    onChange={this.handleDataInput}
                    ref={this._value}
                >
                </input>
            </div>
        );
    }
}

export class HeaderForm extends Component<IHeaderFormProps, IHeaderFormState> {
    private inputs: ReactRef<InputItem> = {};

    private readonly inputFieldNames = {'amount': 1, 'speed': 1, 'size': 2};

    constructor(props) {
        super(props);

        Object.keys(this.inputFieldNames).forEach(name => this.inputs[name] = React.createRef())
    }

    handleDataSet = (event: any) => {
        event.preventDefault();

        const amount = this.inputs.amount.current?.value;
        const speed =this.inputs.speed.current?.value;
        const size = this.inputs.size.current?.value;
        const hasErrors = Object.keys(this.inputFieldNames).some(key => this.inputs[key].current?.error === true);

        if (!hasErrors) {
            this.props.draw(amount, speed, size);
        }
    }

    render() {
        return (
            <form className="data" onSubmit={this.handleDataSet}>
                {Object.keys(this.inputFieldNames).map(name => <InputItem key={name} defaultValue={this.inputFieldNames[name]} name={name} ref={this.inputs[name]} />)}

                <input type="submit" className="submit" value="Сгенерировать" />
            </form>
        )
    }
}