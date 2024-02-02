import React from 'react'
import "./logo.scss"


interface LogoProps {
  text: string;
  }


const Logo: React.FC<LogoProps>= ({text}) => {
  return (
   <>
    <img src="/pakamLogo.svg" alt="" className="logo"/>
  <p className="create-text">
   {text}
  </p>
   </>
  )
}

export default Logo