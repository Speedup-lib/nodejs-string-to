/**
 * JSON parser
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import { Parser, } from '../../src/parser/json';

const VALID_JSON_STRINGS = [
	'null',
	'{"a": "123", "b": "my-name"}',
	'true',
	'[]',
	'1234',
	'"a-sample-string"'
];

chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][parser][JSON]', () => {

	describe('validate', () => {

		it('should return false on undefined', async () => {

			const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

			expect(parser.validateSync()).to.be.eq(false);
			expect(await parser.validate()).to.be.eq(false);
		});

		it('should return false on empty string', async () => {

			const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

			expect(parser.validateSync('')).to.be.eq(false);
			expect(await parser.validate('')).to.be.eq(false);
		});

		it('should return false on invalid characters', async () => {

			const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

			expect(parser.validateSync('123')).to.be.eq(true);
			expect(await parser.validate('123')).be.eq(true);
		});

		it('should true false on \'.\'', async () => {

			const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

			expect(parser.validateSync('.')).to.be.eq(false);
			expect(await parser.validate('.')).be.eq(false);
		});

		it('should return true for all VALID_JSON_STRINGS', (testDone) => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							try {
								const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

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
						VALID_JSON_STRINGS,
						(n, cb) => {

							const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

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
						VALID_JSON_STRINGS,
						(n, cb) => {

							try {
								const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
								const parsed = parser.parseSync(n);
								expect(parsed).to.be.deep.eq(JSON.parse(n));
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

							parser.parse(n)
								.then(parsed => {

									try {
										expect(parsed).to.be.deep.eq(JSON.parse(n));
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

			const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

			expect(parser.validateAndParseSync()).to.be.eq(undefined);
			expect(await parser.validateAndParse()).to.be.eq(undefined);
		});

		it('should return the value if value is parsable and no defaultValue is passed', testDone => {

			Async.parallel(
				[
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							try {
								const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
								expect(parser.validateAndParseSync(n)).to.be.deep.eq(JSON.parse(n));
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

							parser.validateAndParse(n)
								.then(parsed => {

									try {
										expect(parsed).to.be.deep.eq(JSON.parse(n));
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
						VALID_JSON_STRINGS,
						(n, cb) => {

							try {
								const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
								expect(parser.validateAndParseSync(n, 123456)).to.be.deep.eq(JSON.parse(n));
								expect(parser.validateAndParseSync(n, 123456)).to.be.not.eq(.123456);
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

							parser.validateAndParse(n, .123456)
								.then(parsed => {

									try {
										expect(parsed).to.be.deep.eq(JSON.parse(n));
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
						VALID_JSON_STRINGS,
						(n, cb) => {

							try {
								const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
								expect(parser.validateAndParseSync(undefined, .123456)).to.be.deep.eq(.123456);
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

							parser.validateAndParse(undefined, .123456)
								.then(parsed => {

									try {
										expect(parsed).to.be.deep.eq(.123456);
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
						VALID_JSON_STRINGS,
						(n, cb) => {

							try {
								const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
								expect(parser.validateAndParseSync()).to.be.undefined;
								return cb();
							}
							catch (err) {
								return cb(err);
							}
						},
						taskDone,
					),
					taskDone => Async.forEach(
						VALID_JSON_STRINGS,
						(n, cb) => {

							const parser = new Parser<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any

							parser.validateAndParse()
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
