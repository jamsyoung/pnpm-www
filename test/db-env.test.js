/*jslint node: true */
/*globals test, suite, setup */

var chai = require('chai'),
    assert = chai.assert,
    db = require('../lib/db');

/* if environment variables are set, run the tests to insure they are read correctly */
if (process.env.COUCHDB_HOST !== undefined && process.env.COUCHDB_PORT !== undefined) {
    suite('db-environment-tests', function () {
        'use strict';

        var db;

        setup(function () {
            db = db.datasourceConnection();
        });

        test('couchdb host should be settable by the COUCHDB_HOST environment variable', function () {
            assert.notEqual(process.env.COUCHDB_HOST, undefined);
        });

        test('couchdb port should be settable by the COUCHDB_PORT environment variable', function () {
            assert.notEqual(process.env.COUCHDB_PORT, undefined);
        });
    });
}
