export var patchObject = function (object, patch) { return Object.assign({}, object, patch); };
export var objectPatcher = function (object) { return function (patch) { return Object.assign({}, object, patch); }; };
/**
 * Creates new object from a given one without specified fields
 * @param object
 * @param fields
 */
export var stripFields = function (object, fields) { return Object
    .keys(object)
    .filter(function (field) { return fields.indexOf(field) < 0; })
    .reduce(function (memo, field, index) {
    memo[field] = object[field];
    return memo;
}, {}); };
export var noop = function (_) { return null; };
