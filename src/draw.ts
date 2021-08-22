import { getSize, getSpeed } from "./utils";

type canvas = {
    [key: string]: HTMLCanvasElement;
}

type ctx = {
    [key: string]: CanvasRenderingContext2D;
}

export class CanvasElement {
    private width: number = window.innerWidth;
    private height: number = window.innerHeight;
    private time: number = 0;
    private canvas: canvas = {};
    private ctx: ctx = {};
    private amount: number;
    private size: number[];
    private speed: number[];
    private figureDots: Array<number[]> = [];
    private animations: number[] = [-1, -1];

    private readonly len = 500;

    constructor() {
        Array.from(document.getElementsByTagName('canvas')).forEach(element => this.canvas[element.id] = element);
        Object.keys(this.canvas).forEach(key => this.ctx[key] = this.canvas[key].getContext('2d') as CanvasRenderingContext2D);

        Object.keys(this.ctx).forEach(key => {
            this.ctx[key].lineWidth = 2;
            this.ctx[key].strokeStyle = 'rgba(255, 255, 255)';
        });

        const height = (this.height - 400) / 2;

        this.amount = 1;
        this.speed = [1];
        this.size = [height];
        
        this.resize();
    }

    private getGap(): number {
        return this.width - this.figureDots.length;
    }

    private refresh = (names: string[]) => {
        if (this.time > Math.pow(360, 5)) this.time = 0;
        
        names.forEach(name => {
            this.ctx[name].closePath();
            this.ctx[name].clearRect(0, 0, this.width, this.height);
            this.ctx[name].beginPath();
        });
    }

    private drawVectors = async () => {  
        if (!this.ctx.vectors) return;

        this.time = this.time + 1.0;
        this.refresh(['vectors']);
        this.refresh(['graph']);

        //настройки
        this.ctx.vectors.lineWidth = 2;
        this.ctx.vectors.strokeStyle = 'rgba(255, 255, 255)';
        const colorShift = 255 / this.amount;

        //начальные данные
        const gap = this.width / 2 - 800;
        let x = this.width / 2 - gap;
        let y = this.height / 2;

        // рисую векторы
        this.ctx.vectors.moveTo(x, y);

        for (let i = 1; i <= this.amount; ++i) {
            this.ctx.vectors.lineWidth = 2;
            this.ctx.vectors.strokeStyle = `rgba(${i * colorShift}, ${i * colorShift}, ${i * colorShift})`;

            let angle = (this.time * this.speed[i - 1]) * Math.PI / 180;
            let xx = this.size[i - 1] * Math.cos(angle);
            let yy = this.size[i - 1] * Math.sin(angle);

            // this.ctx.vectors.arc(x, y, this.size[i - 1] / 10, 0, 2 * Math.PI);
            // this.ctx.vectors.moveTo(x, y);
            this.ctx.vectors.lineTo(x + xx, y + yy);
            this.ctx.vectors.stroke();

            x += xx;
            y += yy;
        }

        // this.ctx.vectors.arc(x, y, 3, 0, 2 * Math.PI);
        // this.ctx.vectors.moveTo(x, y);

        this.ctx.vectors.lineTo(this.getGap(), y);
        this.ctx.vectors.stroke();

        this.figureDots.push([x, y]);
        if (this.figureDots.length > this.len) this.figureDots.shift();

        this.drawGraph();
        this.drawFigure();

        this.animations[0] = window.requestAnimationFrame(this.drawVectors);
    }

    private drawFigure = async () => {
        if (!this.ctx.figure) return;
        if (!this.figureDots.length) return;

        this.ctx.figure.lineWidth = 2;
        this.ctx.figure.strokeStyle = 'rgba(255, 255, 255)';

        this.ctx.figure.beginPath();
        for (let i = 0; i < this.figureDots.length; ++i) {
            this.ctx.figure.lineTo(this.figureDots[i][0], this.figureDots[i][1]);
        }
        this.ctx.figure.stroke();
        this.ctx.figure.closePath();
    }

    private drawGraph = async () => {
        if (!this.ctx.graph) return;

        this.ctx.graph.lineWidth = 2;
        this.ctx.graph.strokeStyle = 'rgba(255, 255, 255)';

        if (!this.figureDots.length) return;

        this.ctx.graph.beginPath();
        for (let i = 0; i < this.figureDots.length; ++i) {
            this.ctx.graph.lineTo(this.width - i, this.figureDots[i][1]);
        }
        this.ctx.graph.stroke();
        this.ctx.graph.closePath();
    }

    public resize = () => {
        const header = document.getElementById('formContainer');
        const headerHeight = header?.clientHeight || 0;

        this.width = window.innerWidth;
        this.height = window.innerHeight - headerHeight;

        Object.keys(this.canvas).forEach(key => {
            this.canvas[key].width = this.width;
            this.canvas[key].height = this.height;
            this.canvas[key].style.top = String(headerHeight) + 'px';
        });

        this.refresh(Object.keys(this.ctx));
    }

    public draw = (amount?: number, speed?: number[], size?: number[]) => {
        if (amount) this.amount = amount;
        if (speed) this.speed = speed;
        if (size) this.size = size;

        this.animations.filter(id => id >= 0).map(id => window.cancelAnimationFrame(id));
        this.refresh(Object.keys(this.ctx));
        this.figureDots = [];
        this.resize();

        this.drawVectors();
        this.drawFigure();
    }
}