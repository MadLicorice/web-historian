var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!

exports.sendResponse = function(res, statusCode, message) {
  res.writeHead(statusCode, helpers.headers);
  res.end(message);
}; 

exports.readAndSendFile = function(pathname, res, statusCode) {
  var websiteHtml = '';
  fs.readFile(pathname, 'utf8', function(err, chunk) {
    websiteHtml += chunk;
    exports.sendResponse(res, statusCode, websiteHtml);
  });
};

exports.collectData = function() {
};

var actions = {
  'GET': function(req, res) {
    var parsedUrl = url.parse(req.url, true).pathname.slice(1);

    if (parsedUrl === '') {
      exports.readAndSendFile(archive.paths.siteAssets + '/index.html', res, 200);
    } else if (parsedUrl === ('styles.css' || 'favicon.ico')) {
      exports.readAndSendFile(archive.paths.siteAssets + '/index.html', res, 200);
    } else {
      archive.isUrlArchived(parsedUrl, function(bool) {
        if (bool) { 
          exports.readAndSendFile(archive.paths.archivedSites + '/' + parsedUrl, res, 200);
        } else {
          exports.sendResponse(res, 404, 'Not found');
        }
      });
    }
    
  },
  
  'POST': function(req, res) {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    }).on('end', () => {
      var url = data.slice(4);
      archive.isUrlArchived(url, function(bool) {
        if (bool) { 
          exports.readAndSendFile(archive.paths.archivedSites + '/' + url, res, 302);
        } else {
          exports.readAndSendFile(archive.paths.siteAssets + '/loading.html', res, 302);
        }
      });
    });
  }
};

exports.handleRequest = function (req, res) { 
  var action = req.method;
  actions[action](req, res); // calls helpers for GET or POST
};
