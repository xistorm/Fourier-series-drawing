import React from "react";
import { Component } from "react";

interface IInputItemProps {
    row?: number;
    name?: string;
    text?: string;
    defaultValue?: number;
    updateField?: (row?: number, name?: string, value?: number) => void;
}

interface IInputItemState {
    error: boolean;
}

export class InputItem extends Component<IInputItemProps, IInputItemState> {
    private _value?: React.RefObject<HTMLInputElement> = React.createRef();

    public get value(): number {
        return Number(this._value?.current?.value) || this.props.defaultValue || 0;
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
        const value = Number(input.value);

        if (isNaN(input.value)) {
            this.setState({
                error: true,
            });
        } else {
            this.setState({
                error: false,
            });
        }

        if (this.props.updateField) this.props.updateField(this.props.row, this.props.name, value);
    }

    render() {
        return (
            <div className="inputItem">
                {this.props.text ? 
                    <label htmlFor={this.props.name}>{`${this.props.text}:`}</label> :
                    null}
                <input
                    className={this.state.error ? 'incorrect input' : 'input'}
                    placeholder={String(this.props.defaultValue)}
                    name={this.props.name}
                    onChange={this.handleDataInput}
                    ref={this._value}
                >
                </input>
            </div>
        );
    }
}