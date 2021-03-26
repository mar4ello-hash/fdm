import React, {useEffect, useState} from 'react'
import './Game.css'
import Tile from './Tile'

import {levels} from './levels' //images for each level
import {TimeIsUp, timeLeft} from "./Timer"; //timer boolean and how much time left
import PopUp from "./PopUp";

export let FinalScore; //Final score to export
export let FinalTime; //Final time to export

export const username = "guest" //nickname to put into database

const Game = () => {

    const [lvlIndex, setLvlIndex] = useState(0) //level index 0 1 2 3 4 5 6 7
    const [images, setImages] = useState([]) //images
    const [deck, setDeck] = useState([]) //deck of tiles
    const [selectedTiles, setSelectedTiles] = useState([]) //selected tiles
    const [matchedPairs, setMatchedPairs] = useState(0) //number of matched pairs
    const [pairs, setPairs] = useState(0) //number of pairs
    const [score, setScore] = useState(0) //score
    const [gameWon, setGameWon] = useState(false)

    //when time is up - set Final Score
    if (TimeIsUp) {
        FinalScore = score
    }

    //getting images and pairs
    useEffect(() => {
        getImagesAndPairs()
    })

    //generating tiles
    useEffect(() => {
        generateTiles()
    }, [images])

    //function to get images from current level
    const getImagesAndPairs = () => {
        if (lvlIndex < 10) { //if it's not the last level
            //if all pairs were matched and Time is not up, level++
            if (matchedPairs === pairs && pairs !== 0 && !(TimeIsUp)) {
                setTimeout(() => {
                    setLvlIndex(lvlIndex + 1)
                }, 500)
                setMatchedPairs(0)
            }

            let img = levels[lvlIndex] //all images from current level

            setPairs(img.length) //setting pairs
            setImages(img) //setting images
        } else {
            //all levels completed || you won!
            FinalScore = score
            FinalTime = timeLeft
            setGameWon(true)
        }
    }

    const generateTiles = () => {
        let id = 0
        let tiles = []
        //generating each tile two times with following attributes
        images.forEach((image, key) => {
            for (let i = 0; i < 2; i++) {
                tiles.push({
                    id: id++,
                    pair: key,
                    image: image,
                    selected: false,
                    matched: false,
                    rotated: false
                })
            }
        })

        rotateTiles(tiles)

        setDeck(shuffleDeck(tiles))
    }

    //every second image should be rotated
    const rotateTiles = (tiles) => {
        for (let i = 0; i < tiles.length; i++) {
            if (i % 2 === 0) {
                tiles[i].rotated = true
            }
        }
    }

    //shuffle function
    const shuffleDeck = (tiles) => {
        return tiles
            .map(a => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map(a => a[1])
    }

    const onTileClick = tile => () => {
        //if there is already 2 selected tiles || if the clicked tile is already selected
        if (selectedTiles.length === 2 || (selectedTiles.length === 1 && selectedTiles[0].id === tile.id)) return
        //adding current tile to previously selected
        const newTiles = [...selectedTiles, tile]
        setSelectedTiles(newTiles)

        tile.selected = true //setting tile to selected for css purposes

        //result of two compared tiles
        const tilesMatched = validation(newTiles)

        //adding pair to matched
        if (tilesMatched) {

            //score to add
            if (!(TimeIsUp)) {
                const totalScore = score + addScore(lvlIndex)
                setScore(totalScore)
            }

            newTiles[0].matched = true
            newTiles[1].matched = true
            setSelectedTiles(newTiles)

            setMatchedPairs(matchedPairs + 1)
        }

        //resetting selected tiles if 2 are selected
        if (newTiles.length === 2) {

            setTimeout(() => {

                newTiles[0].selected = false
                newTiles[1].selected = false

                setSelectedTiles(newTiles)

                setSelectedTiles([])
            }, 300)
        }

        //function to compare two selected tiles
        function validation(tiles) {
            return tiles.length === 2 && tiles[0].pair === tiles[1].pair
        }

        //scoring system
        function addScore(level) {

            return (level + 1) * 25 //each level +25 for tile match
        }
    }

    return (

        <div className="field">

            {TimeIsUp || gameWon ? <PopUp gameWon={gameWon}/> : null}

            <h2 className="Score"> Score: {score} </h2>

            <div className="Game">
                {
                    deck.map(tile => {
                        return <Tile
                            key={tile.id}
                            tile={tile}
                            onClick={onTileClick(tile)}
                        />
                    })
                }
            </div>
        </div>

    )
}

export default Game