
export function isOf(object: Object, properties: Array<string>) {
    let result = true;
    properties.forEach(prop => {
        result = result && object.hasOwnProperty(prop);
    });
    //
    return result;
}