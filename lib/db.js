/*jslint node: true */

var cradle = require('cradle'),
    defaultDatabase = 'registry';

cradle.setup({
    host: process.env.COUCHDB_HOST || 'npm.cnn.vgtf.net',
    port: process.env.COUCHDB_PORT || 5984,
    cache: false,
    raw: false
});


module.exports = {
    datasourceConnection: function () {
        'use strict';

        return new (cradle.Connection)().database(defaultDatabase);
    },



    getContentByUser: function (data, callback) {
        'use strict';

        data.user = data.user || '';

        this.getDataByView({
            key: data.user,
            query: 'app/byUser',
            include_docs: true
        }, callback);
    },




    getAllPackages: function (callback) {
        'use strict';

        this.getDatabase(callback);

    },



    getDependedUpon: function (callback) {
        'use strict';

        var viewOptions = {};

        viewOptions.query = 'app/dependedUpon';
        viewOptions.reduce = true;
        viewOptions.group_level = 1;

        this.getDataByView(viewOptions, callback);
    },



    getRecentlyUpdated: function (data, callback) {
        'use strict';

        var viewOptions = {};

        viewOptions.query = 'app/updated';
        viewOptions.limit = data.limit || 10;
        viewOptions.include_docs = data.include_docs || false;
        viewOptions.descending = data.descending || false;

        this.getDataByView(viewOptions, callback);
    },


/*****************************************************************************/


    getDatabase: function (callback) {
        'use strict';

        var datasource = this.datasourceConnection();

        datasource.all(function (error, content) {
            if (error) { callback(undefined, error); }

            if (content) { callback(content); }
        });
    },




    /*
     * getDateByView(data, callback)
     *
     * data - object
     *     - data.query - required
     *     - data.key - optional - defaults to undefined
     *     - data.database - optional - defaults to external-content-db
     *     - data.include_docs - optional - defaults to undefined, which defaults to false in cradle
     *
     * callback - function - required
     */
    getDataByView: function (data, callback) {
        'use strict';

        if (data && data.query) {
            var datasource = this.datasourceConnection(),
                viewOptions = {};

            if (data.key) { viewOptions.key = data.key; }
            if (data.keys) { viewOptions.keys = data.keys; }
            if (data.include_docs) { viewOptions.include_docs = data.include_docs; }
            if (data.limit) { viewOptions.limit = data.limit; }
            if (data.descending) { viewOptions.descending = data.descending; }
            if (data.reduce) { viewOptions.reduce = data.reduce; }
            if (data.group_level) { viewOptions.group_level = data.group_level; }

            datasource.view(data.query, viewOptions, function (error, content) {
                if (error) { callback(undefined, error); }

                if (content) { callback(content); }
            });
        }
    },




    /*
     * getDataById(data, callback)
     *
     * data - object - required
     *     - data.id - required
     *     - data.database - optional - defaults to external-content-db
     *
     * callback - function - required
     */
    getDataById: function (data, callback) {
        'use strict';

        if (data && data.id) {
            var datasource = this.datasourceConnection();

            datasource.get(data.id, function (error, content) {
                if (error) { callback(undefined, error); }

                if (content) { callback(content); }
            });
        }
    }
};
