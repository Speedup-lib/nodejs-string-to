/**
 * Float parser
 */

import validator from 'validator';

import { Parser as IParser, } from '../type/parser';

export class Parser implements IParser<number> {

    /**
     * Parse a string into an float number
     * @param val String value to parse
     * @param options radix (the second parameter in parseInt method)
     */
    validateSync(val?: string, options?: validator.IsFloatOptions): boolean {
        // safely convert to string (for null and undefined values)
        return validator.isFloat(val + '', options,);
    };

    /**
     * Parse a string into an float number
     * @param val String value to parse
     * @param options radix (the second parameter in parseInt method)
     */
    async validate(val?: string, options?: validator.IsFloatOptions): Promise<boolean> {
        return this.validateSync(val, options);
    }


    /**
     * Parse a string into an float number
     * @param val String value to parse
     * @param options No option is accepted
     */
    parseSync(val?: string, options?: void): number {
        return parseFloat(val!);
    }

    /**
     * Parse a string into an float number
     * @param val String value to parse
     * @param options No option is accepted here
     */
    async parse(val?: string, options?: void): Promise<number> {
        return this.parseSync(val, options);
    }


    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    validateAndParseSync(val?: string, defaultValue?: number, options?: { validatorOptions?: validator.IsFloatOptions, parserOptions?: void }): number | undefined {
        return this.validateSync(val, options?.validatorOptions) ? this.parseSync(val, options?.parserOptions) : defaultValue;
    }

    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    async validateAndParse(val?: string, defaultValue?: number, options?: { validatorOptions?: validator.IsIntOptions, parserOptions?: void }): Promise<number | undefined> {
        return this.validateAndParseSync(val, defaultValue, options,);
    }
};

export const parser = new Parser();
