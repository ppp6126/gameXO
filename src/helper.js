export function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c ] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    const lines2 = [
      [0,1,2,3],
      [4,5,6,7],
      [8,9,10,11],
      [12,13,14,15],
      [0,4,8,12],
      [1,5,9,13],
      [2,6,10,14],
      [3,7,11,15],
      [0,5,10,15],
      [3,6,9,12],
    ];
    for (let i = 0; i < lines2.length; i++) {
      const [a, b, c , d] = lines2[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    const lines3 = [
      [0,1,2,3,4],
      [5,6,7,8,9],
      [10,11,12,13,14],
      [15,16,17,18,19],
      [20,21,22,23,24],
      [0,5,10,15,20],
      [1,6,11,16,21],
      [2,7,12,17,22],
      [3,8,13,18,23],
      [4,9,14,19,24],
      [0,6,12,18,24],
      [4,8,12,16,20]
    ];
    for (let i = 0; i < lines3.length; i++) {
      const [a, b, c , d ,e] = lines3[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
        return squares[a];
      }
    }
    return null;
  }