/**
 * @speedup/string-to library
 */

import { parser as boolParser } from './parser/bool';
import { parser as dateParser } from './parser/date';
import { parser as numberParser } from './parser/number';

export * as arrayParser from './parser/array';
export * as boolParser from './parser/bool';
export * as dateParser from './parser/date';
export * as floatParser from './parser/float';
export * as intParser from './parser/int';
export * as jsonParser from './parser/json';
export * as numberParser from './parser/number';

/**
 * Try converting the provided value into any primitive type
 * @param val Value to try parsing on
 */
export const tryAnyToPrimitive = (val?: any): number | Date | boolean | string | null | undefined => {

    if (val === undefined || val === null) { return val; }

    const numberValue = numberParser.validateAndParseSync(val);
    if (!!numberValue) { return numberValue; }

    const dateValue = dateParser.validateAndParseSync(val);
    if (!!dateValue) { return dateValue; }

    const boolValue = boolParser.validateAndParseSync(val);
    if (!!boolValue) { return boolValue; }

    return val;
};

/**
 * Iterate over array items and parse all the values
 * @param arr Array to iterate over
 */
export const parseArrayItems = async (arr: Array<any>): Promise<Array<any> | undefined> =>
    parseArrayItemsSync(arr);

/**
 * Iterate over array items and parse all the values
 * @param arr Array to iterate over
 */
export const parseArrayItemsSync = (arr?: Array<any>): Array<any> | undefined => {

    if (arr === undefined || arr === null || Array.isArray(arr) === false) { return arr; }

    return arr.map(itemValue => {

        // recursive on array
        if (Array.isArray(itemValue)) {
            return parseArrayItemsSync(itemValue);
        }
        // recursive on object        
        else if (typeof itemValue === 'object') {
            return parseObjectKeysSync(itemValue);
        }
        // single-item to primitive type
        else {
            return tryAnyToPrimitive(itemValue);
        }
    });
};


/**
 * Iterate over object keys and parse all the values
 * @param obj Object to iterate over
 */
export const parseObjectKeys = async (obj?: { [key: string]: any }): Promise<{ [key: string]: any } | undefined> =>
    parseObjectKeysSync(obj,);

/**
 * Iterate over object keys and parse all the values
 * @param obj Object to iterate over
 */
export const parseObjectKeysSync = (obj?: { [key: string]: any }): { [key: string]: any } | undefined => {

    if (obj === null || obj === undefined) { return obj; }

    const itemNames = Object.keys(obj);
    const output: { [key: string]: any } = {};

    itemNames.forEach(itemName => {

        const itemValue = obj[itemName];

        // recursive on array
        if (Array.isArray(itemValue)) {
            output[itemName] = parseArrayItemsSync(itemValue);
        }
        // recursive on object        
        else if (typeof itemValue === 'object') {
            output[itemName] = parseObjectKeysSync(itemValue);
        }
        // single-item to primitive type
        else {
            output[itemName] = tryAnyToPrimitive(itemValue);
        }
    });

    return output;
};
