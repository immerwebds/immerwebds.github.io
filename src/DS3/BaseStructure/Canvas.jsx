import * as THREE from 'three'
import React, { useRef, useCallback, useLayoutEffect, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame, useThree } from '@react-three/fiber'
import { OrthographicCamera } from '@react-three/drei';

import { DS3Camera, MiniMap, If, statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.jsx';
import * as IMM from '../Animations/Texts_IMM.jsx';
import * as ANM from '../Animations/Texts_ANM.jsx';
import * as RL from '../Animations/rail.jsx';
import * as RLANM from '../Animations/rail_ANM.jsx';
import * as STT from '../Animations/Static.jsx';
import { TextComponent, TextComponent_Animated, TextComponent_Static }          from '../Components/Texts.jsx';
import { VisComponent_Immersive } from '../Components/Viz_Immersive.jsx';
import { VisComponent_Animated }  from '../Components/Viz_Animated.jsx';
import { VisComponent_Static }    from '../Components/Viz_Static.jsx';

import { Immersive, Animated, Static } from '../../BasicElements/Constants.jsx';
import { totalFrame, TextComponentHeight, SCALE_X, SCALE_Y } from './Constants_DS2.jsx';
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { useStore } from './Store.jsx';
import '../styles/Canvas.css';

function Canvas() {
  const canvas = useRef();
  const type = useBasicStore((state) => state.type);

  const setAnimation_Text = useStore((state)=> state.setAnimation_Text);
  const setAnimation_Rl = useStore((state)=> state.setAnimation_Rl);
  const setAnimation_RlANM = useStore((state)=> state.setAnimation_RlANM);
  const setAnimation_Stt = useStore((state)=> state.setAnimation_Stt);
  const setIdx = useStore((state) => state.setIdx);
  const setTarget = useStore((state) => state.setTarget);

  const scrollLength = type==Static?5000:type==Animated?15000:15000;

  const stoppers1      = useMemo(() => type==Immersive? IMM.stoppers_DS2 : ANM.stoppers_DS2, [type]);
  const clipPositions1 = useMemo(() => type==Immersive? IMM.clipPositions_DS2 : ANM.clipPositions_DS2, [type]);
  const steps1         = useMemo(() => statesConverter(clipPositions1, stoppers1), []);

  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      setTarget(document.getElementById("scroller").scrollTop / scrollLength* totalFrame);
      setIdx();
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  useLayoutEffect(() =>{
    setAnimation_Text(AnimationGenerator(
      totalFrame,
      type==Immersive? IMM.clipPositions_DS2 : ANM.clipPositions_DS2,
      type==Immersive? IMM.stoppers_DS2 : ANM.stoppers_DS2,
      type==Immersive? IMM.getClips() : ANM.getClips(),
      type==Immersive? IMM.getTransitions() : ANM.getTransitions()
    ));

    setAnimation_Rl(AnimationGenerator(
      totalFrame,
      RL.clipPositions_DS2,
      RL.stoppers_DS2,
      RL.getClips(),
      RL.getTransitions()
    ));

    setAnimation_RlANM(AnimationGenerator(
      totalFrame,
      RLANM.clipPositions_DS2,
      RLANM.stoppers_DS2,
      RLANM.getClips(),
      RLANM.getTransitions()
    ));

    setAnimation_Stt(AnimationGenerator(
      totalFrame,
      STT.clipPositions_DS2,
      STT.stoppers_DS2,
      STT.getClips(),
      STT.getTransitions()
    ));

    // document.getElementById("scroller").addEventListener('scroll', handleScroll, {passive: false});
    document.getElementById("dummy").style.height = scrollLength + "px";
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [type]);

  return (
    <div id={"scroller"} className={"type_"+type}>
      <div className={"Canvas" + (type==Immersive?'I': type==Animated? 'A':'S')}>
        <Suspense fallback={<div>Now Loading</div>}>
          <THREECanvas
            ref={canvas}
            dpr={Math.max(window.devicePixelRatio, 2)}
            gl={{ alpha: true, antialias: true, toneMapping: THREE.NoToneMapping }}
            linear flat
            >
            <CanvasComponents steps={steps1} />
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

  const {gl} = useThree();
  // console.log(gl);
  const textCamPos = new THREE.Vector3(0, 20000,1000);
  const idx = useStore((state) => state.idx);
  const type = useBasicStore((state) => state.type);
  const step = useStore((state) => state.step);
  const setStep = useStore((state) => state.setStep);
  const animation_text = useStore((state) => state.animation_text);
  const animation_rl = useStore((state) => state.animation_rl);
  const animation_rlANM = useStore((state) => state.animation_rlANM);
  const animation_Stt = useStore((state) => state.animation_Stt);

  const setHigh_Y = useStore((state) => state.setHigh_Y);
  const setLow_Y = useStore((state) => state.setLow_Y);
  const setHigh_X = useStore((state) => state.setHigh_X);
  const setLow_X = useStore((state) => state.setLow_X);

  useFrame((state, delta) => {
    if(type == Animated || type == Immersive || type == Static){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_TEXT = type != Static? animation_text[0]["animation"][idx]: undefined;

      if(mainViz.current && mainText.current && mainCamera.current){
        if(type == Immersive){
          let animation_camera_rl = animation_rl[0]["animation"][idx];

          let goX = 100 / 30 * SCALE_X * animation_camera_rl.railMove[0];
          let goY = 5 * SCALE_Y * animation_camera_rl.railMove[1];
          mainCamera.current.position.setX(animation_camera_rl.pos[0] + goX);
          mainCamera.current.position.setY(animation_camera_rl.pos[1] + goY);
          mainCamera.current.position.setZ(animation_camera_rl.pos[2]);

          mainCamera.current.lookAt(
            animation_camera_rl.lookAt[0] + animation_camera_rl.lookAtGap + goX,
            animation_camera_rl.lookAt[1] + goY,
            animation_camera_rl.lookAt[2]
          );

          mainCamera.current.rotateZ(Math.PI / 180 * animation_camera_rl.rot[2]);
          mainCamera.current.rotateY(Math.PI / 180 * animation_camera_rl.rot[1]);
          mainCamera.current.rotateX(Math.PI / 180 * animation_camera_rl.rot[0]);

          mainCamera.current.zoom = animation_camera_rl.zoom;

          // mainCamera.current.fov = Math.pow(window.innerHeight / 740, 0.75) * 80;
          mainCamera.current.aspect = gl.domElement.clientWidth / window.innerHeight
          mainCamera.current.fov = (360 / Math.PI) * Math.atan(Math.tan(((Math.PI / 180) * 80 / 2)) * (window.innerHeight / 740))
          mainCamera.current.updateProjectionMatrix();

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_TEXT.pos + TextComponentHeight * 0.02);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_TEXT.pos + TextComponentHeight * 0.02, textCamPos.z);
        }
        else if(type == Animated){
          let animation_chart = animation_rlANM[0]["animation"][idx];
          setHigh_Y(animation_chart.high_y);
          setLow_Y(animation_chart.low_y);
          setHigh_X(animation_chart.high_x);
          setLow_X(animation_chart.low_x);

          mainCamera.current.position.setX(8000);
          mainCamera.current.position.setY(1000 + animation_chart.camMove[1]);
          mainCamera.current.position.setZ(4900000);

          mainCamera.current.lookAt(8000, 1000 + animation_chart.camMove[1], 0);

          mainCamera.current.zoom = 600;

          mainCamera.current.fov = (360 / Math.PI) * Math.atan(Math.tan(((Math.PI / 180) * 80 / 2)) * (window.innerHeight / 740))
          mainCamera.current.updateProjectionMatrix();

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_TEXT.pos + TextComponentHeight * 0.02);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_TEXT.pos + TextComponentHeight * 0.02, textCamPos.z);
        }else if(type == Static){
          let animation_group1 = animation_Stt[0]? animation_Stt[0]["animation"][idx]:null;
          mainCamera.current.lookAt(0, 0, 0);

          // mainCamera.current.fov = Math.pow(window.innerHeight / 740, 0.75) * 80;
          mainCamera.current.updateProjectionMatrix();

          mainViz.current.position.setX(animation_group1.pos[0]);
          mainViz.current.position.setY(animation_group1.pos[1]);
          mainViz.current.position.setZ(animation_group1.pos[2]);

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_group1.pos[1] + TextComponentHeight * 0.04);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_group1.pos[1] + TextComponentHeight * 0.04, textCamPos.z);
        }
      }
    }
  });

  return(
    <>
      <If if={type == Immersive}>
        <DS3Camera ref={mainCamera} />
        <VisComponent_Immersive ref={mainViz} />
        <TextComponent ref={mainText} />
      </If>
      <If if={type == Animated}>
        <DS3Camera ref={mainCamera} />
        <VisComponent_Animated ref={mainViz} />
        <TextComponent_Animated ref={mainText} />
      </If>
      <If if={type == Static}>
        <OrthographicCamera ref={mainCamera} makeDefault
          position={[0, 0, 1000]}
          near={0}
          far={10000}
          zoom={6.25}
          />
        <VisComponent_Static ref={mainViz} />
        <TextComponent_Static ref={mainText} />
      </If>
      <MiniMap />
    </>
  )
}

export { Canvas };
