export const patchObject = <T>(object: T, patch: Partial<T>) => Object.assign({}, object, patch);

export const objectPatcher = <T>(object: T) => <T>(patch: Partial<T>) => Object.assign({}, object, patch);

export const noop: ((arg0: any) => any) = (_) => null;
