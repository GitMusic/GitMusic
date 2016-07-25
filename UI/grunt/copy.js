module.exports = {
    html: {
        files: [
            {
                expand: true,
                src: ['index.html', 'views/**'],
                cwd: 'src/',
                dest: "dist/"
            }
        ]
    },
    resources: {
        files: [
            {
                expand: true,
                src: ['resources/**'],
                cwd: 'src/',
                dest: "dist/"
            }
        ]
    }
};
