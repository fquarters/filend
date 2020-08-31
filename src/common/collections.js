/**
 * returns true if all elements match predicate
 */
var all = function (elements, predicate) { return elements
    .reduce(function (previousValue, currentValue) { return previousValue && predicate(currentValue); }, true); };
/**
 * returns true if any of the elements match predicate
 */
var any = function (elements, predicate) { return elements
    .reduce(function (previousValue, currentValue) { return previousValue || predicate(currentValue); }, false); };
/**
 * returns first item from array that matches predicate
 */
var first = function (elements, predicate) { return elements
    .reduce(function (previousValue, currentValue) { return previousValue || (predicate(currentValue) ? currentValue : null); }, null); };
/**
 * returns true if none of the elements in array match predicate
 */
var none = function (elements, predicate) { return !any(elements, predicate); };
/**
 * returns array of unique elements present in either one of given arrays
 */
var union = function (left, right, equalCheck) { return left
    .concat(right)
    .reduce(function (previousValue, currentValue) {
    var present = equalCheck ? any(previousValue, function (prev) { return equalCheck(prev, currentValue); })
        : previousValue.indexOf(currentValue) > -1;
    if (!present) {
        previousValue.push(currentValue);
    }
    return previousValue;
}, []); };
/**
 * returns array of unique elements that are present in the first array and not present in the second array
 */
var difference = function (left, right, equalCheck) { return left
    .reduce(function (previousValue, currentValue) {
    var alreadyAdded = equalCheck ? any(previousValue, function (prev) { return equalCheck(prev, currentValue); })
        : previousValue.indexOf(currentValue) > -1;
    var presentInRight = equalCheck ? any(right, function (prev) { return equalCheck(prev, currentValue); })
        : right.indexOf(currentValue) > -1;
    if (!(alreadyAdded || presentInRight)) {
        previousValue.push(currentValue);
    }
    return previousValue;
}, []); };
/**
 * returns array of unique elements that are present in both given arrays
 */
var intersection = function (left, right, equalCheck) { return union(left.filter(function (currentValue) { return equalCheck ?
    any(right, function (prev) { return equalCheck(prev, currentValue); })
    : right.indexOf(currentValue) > -1; }), right.filter(function (currentValue) { return equalCheck ?
    any(left, function (prev) { return equalCheck(prev, currentValue); })
    : left.indexOf(currentValue) > -1; }), equalCheck); };
/**
 * returns true if arrays are the same or of the same length and contain equivalent elements (in no particular order)
 */
var equalSets = function (left, right, equalCheck) {
    if (left === right) {
        return true;
    }
    if (left.length !== right.length) {
        return false;
    }
    return difference(left, right, equalCheck).length === 0;
};
/**
 * returns array of non null and non undefined elements
 */
var nonNull = function (elements) { return elements
    .filter(function (currentValue) { return !(currentValue === null || typeof currentValue === "undefined"); }); };
/**
 * reduces array to object with keys mapped by keySelector
 * @param elements
 * @param keySelector
 */
var arrayToObject = function (elements, keySelector) { return elements
    .reduce(function (memo, item) {
    var key = keySelector(item);
    if (!memo[key]) {
        memo[key] = item;
    }
    return memo;
}, {}); };
export { all, first, any, none, union, difference, intersection, nonNull, equalSets, arrayToObject };
