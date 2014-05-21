module.exports = function(grunt) {

    grunt.config.set('symlink', {
        media: {
            target: '../../media',
            link: '.tmp/public/media',
            options: {
                overwrite: true,
                force: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-symbolic-link');
};