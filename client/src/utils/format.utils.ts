export const formatToKilo = (num: number): (string | number) => {

    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    };
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    };
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    };

    return num
}

export const millisToMinutesAndSeconds = (millis: number):string => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (Number(seconds) < 10 ? '0' : '') + seconds;
}

export const truncTitle = (title: string, maxSize = 50): string => {

    if (title.length > maxSize) {
        const trimmed = title.slice(0, maxSize).concat('...');
        return trimmed
    }
    return title
}