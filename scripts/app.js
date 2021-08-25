import bst from "./bst.js"
import solveBoard from "./boardSolver.js"
import {convertIDtoArrayPos} from "./helpers.js"

let gameBoard = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']]

let players = {
    player1: {
        id: "player1",
        name: "player1",
        playerToken: '1',
        score: 0
    },
    player2: {
        id: "player2",
        name: "player2",
        playerToken: '2',
        score: 0
    }
}

let gameProperties = {
    currentPlayer: players.player1,
    roundsLeft: 3,
    roundStartingPlayer: players.player1
}

//Get Game Board Divs
const gameBoardElement = document.querySelector('.gameBoard');
const boardSlotsElement = document.querySelectorAll('.boardSlot');

bst.attatchClickBindings(boardSlotsElement, handleBoardClick)
console.log(boardSlotsElement)

//Handle Game Reset
function resetGame(){
    //Reset gameboard
    gameBoard = [
        ['-','-','-'],
        ['-','-','-'],
        ['-','-','-']]
    
    //Clear Classes 
    boardSlotsElement.forEach(e => {
        e.classList.remove('player1Clicked')
        e.classList.remove('player2Clicked')
    })
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
    if (gameBoard[boardPieceCoords[0]][boardPieceCoords[1]] !== '-'){
        console.log('already here') //TODO add function for what happens when it is already here

    //This else occurs when a click is sucessful
    }else{
        e.target.classList.add(`${gameProperties.currentPlayer.id}Clicked`)
        gameBoard[boardPieceCoords[0]][boardPieceCoords[1]] = gameProperties.currentPlayer.playerToken
        
        //TODO ADD BETTER WIN SHIT
        let solvedBoardDirection = solveBoard(gameBoard)
        if (solvedBoardDirection !== "none"){
            gameWon(solvedBoardDirection, gameProperties.currentPlayer)
        }
        swapPlayers()
        updateTurnInstructions()
    }
    
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
function gameWon(direction, player){
    console.log(`${player.name} won with ${direction}`)
    if (gameProperties.roundStartingPlayer === players.player1){
        gameProperties.roundStartingPlayer = players.player2
    }else{
        gameProperties.roundStartingPlayer = players.player1
    }
    decreaseRounds()
    resetGame()
}
