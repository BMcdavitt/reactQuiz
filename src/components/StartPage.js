import React from "react";

export default function StartPage (props) {

    function startGameClick() {
        props.startGame("Play")
    }

    return(
        <div>
            <img src="images/blob1.png" className="blob1" alt="blob1"/>
            <div className="content">
                <h1 className="startTitle">Quizzical</h1>
                <button className="startPageButton" onClick={startGameClick}>Start quiz</button>
            </div>
            <img src="images/blob2.png" className="blob2" alt="blob2"/>
        </div>
    )
}