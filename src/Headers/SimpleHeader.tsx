import React from "react";
import { Component } from "react";
import { InputItem } from "./InputItem";

type ReactRef<T> = {
    [key: string]: React.RefObject<T>,
}

interface IHeaderFormProps {
    draw: (amount: number, speedDiff: number, sizeDiff: number) => void;
    updateData?: (amount: number, speedDiff: number, sizeDiff: number) => void;
    expand: () => void;
    expanend: boolean;
}

interface IHeaderFormState {
}

export class HeaderForm extends Component<IHeaderFormProps, IHeaderFormState> {
    private inputs: ReactRef<InputItem> = {};
    private readonly inputFieldData = {
        amount: {
            defaultValue: 1,
            text: 'количество векторов',
        },
        speed: {
            defaultValue: 1,
            text: 'коэффициент скорости',
        },
        size: {
            defaultValue: 2,
            text: 'коэффициент размера',
        },
    };

    constructor(props) {
        super(props);

        Object.keys(this.inputFieldData).forEach(name => this.inputs[name] = React.createRef());
    }

    private handleDataSet = (event: any) => {
        event.preventDefault();

        const data = this.updateField();
        const [amount, speed, size] = data.values;

        if (!data.hasErrors) {
            this.props.draw(amount, speed, size);
        }
    }

    private updateField = (row?: number, name?: string, value?: number) => {
        const amount = this.inputs.amount.current?.value || this.inputFieldData.amount.defaultValue;
        const speed = this.inputs.speed.current?.value || this.inputFieldData.speed.defaultValue;
        const size = this.inputs.size.current?.value || this.inputFieldData.size.defaultValue;
        const hasErrors = Object.keys(this.inputFieldData).some(key => this.inputs[key].current?.error === true);

        if (!hasErrors && this.props.updateData) {
            this.props.updateData(amount, speed, size);
        }

        return {
            values: [amount, speed, size],
            hasErrors: hasErrors,
        }
    }

    render() {
        return (
            <form className="data" onSubmit={this.handleDataSet}>
                <div onClick={this.props.expand} className="button select">Настройки</div>

                {Object.keys(this.inputFieldData).map(name => {
                        return <InputItem
                            updateField={this.updateField}
                            key={name}
                            name={name}
                            text={this.inputFieldData[name].text}
                            defaultValue={this.inputFieldData[name].defaultValue}
                            ref={this.inputs[name]}
                        />
                })}

                <input type="submit" className={"button" + (this.props.expanend ? " hidden" : "")} value="Сгенерировать" />
            </form>
        )
    }
}