var fs = require('fs'),
    SP = require('./pseudoClass');

process.argv.forEach(function (val, index, array) {
  if (array.length < 3 ) console.log('Please provide arguments `node suduku.js yourSolution.txt`')
  if (index < 2 ) return;
  if (index >= 3 ) return;
  contents = fs.readFileSync(val, 'utf8');
  var suduku = new SP(contents)
  var answer = suduku.checkBoard()
  if (answer) {
    console.log("Your Suduku Solution is Correct!")
  } else {
    console.log("Try again!")
  }
});
