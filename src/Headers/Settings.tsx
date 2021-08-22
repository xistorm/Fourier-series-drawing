import { Component } from "react";
import { getSize, getSpeed } from "../utils";
import { InputItem } from "./InputItem";

interface ISettingProps {
    updateData: (amount: number, speed: number[], size: number[]) => void;
    expanend: boolean;
    amount: number;
    speed: number[];
    size: number[];
}
interface ISettingState {
}

type InputData = {
    [key: string]: number;
}

export default class Settings extends Component<ISettingProps, ISettingState> {
    private readonly inputFieldData: InputData[] = [];

    constructor(props) {
        super(props);

        this.updateProps(props);
    }

    private updateProps = (props: ISettingProps) => {
        const amount = props.amount;
        const size = props.size;
        const speed = props.speed;

        for (let i = 0; i < amount; ++i) {
            this.inputFieldData[i] = {
                vector: i,
                speed: speed[i],
                size: size[i],
            }
        }
    }

    private updateField = (row?: number, name?: string, value?: number) => {
        if ((!row && row !== 0) || !name || !value) return;
        let size: number[] = [];
        let speed: number[] = [];

        this.inputFieldData[row][name] = value;
        this.inputFieldData.forEach(data => {
            size.push(data['size']);
            speed.push(data['speed']);
        });

        this.props.updateData(this.inputFieldData.length, speed, size);
    }

    componentWillReceiveProps(props) {
        this.updateProps(props);
    }

    render() {
        return (
            <div className={"settings" + (this.props.expanend ? "" : " hidden")}>
                {this.inputFieldData.map((data, index) => {
                    return <div className="row">{Object.keys(data).map(key => {
                        return <InputItem
                            row={index}
                            key={key}
                            name={key}
                            text={key}
                            updateField={this.updateField}
                            defaultValue={data[key]}
                            />
                        })}
                    </div>
                })}
            </div>
        )
    }
}