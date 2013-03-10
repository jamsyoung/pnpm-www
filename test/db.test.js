/*jslint node: true, nomen: true */
/*globals test, suite, setup */

var chai = require('chai'),
    assert = chai.assert,
    db = require('../lib/db');


suite('db-tests', function () {
    'use strict';

    var db;


    setup(function () {
        db = db.datasourceConnection();
    });


    test('cradle default couchdb host should be set to localhost', function () {
        assert.strictEqual(db.connection.host, 'localhost');
    });


    test('cradle default couchdb port should be set to 5984', function () {
        assert.strictEqual(db.connection.port, 5984);
    });


    test('cradle timeout should be set to 0', function () {
        assert.strictEqual(db.connection.options.timeout, 0);
    });


    test('cradle cache should be set to false', function () {
        assert.strictEqual(db.connection.options.cache, false);
    });


    test('cradle raw should be set to false', function () {
        assert.strictEqual(db.connection.options.raw, false);
    });


    test('cradle default db should be set to external-content-db', function () {
        assert.strictEqual(db.name, 'external-content-db');
    });


    test('cradle db can be set manually', function () {
        var manualDbConnection = db.datasourceConnection({ database: 'external-presenter-db' });
        assert.strictEqual(manualDbConnection.name, 'external-presenter-db');
    });


    test('pull data from a view via key - database: default, include_docs: default', function (done) {
        var uri = '/index.html';

        db.getDataByView({
            key: uri,
            query: 'content/by-uri'
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.strictEqual(content[0].key, uri);
            assert.typeOf(content[0].doc, 'undefined');
            done();
        });
    });


    test('pull data from a view via key - database: default, include_docs: true', function (done) {
        var uri = '/index.html';

        db.getDataByView({
            key: uri,
            query: 'content/by-uri',
            include_docs: true
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.strictEqual(content[0].doc.uri, uri);
            assert.strictEqual(content[0].key, uri);
            assert.typeOf(content[0].doc, 'object');
            done();
        });
    });


    test('pull data from a view via key - database: default, include_docs: false', function (done) {
        var uri = '/index.html';

        db.getDataByView({
            key: uri,
            query: 'content/by-uri',
            include_docs: false
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.strictEqual(content[0].key, uri);
            assert.typeOf(content[0].doc, 'undefined');
            done();
        });
    });


    test('pull data from a view via key - database: external-content-db, include_docs: false', function (done) {
        var uri = '/index.html';

        db.getDataByView({
            key: uri,
            query: 'content/by-uri',
            database: 'external-content-db'
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.strictEqual(content[0].key, uri);
            done();
        });
    });


    test('pull data from a view with no key - database: default, include_docs: default', function (done) {
        db.getDataByView({
            query: 'content/by-uri'
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.notStrictEqual(content.length, 1);
            done();
        });
    });


    test('pull data from a specific document - database: default', function (done) {
        var id = 'section_ada1b18f-bc56-44f1-b22c-9759b87a2a6b';

        db.getDataById({
            id: id
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.strictEqual(content._id, id, 'Requires home-t section in external-content-db');
            done();
        });
    });


    test('pull data from a specific document - database: external-presenter-db', function (done) {
        var id = '/cnn/cnn-global/cfg/build.data/data.json';

        db.getDataById({
            id: id,
            database: 'external-presenter-db'
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.strictEqual(content._id, id, 'Requires build of cnn-global');
            done();
        });
    });


    test('report error when calling a view via key from a database that does not exist', function (done) {
        var uri = '/index.html';

        db.getDataByView({
            key: uri,
            query: 'content/by-uri',
            database: 'foo'
        }, function (content, error) {
            assert.typeOf(error, 'object');
            assert.typeOf(content, 'undefined');
            assert.strictEqual(error.error, 'not_found');
            assert.strictEqual(error.reason, 'no_db_file');
            done();
        });
    });


    test('report error when calling view via a key that does not exist', function (done) {
        db.getDataByView({
            key: 'foo',
            query: 'content/by-uri'
        }, function (content, error) {
            assert.typeOf(error, 'undefined');
            assert.typeOf(content, 'array');
            assert.strictEqual(content.length, 0);
            done();
        });
    });


    test('report error when calling a view that does not exist', function (done) {
        db.getDataByView({
            query: 'content/by-foo'
        }, function (content, error) {
            assert.typeOf(error, 'object');
            assert.typeOf(content, 'undefined');
            assert.strictEqual(error.error, 'not_found');
            assert.strictEqual(error.reason, 'missing_named_view');
            done();
        });
    });


    test('report error when getting a document from a database that does not exist', function (done) {
        db.getDataById({
            id: 'section_ada1b18f-bc56-44f1-b22c-9759b87a2a6b',
            database: 'foo'
        }, function (content, error) {
            assert.typeOf(error, 'object');
            assert.typeOf(content, 'undefined');
            assert.strictEqual(error.error, 'not_found');
            assert.strictEqual(error.reason, 'no_db_file');
            done();
        });
    });


    test('report error when getting a document that does not exist', function (done) {
        db.getDataById({
            id: 'foo'
        }, function (content, error) {
            assert.typeOf(error, 'object');
            assert.typeOf(content, 'undefined');
            assert.strictEqual(error.error, 'not_found');
            assert.strictEqual(error.reason, 'missing');
            done();
        });
    });
});
