export const normalize = (str: string) => {
    return str.toLowerCase().replace(/[\s_]/g, "");
};