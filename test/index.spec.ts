/**
 * Module tests
 */

import 'mocha';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import Async from 'async';

import * as mdl from '../src';

const PARSABLE_VALUES = {
    '.12312312': 'number',
    '123123123': 'number',
    'yes': 'boolean',
    'this is a string': 'string',
    'November 2018': Date,
};


const ORIGINAL_D1_ARRAY = [
    '123456',
    '0.123456',
    'yes',
    'November 2018',
    null,
    undefined,
];

const EXPECTED_D1_ARRAY = [
    123456,
    0.123456,
    true,
    new Date('November 2018'),
    null,
    undefined,
];


const ORIGINAL_DN_ARRAY = [

    '123456',
    '0.123456',
    'yes',
    'November 2018',
    null,
    undefined,

    [
        '123456',
        '0.123456',
        'yes',
        'November 2018',
        null,
        undefined,

        [
            '123456',
            '0.123456',
            'yes',
            'November 2018',
            null,
            undefined,

            [
                '123456',
                '0.123456',
                'yes',
                'November 2018',
                null,
                undefined,
            ]
        ]
    ]
];

const EXPECTED_DN_ARRAY = [

    123456,
    0.123456,
    true,
    new Date('November 2018'),
    null,
    undefined,

    [
        123456,
        0.123456,
        true,
        new Date('November 2018'),
        null,
        undefined,

        [
            123456,
            0.123456,
            true,
            new Date('November 2018'),
            null,
            undefined,

            [
                123456,
                0.123456,
                true,
                new Date('November 2018'),
                null,
                undefined,
            ]
        ]
    ]
];


const ORIGINAL_D1_OBJECT = {
    name: 'John Doe',
    age: '35',
    birthday: 'November 1985',
    married: 'yes',
};

const EXPECTED_D1_OBJECT = {

    name: 'John Doe',
    age: 35,
    birthday: new Date('November 1985'),
    married: true,
};

const ORIGINAL_DN_OBJECT = {

    name: 'John Doe',
    age: '35',
    birthday: 'November 1985',
    married: 'yes',

    profile: {

        socialNetworks: {
            facebook: {
                url: '/unique-id',
                joinDate: 'November 2010',

                friends: [
                    {
                        name: 'John Doe',
                        age: '35',
                        birthday: 'November 1985',
                        married: 'yes',
                    },
                    {
                        name: 'John Doe',
                        age: '35',
                        birthday: 'November 1985',
                        married: 'yes',
                    },
                    {
                        name: 'John Doe',
                        age: '35',
                        birthday: 'November 1985',
                        married: 'yes',
                    },
                ]
            },
            google: {
                url: '/unique-id',
                joinDate: 'November 2010',

                friends: [
                    {
                        name: 'John Doe',
                        age: '35',
                        birthday: 'November 1985',
                        married: 'yes',
                    },
                    {
                        name: 'John Doe',
                        age: '35',
                        birthday: 'November 1985',
                        married: 'yes',
                    },
                    {
                        name: 'John Doe',
                        age: '35',
                        birthday: 'November 1985',
                        married: 'yes',
                    },
                ]
            },
        }
    },

    friends: [
        {
            name: 'John Doe',
            age: '35',
            birthday: 'November 1985',
            married: 'yes',

            profile: {

                socialNetworks: {
                    facebook: {
                        url: '/unique-id',
                        joinDate: 'November 2010',

                        friends: [
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                        ]
                    },
                    google: {
                        url: '/unique-id',
                        joinDate: 'November 2010',

                        friends: [
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                        ]
                    },
                }
            },

            friends: [
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
            ]
        },
        {
            name: 'John Doe',
            age: '35',
            birthday: 'November 1985',
            married: 'yes',

            profile: {

                socialNetworks: {
                    facebook: {
                        url: '/unique-id',
                        joinDate: 'November 2010',

                        friends: [
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                        ]
                    },
                    google: {
                        url: '/unique-id',
                        joinDate: 'November 2010',

                        friends: [
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                        ]
                    },
                }
            },

            friends: [
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
            ]
        },
        {
            name: 'John Doe',
            age: '35',
            birthday: 'November 1985',
            married: 'yes',

            profile: {

                socialNetworks: {
                    facebook: {
                        url: '/unique-id',
                        joinDate: 'November 2010',

                        friends: [
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                        ]
                    },
                    google: {
                        url: '/unique-id',
                        joinDate: 'November 2010',

                        friends: [
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                            {
                                name: 'John Doe',
                                age: '35',
                                birthday: 'November 1985',
                                married: 'yes',
                            },
                        ]
                    },
                }
            },

            friends: [
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
                {
                    name: 'John Doe',
                    age: '35',
                    birthday: 'November 1985',
                    married: 'yes',
                },
            ]
        }
    ],
};

