const cheerio = require('cheerio'), fs = require('fs');

/** read html file*/
fs.readFile('src/index.html', 'utf8', (err, markup) => {
  /** load the html to cheerio*/
  const $ = cheerio.load(markup);
  /** add stylesheet to output html*/
  $('head').prepend('\n<link rel="stylesheet" href="index.css">\n');
  /** write output to dist folder*/
  fs.writeFile('dist/index.html', $.html(), 'utf8');
});