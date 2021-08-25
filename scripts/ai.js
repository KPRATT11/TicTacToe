const ai = {
    easy: function (gameboard) {
        let randomCoords = generateRandomXY();
        while (gameboard[randomCoords[0]][randomCoords[1]] !== '-') {
            randomCoords = generateRandomXY()
        }
        return randomCoords.join('-');
    },
    medium: function () {

    },
    hard: function() {

    }
}

function generateRandomXY(){
    let randomX = Math.floor(Math.random() * 3)
    let randomY = Math.floor(Math.random() * 3)
    return [randomX, randomY]
}

export default ai