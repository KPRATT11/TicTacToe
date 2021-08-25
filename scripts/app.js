import bst from "./bst.js"
import solveBoard from "./boardSolver.js"
import {convertIDtoArrayPos} from "./helpers.js"
import ai from "./ai.js"

let gameBoard = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']]

//Sets the game properties from local storage
function setGame(){
    let playerData = JSON.parse(localStorage.getItem('players'))
    console.log(gameProperties)
    players.player1 = {...players.player1, ...playerData.player1}
    players.player2 = {...players.player2, ...playerData.player2}
    gameProperties.currentPlayer = players.player1
    updateTurnInstructions()
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

let gameProperties = {
    currentPlayer: players.player2,
    roundsLeft: 3,
    aiEnabled: true,
    playerMovesEnabled: true 
}

//Get Game Board Divs
const gameBoardElement = document.querySelector('.gameBoard');
const boardSlotsElement = document.querySelectorAll('.boardSlot');

bst.attatchClickBindings(boardSlotsElement, handleBoardClick)

//Handle Game Reset
function resetGame(){
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

    if (gameProperties.currentPlayer === players.player2){
        playAi()
    }
}

//Round Handeling 
const roundsDisplayer = document.querySelector('.roundsLeft')
roundsDisplayer.textContent = gameProperties.roundsLeft

function decreaseRounds(){
    gameProperties.roundsLeft -= 1
    roundsDisplayer.textContent = Number(roundsDisplayer.textContent) - 1
}

//Pieces placed
function handleBoardClick(e){
    let boardPieceCoords = convertIDtoArrayPos(e.target.id)
    if (gameProperties.playerMovesEnabled === false){
        console.log('Wait your turn')
    }
    else if (gameBoard[boardPieceCoords[0]][boardPieceCoords[1]] !== '-'){
        console.log('already here') //TODO add function for what happens when it is already here

    //This else occurs when a click is sucessful
    }else{
        e.target.classList.add(`${gameProperties.currentPlayer.id}Clicked`)
        e.target.textContent = gameProperties.currentPlayer.icon
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
    setTimeout(function(){
        let aiMove = ai.easy(gameBoard)
        let aiMoveCoords = convertIDtoArrayPos(aiMove)
        gameBoard[aiMoveCoords[0]][aiMoveCoords[1]] = 2
        let sqaureToChange = document.getElementById(`c${aiMove}`)
        sqaureToChange.textContent = players.player2.icon
        sqaureToChange.classList.add('player2Clicked')
        let solvedBoardDirection = solveBoard(gameBoard)
        if (solvedBoardDirection === "draw"){
            gameDraw()
        }else if (solvedBoardDirection !== "none" && solvedBoardDirection !== "draw"){
            gameWon(solvedBoardDirection, players.player2)
        }
    
        swapPlayers()
        updateTurnInstructions()
        gameProperties.playerMovesEnabled = true
    }, 700)
    
}

//Swap players
function swapPlayers(){
    if (gameProperties.currentPlayer === players.player1){
        gameProperties.currentPlayer = players.player2
    }else {
        gameProperties.currentPlayer = players.player1
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
    console.log(`${player.name} won with ${direction}`)
    player.score += 1
    player1PointsDisplay.textContent = players.player1.score
    player2PointsDisplay.textContent = players.player2.score

    //Results Banner Stuff
    resultsBanner.classList.add("winningMessageShow")
    resultsBanner.textContent = `${player.name} won`

    setTimeout(() => {
        decreaseRounds()
        resetGame()
        resultsBanner.classList.remove("winningMessageShow")
    }, 2000)
    
}

function gameDraw(){
    console.log('Game Drawed')
    player1PointsDisplay.textContent = players.player1.score
    player2PointsDisplay.textContent = players.player2.score

    resultsBanner.classList.add("winningMessageShow")
    resultsBanner.textContent = `${player.name} won`

    setTimeout(() => {
        decreaseRounds()
        resetGame()
    }, 2000)
    
}
setGame()