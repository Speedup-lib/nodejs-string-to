/**
 * Array parser
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import { parser, } from '../../src/parser/array';

const VALID_ARRAY_STRINGS = [
    ' ',
    '1, 2, 3',
    '1,2,3',
    'ABCD,EFGH,IJKL',
];

const INVALID_ARRAY_ITEMS = [
    undefined,
    '',
];

const DEFAULT_ARRAY = ['1'];

chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][parser][array]', () => {

    describe('validate', () => {

        it('should return false on undefined', async () => {
            expect(parser.validateSync()).to.be.eq(false);
            expect(await parser.validate()).to.be.eq(false);
        });

        it('should return false on empty string', async () => {
            expect(parser.validateSync('')).to.be.eq(false);
            expect(await parser.validate('')).to.be.eq(false);
        });

        it(`should return true for all valid date strings`, (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        VALID_ARRAY_STRINGS,
                        (n, cb) => {

                            try {
                                expect(parser.validateSync(n)).to.be.true;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_ARRAY_STRINGS,
                        (n, cb) => {

                            parser.validate(n)
                                .then(isValid => {

                                    try {
                                        expect(isValid).to.be.true;
                                        return cb();
                                    }
                                    catch (err) {
                                        return cb(err);
                                    }
                                })
                                .catch(cb);
                        },
                        taskDone,
                    ),
                ],
                testDone,
            );
        });
    });

    describe('parse', () => {

        it('should return array representation of the string', (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        VALID_ARRAY_STRINGS,
                        (n, cb) => {

                            try {
                                const parsed = parser.parseSync(n);
                                expect(parsed).to.be.an('array');
                                expect(parsed).length.to.be.greaterThan(0);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_ARRAY_STRINGS,
                        (n, cb) => {

                            parser.parse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.an('array');
                                        expect(parsed).length.to.be.greaterThan(0);
                                        return cb();
                                    }
                                    catch (err) {
                                        return cb(err);
                                    }
                                })
                                .catch(cb);
                        },
                        taskDone,
                    ),
                ],
                testDone,
            );
        });
    });

    describe('validateAndParse', () => {

        it('should return undefined if value is not parsable and no defaultValue is passed', async () => {

            expect(parser.validateAndParseSync()).to.be.eq(undefined);
            expect(await parser.validateAndParse()).to.be.eq(undefined);
        });

        it('should return parsed value if value is parsable and no defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        VALID_ARRAY_STRINGS,
                        (n, cb) => {

                            try {
                                const parsed = parser.validateAndParseSync(n);
                                expect(parsed).to.be.an('array');
                                expect(parsed).length.to.be.greaterThan(0);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_ARRAY_STRINGS,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.an('array');
                                        expect(parsed).length.to.be.greaterThan(0);
                                        return cb();
                                    }
                                    catch (err) {
                                        return cb(err);
                                    }
                                })
                                .catch(cb);
                        },
                        taskDone,
                    ),
                ],
                testDone,
            );
        });

        it('should return the default value if value is not parsable and defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        INVALID_ARRAY_ITEMS,
                        (n, cb) => {

                            try {
                                const parsed = parser.validateAndParseSync(n, DEFAULT_ARRAY);
                                expect(parsed).to.be.an('array');
                                expect(parsed).to.have.length(1);
                                expect(parsed![0]).to.be.a('string').that.is.eq('1');
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        INVALID_ARRAY_ITEMS,
                        (n, cb) => {

                            parser.validateAndParse(n, DEFAULT_ARRAY)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.an('array');
                                        expect(parsed).to.have.length(1);
                                        expect(parsed![0]).to.be.a('string').that.is.eq('1');
                                        return cb();
                                    }
                                    catch (err) {
                                        return cb(err);
                                    }
                                })
                                .catch(cb);
                        },
                        taskDone,
                    ),
                ],
                testDone,
            );
        });

        it('should return the undefined if value is not parsable and no default value is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        INVALID_ARRAY_ITEMS,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n)).to.be.undefined;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        INVALID_ARRAY_ITEMS,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.undefined;
                                        return cb();
                                    }
                                    catch (err) {
                                        return cb(err);
                                    }
                                })
                                .catch(cb);
                        },
                        taskDone,
                    ),
                ],
                testDone,
            );
        });
    });
});
