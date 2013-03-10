/*jslint node:true */

var db = require('../lib/db');



module.exports = {
    getContentByUser: function (req, res) {
        'use strict';

        db.getContentByUser({ 'user': req.params.user }, function (content, error) {
            if (error) {
                console.log('error handler here');
            }
            res.render('index', { content: content });
        });
    },

    getFrontPage: function (req, res) {
        'use strict';

        db.getAllPackages(function (content, error) {
            if (error) {
                console.log(error);
            }

            res.render('index', {
                content: {
                    totalPackages: content.total_rows
                }
            });
        });
    },

    getRecentlyUpdated: function (req, res) {
        'use strict';

        db.getRecentlyUpdated({ 'limit': 10, showDetails: false }, function (content, error) {
            if (error) {
                console.log(error);
            }
            res.render('index', { content: content });
        });
    }

};
