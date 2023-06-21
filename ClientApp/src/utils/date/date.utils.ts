export function unixConverter (unixTimestamp: number): string {
    const convertedTimestamp = new Date(unixTimestamp * 1000).toLocaleDateString("en-US");
    return `Released: ${convertedTimestamp}`;
}

export function utcConverter (unixTimestamp: Date): string {
    const date = new Date(unixTimestamp);
    const convertedTime = date.toLocaleDateString("en-US");
    return convertedTime;
}
