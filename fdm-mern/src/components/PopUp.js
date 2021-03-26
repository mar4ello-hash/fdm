import React from "react";
import './PopUp.css'

import {FinalScore, FinalTime, username} from "./Game";

const PopUp = ({gameWon}) => {

    return (
        <div className="modal">
            <div className="modal_content">
                <form>
                    {/*If game won ? "You won!" else : "Time is up!"*/}
                    <h1> {gameWon ? "You won!" : "Time is up!"} </h1>
                    <h3> {username}, your final score is: {FinalScore} </h3>
                    {/*If game won - show how much time left*/}
                    <h3> {gameWon ? "Time left: " + Math.round(FinalTime) + "s" : null} </h3>
                    {/*Reload Page*/}
                    <button onClick={() => window.location.reload(false)} className="btn">Play Again</button>
                    {/*Redirecting back to main menu*/}
                    <button onClick={() => console.log("REDIRECTING...")} className="btn">Exit</button>
                </form>
            </div>
        </div>
    )
}

export default PopUp