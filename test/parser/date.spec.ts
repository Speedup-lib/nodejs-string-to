/**
 * Date parser
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import { parser, } from '../../src/parser/date';

const VALID_DATE_STRINGS = [
    'Wednesday, Nov 14, 2018',
    '11/14/2018',
    '11-14-2018 08:36',
    'Nov 14, 8:36 AM',
    'November 2018',
    'Nov 14, 2018',
    'Wed, 14 Nov 2018 08:36:04 +0000',
    '2018-11-14T08:36:04+0000',
];

const NOT_PARSABLE_STRINGS = [
    'null',
    'invalid-date',
    '',
    ' ',
];

const DEFAULT_DATE = new Date('1970-01-01T00:00:00');

chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][parser][date]', () => {

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

        it(`should return true for all valid date strings`, (testDone) => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        VALID_DATE_STRINGS,
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
                        VALID_DATE_STRINGS,
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
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            try {
                                const parsed = parser.parseSync(n);
                                expect(parsed).to.be.a('date');
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            parser.parse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('date');
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
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            try {
                                expect(parser.validateAndParseSync(n)).to.be.a('date');
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('date');
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

        it('should return parsed value if value is parsable and no defaultValue is passed', testDone => {

            Async.parallel(
                [
                    taskDone => Async.forEach(
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            try {
                                const parsed = parser.validateAndParseSync(n);
                                expect(parsed).to.be.a('date');
                                expect(parsed).to.be.greaterThan(DEFAULT_DATE);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            parser.validateAndParse(n)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('date');
                                        expect(parsed).to.be.greaterThan(DEFAULT_DATE);
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
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            try {
                                const parsed = parser.validateAndParseSync(n, DEFAULT_DATE);
                                expect(parsed).to.be.a('date');
                                expect(parsed).to.be.greaterThan(DEFAULT_DATE);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        VALID_DATE_STRINGS,
                        (n, cb) => {

                            parser.validateAndParse(n, DEFAULT_DATE)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('date');
                                        expect(parsed).to.be.greaterThan(DEFAULT_DATE);
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
                        NOT_PARSABLE_STRINGS,
                        (n, cb) => {

                            try {
                                const parsed = parser.validateAndParseSync(n, DEFAULT_DATE);
                                expect(parsed).to.be.a('date');
                                expect(parsed).to.be.eq(DEFAULT_DATE);
                                return cb();
                            }
                            catch (err) {
                                return cb(err);
                            }
                        },
                        taskDone,
                    ),
                    taskDone => Async.forEach(
                        NOT_PARSABLE_STRINGS,
                        (n, cb) => {

                            parser.validateAndParse(n, DEFAULT_DATE)
                                .then(parsed => {

                                    try {
                                        expect(parsed).to.be.a('date');
                                        expect(parsed).to.be.eq(DEFAULT_DATE);
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
                        NOT_PARSABLE_STRINGS,
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
                        NOT_PARSABLE_STRINGS,
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
