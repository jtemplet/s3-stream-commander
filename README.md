# s3-stream-commander
  
Multipart streaming download utility for S3. Note: Forked from s3-stream-download, added bubbling up of errors and uses 
 s3.headObject/getObject to be more performant.

## Features

## Installation

``` bash
  $ npm install s3-stream-commander --save
```

## Usage

```js
var AWS = require('aws-sdk');
var S3StreamCommander = require('./index');
var fs = require('fs');

var s3 = new AWS.S3();

var s3StreamCommander = new S3StreamCommander(s3, {Bucket: '<BUCKET>', Key:'<KEY>'});

s3StreamCommander.pipe(fs.createWriteStream('<FILENAME>'));

s3StreamCommander.on('end', function() {
    process.exit(0);
});
```

## Documentation

### new S3StreamCommander(s3, s3Params, options)

Creates a new instance of a multipart download stream.  This is a readable stream that can be
piped into other streams.

__Arguments__

* `s3` - Configured aws-sdk s3 instance.  Should be preconfigured with any credentials.
* `s3Params` - Params object that would normally be passed to s3.getObject()
* `options` - Options
    - `downloadChunkSize` - Size of each chunk in bytes.  Defaults to 5MB.
    - `concurrentChunks` - Number of chunks to download concurrently. Defaults to 5.
    - `retries` - How many times a failed chunk should be retried before failing the entire download. Retries will exponentially backoff to allow for recovery.  Defaults to 5.



## People

The original author is [Chris Kinsman](https://github.com/chriskinsman)


## License

  [MIT](LICENSE)

