import {BiFunction, MapFunction} from "./types";

/**
 * returns true if all elements match predicate
 */
const all = <T>(elements: Array<T>, predicate: MapFunction<T, boolean>): boolean => elements
    .reduce((previousValue: boolean, currentValue: T) => previousValue && predicate(currentValue), true);

/**
 * returns true if any of the elements match predicate
 */
const any = <T>(elements: Array<T>, predicate: MapFunction<T, boolean>): boolean => elements
    .reduce((previousValue: boolean, currentValue: T) => previousValue || predicate(currentValue), false);

/**
 * returns first item from array that matches predicate
 */
const first = <T>(elements: Array<T>, predicate: MapFunction<T, boolean>): T | null => elements
    .reduce((previousValue: T | null, currentValue: T) => previousValue || (predicate(currentValue) ? currentValue : null), null);

/**
 * returns true if none of the elements in array match predicate
 */
const none = <T>(elements: Array<T>, predicate: MapFunction<T, boolean>): boolean => !any(elements, predicate);

/**
 * returns array of unique elements present in either one of given arrays
 */
const union = <T>(left: Array<T>, right: Array<T>, equalCheck?: BiFunction<T, T, boolean>): Array<T> => left
    .concat(right)
    .reduce((previousValue: Array<T>, currentValue: T) => {

        const present = equalCheck ? any(previousValue, (prev: T) => equalCheck(prev, currentValue))
            : previousValue.indexOf(currentValue) > -1;

        if (!present) {
            previousValue.push(currentValue);
        }

        return previousValue;

    }, []);

/**
 * returns array of unique elements that are present in the first array and not present in the second array
 */
const difference = <T>(left: Array<T>, right: Array<T>, equalCheck?: BiFunction<T, T, boolean>): Array<T> => left
    .reduce((previousValue: Array<T>, currentValue: T) => {

        const alreadyAdded = equalCheck ? any(previousValue, (prev: T) => equalCheck(prev, currentValue))
            : previousValue.indexOf(currentValue) > -1;

        const presentInRight = equalCheck ? any(right, (prev: T) => equalCheck(prev, currentValue))
            : right.indexOf(currentValue) > -1;

        if (!(alreadyAdded || presentInRight)) {
            previousValue.push(currentValue);
        }

        return previousValue;

    }, []);

/**
 * returns array of unique elements that are present in both given arrays
 */
const intersection = <T>(left: Array<T>, right: Array<T>, equalCheck?: BiFunction<T, T, boolean>): Array<T> => union(
    left.filter((currentValue: T) => equalCheck ?
        any(right, (prev: T) => equalCheck(prev, currentValue))
        : right.indexOf(currentValue) > -1),

    right.filter((currentValue: T) => equalCheck ?
        any(left, (prev: T) => equalCheck(prev, currentValue))
        : left.indexOf(currentValue) > -1),

    equalCheck);

/**
 * returns true if arrays are the same or of the same length and contain equivalent elements (in no particular order)
 */
const equalSets = <T>(left: Array<T>, right: Array<T>, equalCheck?: BiFunction<T, T, boolean>): boolean => {

    if (left === right) {
        return true;
    }

    if (left.length !== right.length) {
        return false;
    }

    return difference(left, right, equalCheck).length === 0;
}

/**
 * returns array of non null and non undefined elements
 */
const nonNull = <T>(elements: Array<T>): Array<T> => elements
    .filter((currentValue: T) => !(currentValue === null || typeof currentValue === "undefined"));

/**
 * reduces array to object with keys mapped by keySelector
 * @param elements
 * @param keySelector
 */
const arrayToObject = <T, K extends string>(elements: Array<T>, keySelector: MapFunction<T, K>) => elements
    .reduce<Record<K, T>>((memo: Record<K, T>, item: T) => {

        const key = keySelector(item);

        if (!memo[key]) {
            memo[key] = item;
        }

        return memo;

    }, {} as Record<K, T>);


export {
    all,
    first,
    any,
    none,
    union,
    difference,
    intersection,
    nonNull,
    equalSets,
    arrayToObject
}