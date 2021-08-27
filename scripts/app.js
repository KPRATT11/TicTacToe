import bst from "./bst.js"  //BST is a helper function library that I am slowly adding to as I think of functions
import solveBoard from "./boardSolver.js"
import {convertIDtoArrayPos} from "./helpers.js" //This helper library is for functions that are more specific to this program
import ai from "./ai.js"


//set initial game board
let gameBoard = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']]

//Get game audio


const soundOpen = document.querySelector('.soundOpen') //Sound not working due to browsers security settings... dont know how to fix it atm
const soundPlace = document.querySelector('.soundPlace')
const soundBell = document.querySelector('.soundBell')

const player1Container = document.querySelector('#player1Container')
const player2Container = document.querySelector('#player2Container')

player1Container.classList.add('player1SlideIn')
setTimeout(() => {player1Container.classList.remove('player1SlideIn')}, 600) //We need to remove the class otherwise the squish animation doesnt play correctly

player2Container.classList.add('player2SlideIn')
setTimeout(() => {player2Container.classList.remove('player2SlideIn')}, 600)

//Sets the game properties from local storage
function setGame(){
    setInitialPlayerData()
    setInitialGameData()
    gameProperties.currentPlayer = players.player1
    player1NameDisplay.textContent = players.player1.name
    player2NameDisplay.textContent = players.player2.name
    updateTurnInstructions()
    soundOpen.play()
}

function setInitialPlayerData(){
    let playerData = JSON.parse(localStorage.getItem('players'))
    players.player1 = {...players.player1, ...playerData.player1}
    players.player2 = {...players.player2, ...playerData.player2}
}

function setInitialGameData(){
    let gameObjectData = JSON.parse(localStorage.getItem('gameProperties'))
    gameProperties = {...gameProperties, ...gameObjectData}
    gameProperties.roundsLeft = gameProperties.startingRounds
    roundsDisplayer.textContent = `ROUNDS REMAINING: ${gameProperties.roundsLeft}`
}

let players = {
    player1: {
        id: "player1",
        playerToken: '1',
        score: 0
    },
    player2: {
        id: "player2",
        playerToken: '2',
        score: 0
    }
}
const player1PointsDisplay = document.querySelector('#player1Score')
const player2PointsDisplay = document.querySelector('#player2Score')
const player1NameDisplay = document.querySelector('#player1Name')
const player2NameDisplay = document.querySelector('#player2Name')

let gameProperties = {
    currentPlayer: players.player2,
    roundsLeft: 3,
    aiEnabled: true,
    aiDifficulty: 'easy',
    playerMovesEnabled: true, //This property is used to disable user input during ai or when the win or loss banner is showing
    startingRounds: 3,
}

//Get Game Board Divs
const boardSlotsElement = document.querySelectorAll('.boardSlot');

//this functions loops through a node list and attaches a event listener of click to each element
bst.attatchClickBindings(boardSlotsElement, handleBoardClick)

//Handle Game Reset
function resetGame(){

    //check if either a player has a score that means they can no longer lose the overall game
    //or if the rounds have ran out
    console.log(gameProperties.roundsLeft)
    if (players.player1.score === Math.ceil(gameProperties.startingRounds / 2) 
        || 
        players.player2.score === Math.ceil(gameProperties.startingRounds / 2)
        || 
        gameProperties.roundsLeft <= 1
        ){
        localStorage.setItem('players', JSON.stringify(players))
        window.location.href = "./gameFinished.html"
    }
    //Reset gameboard
    gameBoard = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']]
    
    //Clear Classes 
    boardSlotsElement.forEach(e => {
        e.textContent = ''
        e.classList.remove('player1Clicked')
        e.classList.remove('player2Clicked')
    })


    //checks if its the ai's turn to go first - this is required as normally it only plays the ai after a player has clicked
    //which is obviously not going to happen if its the ais turn first
    if (gameProperties.currentPlayer === players.player2 && gameProperties.aiEnabled === true){
        playAi()
    }
}

//Round Handeling 
const roundsDisplayer = document.querySelector('.roundsLeft')
function decreaseRounds(){
    gameProperties.roundsLeft -= 1
    roundsDisplayer.classList.add('displayEntrance')
    roundsDisplayer.textContent = `ROUNDS REMAINING: ${gameProperties.roundsLeft}`
    setTimeout(() => roundsDisplayer.classList.remove('displayEntrance'), 500)
}

