import React from 'react'
import '../../BasicElements/DSStyles.css'

import { Canvas } from './Canvas.jsx';

function Main2({props}){
  return(
    <>
      <div className="PageContents">
        <div className="Viz DS2">
          <Canvas />
        </div>
      </div>
    </>
  )
}

export default Main2;