const EXPECTED_DN_OBJECT = {

    name: 'John Doe',
    age: 35,
    birthday: new Date('November 1985'),
    married: true,

    profile: {

        socialNetworks: {
            facebook: {
                url: '/unique-id',
                joinDate: new Date('November 2010'),

                friends: [
                    {
                        name: 'John Doe',
                        age: 35,
                        birthday: new Date('November 1985'),
                        married: true,
                    },
                    {
                        name: 'John Doe',
                        age: 35,
                        birthday: new Date('November 1985'),
                        married: true,
                    },
                    {
                        name: 'John Doe',
                        age: 35,
                        birthday: new Date('November 1985'),
                        married: true,
                    },
                ]
            },
            google: {
                url: '/unique-id',
                joinDate: new Date('November 2010'),

                friends: [
                    {
                        name: 'John Doe',
                        age: 35,
                        birthday: new Date('November 1985'),
                        married: true,
                    },
                    {
                        name: 'John Doe',
                        age: 35,
                        birthday: new Date('November 1985'),
                        married: true,
                    },
                    {
                        name: 'John Doe',
                        age: 35,
                        birthday: new Date('November 1985'),
                        married: true,
                    },
                ]
            },
        }
    },

    friends: [
        {
            name: 'John Doe',
            age: 35,
            birthday: new Date('November 1985'),
            married: true,

            profile: {

                socialNetworks: {
                    facebook: {
                        url: '/unique-id',
                        joinDate: new Date('November 2010'),

                        friends: [
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                        ]
                    },
                    google: {
                        url: '/unique-id',
                        joinDate: new Date('November 2010'),

                        friends: [
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                        ]
                    },
                }
            },

            friends: [
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
            ]
        },
        {
            name: 'John Doe',
            age: 35,
            birthday: new Date('November 1985'),
            married: true,

            profile: {

                socialNetworks: {
                    facebook: {
                        url: '/unique-id',
                        joinDate: new Date('November 2010'),

                        friends: [
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                        ]
                    },
                    google: {
                        url: '/unique-id',
                        joinDate: new Date('November 2010'),

                        friends: [
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                        ]
                    },
                }
            },

            friends: [
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
            ]
        },
        {
            name: 'John Doe',
            age: 35,
            birthday: new Date('November 1985'),
            married: true,

            profile: {

                socialNetworks: {
                    facebook: {
                        url: '/unique-id',
                        joinDate: new Date('November 2010'),

                        friends: [
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                        ]
                    },
                    google: {
                        url: '/unique-id',
                        joinDate: new Date('November 2010'),

                        friends: [
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                            {
                                name: 'John Doe',
                                age: 35,
                                birthday: new Date('November 1985'),
                                married: true,
                            },
                        ]
                    },
                }
            },

            friends: [
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
                {
                    name: 'John Doe',
                    age: 35,
                    birthday: new Date('November 1985'),
                    married: true,
                },
            ]
        }
    ],
};


chai.use(chaiAsPromised);

