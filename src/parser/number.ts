/**
 * Number parser (int or float)
 */

import validator from 'validator';

import { Parser as IParser, } from '../type/parser';

import { parser as floatParser } from './float';
import { parser as intParser } from './int';

export class Parser implements IParser<number> {

    /**
     * Parse a string into an integer number
     * @param val String value to parse
     * @param options Combination of both intValidatorOptions and floatValidatorOptions
     */
    validateSync(val?: string, options?: { intValidatorOptions?: validator.IsIntOptions, floatValidatorOptions?: validator.IsFloatOptions, }): boolean {
        // safely convert to string (for null and undefined values)
        return intParser.validateSync(val, options?.intValidatorOptions,) || floatParser.validateSync(val, options?.floatValidatorOptions,);
    };

    /**
     * Parse a string into an integer number
     * @param val String value to parse
     * @param options Combination of both intValidatorOptions and floatValidatorOptions
     */
    async validate(val?: string, options?: { intValidatorOptions?: validator.IsIntOptions, floatValidatorOptions?: validator.IsFloatOptions, }): Promise<boolean> {
        return this.validateSync(val, options);
    }


    /**
     * Parse a string into either an integer or a float
     * @param val String value to parse
     * @param options 
     */
    parseSync(val?: string, options?: { intParseOptions?: number, }): number {

        // make sure that val is not null or undefined
        const str = val + '';

        // try integer
        const intVal = validator.isInt(str) || validator.isHexadecimal(str) ? intParser.parseSync(str, options?.intParseOptions) : undefined;
        if (intVal !== undefined) { return intVal; }

        // try float
        const floatVal = validator.isFloat(str) ? floatParser.parseSync(str) : undefined;
        if (floatVal !== undefined) { return floatVal; }

        // NaN
        return Number.NaN;
    }

    /**
     * Parse a string into either an integer or a float
     * @param val String value to parse
     * @param options radix (the second parameter in parseInt method)
     */
    async parse(val?: string, options?: { intParseOptions?: number, }): Promise<number> {
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
        defaultValue?: number,
        options?: {

            // validator options
            validatorOptions?: {
                intValidatorOptions?: validator.IsIntOptions,
                floatValidatorOptions?: validator.IsFloatOptions,
            },

            // parser options
            parserOptions?: {
                intParseOptions?: number,
            }
        },
    ): number | undefined {
        return this.validateSync(val, options?.validatorOptions) ? this.parseSync(val, options?.parserOptions) : defaultValue;
    }

    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value if the provided string is not a valid number
     * @param options Contains both validator and parser options
     */
    async validateAndParse(
        val?: string,
        defaultValue?: number,
        options?: {

            // validator options
            validatorOptions?: {
                intValidatorOptions?: validator.IsIntOptions,
                floatValidatorOptions?: validator.IsFloatOptions,
            },

            // parser options
            parserOptions?: {
                intParseOptions?: number,
            }
        },
    ): Promise<number | undefined> {
        return this.validateAndParseSync(val, defaultValue, options,);
    }
};

export const parser = new Parser();
