/**
 * Number parser
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import { parser, } from '../../src/parser/number';

const FLOAT_NUMBERS = [
	'.12312312',
	'0.12399123',
	'1323123123123.8',
	'.0',
	'0.',
];

const INT_NUMBERS = [
	'12312312',
	'012399123',
	'13231231231238',
	'3424342342',
];

const HEX_NUMBERS = {
	'1EF': 495,
	'ffdd': 65501,
	'1234': 4660,
	'a': 10,
};

const INVALID_NUMBERS = [
	'',
	'NaN',
	'123i',
	' ',
];


chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][parser][number]', () => {

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

		it(`should return true for all numbers: [${[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)].join(', ')}]`, (testDone) => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)],
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
						[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)],
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

		it(`should return false for all invalid numbers: [${INVALID_NUMBERS.join(', ')}]`, (testDone) => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						INVALID_NUMBERS,
						(n, cb) => {

							try {
								expect(parser.validateSync(n)).to.be.eq(false);
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

							parser.validate(n)
								.then(isValid => {

									try {
										expect(isValid).to.be.eq(false);
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

		it('should return float representation of the decimal string', (testDone) => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						INT_NUMBERS,
						(n, cb) => {

							try {
								const parsed = parser.parseSync(n);
								expect(parsed).to.be.a('number');
								expect(Number.isInteger(parsed)).to.be.true;
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						INT_NUMBERS,
						(n, cb) => {

							parser.parse(n)
								.then(parsed => {

									try {
										expect(parsed).to.be.a('number');
										expect(Number.isInteger(parsed)).to.be.true;
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

		it('should return int representation of the hexadecimal string', (testDone) => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						Object.keys(HEX_NUMBERS),
						(n, cb) => {

							try {
								const parsed = parser.parseSync(n, { intParseOptions: 16 });
								expect(parsed).to.be.a('number');
								expect(Number.isInteger(parsed)).to.be.true;
								expect(parsed).to.be.eq((HEX_NUMBERS as any)[n]); // eslint-disable-line @typescript-eslint/no-explicit-any
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						Object.keys(HEX_NUMBERS),
						(n, cb) => {

							parser.parse(n, { intParseOptions: 16 })
								.then(parsed => {

									try {
										expect(parsed).to.be.a('number');
										expect(Number.isInteger(parsed)).to.be.true;
										expect(parsed).to.be.eq((HEX_NUMBERS as any)[n]); // eslint-disable-line @typescript-eslint/no-explicit-any
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

		it('should return float representation of the string', (testDone) => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						FLOAT_NUMBERS,
						(n, cb) => {

							try {
								const parsed = parser.parseSync(n);
								expect(parsed).to.be.a('number');

								const isValidFloat = parsed === 0 ? true : !Number.isInteger(parsed);
								expect(isValidFloat).to.be.true;
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						FLOAT_NUMBERS,
						(n, cb) => {

							parser.parse(n)
								.then(parsed => {

									try {
										expect(parsed).to.be.a('number');

										const isValidFloat = parsed === 0 ? true : !Number.isInteger(parsed);
										expect(isValidFloat).to.be.true;
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
						[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)],
						(n, cb) => {

							try {
								expect(parser.validateAndParseSync(n)).to.be.a('number');
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)],
						(n, cb) => {

							parser.validateAndParse(n)
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

		it('should return the value if value is parsable and defaultValue is passed', testDone => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)],
						(n, cb) => {

							try {
								expect(parser.validateAndParseSync(n, .123456)).to.be.a('number');
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
						[...INT_NUMBERS, ...FLOAT_NUMBERS, ...Object.keys(HEX_NUMBERS)],
						(n, cb) => {

							parser.validateAndParse(n, .123456)
								.then(parsed => {

									try {
										expect(parsed).to.be.a('number');
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
