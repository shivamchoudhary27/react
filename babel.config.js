module.exports = {
    generatorOpts: {
        minify: {
          // Adjust the size limit as needed (in bytes)
          maxFileSize: 1000000, // 1 MB
        },
      },
    presets: [
      // your presets here
    ],
    plugins: [
      '@babel/plugin-proposal-private-property-in-object'
      // other plugins here
    ]
  };