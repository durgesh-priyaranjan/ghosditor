/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var uuid = require('node-uuid'),
    im = require('imagemagick');

module.exports = {


    imageUpload: function(req, res) {

        var imgName = uuid.v1(),
            relativePath = './media/' + imgName + ".png",
            absolutePath = __dirname + '/../../media/' + imgName + ".png";

        return req.file('file').upload(relativePath, function onUploadComplete(err, uploadedFiles) {

            im.convert([ absolutePath, '-resize', '600', absolutePath],
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