export const getSpeed = (amount: number, speedDiff: number): number[] => {
    let speed: number[] = [];

    for (let i = 1, curr = 1; i <= amount; ++i, curr += speedDiff) {
        // const value = (Math.random() + i) * 2;
        // const value = i % 2 == 0 ? -curr : curr;
        const value = curr;
        speed.push(value);
    }

    return speed;
}

export const getSize = (amount: number, sizeDiff: number): number[] => {
    const height = (window.innerHeight - 400) / 2;
    const len = sizeDiff === 1 ?
        height / amount :
        height * (1/sizeDiff - 1) / (Math.pow(1/sizeDiff, amount) - 1);
    let size: number[] = [len];

    for (let i = 1; i < amount; ++i) {
        // const value = (Math.random() + i) * 100;
        const value = size[i - 1] / sizeDiff;
        size.push(value);
    }

    return size;
}