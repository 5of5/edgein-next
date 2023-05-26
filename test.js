function attemptFill(available, x, y, val) {
  if (available[x][y] === 'Q') {
    throw new Error('Queen already placed here')
  }
  available[x][y] = val
  return true
}

function fillInUnavailable(available, x, y) {
  if (available[x][y] !== 'B') {
    return 0;
  }
  for (var i = 0; i < n; i++) {
    attemptFill(available, i, y, '.')
    attemptFill(available, x, i, '.')
    if (y-x+i >= 0 && y-x+i < n) {
      attemptFill(available, i, y-x+i, '.')
    }
    if (y+x-i >= 0 && y+x-i < n) {
      attemptFill(available, i, y+x-i, '.')
   
    }
  }
  available[x][y] = 'Q'
  return 1
}

function makeArray(a,b) {
var arr = new Array(a);
for(var i = 0;i<a;i++)
    arr[i] = new Array(b).fill('B')
return arr
}

const n = 7
const solutions = []
let available = makeArray(n, n);
for (var start = 0; start < n; start++) {
  available = makeArray(n, n);
  fillInUnavailable(available, 0, start)
  var solution = true;
  for (var j = 1; j < n; j++) {
    var found = false;
    for (var i = 0; i < n; i++) {
      try {
        if (fillInUnavailable(available, j, i)) {
          found = true;
          break;
        }
      } catch (e) {
        console.log('error', j, i, e.message);
        break;
      }
    }
    if (!found) {
      // console.log(available);
      console.log('not a solution');
      solution = false;
      break;
    }
  }
  console.log(available);
  if (solution) {
    solutions.push(available)
    //console.log('solution');
  }
}
//console.log(solutions);
