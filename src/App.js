import React from "react";
import StartPage from "./components/StartPage.js"
import GamePage from "./components/GamePage.js"

export default function App() {

    let [GameState, UpdateGameState] = React.useState("Start")

    return(
        GameState === "Start" ? <StartPage startGame={UpdateGameState}/> : <GamePage />
    )
}