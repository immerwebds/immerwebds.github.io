import * as THREE from 'three'
import React, { useRef, useCallback, useLayoutEffect, useMemo, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera } from '@react-three/drei';

import { MiniMap, If, statesConverter, AnimationGenerator } from '../../BasicElements/BasicElements.jsx';
import * as DIS from '../Animations/Distribution.jsx';
import * as IMM from '../Animations/Immersive.jsx';
import * as ANM from '../Animations/Animated.jsx';
import * as STT from '../Animations/Static.jsx';
import { TextComponent, TextComponent_Static }          from '../Components/Texts.jsx';
import { VisComponent_Immersive } from '../Components/Viz_Immersive.jsx';
import { VisComponent_Animated }  from '../Components/Viz_Animated.jsx';
import { VisComponent_Static }    from '../Components/Viz_Static.jsx';
import { Immersive, Animated, Static } from '../../BasicElements/Constants.jsx';
import { totalFrame, TextComponentHeight } from './Constants_DS2.jsx';
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { useStore } from './Store.jsx';
import '../styles/Canvas.css';

function Canvas() {
  const canvas = useRef();
  const type = useBasicStore((state) => state.type);

  const setAnimation_Imm = useStore((state)=> state.setAnimation_Imm);
  const setAnimation_Anm = useStore((state)=> state.setAnimation_Anm);
  const setAnimation_Stt = useStore((state)=> state.setAnimation_Stt);
  const setAnimation_Dist = useStore((state)=> state.setAnimation_Dist);
  const setIdx = useStore((state) => state.setIdx);
  const setTarget = useStore((state) => state.setTarget);

  const steps1 = useMemo(() => statesConverter(IMM.clipPositions_DS2, IMM.stoppers_DS2), []);
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

  useLayoutEffect(() =>{
    setAnimation_Imm(AnimationGenerator(
      totalFrame,
      IMM.clipPositions_DS2,
      IMM.stoppers_DS2,
      IMM.getClips(),
      IMM.getTransitions()
    ));

    setAnimation_Anm(AnimationGenerator(
      totalFrame,
      ANM.clipPositions_DS2,
      ANM.stoppers_DS2,
      ANM.getClips(),
      ANM.getTransitions()
    ));

    setAnimation_Stt(AnimationGenerator(
      totalFrame,
      STT.clipPositions_DS2,
      STT.stoppers_DS2,
      STT.getClips(),
      STT.getTransitions()
    ));

    setAnimation_Dist(AnimationGenerator(
      totalFrame,
      DIS.clipPositions_Dist2,
      DIS.stoppers_Dist2,
      DIS.getClips(),
      DIS.getTransitions()
    ));

    document.getElementById("scroller").addEventListener('scroll', handleScroll, {passive: false});
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

const OrthoCamera1 = React.forwardRef((props, ref) => {
  return(
    <>
      <OrthographicCamera ref={ref} makeDefault
        position={[0, 0, 1000]}
        near={0}
        far={10000}
        zoom={6.25}
        />
    </>
  );
});

function CanvasComponents({steps, ...props}){
  const mainCamera = useRef();
  const controls = useRef();
  const mainViz = useRef();
  const mainText = useRef();

  const idx = useStore((state) => state.idx);
  const type = useBasicStore((state) => state.type);
  const setStep = useStore((state) => state.setStep);
  const setWaterLevel = useStore((state) => state.setWaterLevel);
  const setOpacity = useStore((state) => state.setOpacity);
  const animation_main = useStore((state) => type==Immersive?state.animation_Imm:type==Animated?state.animation_Anm:state.animation_Stt);
  const animation_dist = useStore((state) => state.animation_dist);
  const textCamPos = new THREE.Vector3(0, 20000, 1000);

  useFrame((state, delta) => {
    if(type == Animated || type == Immersive || type == Static){
      let preStep = steps.findIndex((ele) => ele >= idx/totalFrame) - 1;
      setStep(2*Math.floor((preStep-1)/3)+(preStep%3==1?1:2));

      let animation_group1 = animation_main[0]? animation_main[0]["animation"][idx]:null;
      let animation_camera = animation_main[1]? animation_main[1]["animation"][idx]:null;
      let animation_text = type == Immersive? animation_main[2]["animation"][idx]: undefined;

      if(mainViz.current && mainText.current && mainCamera.current){
        setWaterLevel(animation_group1.waterLevel);
        setOpacity(animation_group1.opacity);

        if(type == Immersive){
          mainViz.current.position.setX(animation_group1.pos[0]);
          mainViz.current.position.setY(animation_group1.pos[1]);
          mainViz.current.position.setZ(animation_group1.pos[2]);
          mainViz.current.rotation.x = animation_group1.rot[0];
          mainViz.current.rotation.y = animation_group1.rot[1];
          mainViz.current.rotation.z = animation_group1.rot[2];

          mainCamera.current.position.setX(animation_camera.pos[0]);
          mainCamera.current.position.setY(animation_camera.pos[1]);
          mainCamera.current.position.setZ(animation_camera.pos[2]);
          mainCamera.current.zoom = animation_camera.zoom;
          mainCamera.current.updateProjectionMatrix();
          mainCamera.current.lookAt(0, animation_camera.pos[1], 0);

          if(mainCamera.current){
            let worldDirection = new THREE.Vector3(0, 0, 0);
            mainCamera.current.getWorldDirection(worldDirection);
            controls.current.target = mainCamera.current.position.add(worldDirection.multiplyScalar(100));
            controls.current.update();
          }

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_text.pos + TextComponentHeight * 0.02);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_text.pos + TextComponentHeight * 0.02, textCamPos.z);
        }else if(type == Animated){
          mainCamera.current.position.setX(0);
          mainCamera.current.position.setY(0);
          mainCamera.current.position.setZ(6250);
          mainCamera.current.zoom = 6.25;
          mainCamera.current.updateProjectionMatrix();
          mainCamera.current.lookAt(0, 0, 0);

          mainText.current.position.setX(textCamPos.x);
          mainText.current.position.setY(textCamPos.y + animation_camera.pos + TextComponentHeight * 0.02);
          mainText.current.position.setZ(textCamPos.z - 100);
          mainText.current.lookAt(textCamPos.x, textCamPos.y + animation_camera.pos + TextComponentHeight * 0.02, textCamPos.z);
        }else if(type == Static){
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
    {
      // <OrthoCamera ref={mainCamera} />
      <>
        <OrthoCamera1 ref={mainCamera} />
        <OrbitControls
          ref={controls}
          camera={mainCamera.current}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          zoomSpeed={0.25}
          style={{zIndex: 5}}/>
      </>
    }
      <ambientLight intensity={0.8}/>
      <directionalLight color={"rgb(255,255,255)"} position={[-3, 5, 5]} />
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
