import React from 'react'
import wave from "../../../../assets/auth/wave-tr.svg"
import "./WaveForm.css"

const WaveForm = () => {
    return (
        <div className="wave" >
            <img src={wave} className="wave" alt="wave" />
        </div> 
    )
}

export default WaveForm
