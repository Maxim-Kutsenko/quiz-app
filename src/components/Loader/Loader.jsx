import React from 'react'
import './loader.scss'
const Loader = ({text, textRequired}) => (

    <div className='loader-wrapper'>
      <div className="lds-facebook"><div></div><div></div><div></div></div>
      {textRequired && text}
    </div>

)

export default Loader