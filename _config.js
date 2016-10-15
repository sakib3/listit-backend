var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/listit',
  test: 'mongodb://localhost/listit-test'
};

config.serverPORT = {
  development: '3000',
  test: '3000'
};
module.exports = config;
