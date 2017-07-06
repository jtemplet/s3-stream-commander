var AWS = require('aws-sdk');
var S3StreamCommander = require('./index');

var s3 = new AWS.S3();

function example(request, response) {
    var s3StreamCommander = new S3StreamCommander(s3, {
        Bucket: '<BUCKET>',
        Key: '<KEY>'
    }, {downloadChunkSize: 1024 * 1024, concurrentChunks: 7});

    s3StreamCommander.on('data', function (data) {
        response.setHeader('Cache-Control', 'private, max-age=2629800');
        response.setHeader('Content-Type', 'image/jpeg');
        if (this._downloader._metadata) {
            response.setHeader('ETag', this._downloader._metadata.ETag);
            response.setHeader('Last-Modified', this._downloader._metadata.LastModified);
            response.setHeader('Content-Length', this._downloader._metadata.ContentLength);
        }
    }).pipe(response);

    s3StreamCommander.on('end', function () {
        process.exit(0);
    });
}