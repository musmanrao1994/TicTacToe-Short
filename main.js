let currentPlayer = "X", board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const main = box => {
if (document.querySelector("#winner").innerHTML !== "" || box.value !== "") return;
box.value = currentPlayer;
board[box.name] = currentPlayer;
((board[0] === board[1] && board[1] === board[2]) || (board[3] === board[4] && board[4] === board[5]) || (board[6] === board[7] && board[7] === board[8]) || (board[0] === board[3] && board[3] === board[6]) || (board[1] === board[4] && board[4] === board[7]) || (board[2] === board[5] && board[5] === board[8]) || (board[0] === board[4] && board[4] === board[8]) || (board[2] === board[4] && board[4] === board[6]) ) && (document.querySelector("#winner").innerHTML = `${currentPlayer} has won!`)
currentPlayer = (currentPlayer === "X" && "O") || "X";
}
