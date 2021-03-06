var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //open text file
  //turn that text into something usable - array
  //iterate over array, call cb on each elem
  var data = '';
  fs.readFile(exports.paths.list, 'utf8', function(err, chunk) {
    if (err) {
      console.log(err);
    } else {
      data += chunk;
      data = data.split('\n');
      if (callback) {
        callback(data);
      }
    }
  });
};

exports.isUrlInList = function(url, callback) {
  // read list of urls
  //pass in a callback that asks if url is equal to elem in list
  // if it's found, return true; otherwise at end return false
  
  exports.readListOfUrls(function(listArr) {
    callback(listArr.includes(url));
  });
};

exports.addUrlToList = function(url, callback) {
  // write this url directly to url list file
  var url = url + '\n';
  fs.appendFile(exports.paths.list, url, 'utf8', function(err) {
    if (err) {
      console.log(err);
    } else {
      callback(url);
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  // use readdir to check if our url is a filename in the dir
  
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if (err) {
      console.log(err);
    } else {
      callback(files.includes(url));
    }
  });
};

exports.downloadUrls = function(urls) {
  // worker crap
  urls.forEach(function(url) {
    if (!url) { return; }
    request('http://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });

};










