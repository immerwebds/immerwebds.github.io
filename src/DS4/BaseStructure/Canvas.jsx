import * as THREE from 'three'
import React, { useRef, Suspense } from 'react'
import { Canvas as THREECanvas, useFrame } from '@react-three/fiber'
import { If } from '../../BasicElements/BasicElements.jsx';

import { VisComponent_Immersive} from '../Components/Viz_Immersive.jsx';
import { VisComponent_Animated} from '../Components/Viz_Animated.jsx';
import { VisComponent_Static }  from '../Components/Viz_Static.jsx';
import { Immersive, Animated, Static } from '../../BasicElements/Constants.jsx';
import { useStore } from './Store.jsx';
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import '../styles/Canvas.css';
import { OrbitControls, OrthographicCamera, PerspectiveCamera} from '@react-three/drei';

function Canvas({mode}) {
  const canvas = useRef();

  return (
    <div className={"Canvas" + (mode==Immersive?'I': mode==Animated? 'A':'S') + " DS4Canvas"}>
      <Suspense fallback={<></>}>
        <THREECanvas
          ref={canvas}
          dpr={Math.max(window.devicePixelRatio, 2)}
          linear flat
          >
          <CanvasComponents />
        </THREECanvas>
      </Suspense>
    </div>
  )
}

