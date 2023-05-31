import React from 'react'
import '../../scss/index.scss'
export const Loader = ({text, textRequired}) => (

    <div className='loader-wrapper'>
      <div className="lds-facebook"><div></div><div></div><div></div></div>
      {textRequired && text}
    </div>

)

