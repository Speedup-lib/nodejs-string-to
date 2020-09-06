/**
 * @speedup/string-to library
 */

import { parser as boolParser, } from './parser/bool';
import { parser as dateParser, } from './parser/date';
import { parser as numberParser, } from './parser/number';

export * as arrayParser from './parser/array';
export * as boolParser from './parser/bool';
export * as dateParser from './parser/date';
export * as floatParser from './parser/float';
export * as intParser from './parser/int';
export * as jsonParser from './parser/json';
export * as numberParser from './parser/number';

export type TryAllOptions = {

    /**
     * Enable number parser
     */
    number?: boolean,

    /**
     * Enable date parser
     */
    date?: boolean,

    /**
     * Enable bool parser
     */
    bool?: boolean,
};

export const defaultTryAllOptions: TryAllOptions = {
    number: true,
    date: true,
    bool: true,
};

/**
 * Try converting the provided value into any primitive type
 * @param val Value to try parsing on
 * @param options? Try all options
 */
export const tryAnyToPrimitive = (val?: any, options?: TryAllOptions): number | Date | boolean | string | null | undefined => {

    const mergedOptions: TryAllOptions = {
        ...defaultTryAllOptions,
        ...(options || {})
    };

    if (val === undefined || val === null) { return val; }

    if (mergedOptions.number === true) {
        const numberValue = numberParser.validateAndParseSync(val);
        if (!!numberValue) { return numberValue; }
    }

    if (mergedOptions.date === true) {
        const dateValue = dateParser.validateAndParseSync(val);
        if (!!dateValue) { return dateValue; }
    }

    if (mergedOptions.bool === true) {
        const boolValue = boolParser.validateAndParseSync(val);
        if (!!boolValue) { return boolValue; }
    }

    return val;
};

/**
 * Iterate over array items and parse all the values
 * @param arr Array to iterate over
 * @param options? Try all options
 */
export const parseArrayItems = async (arr: Array<any>, options?: TryAllOptions): Promise<Array<any> | undefined> =>
    parseArrayItemsSync(arr, options,);

/**
 * Iterate over array items and parse all the values
 * @param arr Array to iterate over
 * @param options? Try all options
 */
export const parseArrayItemsSync = (arr?: Array<any>, options?: TryAllOptions): Array<any> | undefined => {

    if (arr === undefined || arr === null || Array.isArray(arr) === false) { return arr; }

    return arr.map(itemValue => {

        // recursive on array
        if (Array.isArray(itemValue)) {
            return parseArrayItemsSync(itemValue, options,);
        }
        // recursive on object        
        else if (typeof itemValue === 'object') {
            return parseObjectKeysSync(itemValue, options,);
        }
        // single-item to primitive type
        else {
            return tryAnyToPrimitive(itemValue, options,);
        }
    });
};


/**
 * Iterate over object keys and parse all the values
 * @param obj Object to iterate over
 */
export const parseObjectKeys = async (obj?: { [key: string]: any }, options?: TryAllOptions): Promise<{ [key: string]: any } | undefined> =>
    parseObjectKeysSync(obj, options,);

/**
 * Iterate over object keys and parse all the values
 * @param obj Object to iterate over
 */
export const parseObjectKeysSync = (obj?: { [key: string]: any }, options?: TryAllOptions): { [key: string]: any } | undefined => {

    if (obj === null || obj === undefined) { return obj; }

    const itemNames = Object.keys(obj);
    const output: { [key: string]: any } = {};

    itemNames.forEach(itemName => {

        const itemValue = obj[itemName];

        // recursive on array
        if (Array.isArray(itemValue)) {
            output[itemName] = parseArrayItemsSync(itemValue, options,);
        }
        // recursive on object        
        else if (typeof itemValue === 'object') {
            output[itemName] = parseObjectKeysSync(itemValue, options,);
        }
        // single-item to primitive type
        else {
            output[itemName] = tryAnyToPrimitive(itemValue, options,);
        }
    });

    return output;
};
