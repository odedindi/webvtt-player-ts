const padNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

export const formatTime = (t: number) => {
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${padNumber(mins)}:${padNumber(secs)}`;
};
