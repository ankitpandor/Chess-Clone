const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedpiece = null;
let sourceSqure = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row, rowindex) => {
        row.forEach((square, squareindex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowindex + squareindex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = squareindex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );

                pieceElement.innerText = getPieceUnicode(square);
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedpiece = pieceElement;
                        sourceSqure = { row: rowindex, col: squareindex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", (e) => {
                    draggedpiece = null;
                    sourceSqure = null;
                });

                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", function (e) {
                e.preventDefault();
            });

            squareElement.addEventListener("drop", function (e) {
                e.preventDefault();
                if (draggedpiece) {
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleMove(sourceSqure, targetSquare);
                }
            });

            boardElement.appendChild(squareElement);
        });
    });
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        r: '♜', // Black Rook
        p: '♟', // Black Pawn
        b: '♝', // Black Bishop
        n: '♞', // Black Knight
        k: '♚',  // Black King
        q: '♛', // Black Queen
        p: '♙', // White Pawn
        r: '♖', // White Rook
        r: '♖', // White Rook
        b: '♗', // White Bishop
        n: '♘', // White Knight
        k: '♔' , // White King
        q: '♕', // White Queen
        
    };
    return unicodePieces[piece.type] || "";
};

renderBoard();