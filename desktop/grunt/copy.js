module.exports = {
    resources: {
        files: [
            {
                expand: true,
                src: ['resources/**'],
                cwd: 'src/',
                dest: "dist/"
            }
        ]
    },
    vendor: {
        files: [
            {
                expand: true,
                src: ['vendor/**'],
                cwd: 'src/',
                dest: "dist/"
            }
        ]
    }
};
