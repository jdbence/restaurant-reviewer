var Config = {
  dist: './dist',
  src: './src',
  tmp: './.tmp',
  github: {
    context: {
      BASE_URL: 'restaurant-reviewer/dist/'
    }
  },
  production: {
    context: {
      BASE_URL: ''
    }
  }
};

module.exports = Config;