/**
 * Integer parser
 */

import validator from 'validator';

import { Parser as IParser, } from '../type/parser';

export class Parser implements IParser<number> {

    /**
     * Validate string and check whether its possible to parse as integer
     * @param val String value to parse
     * @param options validator.IsIntOptions
     */
    validateSync(val?: string, options?: validator.IsIntOptions): boolean {
        // safely convert to string (for null and undefined values)
        return validator.isInt(val + '', options,) || validator.isHexadecimal(val + '',);
    };

    /**
     * Validate string and check whether its possible to parse as integer
     * @param val String value to parse
     * @param options validator.IsIntOptions
     */
    async validate(val?: string, options?: validator.IsIntOptions): Promise<boolean> {
        return this.validateSync(val, options);
    }


    /**
     * Parse a string into an integer number
     * @param val String value to parse
     * @param options radix (the second parameter in parseInt method)
     */
    parseSync(val?: string, options?: number): number {
        return parseInt(val!, options);
    }

    /**
     * Parse a string into an integer number
     * @param val String value to parse
     * @param options radix (the second parameter in parseInt method)
     */
    async parse(val?: string, options?: number): Promise<number> {
        return this.parseSync(val, options);
    }


    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    validateAndParseSync(val?: string, defaultValue?: number, options?: { validatorOptions?: validator.IsIntOptions, parserOptions?: number }): number | undefined {
        return this.validateSync(val, options?.validatorOptions) ? this.parseSync(val, options?.parserOptions) : defaultValue;
    }

    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    async validateAndParse(val?: string, defaultValue?: number, options?: { validatorOptions?: validator.IsIntOptions, parserOptions?: number }): Promise<number | undefined> {
        return this.validateAndParseSync(val, defaultValue, options,);
    }
};

export const parser = new Parser();
