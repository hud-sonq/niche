export function textAutoFormat(part: string | RegExp, wrap: string | readonly [string, string] = "i"): (v: string) => string {
    const tags = Array.isArray(wrap) ? wrap : [`<${wrap}>`, `</${wrap}>`];
    return (text: string) => text.replace(part, `${tags[0]}$&${tags[1]}`);
};
