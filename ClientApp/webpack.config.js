module.exports = () => {
  const config = {
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules\/(?!(three)\/)\/**\/**\/.*/,
          loader: 'babel-loader',
        },
      ],
    }
  };

  return config;
};