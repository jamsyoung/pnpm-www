/*jslint node:true */

var db = require('../lib/db');



module.exports = {
    getContentByUser: function (req, res) {
        'use strict';

        db.getContentByUser({ 'user': req.params.user }, function (content, error) {
            if (error) { console.log('error handler here'); }
            res.render('index', { content: content });
        });
    },



    getFrontPage: function (req, res) {
        'use strict';

        var contentModel = {};

        /* get all package metadata */
        db.getAllPackages(function (content, error) {
            if (error) { console.log(error); }

            contentModel.totalPackages = content.total_rows;

            /* get recently updated */
            db.getRecentlyUpdated({ 'limit': 10, descending: true }, function (content, error) {
                if (error) { console.log(error); }

                contentModel.recentlyUpdated = content;

                /* get most depended upon */
                db.getDependedUpon(function (content, error) {
                    var sortedContent = [],
                        limit = 10,
                        i;

                    if (error) { console.log(error); }

                    /* sort content response by value */
                    // for (i in content) {
                    //     if (content.hasOwnProperty(i)) {
                    //         sortedContent.push(content[i]);
                    //     }
                    // }
                    // sortedContent = sortedContent.sort(function (x, y) { return y.value - x.value; });
                    sortedContent = content.sort(function (x, y) { return y.value - x.value; });

                    /* add the top limit items to the content model */
                    contentModel.dependedUpon = sortedContent.splice(0, limit);

                    /* render template */
                    res.render('index', { content: contentModel });
                });
            });
        });
    },



    getPackage: function (req, res) {
        'use strict';

    }
};
