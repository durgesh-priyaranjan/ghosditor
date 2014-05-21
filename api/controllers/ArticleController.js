/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid'),
    timeplan = require('timeplan'),
    im = require('imagemagick');

var exec = require( 'child_process' ).exec;
var path = __dirname + '/../../media';


timeplan.repeat({
    period: "10m",
    task: function() {
        exec( 'rm -r ' + path, function ( err, stdout, stderr ){
        });
    }
});


module.exports = {


    imageUpload: function(req, res) {

        var imgName = uuid.v1(),
            relativePath = './media/' + imgName + ".png",
            absolutePath = __dirname + '/../../media/' + imgName + ".png";

        return req.file('file').upload(relativePath, function onUploadComplete(err, uploadedFiles) {

            im.convert([absolutePath, '-resize', '600', absolutePath],
                function(err, stdout) {
                    if (err) throw err;

                    res.json({
                        type: "success",
                        id: imgName,
                        path: "/media/" + imgName + ".png"
                    });
                });
        });
    }
};