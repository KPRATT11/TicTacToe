const ai = {
    easy: function (gameboard) {
        let randomCoords = generateRandomXY();
        while (gameboard[randomCoords[0]][randomCoords[1]] !== '-') {
            randomCoords = generateRandomXY()
        }
        return randomCoords.join('-');
    },
    medium: function (gameboard) {
        console.log(gameboard)
        let smartPosition = generateSmartPosition(gameboard, '2')
        if (smartPosition !== 'none'){
            return convertDirectionIndex(smartPosition);
        }
        else if(generateSmartPosition(gameboard, '1') !== 'none'){
            return convertDirectionIndex(generateSmartPosition(gameboard, '1'))
        }else {
            let randomCoords = generateRandomXY();
            while (gameboard[randomCoords[0]][randomCoords[1]] !== '-') {
                randomCoords = generateRandomXY()
            }
            return randomCoords.join('-'); 
        }
    },
    hard: function() {

    }
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

function generateRandomXY(){
    let randomX = Math.floor(Math.random() * 3)
    let randomY = Math.floor(Math.random() * 3)
    return [randomX, randomY]
}

function generateSmartPosition(gameboard, checkPiece){
    console.log(checkPiece)
    let returnVal = 'none'
    let boardDirections = getBoardDirections(gameboard);
        Object.keys(boardDirections).forEach(function (key) {
            
            let boardDirection = boardDirections[key];
            let filBoardDirection = boardDirection.filter(e => e === checkPiece || e === '-')
            if (filBoardDirection.length === 3){
                console.log('1')
                filBoardDirection = filBoardDirection.filter(e => e === checkPiece)
                if (filBoardDirection.length === 2){
                    console.log(`2 is ${checkPiece}`)
                    returnVal = [boardDirection.indexOf('-'), key]
                }
            }
        })
    return returnVal
}

function convertDirectionIndex(directionIndex){
    let directionObject = {
        top: ['0-0','0-1','0-2'],
        middle: ['1-0','1-1','1-2'],
        bottom: ['2-0','2-1','2-2'],
        right: ['0-2','1-2','2-2'],
        centre: ['0-1','1-1','2-1'],
        left: ['0-0','1-0','2-0'],
        leftDiag: ['0-0','1-1','2-2'],
        rightDiag: ['0-2','1-1','2-0']
    }

    return directionObject[directionIndex[1]][directionIndex[0]];
}

export default ai