// Generated by CoffeeScript 1.9.2
(function() {
  var basedir, bigdir, fs, path, smalldir;

  fs = require("fs");

  path = require('path');

  basedir = __dirname + "/../photos";

  basedir = path.resolve(basedir);

  bigdir = basedir + "/big";

  fs.mkdirSync(bigdir);

  smalldir = basedir + "/small";

  fs.mkdirSync(smalldir);

  fs.readdir(basedir, (function(_this) {
    return function(err, filenames) {
      var fileSizeInBytes, fileSizeInKilobytes, fileSizeInMegabytes, filename, filepath, i, len, results;
      results = [];
      for (i = 0, len = filenames.length; i < len; i++) {
        filename = filenames[i];
        filepath = basedir + "/" + filename;
        if (fs.lstatSync(filepath).isDirectory()) {
          continue;
        }
        console.log(filepath);
        fileSizeInBytes = fs.statSync(filepath).size;
        fileSizeInKilobytes = fileSizeInBytes / 1000.0;
        fileSizeInMegabytes = fileSizeInKilobytes / 1000.0;
        console.log(fileSizeInKilobytes);
        if (fileSizeInKilobytes < 100) {
          fs.unlink(filepath);
          continue;
        }
        if (fileSizeInKilobytes > 500) {
          results.push(fs.renameSync(filepath, bigdir + "/" + filename));
        } else {
          results.push(fs.renameSync(filepath, smalldir + "/" + filename));
        }
      }
      return results;
    };
  })(this));

}).call(this);