var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!


var actions = {
  'GET': function(req, res) {
    var parsedUrl = (url.parse(req.url, true)).pathname.slice(1);
    
    // console.log('THIS DIRNAME', __dirname);
    // console.log('HELPER DIR', archive.paths.dir);
    
    var fileData = '';
    // console.log('ACTUAL DATA', __dirname + '/archives/sites.txt');
    
    fs.readFile(archive.paths.list, function(err, data) { // test data
      fileData += data;
      
      var websiteHtml = '';
      if (parsedUrl !== '' && fileData.indexOf(parsedUrl) !== -1) { // file found!!
        // console.log('FILE FOUND!', parsedUrl);
        // read found file -> return its contents
        
      } else { // file not found!!
        // console.log('FILE NOT FOUND!', parsedUrl);
        // var pathname = __dirname + '/public/index.html';
        var pathname = archive.paths.siteAssets + '/index.html';
        fs.readFile(pathname, function(err, data) {
          if (err) {
            // console.log('ERROR', err);
          } else {
            websiteHtml += data;
            // console.log('DATA', websiteHtml);
            res.writeHead(200, helpers.headers);
            res.end(websiteHtml);
          }
        });
      }
    });
  },
  
  'POST': function(req, res) {
    // do something to respond to post
  },
};

exports.handleRequest = function (req, res) {
  
  var action = req.method;
  actions[action](req, res); // calls helpers for GET or POST

};
