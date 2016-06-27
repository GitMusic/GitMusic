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
    vendor_fonts: {
        files: [
            {
                expand: true,
                flatten: true,
                src: [
                    'vendor/**/*.otf',
                    'vendor/**/*.eot',
                    'vendor/**/*.svg',
                    'vendor/**/*.ttf',
                    'vendor/**/*.woff',
                    'vendor/**/*.woff2'],
                cwd: 'src/',
                dest: "dist/vendor/fonts"
            }
        ]
    }
};
