module.exports = {
	dist: {
        options: {
            strip: true
        },
        files: [
            {
                expand: true,
                cwd: 'src/',
                src: ['*.html'],
                dest: 'dist/',
                ext: '.html',
                extDot: 'first'
            },
            {
                expand: true,
                cwd: 'src/templates/',
                src: ['*.html', '**/*.html'],
                dest: 'dist/templates/',
                ext: '.html',
                extDot: 'first'
            }
        ]
  }
};