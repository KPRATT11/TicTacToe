//Get player 1 customization elements
const player1Submit = document.querySelector('#player1Submit');
const player1ElementProperties = {
    name: document.querySelector('#player1Name'),
    color: document.querySelector('#player1ColorPicker'),
}

//Get player 2 customization elements
const player2Submit = document.querySelector('#player2Submit')
const player2ElementProperties = {
    name: document.querySelector('#player2Name'),
    color: document.querySelector('#player2ColorPicker')
}

//This array checks for the players that are ready
let playersReady = [false,false]

//Attatch Event Listeners
player1Submit.addEventListener('click', () => {playerReadyToggle(1)})
player2Submit.addEventListener('click', () => {playerReadyToggle(2)})


function playerReadyToggle(player){
    let playerIndex = player -1
    playersReady[playerIndex] = !playersReady[playerIndex]
    playerReadyVisualToggle(player)

    if (playersReady[0] && playersReady[1]){
        beginGame()
    }

}

function playerReadyVisualToggle(player){
    if (player === 1){
        player1Submit.classList.toggle('swapperButtonSucess')
        if (player1Submit.textContent === 'Press To Ready...'){
            player1Submit.textContent = "Ready"
        }else{
            setTimeout(() => {
                player1Submit.textContent = "Press To Ready..."
            }, 100)
        }
    }else if(player === 2){
        player2Submit.classList.toggle('swapperButtonSucess')
        console.log(player2Submit.textContent)
        if (player2Submit.textContent === 'Press To Ready...'){
            player2Submit.textContent = "Ready"
        }else{
            setTimeout(() => {
                player2Submit.textContent = "Press To Ready..."
            }, 100)
        }
    }
}

function beginGame(){
    setTimeout(function(){
        let playersObject = generatePlayersObject()
        let gamePropertiesObject = generateGamePropertiesObject()
        localStorage.setItem('gameProperties', JSON.stringify(gamePropertiesObject))
        localStorage.setItem('players', JSON.stringify(playersObject))
        window.location.href = "./game.html"
    }, 300)
    
}

function generatePlayersObject(){
    let playersObject = {
        player1: {
            name: player1ElementProperties.name.value,
            color: player1ElementProperties.color.value,
            icon: player1Icon
        },
        player2: {
            name: player2ElementProperties.name.value,
            color: player2ElementProperties.color.value,
            icon: player2Icon
        }
    }
    return playersObject
}

function generateGamePropertiesObject(){
    console.log(smartAi)
    let gamePropertiesObject = {
        aiEnabled: aiEnabled,
        startingRounds: amountOfRounds,
        aiDifficulty: smartAiEnabled ? 'easy' : 'medium'
    }
    return gamePropertiesObject
}


//I know this code is absolute donkey shit I wrote it late at night Im sorry

//Icon Selecting
const availableIcons = ['G','D','I','K','N','Y','S','H']
let player1Icon = availableIcons[0]
let player2Icon = availableIcons[1]

const player1LeftArrow = document.querySelector('#player1IconSelectorLeft')
const player1RightArrow = document.querySelector('#player1IconSelectorRight')
const player2LeftArrow = document.querySelector('#player2IconSelectorLeft')
const player2RightArrow = document.querySelector('#player2IconSelectorRight')

const player1IconDisplay = document.querySelector('#player1Icon')
const player2IconDisplay = document.querySelector('#player2Icon')

//I apologize for this. If I have time I will come fix it up... but if you are seeing this comment it means I didnt have time
player1LeftArrow.addEventListener('click',() => {player1Icon = shiftIcons(player1Icon, false); updateIcons()})
player1RightArrow.addEventListener('click',() => {player1Icon = shiftIcons(player1Icon, true); updateIcons()})
player2LeftArrow.addEventListener('click',() => {player2Icon = shiftIcons(player2Icon, false); updateIcons()})
player2RightArrow.addEventListener('click',() => {player2Icon = shiftIcons(player2Icon, true); updateIcons()})



function shiftIcons(player, right){
    let currentIconIndex = availableIcons.indexOf(player)
    let newIndex = 0
    if (right){
        newIndex = currentIconIndex + 1
        if (newIndex >= availableIcons.length){
            newIndex = 0
        }
    }else{
        newIndex = currentIconIndex - 1
        if (newIndex < 0){
            newIndex = availableIcons.length - 1
        }
    }
    return availableIcons[newIndex]
}

function updateIcons(){
    player1IconDisplay.textContent = player1Icon
    player2IconDisplay.textContent = player2Icon
}

//Select player 2's mode
let aiEnabled = false

const player2ModeRightArrow = document.querySelector('#typeSelectorRight')
const player2ModeLeftArrow = document.querySelector('#typeSelectorLeft')
const oponentType = document.querySelector('.oponentType')

player2ModeLeftArrow.addEventListener('click', player2ModeChange)
player2ModeRightArrow.addEventListener('click', player2ModeChange)

function player2ModeChange(){
    if (aiEnabled){
        oponentType.textContent = "Player"
        aiEnabled = false
    }else {
        oponentType.textContent = "AI"
        aiEnabled = true
    }
}

//GAME PROPERTIES
let amountOfRounds = 3
const roundAmountDisplayer = document.querySelector('.roundsAmount')
const roundsDecrease = document.querySelector('#roundsAmountDecrease')
const roundsIncrease = document.querySelector('#roundsAmountIncrease')

roundsDecrease.addEventListener('click', () => {
    amountOfRounds -= 2
    if (amountOfRounds < 1){
        amountOfRounds = 1
    }
    roundAmountDisplayer.textContent = amountOfRounds
})

roundsIncrease.addEventListener('click',() => {
    amountOfRounds += 2
    roundAmountDisplayer.textContent = amountOfRounds
})

const smartAi = document.querySelector('#smartAi')
let smartAiEnabled = false
smartAi.addEventListener('click',() => {
    smartAiEnabled = !smartAiEnabled
})