/**
 * JSON parser
 */

import { Parser as IParser, } from '../type/parser';

export type JSONParseReviver = (this: any, key: string, value: any) => any;

export class Parser<T> implements IParser<T> {

    /**
     * Validate string and check whether its possible to parse as JSON (object/array/null/string)
     * @param val String value to parse
     * @param options No option is accepted
     */
    validateSync(val?: string, options?: void): boolean {
        // safely convert to string (for null and undefined values)
        try {
            JSON.parse(val + '');
            return true;
        }
        catch (err) {
            return false;
        }
    };

    /**
     * Validate string and check whether its possible to parse as JSON (object/array/null/string)
     * @param val String value to parse
     * @param options No option is accepted
     */
    async validate(val?: string, options?: void): Promise<boolean> {
        return this.validateSync(val, options);
    }


    /**
     * Parse a string into either a JSON (object/array/null/string)
     * @param val String value to parse
     * @param options reviver option of JSON.parse
     */
    parseSync(val?: string, options?: JSONParseReviver,): T {
        // make sure that val is not null or undefined
        return JSON.parse(val + '', options,);
    }

    /**
     * Parse a string into either a JSON (object/array/null/string)
     * @param val String value to parse
     * @param options reviver option of JSON.parse
     */
    async parse(val?: string, options?: JSONParseReviver,): Promise<T> {
        return this.parseSync(val, options,);
    }


    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    validateAndParseSync(
        val?: string,
        defaultValue?: T,
        options?: {

            // parser options
            parserOptions?: JSONParseReviver
        },
    ): T | undefined {
        return this.validateSync(val,) ? this.parseSync(val, options?.parserOptions,) : defaultValue;
    }

    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    async validateAndParse(
        val?: string,
        defaultValue?: T,
        options?: {

            // parser options
            parserOptions?: JSONParseReviver
        },
    ): Promise<T | undefined> {
        return this.validateAndParseSync(val, defaultValue, options,);
    }
};
