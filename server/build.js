const webpack = require('webpack'), config = require('../webpack.config.prod');

/*eslint-disable no-console*/
/** set NODE_ENV to production for webpack*/
process.env.NODE_ENV = 'production';
console.log('Generating min files....');
webpack(config).run((err, stats) => {
  if (err) {
    console.log(err);
    return 1;
  }

  const jsonStats = stats.toJson();

  /** log errors and warning from webpack to terminal*/
  if (jsonStats.hasErrors) {
    console.log('Webpack generated the following errors: ');
    return jsonStats.errors.map(error => console.log(error));
  }

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(warning => console.log(warning));

    console.log(`Webpack Stats: ${stats}`);

    console.log('Compilation Complete');
    return 0;
  }
});