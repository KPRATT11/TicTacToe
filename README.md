# TIC TAC TOE

## Technologies Used
	HTML 5
	CSS 3
	JavaScript

## Overview
	This game allows you to play against real opponents or two types of ai,
	it features smooth modern css animations and transition.
	The game uses local storage to allow customaztion of the game to carry 
	over through multiple pages

## Features
### CUSTOMIZATION
	I wanted to add the ability for players to customize the game, 
	Players are able to customize 3 main parts about them selves.
	

 - Name
 - Color
 - Piece Icon
### 
	In addition to this players are able to decide how many round they wish to play 
	in a best of format. This helps add additional depth to the game.

### AUDIO
	The game features small audio sound effects to add to the expierence. 
	using the html audio tags to store the audio within the page.
	Using the javascript DOM audio API I can then trigger the audio
	sounds based on events happening within the game

### ANIMATIONS
	The visual design on the game is fairly simple so in order to add
	some much needed flair the game feature multiple CSS keyframe animations
	These Animations are triggered through Javascript by assigning a class to
	the element when I want the animation to trigger. The benifit of using 
	Javascript to trigger animations rather than css selectors is that 
	it allows for more exact control over when animations are played

### AI 
	One of the standout features of the game is the Artificial Inteligence
	The game features 2 types of ai 
	

 - Simple AI
 - Smart AI
 ### 
	 The simple AI is at its core just a random number generator, It begins by 
	 generating a random position on the board. Then it checks if that position is 
	 taken up by another spot. If its not it makes a move at that spot.
	 If the spot if taken up it repeats the process of choosing another spot.

	The Advanced AI is much more intresting, It begins by analiysing the board 
	and checking for any instant win conditions. If found it makes the move.
	If no win conditions exist it then checks for any instant loss conditions
	that it can block.
	If however neither of these conditions exist, the ai reverts to using the
	same technique as the simple AI of generating a random position

##### ADDITIONAL AI NOTES
	When creating the AI I considered using the formula for solving Tic Tac Toe
	I however decided Against it as an unbeatable AI is no fun.
	I beleive the ai system I created provides a good balance between being 
	challenging and beatable

### DATA PERSISTENCE 
	Using local storage the game is able to keep track of all settings.
	This feature is used for 2 things. Firstly it is used in order to 
	transfer the settings defined in the main menu over to the game as they 
	are both different URL's 
	
	This feature also allows the game to preset the menu settings everytime 
	the game is loaded based on the previous local storage 

## THE PROCESS
	I began by planning the features I wanted in my game, I knew that I wanted
	different pages for the Main Menu the core game and the game finsished screen. 
	In addition I felt it was important to allow players to customize their 
	piece icon.
	
	With these 2 things in mind I knew it was essential to create a 
	good data structure to store all the information in the game.
	I setteled on creating to Javascript Object Literals. 
	One would be responsible for holding all the information about 
	the players (name, score, etc) and the other would be responsible 
	for holding all the information about the game (rounds left, aiEnabled, etc)
	
	Early on I also realised that it would be benifitial to store the boards 
	state seperatly to how the board is displayed. The advantages of this
	is that it allows me to adjust the player icons without messing up any of 
	the logic
	
	Once I had planned the data structures I could move on to planning out the 
	logic of the game. I knew that the hardest essentail feature would be 
	having the game check for when a player has won or not so I decided to 
	adress that first.

	After that the process consisted of working down my todo list slowly 
	adding features.

### SUCCESSES 
	When starting the AI I felt very daunted as I believed that it would 
	take a large amount of time, however I felt that the ai went fairly 
	smoothly. There were of course a fair amount of road bumps but I felt
	I was able to get over the road bumps in an effecient manner 

	Css animations was the part of this project that I had by far the 
	least expierence in, only having done it once in a previous project.
	This was one of the reasons I decided to incorporate animations so heavily
	as I knew doing this would help me learn a lot about css animations.
	I am not only very happy with how the animations turned out but also 
	with the expierence I gained throughout this project

### Difficulties 
	The largest difficulty in this project by far was trying to achieve the 
	large scope of the project in the roughly 50 hours we had. While I dont 
	regret aiming for such a large scope I definitly realise that it did require
	me to make certain trade off's. 

	One of the big trade offs I had to make was the structure of my code base
	while I did put thought into make code base, doing things like splitting up
	the code base into seperate files, and attempting to use reuseable files.
	I also realise that it is nowehere near perfect. There are some pieces of 
	code that repeat and some of the files have become difficult to read.
	if given more time I would have spent more time to make sure that my code 
	base fits in with the DRY priniciple. 
#### INFO

	This project was made by KEEGAN PRATT as part of the 
	General Assembly Software Engeneering Immersive 

			-- Sounds Come From ZapSplat -- 

