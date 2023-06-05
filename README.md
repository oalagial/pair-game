# Pair Game

## Installation
1. Clone the repository: `git clone https://github.com/oalagial/pair-game.git`
2. Navigate to the project directory: `cd pair-game`
3. Install dependencies: `npm install`

## Run json-server (Leaderboard)
Run in other terminal `json-server --watch leaderboard.json --port 3001`

## Usage of frontend app
1. Start the development server: `npm run dev`
2. Open the application in your browser: `http://127.0.0.1:5173/`


## Technologies Used
- React
- React Router
- State management library (e.g., Redux, Redux toolkit)
- json-server
- Material UI

## Game Rules
The player will be briefly (for 10 seconds) presented with 20 images arranged at a grid of
5 columns by 4 rows containing pairs of 10 randomly selected images from the given set,
placed at shuffled positions i.e. identical images should not be placed side by side unless
this arrangement is proposed by your randomization process.
Once the images are masked, the player’s task is to find the identical images creating
pairs by clicking on the images. Each correct pair grants 1 (one) point while every wrong pair
costs 1 (one) of the lives available. The player starts the game with 3 lives.
The correctly identified pairs remain unmasked while the wrongly identified ones get
masked again after 4 seconds.
After successfully discovering all the pairs of a board with 5 x 4 images (from now on
we may call it level) an extra life is granted and a new level is presented with randomized
images. The maximum amount of lives a player can have at any given time, is 5.
The game ends when all available lives are lost.


