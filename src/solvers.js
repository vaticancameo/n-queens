/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n:n});
  for (var i = 0; i < n; i++) {
    board.togglePiece(i,i);
  }
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  if (n === 0) {
    solutionCount = 1;
  } else {
    solutionCount = 1;
    for (var i = 1; i <= n; i++) {
      solutionCount *= i;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  var recursiveSearch = function (array, count) {
    if (solution === undefined) {
      if (count === 0) {
        var board = new Board({n: n});
        for (var i = 0; i < n; i++) {
          var row = board.get(i);
          row[array[i]] = 1;
          board.set(i, row);
        }
        if (!board.hasAnyQueensConflicts()) {
          solution = board.rows();
        }
        //return board.hasAnyQueensConflicts() ? 0 : 1;
      } else {
        var total = 0;
        for (var i = 0; i < n; i++) {
          if (!_.contains(array, i)) {
            var newArr = array.slice();
            newArr.push(i);
            total += recursiveSearch(newArr, count-1);
          }
        }
        return total;
      }
    }
  };

  recursiveSearch([], n);

  if(solution === undefined) {
    var dummyBoard = new Board({n:n});
    solution = dummyBoard.rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  var recursiveSearch = function (array, count) {
    if (count === 0) {
      if (array.length === 0) {
        return 1;
      }
      var board = new Board({n: n});
      for (var i = 0; i < n; i++) {
        var row = board.get(i);
        row[array[i]] = 1;
        board.set(i, row);
      }
      return board.hasAnyQueensConflicts() ? 0 : 1;
    } else {
      var total = 0;
      for (var i = 0; i < n; i++) {
        if (!_.contains(array, i)) {
          var newArr = array.slice();
          newArr.push(i);
          total += recursiveSearch(newArr, count-1);
        }
      }
      return total;
    }
  };
  solutionCount = recursiveSearch([],n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
