function getAllData(){
    setInitialPlayerData()
    setInitialGameData()
}


let players = {
    player1: {
        id: "player1",
        score: 0
    },
    player2: {
        id: "player2",
        score: 0
    }
}

let gameProperties = {
    currentPlayer: players.player2,
    roundsLeft: 0,
    aiEnabled: true,
    playerMovesEnabled: true ,
    startingRounds: 3,
}

function setInitialPlayerData(){
    let playerData = JSON.parse(localStorage.getItem('players'))
    console.log(gameProperties)
    players.player1 = {...players.player1, ...playerData.player1}
    players.player2 = {...players.player2, ...playerData.player2}
}

function setInitialGameData(){
    let gameObjectData = JSON.parse(localStorage.getItem('gameProperties'))
    gameProperties = {...gameProperties, ...gameObjectData}
}


//Handle Winner display
const winnerMessage = document.querySelector('.winner')
function updateWinnerMessage(){
    if (players.player1.score > players.player2.score){
        winnerMessage.textContent = `${players.player1.name} WON`
    }else if(players.player1.score < players.player2.score){
        winnerMessage.textContent = `${players.player2.name} WON`
    }else {
        winnerMessage.textContent = "Its a draw"
    }
}

getAllData()
updateWinnerMessage()