var _ = require('underscore');

var SudukuPlus = function(contents) {
  this.sudukuSolution = contents,
  this.solutionMatrix = [],
  this.squareGroups = {},
  this.sideLength;
};

SudukuPlus.prototype.formatSolution = function(solutionStr){
  var lineSplit = this.sudukuSolution.split('\n');
  for (var i = 0; i < lineSplit.length; i++) {
    if (lineSplit[i].length === 0) continue;
    this.solutionMatrix.push(lineSplit[i].split(","));
  };
  this.sideLength = this.solutionMatrix[0].length;
};

SudukuPlus.prototype.isValidSet = function(set){
    return set.length === this.solutionMatrix.length && set.length === _.uniq(set).length;
};

SudukuPlus.prototype.isValidRows = function(matrix){
  for (var i = 0; i < this.solutionMatrix.length; i++) {
    if (!this.isValidSet(matrix[i])) return false;
  };
  return true
};

SudukuPlus.prototype.isValidBoard = function(matrix){
 var length = Math.sqrt(this.solutionMatrix.length);
 return Math.floor(length) === Math.ceil(length);
};

SudukuPlus.prototype.isValidColumns = function(matrix){
  for (var col = 0; col < matrix.length; col++){
    var columnArray = [];
    for (var row = 0; row < matrix[col].length; row++) {
      columnArray.push(matrix[row][col]);
    }
    if (!this.isValidSet(columnArray)){
      return false;
    }
  }
  return true;
}

SudukuPlus.prototype.buckets = function(el, i, j){
  var bucket =  "" + Math.floor(i / Math.sqrt(this.sideLength)) + Math.floor(j / Math.sqrt(this.sideLength));
  this.squareGroups[bucket] =  this.squareGroups[bucket] || [];
  this.squareGroups[bucket].push(el);
};

SudukuPlus.prototype.getSquares = function(solutionMatrix){
  var that = this;
  _.each(this.solutionMatrix, function(arr,i){
    _.each(arr, function(el, j){
      that.buckets(el, i, j);
    });
  });
};

SudukuPlus.prototype.isValidSquares = function(){
  var flag = true,
      that = this;
  this.getSquares(this.solutionMatrix)
  _.each(this.squareGroups, function(group){
    if (!that.isValidSet(group)){
      flag = false;
    }
  })
  return flag;
};

SudukuPlus.prototype.checkBoard = function(solutionStr){
  this.formatSolution(solutionStr);
  return this.isValidBoard(this.solutionMatrix) &&
         this.isValidRows(this.solutionMatrix) &&
         this.isValidColumns(this.solutionMatrix) &&
         this.isValidSquares();
}

module.exports = SudukuPlus;