function CanvasComponents(props){
  const mainCamera = useRef();
  const mainViz = useRef();
  const controls = useRef();

  const type = useBasicStore((state) => state.type);
  const target = useStore((state) => state.target);
  const flag = useStore((state) => state.flag);
  const setFlag = useStore((state) => state.setFlag);
  const control = useStore((state) => state.control);
  const setControl = useStore((state) => state.setControl);
  const step = useStore((state) => state.narrativeStep);
  const progress = useStore((state) => state.progress);
  const setProgress = useStore((state) => state.setProgress);

  let look0 = new THREE.Vector3(target[0].look[0], target[0].look[1], target[0].look[2]);
  let look1 = new THREE.Vector3(target[1].look[0], target[1].look[1], target[1].look[2]);

  let clock = new THREE.Clock();
  let speed = 0.5;

  useFrame((state, delta) => {
    if(type == Static){
      if(flag){
        // 다음 장면이 오면 그냥 카메라만 바꿔주고 아무 일도 안해도 된다.
        mainCamera.current.lookAt(target[0].look[0], target[0].look[1], target[0].look[2]);
        mainCamera.current.position.setX(target[0].pos[0]);
        mainCamera.current.position.setY(target[0].pos[1]);
        mainCamera.current.position.setZ(target[0].pos[2]);
        mainCamera.current.zoom = target[0].zoom;
        mainCamera.current.updateProjectionMatrix();
        controls.current.target = new THREE.Vector3(target[1].look[0], target[1].look[1], target[1].look[2]);
        controls.current.update();
        setFlag(false);
        setControl(true);
      }
    }else if(type == Animated){
      if(flag){
        // set camera at first
        if(step != 5){
          let startPos = target[0].pos;
          mainCamera.current.lookAt(target[0].look[0], target[0].look[1], target[0].look[2]);
          mainCamera.current.position.setX(startPos[0]);
          mainCamera.current.position.setY(startPos[1]);
          mainCamera.current.position.setZ(startPos[2]);
          mainCamera.current.zoom = target[0].zoom;
          mainCamera.current.updateProjectionMatrix();
          controls.current.target = new THREE.Vector3(target[1].look[0], target[1].look[1], target[1].look[2]);
          controls.current.update();
        }
        // init Clock
        clock = new THREE.Clock();
        setFlag(false);
        // animate in each frame
        let tempProgress = progress;
        tempProgress[step] = 0
        setProgress(tempProgress);
        setControl(true);
      }

      // if animating
      if(control){
        let tempProgress = progress;
        // animate in each frame
        speed = step==1? 0.3: step==3?0.3 : 0.4
        tempProgress[step] = tempProgress[step] + clock.getDelta() * speed
        setProgress(tempProgress);

        // condition for the end of animation
        if(progress[step] >= 1){
          let temp = progress;
          temp[step] = 1;
          setProgress(temp);
          setControl(false);
        }
      }

    }else if(type == Immersive){
      if(mainViz.current && mainCamera.current && target && step == 0){
        mainCamera.current.position.setX(10);
        mainCamera.current.position.setY(10);
        mainCamera.current.position.setZ(3);
        mainCamera.current.lookAt(10, 0, 3);
      }else if(mainViz.current && mainCamera.current && target && step > 0){
        let camPos = mainCamera.current.position;

        if(flag){
          mainCamera.current.lookAt(target[0].look[0], target[0].look[1], target[0].look[2]);
          camPos.setX(target[0].pos[0]);
          camPos.setY(target[0].pos[1]);
          camPos.setZ(target[0].pos[2]);
          mainCamera.current.zoom = target[0].zoom;
          mainCamera.current.updateProjectionMatrix();
          setFlag(false);
          setControl(true);
        }

        if(control){
          if(target[1].type == "bezier"){
            camPos.setX(camPos.x + Math.max((target[1].pos[0] - camPos.x) * 0.030), 0.025);
            camPos.setY(camPos.y + Math.max((target[1].pos[1] - camPos.y) * 0.030), 0.025);
            camPos.setZ(camPos.z + Math.max((target[1].pos[2] - camPos.z) * 0.030), 0.025);
            mainCamera.current.zoom = mainCamera.current.zoom + (target[1].zoom - mainCamera.current.zoom) * 0.035;
            controls.current.target = look0.lerp(look1, 0.035);
            controls.current.update();
          }
          if(target[1].type == "linear"){

            camPos.setX(camPos.x + Math.max((target[1].pos[0] - camPos.x) * target[1].speed), 0.025);
            camPos.setY(camPos.y + Math.max((target[1].pos[1] - camPos.y) * target[1].speed), 0.025);
            camPos.setZ(camPos.z + Math.max((target[1].pos[2] - camPos.z) * target[1].speed), 0.025);
            mainCamera.current.zoom = mainCamera.current.zoom + (target[1].zoom - mainCamera.current.zoom) * target[1].speed;
            controls.current.target = look0.lerp(look1,target[1].speed);
            controls.current.update();
          }
          mainCamera.current.updateProjectionMatrix();

          // check end condition
          if(camPos.distanceTo(new THREE.Vector3(target[1].pos[0], target[1].pos[1], target[1].pos[2])) < 0.03){
            setControl(false);
          }
        }
      }
    }
  })

  return(
    <>
      <If if={type == Immersive}>
        <ambientLight intensity={0.55}/>
        <pointLight castShadow= {true} position={[150, 100, 100]} intensity={0.5} />
        <pointLight castShadow= {true} position={[150, 100, -180]} intensity={0.5} />
        <If if={step==0}>
          <OrthographicCamera ref={mainCamera} makeDefault
            position={[10, 10, 3]}
            near={-999}
            far={50000}
            zoom={45}
            />
        </If>
        <If if={step>0}>
          <PerspectiveCamera ref={mainCamera} makeDefault
            position={[-7, 11, -5]}
            near={0.1}
            far={50000}
            zoom={1}
          />
        </If>
        <OrbitControls
          ref={controls}
          camera={mainCamera.current}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.25}
          style={{zIndex: 5}}
          maxDistance={25}
          minDistance={2.5}
          minZoom={40}
          maxZoom={300}
          minPolarAngle={0}
          maxPolarAngle={1.57}/>
        <VisComponent_Immersive ref={mainViz} />
      </If>
      <If if={type == Animated}>
        <OrthographicCamera ref={mainCamera} makeDefault
          near={-999}
          far={50000}
          />
        <OrbitControls
          ref={controls}
          camera={mainCamera.current}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          zoomSpeed={0.25}
          style={{zIndex: 5}}
        />
        <ambientLight intensity={1}/>
        <VisComponent_Animated ref={mainViz} />
      </If>
      <If if={type == Static}>
        <OrthographicCamera ref={mainCamera} makeDefault
          near={-999}
          far={50000}
          />
        <OrbitControls
          ref={controls}
          camera={mainCamera.current}
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          zoomSpeed={0.25}
          style={{zIndex: 5}}
        />
        <ambientLight intensity={1}/>
        <VisComponent_Static ref={mainViz} />
      </If>
    </>
  )
}

export { Canvas };
