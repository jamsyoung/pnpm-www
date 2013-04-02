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

        var contentModel = {};

        // db.getAllPackages(function (content, error) {
        //     if (error) {
        //         console.log(error);
        //     }

        //     res.render('index', {
        //         content: {
        //             totalPackages: content.total_rows
        //         }
        //     });
        // });

        db.getAllPackages(function (content, error) {
            if (error) { console.log(error); }

            contentModel.totalPackages = content.total_rows;

            db.getRecentlyUpdated({ 'limit': 10 }, function (content, error) {
                if (error) { console.log(error); }
                contentModel.recentlyUpdated = content;

                res.render('index', { content: contentModel });
            });
        });
    },



    getRecentlyUpdated: function (req, res) {
        'use strict';

        db.getRecentlyUpdated({ 'limit': 10, include_docs: true, descending: true }, function (content, error) {
            if (error) {
                console.log('ERROR: ' + error);
            }
            res.render('index', { content: content });
        });
    }

};
