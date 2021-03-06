/** Performant method to remove duplicate objects from an array based on some prop (key) name */
export const deDuplicateArray = (prop: string, arr: Array<any>): Array<any> => {
    return Array.from(
        arr
            .reduce(
                (acc, item) => (item && item[prop] && acc.set(item[prop], item), acc),
                new Map()
            )
            .values()
    )
}