//Pieces placed
function handleBoardClick(e){
    //take the id of the element we have clicked on and convert it to a format that is easier to work with for arrays
    let boardPieceCoords = convertIDtoArrayPos(e.target.id)

    //This empty if statement exists incase I want to add a function if a player clicks when not meant to
    if (gameProperties.playerMovesEnabled === false){
    }

    //Check if a piece is already here
    else if (gameBoard[boardPieceCoords[0]][boardPieceCoords[1]] !== '-'){
        e.target.classList.add('noClick')
        setTimeout(() => {e.target.classList.remove('noClick')}, 400)
    //This else occurs when a click is sucessful
    }else{
        //Play Sound
        soundPlace.play()

        e.target.classList.add(`${gameProperties.currentPlayer.id}Clicked`)
        e.target.textContent = gameProperties.currentPlayer.icon
        e.target.style.color = gameProperties.currentPlayer.color
        gameBoard[boardPieceCoords[0]][boardPieceCoords[1]] = gameProperties.currentPlayer.playerToken
        
        let solvedBoardDirection = solveBoard(gameBoard)
        if (solvedBoardDirection === "draw"){
            gameDraw()
        }
        else if (solvedBoardDirection !== "none" && solvedBoardDirection !== "draw"){
            gameWon(solvedBoardDirection, gameProperties.currentPlayer)
        }
        swapPlayers()
        updateTurnInstructions()
        if (gameProperties.aiEnabled && solvedBoardDirection === "none"){
            playAi()
        }
    }
    
}

//ai Functions
function playAi(){
    
    gameProperties.playerMovesEnabled = false

    //this random amount of time makes the ai not react instatnly - the randomness gives it a more human feeling
    let randomTimeOut = Math.floor(Math.random() * 200) + 700
    setTimeout(function(){
        soundPlace.play()

        //get the position of the ai. this logic is handled in thde ai.js file
        let aiMove = ai[gameProperties.aiDifficulty](gameBoard)
        let aiMoveCoords = convertIDtoArrayPos(aiMove)

        //change the gameboard to represent that the ai has moved there
        gameBoard[aiMoveCoords[0]][aiMoveCoords[1]] = "2"
        let sqaureToChange = document.getElementById(`c${aiMove}`)

        sqaureToChange.textContent = players.player2.icon
        sqaureToChange.style.color = gameProperties.currentPlayer.color
        sqaureToChange.classList.add('player2Clicked')
        let solvedBoardDirection = solveBoard(gameBoard)

        //Check for win or draw
        if (solvedBoardDirection === "draw"){
            gameDraw()
        }else if (solvedBoardDirection !== "none" && solvedBoardDirection !== "draw"){
            gameWon(solvedBoardDirection, players.player2)
        }
        
        swapPlayers()
        updateTurnInstructions()
        gameProperties.playerMovesEnabled = true
    }, randomTimeOut)
    
}

//Swap players
const player1ScoreBoard = document.querySelector('#player1Container')
const player2ScoreBoard = document.querySelector('#player2Container')
function swapPlayers(){
    if (gameProperties.currentPlayer === players.player1){
        player2ScoreBoard.classList.add('playerTurn')
        gameProperties.currentPlayer = players.player2
        setTimeout(() => {
            player2ScoreBoard.classList.remove('playerTurn')
        },1000)
    }else {
        player1ScoreBoard.classList.add('playerTurn')
        gameProperties.currentPlayer = players.player1
        setTimeout(() => {
            player1ScoreBoard.classList.remove('playerTurn')
        },1000)
    }
}

//Game turnInstructions
const turnInstructions = document.querySelector('.turnInstructions');
function updateTurnInstructions(){
    turnInstructions.textContent = `${gameProperties.currentPlayer.name}'s Turn`
}

//Game Won
const resultsBanner = document.querySelector('.winningMessage');
function gameWon(direction, player){
    soundBell.play()
    gameProperties.playerMovesEnabled = false
    player.score += 1
    player1PointsDisplay.textContent = `Score: ${players.player1.score}`
    player2PointsDisplay.textContent = `Score: ${players.player2.score}`

    //Results Banner Stuff
    resultsBanner.classList.add("winningMessageShow")
    resultsBanner.textContent = `${player.name} won`

    setTimeout(() => {
        gameProperties.playerMovesEnabled = true
        decreaseRounds()
        resetGame()
        resultsBanner.classList.remove("winningMessageShow")
    }, 2000)
    
}

function gameDraw(){
    soundBell.play()
    gameProperties.playerMovesEnabled = false
    player1PointsDisplay.textContent = players.player1.score
    player2PointsDisplay.textContent = players.player2.score

    resultsBanner.classList.add("winningMessageShow")
    resultsBanner.textContent = `DRAW`


    setTimeout(() => {
        gameProperties.playerMovesEnabled = true
        decreaseRounds()
        resetGame()
        resultsBanner.classList.remove("winningMessageShow")
    }, 2000)
    
}
setGame()


//backButton
const backButton = document.querySelector('.backButton')
backButton.addEventListener("click", () => {
    window.location.href = "./index.html"
})