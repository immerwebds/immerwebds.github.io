import * as THREE from 'three'
import React, { useRef, useCallback, useLayoutEffect, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame } from '@react-three/fiber'

import { OrthoCamera, MiniMap, If, statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.jsx';
import * as IMM from '../Animations/Immersive.jsx';
import * as ANM from '../Animations/Animated.jsx';
import * as STT from '../Animations/Static.jsx';
import { TextComponent, TextComponent_Static }  from '../Components/Texts.jsx';
import { VisComponent_Immersive } from '../Components/Viz_Immersive.jsx';
import { VisComponent_Animated }  from '../Components/Viz_Animated.jsx';
import { VisComponent_Static }    from '../Components/Viz_Static.jsx';
import { Immersive, Animated, Static }          from '../../BasicElements/Constants.jsx';
import { totalFrame, TextComponentHeight }      from './Constants_DS1.jsx';
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { useStore }                             from './Store.jsx';
import '../styles/Canvas.css';

function Canvas() {
  const canvas = useRef();
  const type = useBasicStore((state) => state.type);

  const setAnimation_Imm = useStore((state)=> state.setAnimation_Imm);
  const setAnimation_Anm = useStore((state)=> state.setAnimation_Anm);
  const setAnimation_Stt = useStore((state)=> state.setAnimation_Stt);
  const setIdx = useStore((state) => state.setIdx);
  const setTarget = useStore((state) => state.setTarget);

  const steps = useMemo(() => statesConverter(IMM.clipPositions_DS1, IMM.stoppers_DS1), []);
  const scrollLength = type==Static?6000:11000;

  const handleScroll = useCallback((e) => {

  }, [totalFrame]);

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      setTarget(document.getElementById("scroller").scrollTop / scrollLength * totalFrame);
      setIdx();
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useLayoutEffect(() => {
    setAnimation_Imm(AnimationGenerator(
      totalFrame,
      IMM.clipPositions_DS1,
      IMM.stoppers_DS1,
      IMM.getClips(),
      IMM.getTransitions()
    ));

    setAnimation_Anm(AnimationGenerator(
      totalFrame,
      ANM.clipPositions_DS1,
      ANM.stoppers_DS1,
      ANM.getClips(),
      ANM.getTransitions()
    ));

    setAnimation_Stt(AnimationGenerator(
      totalFrame,
      STT.clipPositions_DS1,
      STT.stoppers_DS1,
      STT.getClips(),
      STT.getTransitions()
    ));

    document.getElementById("scroller").addEventListener('scroll', handleScroll, {passive: false});
    document.getElementById("dummy").style.height = scrollLength + "px";
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [type])

  return (
    <div id={"scroller"} className={"type_"+type}>
      <div className={"Canvas" + (type==Immersive?'I': type==Animated?'A':'S')}>
        <Suspense fallback={<div>Now Loading</div>}>
          <THREECanvas
            ref={canvas}
            dpr={Math.max(window.devicePixelRatio, 2)}
            gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
            >
            <CanvasComponents steps={steps} />
          </THREECanvas>
        </Suspense>
      </div>
      <div id={"dummy"}> . </div>
    </div>
  )
}

function CanvasComponents({steps, ...props}){
  const mainCamera = useRef();
  const mainViz = useRef();
  const mainText = useRef();

  const idx = useStore((state) => state.idx);
  const type = useBasicStore((state) => state.type);
  const setStep = useStore((state) => state.setStep);
  const setProgress = useStore((state) => state.setProgress);
  const setOpacity = useStore((state) => state.setOpacity);
  const animations = useStore((state) => type==Immersive?state.animation_Imm:type==Animated?state.animation_Anm:state.animation_Stt);

  const vec3 = new THREE.Vector3();
  const textCamPos = new THREE.Vector3(0, 20000, 1000);

  useLayoutEffect(() =>{
    console.log("CanvasComponents rerendered");
  }, [])

  useFrame((state, delta) => {
    // console.log(idx)
    if(type == Animated || type == Immersive || type == Static){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_group1 = animations[0]["animation"][idx];
      let animation_camera = animations[1]["animation"][idx];
      let animation_text = type != Static? animations[2]["animation"][idx]: undefined;

      if(mainViz.current && mainText.current && mainCamera.current){
        if(type == Immersive){
          setOpacity(animation_group1.opacity);

          mainViz.current.position.setX(animation_group1.pos[0]);
          mainViz.current.position.setY(animation_group1.pos[1]);
          mainViz.current.position.setZ(animation_group1.pos[2]);
          mainViz.current.rotation.x = animation_group1.rot?animation_group1.rot[0]:0;
          mainViz.current.rotation.y = animation_group1.rot?animation_group1.rot[1]:0;
          mainViz.current.rotation.z = animation_group1.rot?animation_group1.rot[2]:0;

          mainCamera.current.position.setX(animation_camera.pos[0]);
          mainCamera.current.position.setY(animation_camera.pos[1]);
          mainCamera.current.position.setZ(animation_camera.pos[2]);
          mainCamera.current.zoom = animation_camera.zoom;
          mainCamera.current.updateProjectionMatrix();
          mainCamera.current.lookAt(0, 0, 0);

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_text.pos + TextComponentHeight * 0.02);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_text.pos + TextComponentHeight * 0.02, textCamPos.z);
        }else if(type == Animated){
          setOpacity(animation_group1.opacity);
          setProgress(animation_group1.progress);

          mainCamera.current.position.setX(animation_camera.pos[0]);
          mainCamera.current.position.setY(animation_camera.pos[1]);
          mainCamera.current.position.setZ(animation_camera.pos[2]);
          mainCamera.current.updateProjectionMatrix();
          mainCamera.current.lookAt(0, 0, 0);

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_text.pos + TextComponentHeight * 0.02);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_text.pos + TextComponentHeight * 0.02, textCamPos.z);
        }else if(type == Static){
          mainViz.current.position.setX(animation_group1.pos[0]);
          mainViz.current.position.setY(animation_group1.pos[1]);
          mainViz.current.position.setZ(animation_group1.pos[2]);
          mainViz.current.rotation.x = animation_group1.rot?animation_group1.rot[0]:0;
          mainViz.current.rotation.y = animation_group1.rot?animation_group1.rot[1]:0;
          mainViz.current.rotation.z = animation_group1.rot?animation_group1.rot[2]:0;

          mainCamera.current.position.setX(animation_camera.pos[0]);
          mainCamera.current.position.setY(animation_camera.pos[1]);
          mainCamera.current.position.setZ(animation_camera.pos[2]);
          mainCamera.current.updateProjectionMatrix();
          mainCamera.current.lookAt(0, 0, 0);

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_group1.pos[1] + TextComponentHeight * 0.04);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_group1.pos[1] + TextComponentHeight * 0.04, textCamPos.z);
        }
      }
    }
  });

  // VisComponent는 각자 Animation을 결정하기 위한 prop을 적절하게 받아야 하며 이는 위에 useFrame과 일관성이 있어야 합니다.
  return(
    <>
      <OrthoCamera ref={mainCamera} />
      <ambientLight intensity={0.6}/>
      <If if={type == Immersive}>
        <VisComponent_Immersive ref={mainViz} />
        <TextComponent ref={mainText} />
      </If>
      <If if={type == Animated}>
        <VisComponent_Animated ref={mainViz} />
        <TextComponent ref={mainText} />
      </If>
      <If if={type == Static}>
        <VisComponent_Static ref={mainViz} />
        <TextComponent_Static ref={mainText} />
      </If>
      <MiniMap />
    </>
  )
}

export { Canvas };
