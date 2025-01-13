import React, { useEffect, useLayoutEffect } from 'react'
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { useStore } from './Store.jsx';

import { Immersive } from '../../BasicElements/Constants.jsx';
import { If } from '../../BasicElements/BasicElements.jsx';
import { texts, texts_as } from './Constants_DS4.jsx';
import '../../BasicElements/DSStyles.css'

import { Canvas } from './Canvas.jsx';

function NarrativeBox(props){
  const setPrevFunc = useStore((state)=> state.setPrev);
  const setNextFunc = useStore((state)=> state.setNext);
  const initStore = useStore((state) => state.initStore)
  const type = useBasicStore((state) => state.type);

  let text = type==Immersive?texts:texts_as;
  let container = ""

  const step = useStore((state) => state.narrativeStep);

  useLayoutEffect(() => {
    setPrevFunc();
  }, []);

  return(
    <div className ={"ColumnContainer"}>
      <If if={step==0}>
        <h1 className="TitleDS4" id="title" name="title">
          {"Mortality rates of France in History"}
        </h1>
        <div className ="RowContainer">
          <button className="NarrativeButton" onClick={(e) => setNextFunc(e, type)} type="button">
            Start
          </button>
        </div>
      </If>

      <If if={step != 0}>
        <div className="Story" id="story" name="story">
          {text[step]}
        </div>
        <div className ="RowContainer">
          <If if={step == 5}>
            <button className="NarrativeButton" onClick={(e) => setPrevFunc(e, type)} type="button">
              ← Prev
            </button>
          </If>
          <If if={step != 5}>
          <button className="NarrativeButton" onClick={(e) => setPrevFunc(e, type)} type="button">
            ← Prev
          </button>
          <button className="NarrativeButton" onClick={(e) => setNextFunc(e, type)} type="button">
            Next →
          </button>
        </If>
        </div>
      </If>
    </div>
  )
}

function Main4({props}){
  const type = useBasicStore((state) => state.type);
  const setType = useBasicStore((state) => state.setType);

  // narratiev related codes
  const step = useStore((state) => state.narrativeStep);
  const setNarrativeStep = useStore((state) => state.setNarrativeStep);
  const flag2 = useStore((state) => state.flag2);

  useEffect(() => {
    if(type == Immersive && document.getElementById('Canvas')){
      if(!flag2){
        document.getElementById('Canvas').style.cursor = step==0?'default':'grab';
      }else{
        document.getElementById('Canvas').style.cursor = 'default';
      }
    }
  }, [flag2]);

  function handleHover(){
    if(type == Immersive){
      console.log(flag2);
      if(!flag2){
        document.getElementById('Canvas').style.cursor = step==0?'default':'grab';
      }else{
        document.getElementById('Canvas').style.cursor = 'default';
      }
    }
  }

  function handleMouseDown(){
    if(type == Immersive){
      if(!flag2){
        document.getElementById('Canvas').style.cursor = step==0?'default':'grabbing';
      }
    }
  }

  function handleMouseUp(){
    if(type == Immersive){
      if(!flag2){
        document.getElementById('Canvas').style.cursor = step==0?'default':'grab';
      }
    }
  }

  return(
    <>
      <div className="PageContents">
        <div className="Viz DS4">
          <div className='DS4Layout'>
            <div id='Canvas'
              onMouseUp={handleMouseUp}
              onMouseDown={handleMouseDown}>
              <Canvas
                gl={{ logarithmicDepthBuffer: true }}
                onCreated={(state) => (state.gl.localClippingEnabled = true)} />
            </div>
            <NarrativeBox className='NarrativeBox'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Main4;
