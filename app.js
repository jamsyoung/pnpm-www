/*jslint node: true, nomen: true, regexp: true */

var http = require('http'),
    dust = require('dustjs-linkedin'),
    routes = require('./routes'),
    express = require('express'),
    consolidate = require('consolidate'),
    app = express();

dust.helper = require('dustjs-helpers');

app.engine('dust', consolidate.dust);

app.configure(function () {
    'use strict';

    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'dust');

    app.use(express.favicon());
    app.use(express.logger('dev'));    // Need to work out details around this
    app.use(express.compress());
    // app.use(express.bodyParser());     // Not using this at this time

    app.use(app.router);
    app.use(express['static'](__dirname + '/public'));

    app.use(express.errorHandler());   // Need to work out details around this
});


/* routes */
app.get('/', routes.getFrontPage);
app.get('/user/:user', routes.getContentByUser);
app.get('/recently-updated', routes.getRecentlyUpdated);


http.createServer(app).listen(app.get('port'), function () {
    'use strict';
    console.log('Express server listening on port ' + app.get('port'));
});
