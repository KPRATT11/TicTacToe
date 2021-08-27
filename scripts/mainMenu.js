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

const availableIcons = ['G','D','I','K','N','Y','S','H']
let player1Icon = availableIcons[0]
let player2Icon = availableIcons[1]

//Uppdate if local storgae exists
function updateOnStart(){
    if (localStorage.getItem('players') !== null){
        let playerData = JSON.parse(localStorage.getItem('players'))
        let gameObjectData = JSON.parse(localStorage.getItem('gameProperties'))
        player1ElementProperties.name.value = playerData.player1.name
        player2ElementProperties.name.value = playerData.player2.name

        player1ElementProperties.color.value = playerData.player1.color
        player2ElementProperties.color.value = playerData.player2.color

        console.log(playerData.player1.icon)
        player1Icon = playerData.player1.icon
        player2Icon = playerData.player2.icon

        if (gameObjectData.aiDifficulty === "easy"){
            smartAiEnabled = false
            smartAi.checked = false
        }else{
            smartAiEnabled = true
            smartAi.checked = true
        }
        aiEnabled = gameObjectData.aiEnabled
        console.log(aiEnabled)
        if (aiEnabled){
            oponentType.textContent = "AI"
        }else{
            oponentType.textContent = "Player"
        }
        amountOfRounds = Number(gameObjectData.startingRounds)
        roundAmountDisplayer.textContent = gameObjectData.startingRounds
        updateIcons()
    }
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
    let aiDifficulty
    if (smartAiEnabled){
        aiDifficulty = "medium"
    }else {
        aiDifficulty = "easy"
    }
    let gamePropertiesObject = {
        aiEnabled: aiEnabled,
        startingRounds: amountOfRounds,
        aiDifficulty: aiDifficulty,
    }
    return gamePropertiesObject
}


//I know this code is absolute donkey shit I wrote it late at night Im sorry

//Icon Selecting


const player1LeftArrow = document.querySelector('#player1IconSelectorLeft')
const player1RightArrow = document.querySelector('#player1IconSelectorRight')
const player2LeftArrow = document.querySelector('#player2IconSelectorLeft')
const player2RightArrow = document.querySelector('#player2IconSelectorRight')

const player1IconDisplay = document.querySelector('#player1Icon')
const player2IconDisplay = document.querySelector('#player2Icon')

//I apologize for this. If I have time I will come fix it up... but if you are seeing this comment it means I didnt have time
player1LeftArrow.addEventListener('click',() => {player1Icon = shiftIcons(player1Icon, false); updateIcons(); animateIcons(1, 'right')})
player1RightArrow.addEventListener('click',() => {player1Icon = shiftIcons(player1Icon, true); updateIcons(); animateIcons(1, 'left')})
player2LeftArrow.addEventListener('click',() => {player2Icon = shiftIcons(player2Icon, false); updateIcons(); animateIcons(2, 'right')})
player2RightArrow.addEventListener('click',() => {player2Icon = shiftIcons(player2Icon, true); updateIcons(); animateIcons(2, 'left')})



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

function animateIcons(player, direction){
    if (player === 1){
        if (direction === "left"){
            player1IconDisplay.classList.add('blurLeft')
            setTimeout(() => {
                player1IconDisplay.classList.remove('blurLeft')
            }, 200)
        }else{
            player1IconDisplay.classList.add('blurRight')
            setTimeout(() => {
                player1IconDisplay.classList.remove('blurRight')
            }, 200)
        }
    }else if (player === 2){
        if (direction === "left"){
            player2IconDisplay.classList.add('blurLeft')
            setTimeout(() => {
                player2IconDisplay.classList.remove('blurLeft')
            }, 200)
        }else{
            player2IconDisplay.classList.add('blurRight')
            setTimeout(() => {
                player2IconDisplay.classList.remove('blurRight')
            }, 200)
        }
    }
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
        console.log(aiEnabled)
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
        
    }else {
        animateRoundAmount('right')
    }
    roundAmountDisplayer.textContent = amountOfRounds
})

roundsIncrease.addEventListener('click',() => {
    amountOfRounds += 2
    roundAmountDisplayer.textContent = amountOfRounds
    animateRoundAmount('left')
})

function animateRoundAmount(direction){
    if (direction === "left"){
        roundAmountDisplayer.classList.add('blurLeft')
        setTimeout(() => {
            roundAmountDisplayer.classList.remove('blurLeft')
        }, 200)
    }else{
        roundAmountDisplayer.classList.add('blurRight')
        setTimeout(() => {
            roundAmountDisplayer.classList.remove('blurRight')
        }, 200)
    }
}

const smartAi = document.querySelector('#smartAi')
smartAi.checked = false
let smartAiEnabled = false
console.log(smartAiEnabled)
smartAi.addEventListener('click',() => {
    
    smartAiEnabled = !smartAiEnabled
    console.log(smartAiEnabled)
})

updateOnStart()