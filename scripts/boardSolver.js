const boardSolver = function(board){
    let boardDirections = getBoardDirections(board)
    console.log(boardDirections)
}

function getBoardDirections(board){
    let boardDirections = {
        top: board[0],
        middle: board[1],
        bottom: board[2],
        right: [board[0][2], board[1][2], board[2][2]],
        centre: [board[0][1], board[1][1], board[2][1]],
        left: [board[0][0], board[1][0], board[2][0]],
        leftDiag: [board[0][0], board[1][1], board[2][2]],
        rightDiag: [board[0][2], board[1][1], [2][0]]
    }
    return boardDirections
}


const gameBoard = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9']]