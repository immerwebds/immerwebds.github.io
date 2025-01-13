import React, { useState, useLayoutEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { useStore } from './Store.jsx';

import { totalFrame } from './Constants_DS2.jsx';
import { Static, Animated, Immersive, EndOfTask} from '../../BasicElements/Constants.jsx';
import { If } from '../../BasicElements/BasicElements.jsx';
import '../../BasicElements/DSStyles.css'

import { Canvas } from './Canvas.jsx';

function Main2({props}){
  const type = useBasicStore((state) => state.type);
  const setType = useBasicStore((state) => state.setType);

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
