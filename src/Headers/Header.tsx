import { Component } from "react"
import { CanvasElement } from "../draw";
import { getSize, getSpeed } from "../utils";
import Settings from "./Settings";
import { HeaderForm } from "./SimpleHeader";

interface IHeaderProps {

}

interface IHeaderState {
    expanded: boolean;
    amount: number;
    speed: number[];
    size: number[];
}

export default class Header extends Component<IHeaderProps, IHeaderState> {
    canvas?: CanvasElement;

    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            amount: 1,
            speed: getSpeed(1, 1),
            size: getSize(1, 2),
        }
    }

    componentDidMount() {
        this.canvas = new CanvasElement();
        this.canvas.draw();

        window.addEventListener('resize', () => {
            this.canvas?.resize();
        });
    }

    private switchState = () => {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    private updateData = (amount: number, speed: number | number[], size: number | number[]): number[][] => {
        const sizes = Array.isArray(size) ? size : getSize(amount, size);
        const speeds = Array.isArray(speed) ? speed : getSpeed(amount, speed);

        this.setState({
            amount: amount || this.state.amount,
            speed: speeds || this.state.speed,
            size: sizes || this.state.size,
        });

        return [sizes, speeds];
    }

    private draw = (amount: number, speedDiff: number, sizeDiff: number) => {
        this.canvas?.draw(amount, this.state.speed, this.state.size);
    }

    render() {
        return (
            <div className={("formContainer" + (this.state.expanded ? " expanded" : ""))}>
                <Settings
                    key={this.state.amount}
                    updateData={this.updateData}
                    expanend={this.state.expanded}
                    amount={this.state.amount}
                    speed={this.state.speed}
                    size={this.state.size}
                />
                <HeaderForm 
                    updateData={this.updateData}
                    expanend={this.state.expanded}
                    expand={this.switchState}
                    draw={this.draw} 
                />
            </div>
        );
    }
}