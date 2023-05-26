function compareNumbers(a, b) {
  return a - b;
}
function getMaxAdditionalDinersCount(N, K, M, S) {
  // Write your code here
  const seats = S.sort(compareNumbers);
  let available = 0;
  let currentSeatIndex = 1;
  let buffer = (K*2) + 1
  for (var i = 0; i < seats.length; i++) {
    const diff = seats[i] - currentSeatIndex;
    console.log({
      diff, buffer, 
      ava: Math.floor( diff / buffer ), available, currentSeatIndex, seati: seats[i]})
    available += Math.floor( diff / buffer )
    if ((i === 0) && Math.floor( diff / buffer ) > 0) {
      const extra = diff % buffer
      if (extra > K+1) {
        available++;
      }
    }
    currentSeatIndex = seats[i] + 1
  }
  const diff = (N+1) - currentSeatIndex;
  const endSeats = Math.floor( diff / buffer)
  console.log({
    diff, buffer, 
    ava: Math.floor( diff / buffer ), endSeats, available, currentSeatIndex, seati: N+1})
  available += endSeats
    const extra = diff % buffer
    if (extra >= K) {
      available++;
    }
  return available;
}

// N = 10
// K = 1
// M = 2
// S = [2, 6]

N = 17
K = 2
M = 3
S = [11, 6, 14]
console.log(getMaxAdditionalDinersCount(N, K, M, S))