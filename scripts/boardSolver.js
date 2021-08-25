const solveBoard = function(board){
    let boardDirections = getBoardDirections(board)
    let returnVal = 'none'
    Object.keys(boardDirections).forEach((e) => {
        if (boardDirections[e].every(v => v === boardDirections[e][0]) && boardDirections[e][0] !== '-'){
            returnVal = e
            return
        }
    })
    return returnVal
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
        rightDiag: [board[0][2], board[1][1], board[2][0]]
    }
    return boardDirections
}


export default solveBoard