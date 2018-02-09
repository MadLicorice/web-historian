// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var request = require('request');
var fs = require('fs');

//Users/student/code/hrsf90-web-historian/workers/htmlfetcher.js
// */1 * * * */Users/student/code/hrsf90-web-historian/workers/htmlfetcher.js -update -config=myconfig

archive.readListOfUrls(archive.downloadUrls);

// exports.doWork = function() {
//   console.log('inside do work');
//   var urlsToFetch = [];
//   console.log(__dirname);
    
    
  
// urlArr.forEach(function(elem) {
//   // console.log('url is', elem);
//   archive.isUrlArchived(elem, function(bool) {
//     // console.log('in archived func');
//     // console.log('bool is', bool, 'and url is', elem);
//     if (!bool) {
//       //urlsToFetch.push(elem);
//       request('http://' + elem).pipe(fs.createWriteStream(archive.paths.archivedSites + '/' + elem));
//     }
//   });    
// });
//console.log('*************8');
// console.log(urlsToFetch);                   
//archive.downloadUrls(urlsToFetch);
// });
  

// };