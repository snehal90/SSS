var mongojs = require( 'mongojs' );

exports.connectToServer = function( callback ) {
    return mongojs( "mongodb://localhost:27017/sss_latest_16_02_17");
};