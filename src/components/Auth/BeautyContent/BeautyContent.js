import React from 'react'
import IlusForm from './ilus-form/IlusForm'
import LogoForm from "../../All/logo-form/LogoForm"
import Rights from './rights/Rights'
import WaveForm from './wave-form/WaveForm'

const BeautyContent = () => {
    return (
        <div id="beuty-content" >
            <LogoForm />
            <WaveForm />
            <IlusForm />
            <Rights />
        </div>
    )
}

export default BeautyContent
