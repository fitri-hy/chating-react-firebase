import React from 'react'
import "./Loading.css"
import LoadingGif from "../../../assets/loading.gif"

const Loading = () => {
    return (
        <div id="loading" >
			<img src={LoadingGif} width="150" height="150"/>
        </div>
    )
}

export default Loading
