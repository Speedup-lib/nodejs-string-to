/**
 * Boolean parser
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import { parser, defaultOptions as defaultParserOptions, } from '../../src/parser/bool';

const INVALID_BOOL_STRINGS = [
    'x',
    undefined,
    '',
];

chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][parser][bool]', () => {

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

        it(`should return true for [${defaultParserOptions.trueValues.join(', ')}]`, (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
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
                        defaultParserOptions.trueValues,
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

        it(`should return false for [${defaultParserOptions.falseValues.join(', ')}]`, (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
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
                        defaultParserOptions.falseValues,
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

        it('should return boolean representation of the string', (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
                        (n, cb) => {

                            try {
                                const parsed = parser.parseSync(n);
                                expect(parsed).to.be.a('boolean');
                                expect(parsed).to.be.true;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
                        (n, cb) => {

                            parser.parse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('boolean');
                                        expect(parsed).to.be.true;
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

                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
                        (n, cb) => {

                            try {
                                const parsed = parser.parseSync(n);
                                expect(parsed).to.be.a('boolean');
                                expect(parsed).to.be.false;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
                        (n, cb) => {

                            parser.parse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('boolean');
                                        expect(parsed).to.be.false;
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

        it('should return parsed value (True only) if value is parsable and no defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n)).to.be.true;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.true;
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

        it('should return parsed value (False only) if value is parsable and no defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n)).to.be.false;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.false;
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

        it('should return the value (True only) if value is parsable and defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n, false)).to.be.true
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        defaultParserOptions.trueValues,
                        (n, cb) => {

                            parser.validateAndParse(n, false)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.true;
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

        it('should return the value (False only) if value is parsable and defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n, true)).to.be.false
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        defaultParserOptions.falseValues,
                        (n, cb) => {

                            parser.validateAndParse(n, true)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.false;
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
                        INVALID_BOOL_STRINGS,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n, true)).to.be.true;
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        INVALID_BOOL_STRINGS,
                        (n, cb) => {

                            parser.validateAndParse(n, true)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.true;
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
                        INVALID_BOOL_STRINGS,
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
                        INVALID_BOOL_STRINGS,
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
