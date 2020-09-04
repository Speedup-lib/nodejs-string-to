/**
 * Parser type
 */

export type Validate = (val: string, options?: any) => Promise<boolean>
export type ValidateSync = (val: string, options?: any) => boolean;

export type Parse<T> = (val: string, defaultValue?: T, options?: any) => Promise<T>;
export type ParseSync<T> = (val: string, defaultValue?: T, options?: any) => T;

export type ParserF<T> = {

    /**
     * Ensure that the value is parsable
     */
    validate: Validate,

    /**
     * Ensure that the value is parsable (Sync mode)
     */
    validateSync: ValidateSync,

    /**
     * Parse a property into type T
     */
    parse: Parse<T>,

    /**
     * Parse a property into type T (Sync mode)
     */
    parseSync: ParseSync<T>,
};

export interface Parser<T> {

    /**
     * Ensure that the value is parsable
     */
    validate: Validate;

    /**
     * Ensure that the value is parsable (Sync mode)
     */
    validateSync: ValidateSync;


    /**
     * Parse a property into type T
     */
    parse: Parse<T>;

    /**
     * Parse a property into type T (Sync mode)
     */
    parseSync: ParseSync<T>;
};
