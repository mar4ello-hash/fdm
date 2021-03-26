import React from 'react'
import './Timer.css'

export let TimeIsUp //boolean to finish the game
export let timeLeft //time left

const Timer = () => {

    timeLeft = 120 // time left in seconds
    let lineTimer = setInterval(function (){
        if(timeLeft <= 0){
            clearInterval(lineTimer)
            TimeIsUp = true //game is finished, time is up
        }
        document.getElementById("progressBar").value = 120 - timeLeft
        timeLeft -= 0.1
    }, 100)

    return(
        <div className="Timer">
            <progress value="0" max="120" id="progressBar"/>
        </div>
    )
}

export default Timer