/**
 * Array parser
 */

import { Parser as IParser, } from '../type/parser';

export type ArrayParserOptions = {

	/**
	 * A single/multiple set 
	 */
	separator: string,

	/**
	 * Maximum number of items (used in split function)
	 */
	limit: number,
};

export const defaultOptions: ArrayParserOptions = {

	separator: ',',
	limit: Number.MAX_SAFE_INTEGER,
};

export class Parser implements IParser<Array<string>> {

	/**
	 * Validate string and check whether its possible to parse as an array
	 * @param val String value to parse
	 * @param options No option is accepted
	 */
	validateSync(val?: string, options?: void): boolean { // eslint-disable-line @typescript-eslint/no-unused-vars
		return val !== undefined && val !== null && val + '' !== '';
	}

	/**
	 * Validate string and check whether its possible to parse as an array
	 * @param val String value to parse
	 * @param options No option is accepted
	 */
	async validate(val?: string, options?: void): Promise<boolean> {
		return this.validateSync(val, options);
	}


	/**
	 * Parse a string into an array
	 * @param val String value to parse
	 * @param options Array parser options
	 */
	parseSync(val?: string, options?: ArrayParserOptions): Array<string> {
		// safely convert to string (for null and undefined values)
		const str = val + '';

		// merge options
		const mergedOptions = {
			...defaultOptions,
			...(options || {}),
		};

		return str.split(mergedOptions.separator, mergedOptions.limit);
	}

	/**
	 * Parse a string into an array
	 * @param val String value to parse
	 * @param options Array parser options
	 */
	async parse(val?: string, options?: ArrayParserOptions): Promise<Array<string>> {
		return this.parseSync(val, options);
	}


	/**
	 * Validate and parse the value
	 * @param val String value to parse
	 * @param defaultValue Default value for the time that the value is neither in true nor in false values
	 * @param options Contains both validator and parser options
	 */
	validateAndParseSync(val?: string, defaultValue?: Array<string>, options?: { validatorOptions?: void, parserOptions?: ArrayParserOptions }): Array<string> | undefined {
		return this.validateSync(val, options?.validatorOptions,) ? this.parseSync(val, options?.parserOptions,) : defaultValue;
	}

	/**
	 * Validate and parse the value
	 * @param val String value to parse
	 * @param defaultValue Default value for the time that the value is neither in true nor in false values
	 * @param options Contains both validator and parser options
	 */
	async validateAndParse(val?: string, defaultValue?: Array<string>, options?: { validatorOptions?: void, parserOptions?: ArrayParserOptions }): Promise<Array<string> | undefined> {
		return this.validateAndParseSync(val, defaultValue, options,);
	}
}

export const parser = new Parser();
