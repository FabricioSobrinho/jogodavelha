// Definindo variáveis globais para controlar o jogo
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

// Função para verificar o vencedor
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6] // Diagonais
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (gameBoard.includes('')) return null; // Jogo não terminou
  return 'Empate';
}

// Função para tratar o clique em uma célula
function addAnIcon(cell) {
  const cellIndex = parseInt(cell.classList[1]); // Obtém o índice da célula

  if (!gameBoard[cellIndex] && !gameOver) {
    cell.textContent = currentPlayer;
    gameBoard[cellIndex] = currentPlayer;

    const winner = checkWinner();
    if (winner) {
      gameOver = true;
      if (winner === 'Empate') {
        alert('O jogo empatou!');
      } else {
        alert(`Jogador ${winner} venceu!`);
      }
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Alternar jogadores
    }
  }
}

// Função para recomeçar o jogo
function playAgain() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;

  const cells = document.querySelectorAll('.selector');
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

// Adicionar manipuladores de eventos para cada célula
const cells = document.querySelectorAll('.selector');
cells.forEach(cell => {
  cell.addEventListener('click', () => addAnIcon(cell));
});

// Adicionar manipulador de evento para o botão "Recomeçar"
const restartButton = document.querySelector('button');
restartButton.addEventListener('click', playAgain);