describe('[SpeedUP][string-to][module]', () => {

    describe('tryAnyToPrimitive', () => {

        it('should successfully parse primitive types to their values', () => {

            Object
                .keys(PARSABLE_VALUES)
                .map(n => {

                    const result = mdl.tryAnyToPrimitive(n);
                    const isObject = typeof result === 'object';

                    if (isObject) { expect(result).to.be.instanceOf((PARSABLE_VALUES as any)[n]); }
                    else { expect(result).to.be.a((PARSABLE_VALUES as any)[n]); }
                });

            [undefined, null, '']
                .map(n => {

                    const result = mdl.tryAnyToPrimitive(n);
                    const isUndefined = typeof result === 'undefined';
                    const isNull = result === null;

                    if (isUndefined) { expect(result).to.be.undefined; }
                    if (isNull) { expect(result).to.be.null; }

                    if (!isUndefined && !isNull) { expect(result).to.be.a('string'); }
                });
        });
    });

    describe('parseArrayItems', () => {

        it('should parse all array items (depth = 1 / flat array)', (testDone) => {

            Async.parallel(
                [
                    taskDone => {

                        try {

                            const result = mdl.parseArrayItemsSync(ORIGINAL_D1_ARRAY);
                            expect(result).to.be.deep.eq(EXPECTED_D1_ARRAY);

                            return taskDone();
                        }
                        catch (err) {
                            return taskDone(err);
                        }
                    },

                    taskDone => mdl.parseArrayItems(ORIGINAL_D1_ARRAY)
                        .then(result => {

                            try {
                                expect(result).to.be.deep.eq(EXPECTED_D1_ARRAY);

                                return taskDone();
                            }
                            catch (err) {
                                return taskDone(err);
                            }
                        })
                        .catch(taskDone)
                ],
                testDone,
            );
        });

        it('should parse all array items (depth = n / nested array)', (testDone) => {

            Async.parallel(
                [
                    taskDone => {

                        try {

                            const result = mdl.parseArrayItemsSync(ORIGINAL_DN_ARRAY);
                            expect(result).to.be.deep.eq(EXPECTED_DN_ARRAY);

                            return taskDone();
                        }
                        catch (err) {
                            return taskDone(err);
                        }
                    },

                    taskDone => mdl.parseArrayItems(ORIGINAL_DN_ARRAY)
                        .then(result => {

                            try {
                                expect(result).to.be.deep.eq(EXPECTED_DN_ARRAY);

                                return taskDone();
                            }
                            catch (err) {
                                return taskDone(err);
                            }
                        })
                        .catch(taskDone)
                ],
                testDone,
            );
        });
    });

    describe('parseObjectKeys', () => {

        it('should parse all object keys (depth = 1 / flat object)', (testDone) => {

            Async.parallel(
                [
                    taskDone => {

                        try {

                            const result = mdl.parseObjectKeysSync(ORIGINAL_D1_OBJECT);
                            expect(result).to.be.deep.eq(EXPECTED_D1_OBJECT);

                            return taskDone();
                        }
                        catch (err) {
                            return taskDone(err);
                        }
                    },

                    taskDone => mdl.parseObjectKeys(ORIGINAL_D1_OBJECT)
                        .then(result => {

                            try {
                                expect(result).to.be.deep.eq(EXPECTED_D1_OBJECT);

                                return taskDone();
                            }
                            catch (err) {
                                return taskDone(err);
                            }
                        })
                        .catch(taskDone)
                ],
                testDone,
            );
        });

        it('should parse all object keys (depth = n / nested object)', (testDone) => {

            Async.parallel(
                [
                    taskDone => {

                        try {

                            const result = mdl.parseObjectKeysSync(ORIGINAL_DN_OBJECT);
                            expect(result).to.be.deep.eq(EXPECTED_DN_OBJECT);

                            return taskDone();
                        }
                        catch (err) {
                            return taskDone(err);
                        }
                    },

                    taskDone => mdl.parseObjectKeys(ORIGINAL_DN_OBJECT)
                        .then(result => {

                            try {
                                expect(result).to.be.deep.eq(EXPECTED_DN_OBJECT);

                                return taskDone();
                            }
                            catch (err) {
                                return taskDone(err);
                            }
                        })
                        .catch(taskDone)
                ],
                testDone,
            );
        });
    });
});
