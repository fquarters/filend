export const patchObject = <T>(object: T, patch: Partial<T>) => Object.assign({}, object, patch);
export const objectPatcher = <T>(object: T) => <T, R>(patch: Partial<T>) => Object.assign({}, object, patch);

/**
 * Creates new object from a given one without specified fields
 * @param object
 * @param fields
 */
export const stripFields = (object: Record<string, any>, fields: Array<string>) => Object
    .keys(object)
    .filter((field) => fields.indexOf(field) < 0)
    .reduce<Record<string, any>>((memo, field, index) => {

        memo[field] = object[field];
        return memo;
    }, ({} as Record<string, any>));

export const noop: ((arg0: any) => any) = (_) => null;
