import React, { Component } from "react"
import { CanvasElement } from "./draw";
import { HeaderForm } from "./Headers/SimpleHeader";

export default class Header extends Component {
    canvas?: CanvasElement;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.canvas = new CanvasElement();
        this.canvas.draw();

        window.addEventListener('resize', () => {
            this.canvas?.resize();
        });
    }

    private draw = (amount?: number, speedDiff?: number, sizeDiff?: number) => {
        this.canvas?.draw(amount, speedDiff, sizeDiff);
    }

    render() {
        return (
            <div className="formContainer">
                <HeaderForm draw={this.draw} />
            </div>
        );
    }
}