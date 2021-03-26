import React from 'react'
import './Tile.css'

const Tile = ({ tile, onClick}) => {

    const image = tile.image //image
    let tileName = "Tile" //css styles
    let imgName = ""

    if(tile.selected && !(tile.rotated)){ //css style when tile is selected
        imgName = "selected"
    }
    else if(tile.selected && tile.rotated){ //css style when rotated tile is selected
        imgName = "selectedR"
    }
    else if(tile.matched && !(tile.rotated)){ //css styles when tiles are matched
        tileName = "matched"
        imgName = ""
    }
    else if(tile.matched && tile.rotated){ //css styles when rotated tile matched
        tileName="matched"
        imgName = "rotate90"
    }
    else if(tile.rotated){ //css for rotated tile
        imgName = "rotate90"
    }

    return(
        <div className={tileName} onClick={onClick}>

            <img className={imgName} src={image} alt="" />

        </div>
    )
}

export default Tile