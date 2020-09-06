/**
 * Boolean parser
 */

import { ApplicationError, } from '@speedup/error';

import { Parser as IParser, } from '../type/parser';


export type BoolParserOptions = {

	/**
	 * Values that are considered as true
	 */
	trueValues: Array<string>,

	/**
	 * Values that are considered as false
	 */
	falseValues: Array<string>,


	/**
	 * Consider case in comparisons
	 */
	caseSensitive: boolean,
};

export const defaultOptions: BoolParserOptions = {

	trueValues: ['true', 'yes', '1', 't', 'y'],
	falseValues: ['false', 'no', '0', 'f', 'n'],

	caseSensitive: false,
};

const existsInArray = (item: string, array: Array<string>, caseSensitive: boolean) =>
	array.find(_ => caseSensitive ? item === _ : item.toLowerCase() === _.toLowerCase()) !== undefined;

export class Parser implements IParser<boolean> {

	/**
	 * Validate string and check whether its possible to parse as boolean
	 * @param val String value to parse
	 * @param options Boolean parser options
	 */
	validateSync(val?: string, options?: BoolParserOptions): boolean {
		// safely convert to string (for null and undefined values)
		const str = val + '';

		// merge options
		const mergedOptions = {
			...defaultOptions,
			...(options || {}),
		};

		return existsInArray(str, mergedOptions.trueValues, mergedOptions.caseSensitive) || existsInArray(str, mergedOptions.falseValues, mergedOptions.caseSensitive);
	}

	/**
	 * Validate string and check whether its possible to parse as boolean
	 * @param val String value to parse
	 * @param options Boolean parser options
	 */
	async validate(val?: string, options?: BoolParserOptions): Promise<boolean> {
		return this.validateSync(val, options);
	}


	/**
	 * Parse a string into a boolean
	 * @param val String value to parse
	 * @param options Boolean parser options
	 */
	parseSync(val?: string, options?: BoolParserOptions): boolean {
		// safely convert to string (for null and undefined values)
		const str = val + '';

		// merge options
		const mergedOptions = {
			...defaultOptions,
			...(options || {}),
		};

		if (existsInArray(str, mergedOptions.trueValues, mergedOptions.caseSensitive)) { return true; }
		if (existsInArray(str, mergedOptions.falseValues, mergedOptions.caseSensitive)) { return false; }
		throw new ApplicationError({
			code: 'E_INVALID_BOOLEAN_VALUE',
			message: `Value '${val} is neither in trueValues nor falseValues.'`,
		});
	}

	/**
	 * Parse a string into a boolean
	 * @param val String value to parse
	 * @param options Boolean parser options
	 */
	async parse(val?: string, options?: BoolParserOptions): Promise<boolean> {
		return this.parseSync(val, options);
	}


	/**
	 * Validate and parse the value
	 * @param val String value to parse
	 * @param defaultValue Default value for the time that the value is neither in true nor in false values
	 * @param options Contains both validator and parser options
	 */
	validateAndParseSync(val?: string, defaultValue?: boolean, options?: { validatorOptions?: BoolParserOptions, parserOptions?: BoolParserOptions }): boolean | undefined {
		return this.validateSync(val, options?.validatorOptions,) ? this.parseSync(val, options?.parserOptions,) : defaultValue;
	}

	/**
	 * Validate and parse the value
	 * @param val String value to parse
	 * @param defaultValue Default value for the time that the value is neither in true nor in false values
	 * @param options Contains both validator and parser options
	 */
	async validateAndParse(val?: string, defaultValue?: boolean, options?: { validatorOptions?: BoolParserOptions, parserOptions?: BoolParserOptions }): Promise<boolean | undefined> {
		return this.validateAndParseSync(val, defaultValue, options,);
	}
}

export const parser = new Parser();
