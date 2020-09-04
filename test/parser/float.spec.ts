/**
 * float parser
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import { parser, } from '../../src/parser/float';

const NUMBERS = [
    '.12312312',
    '0.12399123',
    '1323123123123.8',
    '3424342342.',
    '.0',
    '0.',
];

const INVALID_NUMBERS = [
    '',
    'NaN',
    '123i',
    ' ',
];


chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][parser][float]', () => {

    describe('validate', () => {

        it('should return false on undefined', async () => {
            expect(parser.validateSync()).to.be.eq(false);
            expect(await parser.validate()).to.be.eq(false);
        });

        it('should return false on empty string', async () => {
            expect(parser.validateSync('')).to.be.eq(false);
            expect(await parser.validate('')).to.be.eq(false);
        });

        it('should return false on invalid characters', async () => {
            expect(parser.validateSync('123i')).to.be.eq(false);
            expect(await parser.validate('123i')).be.eq(false);
        });

        it('should return false on \'.\'', async () => {
            expect(parser.validateSync('.')).to.be.eq(false);
            expect(await parser.validate('.')).be.eq(false);
        });

        it(`should return true for [${NUMBERS.join(', ')}]`, (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            try {
                                expect(parser.validateSync(n)).to.be.eq(true);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            parser.validate(n)
                                .then(isValid => {

                                    try {
                                        expect(isValid).to.be.eq(true);
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

        it('should return float representation of the string', (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            try {
                                const parsed = parser.parseSync(n);
                                expect(parsed).to.be.a('number');
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            parser.parse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('number');
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

        it('should return the value if value is parsable and no defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n)).to.be.eq(parseFloat(n));
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.eq(parseFloat(n));
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

        it('should return the value if value is parsable and defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n, .123456)).to.be.eq(parseFloat(n));
                                expect(parser.validateAndParseSync(n, .123456)).to.be.not.eq(.123456);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        NUMBERS,
                        (n, cb) => {

                            parser.validateAndParse(n, .123456)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.eq(parseFloat(n));
                                        expect(parsed).to.be.not.eq(.123456);
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
                        INVALID_NUMBERS,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n, .123456)).to.be.eq(.123456);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        INVALID_NUMBERS,
                        (n, cb) => {

                            parser.validateAndParse(n, .123456)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.eq(.123456);
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
                        INVALID_NUMBERS,
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
                        INVALID_NUMBERS,
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
