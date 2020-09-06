/**
 * Parser type
 */

export type ValidateSync = (val?: string, options?: any) => boolean; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Validate = (val?: string, options?: any) => Promise<boolean>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type ParseSync<T> = (val?: string, options?: any) => T; // eslint-disable-line @typescript-eslint/no-explicit-any
export type Parse<T> = (val?: string, options?: any) => Promise<T>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type validateAndParseSync<T> = (val?: string, defaultValue?: T | undefined, options?: { validatorOptions?: any, parserOptions?: any }) => T | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
export type validateAndParse<T> = (val?: string, defaultValue?: T | undefined, options?: { validatorOptions?: any, parserOptions?: any }) => Promise<T | undefined>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type ParserF<T> = {

	/**
	 * Ensure that the value is parsable (Sync mode)
	 */
	validateSync: ValidateSync,

	/**
	 * Ensure that the value is parsable
	 */
	validate: Validate,


	/**
	 * Parse a property into type T (Sync mode)
	 */
	parseSync: ParseSync<T>,

	/**
	 * Parse a property into type T
	 */
	parse: Parse<T>,


	/**
	 * Validate and parse
	 */
	validateAndParseSync: validateAndParseSync<T>;

	/**
	 * Validate and parse
	 */
	validateAndParse: validateAndParse<T>;
};

export interface Parser<T> {

	/**
	 * Ensure that the value is parsable (Sync mode)
	 */
	validateSync: ValidateSync;

	/**
	 * Ensure that the value is parsable
	 */
	validate: Validate;


	/**
	 * Parse a property into type T (Sync mode)
	 */
	parseSync: ParseSync<T>;

	/**
	 * Parse a property into type T
	 */
	parse: Parse<T>;


	/**
	 * Validate and parse
	 */
	validateAndParseSync: validateAndParseSync<T>;

	/**
	 * Validate and parse
	 */
	validateAndParse: validateAndParse<T>;
}
