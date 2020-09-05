/**
 * Date parser
 */

import { ApplicationError, } from '@speedup/error';
import validator from 'validator';

import { Parser as IParser, } from '../type/parser';


export class Parser implements IParser<Date> {

    /**
     * Validate string and check whether its possible to parse as date
     * @param val String value to parse
     * @param options No option is accepted
     */
    validateSync(val?: string, options?: void): boolean {
        // safely convert to string (for null and undefined values)
        return validator.toDate(val + '') !== null;
    };

    /**
     * Validate string and check whether its possible to parse as date
     * @param val String value to parse
     * @param options No option is accepted
     */
    async validate(val?: string, options?: void): Promise<boolean> {
        return this.validateSync(val, options);
    }


    /**
     * Parse a string into a date
     * @param val String value to parse
     * @param options No option is accepted
     */
    parseSync(val?: string, options?: void): Date {
        // safely convert to string (for null and undefined values)
        const date = validator.toDate(val + '');

        if (!date) {
            throw new ApplicationError({
                code: 'E_INVALID_DATE_VALUE',
                message: `Value '${val} is not parsable to Date.'`,
            });
        }

        return date;
    }

    /**
     * Parse a string into a date
     * @param val String value to parse
     * @param options No option is accepted
     */
    async parse(val?: string, options?: void): Promise<Date> {
        return this.parseSync(val, options);
    }


    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value for the time that the value is not parsable
     * @param options No option is accepted
     */
    validateAndParseSync(val?: string, defaultValue?: Date, options?: { validatorOptions?: void, parserOptions?: void }): Date | undefined {
        return this.validateSync(val, options?.validatorOptions,) ? this.parseSync(val, options?.parserOptions,) : defaultValue;
    }

    /**
     * Validate and parse the value
     * @param val String value to parse
     * @param defaultValue Default value for the time that the value is not parsable
     * @param options No option is accepted
     */
    async validateAndParse(val?: string, defaultValue?: Date, options?: { validatorOptions?: void, parserOptions?: void }): Promise<Date | undefined> {
        return this.validateAndParseSync(val, defaultValue, options,);
    }
};

export const parser = new Parser();
