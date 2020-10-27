let currentPlayer = "X",
  board = [0, 1, 2, 3, 4, 5, 6, 7, 8],
  resultDiv = document.querySelector(".result"),
  allInputs = document.querySelectorAll(`input`),
  hasGameEnded = false;

[...allInputs].forEach((item, index) =>
  item.addEventListener("click", () => handleInputClick(index))
);

const handleInputClick = (index) => {
  if (isNaN(board[index]) || hasGameEnded) return;
  allInputs[index].value = currentPlayer;
  board[index] = currentPlayer;
  (((isThereWinner(board) && (resultDiv.innerHTML = `${currentPlayer} has won!`)) || (isTie(board) && (resultDiv.innerHTML = `It is a tie!`))) && (hasGameEnded = true));
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  if (currentPlayer === "O") AITurn(board);
};

function AITurn(arr) {
  let bestScores = -Infinity;
  let bestIndex = 0;

  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      arr[i] = "O";
      const score = miniMax(arr);
      arr[i] = i;

      if (score > bestScores) {
        bestScores = score;
        bestIndex = i;
      }
    }
  }

  allInputs[bestIndex].click();
}

function miniMax(arr, isAITurn = false) {
  if (isThereWinner(arr)) {
    return isAITurn ? -1 : 1;
  } else if (isTie(arr)) {
    return 0;
  }

  let bestScores = isAITurn ? -Infinity : Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      arr[i] = isAITurn ? "O" : "X";
      const score = miniMax(arr, !isAITurn);
      bestScores = isAITurn ? Math.max(score, bestScores) : Math.min(score, bestScores);
      arr[i] = i;
    }
  }
  return bestScores;
}

const isEqual = (...arr) => arr.every(item => item === arr[0]);

const isThereWinner = (arr) => (isEqual(arr[0], arr[1], arr[2]) || isEqual(arr[3], arr[4], arr[5]) || isEqual(arr[6], arr[7], arr[8]) || isEqual(arr[0], arr[3], arr[6]) || isEqual(arr[1], arr[4], arr[7]) || isEqual(arr[2], arr[5], arr[8]) || isEqual(arr[0], arr[4], arr[8]) || isEqual(arr[2], arr[4], arr[6]));

const isTie = (arr) => arr.every((item) => isNaN(item));