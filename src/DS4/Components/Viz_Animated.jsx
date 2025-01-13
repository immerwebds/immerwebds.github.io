import * as THREE from 'three'
import React, { useRef, useMemo, useEffect, useLayoutEffect, useCallback } from 'react'
import { useThree, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Line, If } from '../../BasicElements/BasicElements.jsx';
import { Static } from '../../BasicElements/Constants.jsx';
import { total_data, colorMap, Legend, Text, cuttingPlanes} from '../BaseStructure/Constants_DS4.jsx';
import { useStore } from '../BaseStructure/Store.jsx';
import { Line as DreiLine, CubicBezierLine } from '@react-three/drei';
import BezierEasing from 'bezier-easing';

//parameter
const data = total_data //total_data
const size = 0.1 //size of one box
const height = 40 //scale of value

const num_age = 80;
const num_year = 2019 - 1816 + 1;

const gap_na = 0.15; // distance between name and axis
const gap_ca = 0.3 // distance between chart and axis(padding)
const len_age = size * num_age + gap_ca;
const len_year = size * num_year;
const len_mortality = 4.5
const len_tick = 0.1;

const bezierFunc = BezierEasing(0.4, 0, 0.4, 1);

// Step 1, 2, 3, 4, 5
function Axis_Years(){
  const ref = useRef();
  const step = useStore((state) => state.narrativeStep);
  const ranges = useStore((state) => state.ranges);
  const progress = useStore((state) => state.progress);
  let bProgress = 1;

  useFrame(() => {
    bProgress = bezierFunc(Math.max(0, (progress[2] - 0.2)) * 1/0.8);
    ref.current.position.set(step==2? 0.8 * (1 - bProgress) : 0, 0, len_age);
  })

  return(
    <group ref={ref} name={'axis_age'} >
      <>
        {
          [...Array(21).keys()].map(i => i * 10 + 1820).map((year)=>{
            const xPos = (year - ranges['year'][0]) * size * ((2019 - 1816) / (ranges['year'][1] - ranges['year'][0]));
            return(
              <If if={xPos >= -0.01 && xPos <= len_year+0.01} key={'year_' + year + '_text_line'}>
                <group
                  position={[xPos, 0, 0]}>
                  <If if={step!=2}>
                    <Text position={[0, 0, gap_na]} text={String(year)} label={'xLC'} />
                    <Line start={[0, 0, 0]} end={[0, 0, len_tick]} color={'#444444'} />
                  </If>
                  <If if={step==2}>
                    <Text position={[0, -gap_na, 0]} text={String(year)} label={'-xyLC'} />
                    <Line start={[0, 0, 0]} end=  {[0, -len_tick, 0]} color={'#444444'} />
                  </If>
                </group>
              </If>
            )
          })
        }
        <If if={step!=2}>
          <Text position={[len_year / 2, 0, 1]} text={'Year'} label={'-zCC'} />
        </If>
        <If if={step==2}>
          <Text position={[len_year / 2, -1, 0]} text={'Year'} label={'yCC'} />
        </If>
        <Line start={[-gap_ca, 0, 0]} end={[len_year, 0, 0]} color={'#444444'} />
      </>
    </group>
  )
}

function Axis_Ages(){
  const step = useStore((state) => state.narrativeStep);
  const ranges = useStore((state) => state.ranges);

  const Ages = useMemo(() => {
    const tickNum = 9;
    const len = len_age;

    return(
      <>
        {
          [...Array(9).keys()].map(i => i * 10 + 0).map((val) =>{
            const zPos = gap_ca + (tickNum - 1) * 10 * size - (val * size - ranges['age'][0] * size) * 80 / (ranges['age'][1] - ranges['age'][0]);
            // - ((val * size * 80 / (ranges['age'][1] - ranges['age'][0])) - ranges['age'][0]);
            return(
              <If if={zPos >= gap_ca - 0.01 && zPos <= len_age + 0.01} key={'age_' + val + '_text_line'}>
                <group position={[0, 0, zPos]}>
                  <Text position={[-gap_na, 0, 0]} text={String(val)} label={'xCT'} />
                  <Line start={[0, 0, 0]} end={[-len_tick, 0, 0]} color={'#444444'} />
                </group>
              </If>
            )
          })
        }
        <Text position={[-0.7, 0, len_age / 2]} text={'Age'} label={'xCC'} />
        <Line start ={[0, 0, gap_ca]} end={[0, 0, len_age + gap_ca]} color={'#444444'} />
      </>
    )
  }, [step==2, ranges]);

  return(
    <group position={[-gap_ca, 0, -gap_ca]}>
      {Ages}
    </group>
  )
}

function Axis_Mortality(){
  const Mortality = useMemo(() => {
    const tickNum = 8;
    const len = len_mortality * 2;

    return(
      <>
        {
          [...Array(tickNum).keys()].map(i => i * 1 + 0).map((val) =>{
            const height = len * val / (tickNum - 1);
            return(
              <group key={'mor_' + val + '_text_line'}>
                <Text
                  position={[-gap_na, height, 0]}
                  text={String((val * 10 / 3).toFixed(1))}
                  label={'yRC'} />
                <Line
                  start={[0        , height, 0]}
                  end=  {[-len_tick, height, 0]}
                  color={'#444444'} />
              </group>
            )
          })
        }
        <Text position={[0 - 1, len / 2, 0]} text={'Mortality Rate(%)'} label={'-x1CB'} />
        <Line start={[0, 0, 0]} end={[0, len, 0]} color={'#444444'} />
      </>
    )
  }, []);

  return(
    <group position={[-gap_ca, 0, -gap_ca]}>
      {Mortality}
    </group>
  )
}
function Axis_Mortality_0(){
  const Mortality = useMemo(() => {
    const tickNum = 8;
    const len = len_mortality * 2;

    return(
      <>
        {
          [...Array(tickNum).keys()].map(i => i * 1 + 0).map((val) =>{
            const height = len * val / (tickNum - 1);
            return(
              <group key={'mor_' + val + '_text_line'}>
                <Text
                  position={[-gap_na, height, 0]}
                  text={String((val * 10 / 3).toFixed(1))}
                  label={'yRC'} />
                <Line
                  start={[0        , height, 0]}
                  end=  {[-len_tick, height, 0]}
                  color={'#444444'} />
              </group>
            )
          })
        }
        <Text position={[0 - 1, len / 2, 0]} text={'Mortality Rate at Age 0(%)'} label={'-x1CB'} />
        <Line start={[0, 0, 0]} end={[0, len, 0]} color={'#444444'} />
      </>
    )
  }, []);

  return(
    <group position={[-gap_ca, 0, -gap_ca]}>
      {Mortality}
    </group>
  )
}

// Step 2
function HeatmapAtAge0(){
  const ref1 = useRef();
  const ref2 = useRef();
  const group = useRef();

  const step = useStore((state) => state.narrativeStep);
  const ranges = useStore((state) => state.ranges);
  const progress = useStore((state) =>state.progress);
  const temp1 = new THREE.Object3D()
  const temp2 = new THREE.Object3D()
  let bProgress = 0;
  const cuttingPlane_up = new THREE.Plane(new THREE.Vector3(0, -1, 0), size / 2 + 8.0);

  useLayoutEffect(() => {
    // Set positions
    // At Age > 0
    for(let i = 0; i < total_data.length; i+=1){
      if(i % (num_age + 1) != 0){
        temp1.position.set(
          (total_data[i][0] - ranges['year'][0]) * size,
          total_data[i][1] * size + 0.3,
          total_data[i][2] * height * 0.5,
        );
        temp1.scale.set(
          size,
          size,
          total_data[i][2] * height * 0.5,
        );
        temp1.updateMatrix()
        ref1.current.setMatrixAt(i, temp1.matrix);
        ref1.current.setColorAt(i, colorMap(total_data[i][2]))
      }
    }
  }, [])

  useFrame(() => {
    if(step == 2){
      // diminishing HeatmapAt Age > 0
      bProgress = bezierFunc(Math.min(progress[2] * 2.5, 1));
      ref1.current.material.opacity = 1;
      cuttingPlane_up.constant = size / 2 + 8.0 * (1 - bProgress);

      // At Age 0
      bProgress = bezierFunc(Math.max(0, (progress[2] - 0.3)) * 1/0.7);
      for (let i = 0; i < total_data.length; i+=(num_age + 1)) {
        temp2.position.set(
          (total_data[i][0] - ranges['year'][0]) * size,
          gap_ca * (1 - bProgress) + total_data[i][2] * bProgress * height * 0.5,
          (ranges['age'][1] - total_data[i][1]) * size
        );
        temp2.scale.set(
          size,
          Math.max(0.1, total_data[i][2] * height * bProgress),
          size
        );
        temp2.updateMatrix()
        ref2.current.setMatrixAt(i, temp2.matrix);
        ref2.current.setColorAt(i, colorMap(total_data[i][2]))
      }
      // Update the instance
      ref1.current.instanceMatrix.needsUpdate = true
      ref2.current.instanceMatrix.needsUpdate = true

      group.current.position.set(step==2? 0.8 * (1 - bProgress) : 0, 0, 0);
    }
  })

  return(
    <group ref={group} >
      <instancedMesh ref={ref1} args={[null, null, total_data.length]}>
        <boxGeometry />
        <meshPhongMaterial transparent={true} clippingPlanes={[cuttingPlane_up]} />
      </instancedMesh>
      <instancedMesh ref={ref2} args={[null, null, total_data.length]}>
        <boxGeometry />
        <meshPhongMaterial transparent={true} />
      </instancedMesh>
    </group>
  )
}

// Step 4
function Highlight1(){
  const Rect = useMemo(() => {
  return(
    <>
      <CubicBezierLine start={[0, -2.0, 0]} end={[-0.5, -2.5, 0]} midA={[-0.25, -2.0, 0]} midB={[-0.5, -2.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0, -2.0, 0]} end={[0.5, -2.5, 0]} midA={[0.25, -2.0, 0]} midB={[0.5, -2.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0, -3.5, 0]} end={[-0.5, -3.0, 0]} midA={[-0.25, -3.5, 0]} midB={[-0.5, -3.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0, -3.5, 0]} end={[0.5, -3.0, 0]} midA={[0.25, -3.5, 0]} midB={[0.5, -3.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[-0.5, -2.5, 0]} end={[-0.5, -3.0, 0]} midA={[-0.5, -2.75, 0]} midB={[-0.5, -2.75, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0.5, -2.5, 0]} end={[0.5, -3.0, 0]} midA={[0.5, -2.75, 0]} midB={[0.5, -2.75, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
    </>
  )
}, []);
  return(
    <>{Rect}</>
  );
}

function Highlight2(){
  const Rect = useMemo(() => {
  return(
    <>
      <CubicBezierLine start={[0, -2.0, 0]} end={[-0.5, -2.5, 0]} midA={[-0.25, -2.0, 0]} midB={[-0.5, -2.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0, -2.0, 0]} end={[0.5, -2.5, 0]} midA={[0.25, -2.0, 0]} midB={[0.5, -2.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0, -5.5, 0]} end={[-0.5, -5.0, 0]} midA={[-0.25, -5.5, 0]} midB={[-0.5, -5.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0, -5.5, 0]} end={[0.5, -5.0, 0]} midA={[0.25, -5.5, 0]} midB={[0.5, -5.25, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[-0.5, -2.5, 0]} end={[-0.5, -5.0, 0]} midA={[-0.5, -2.75, 0]} midB={[-0.5, -2.75, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
      <CubicBezierLine start={[0.5, -2.5, 0]} end={[0.5, -5.0, 0]} midA={[0.5, -2.75, 0]} midB={[0.5, -2.75, 0]} dashed={true} dashSize={0.1} gapSize={0.1} />
    </>
  )
}, []);
  return(
    <>{Rect}</>
  );
}

function ImgPlane4({idx = 0, ...props}){

  const group = useRef();
  const ranges = useStore((state) => state.ranges);

  const imgNames = ['childbirth.png', 'penicillin.png'];
  const [texture1, texture2] = useLoader(TextureLoader, imgNames);
  const imgPos = [[1932, 25], [1945, 40]];

  const planeGeom = new THREE.PlaneGeometry(2.4, 3);
  const planeMat = new THREE.MeshBasicMaterial({map: idx==0?texture1:texture2, side: THREE.DoubleSide});
  const cylinderHeight = 1.2;
  const cylinderGeom = new THREE.CylinderGeometry(0.06, 0.005, cylinderHeight, 20);
  const cylinderMat = new THREE.MeshBasicMaterial({color: 'black', transparent: true, opacity: 0.8});


  const ImgPlane = useMemo(() => {
    return(
      <>
        <mesh args={[planeGeom, planeMat, 1]} />
        <mesh args={[cylinderGeom, cylinderMat]} position={[0, -1 - cylinderHeight / 2, -1]} />
        <If if={idx==0}><Highlight1 /></If>
        <If if={idx==1}><Highlight2 /></If>
      </>
    );
  }, [])

  useFrame(() => {
    let xScale = (2019 - 1816) / (ranges['year'][1] - ranges['year'][0]);
    let zScale = (80 - 0) / (ranges['age'][1] - ranges['age'][0]);
    group.current.position.x = (imgPos[idx][0] - ranges['year'][0]) * size * xScale;
    group.current.position.y = 20;
    group.current.position.z = ((ranges['age'][1] - imgPos[idx][1]) * size) * zScale - 2.7;
    // group.current.updateMatrixWorld();
  })

  return(
    <group ref={group} rotation={[-Math.PI / 2, 0, 0]}>
      {ImgPlane}
    </group>
  );
}

function Img_Step4(){
  const eventNum = 2;

  const Images = useMemo(() => {
    return(<>{
      [...Array(eventNum).keys()].map(i => 1 * i + 0).map((idx) =>
        <ImgPlane4 key={'Img_Step4' + idx} idx={idx} />
      )
    }</>);
  }, []);

  return(<>{Images}</>)
}

// Step 5
const dashProps = {
  dashed: true,
  dashSize: 0.1,
  gapSize: 0.1,
  transparent: true,
}
function Highlight5({startX, startY, rad, xLen, yLen, idx, ...props}){
  const ref = useRef();
  const step = useStore((state) => state.narrativeStep);
  const flag2 = useStore((state) => state.flag2);
  const progress = useStore((state) =>state.progress);
  const step5Clip = useStore((state) =>state.step5Clip);
  let bProgress = 0;

  useFrame(() => {
    if(step == 5 && progress[5] < 1){
      bProgress = bezierFunc(Math.min(1, Math.max(0, (progress[5] - 0.5)) * 8));
      ref.current.traverse(child => {
        if(child.material){
          child.material.opacity = idx-10 == step5Clip? bProgress:0;
        }
      });
    }
  })

  const Rect = useMemo(() => {
    return(
      <>
        <CubicBezierLine start={[rad, 0.0, 0]} end={[0, -rad, 0]} midA={[rad/2, 0, 0]} midB={[0, -rad/2, 0]} {...dashProps} />
        <CubicBezierLine start={[xLen-rad, 0.0, 0]} end={[xLen, -rad, 0]} midA={[xLen - rad/2, 0, 0]} midB={[xLen, -rad/2, 0]} {...dashProps} />
        <CubicBezierLine start={[0, yLen+rad, 0]} end={[rad, yLen, 0]} midA={[0, yLen+rad/2, 0]} midB={[rad/2, yLen, 0]} {...dashProps} />
        <CubicBezierLine start={[xLen, yLen+rad, 0]} end={[xLen-rad, yLen, 0]} midA={[xLen, yLen+rad/2, 0]} midB={[xLen-rad/2, yLen, 0]} {...dashProps} />
        <DreiLine points={[[rad, 0, 0], [xLen-rad, 0, 0]]}  {...dashProps} />
        <DreiLine points={[[rad, yLen, 0], [xLen-rad, yLen, 0]]}  {...dashProps} />
        <DreiLine points={[[0, -rad, 0], [0, yLen+rad, 0]]}  {...dashProps} />
        <DreiLine points={[[xLen, -rad, 0], [xLen, yLen+rad, 0]]}  {...dashProps} />
      </>
    )
  }, []);
  return(
    <group ref={ref} position={[startX, 50, startY]} rotation={[-Math.PI / 2, 0, 0]}>{Rect}</group>
  );
}

function ImgPlane5({idx = 0, onClick, ...props}){
  const imgNames = ['war1.png', 'war2.png', 'childbirth.png', 'penicillin.png', 'cholera.png', 'prussianwar.png'];
  const xCoords = [3, 5, 4, 6, 1, 2]
  const imgs = useLoader(TextureLoader, imgNames);
  const planeSize = 3.75;
  const planeGeom = new THREE.PlaneGeometry(planeSize * 0.8, planeSize);
  const planeMat = new THREE.MeshBasicMaterial({map: imgs[idx], side: THREE.DoubleSide, transparent: true, opacity:1.0});

  const ImgPlane = useMemo(() =>
    <mesh
      onClick={onClick}
      idx={idx}
      args={[planeGeom, planeMat, 1]}
      position={[(xCoords[idx] - 1) * (planeSize * 0.8 + 0.1) + planeSize * 0.5 - 0.4, 50, -planeSize*0.5 - 0.3]}
      rotation={[-Math.PI / 2, 0, 0]} />
  , []);

  return(
    <>{ImgPlane}</>
  );
}

function Img_Step5(){
  const img_Step5 = useRef();
  const eventNum = 6;

  const step5Clip = useStore((state) => state.step5Clip);
  const setStep5Clip  = useStore((state) => state.setStep5Clip);

  const onClick = useCallback((idx) => {
    setStep5Clip(idx);
  }, [])

  useEffect(() => {
    img_Step5.current.traverse(child => {
      if(child.material && child.idx < 10){
        if(step5Clip == 6){
          child.material.opacity = 1;
        }else{
          if(step5Clip != child.idx){
            child.material.opacity = 0.5;
          }else{
            child.material.opacity = 1;
          }
        }
      }
    });
  }, [step5Clip]);

  const Images = useMemo(() => {
    return(<>{
      [...Array(eventNum).keys()].map(i => 1 * i + 0).map((idx) =>
        <ImgPlane5 key={'Img_Step5' + idx} idx={idx} onClick={() => {onClick(idx)}} />
      )
    }</>);
  }, []);

  return(
    <group ref={img_Step5}>
      {Images}
      <Highlight5 startY={3} startX={7} rad={0.5} xLen={3.5} yLen={-5} idx={10} />
      <Highlight5 startY={2.5} startX={9.7} rad={0.5} xLen={3} yLen={-4.25} idx={11} />
      <Highlight5 startY={4.5} startX={8.2} rad={0.5} xLen={1} yLen={-2} idx={12} />
      <Highlight5 startY={2} startX={9.3} rad={0.5} xLen={1.5} yLen={-5} idx={13} />
      <Highlight5 startY={3} startX={5.5} rad={0.5} xLen={10.5} yLen={-4.5} idx={14} />
      <Highlight5 startY={3.5} startX={9.5} rad={0.5} xLen={2} yLen={-4.5} idx={15} />
    </group>
  )
}

// 0, 1, 4, 5
function Heatmap(){
  const ref = useRef();

  const step = useStore((state) => state.narrativeStep);
  const ranges = useStore((state) => state.ranges);
  const prevRanges = useStore((state) => state.prevRanges);
  const diffRanges = useStore((state) => state.diffRanges);
  const setRanges = useStore((state) => state.setRanges);
  const progress = useStore((state) =>state.progress);

  const temp = new THREE.Object3D();
  const plane1 = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
  const plane2 = new THREE.Plane(new THREE.Vector3(0, 0, -1), 8 + (size / 2 + 0.01));

  let xScale = (2019 - 1816) / (ranges['year'][1] - ranges['year'][0]);
  let zScale = (80 - 0) / (ranges['age'][1] - ranges['age'][0]);
  let bProgress = 0;

  useLayoutEffect(() => {
    xScale = (2019 - 1816) / (ranges['year'][1] - ranges['year'][0]);
    zScale = (80 - 0) / (ranges['age'][1] - ranges['age'][0]);
    // Set positions
    for (let i = 0; i < total_data.length; i++) {
      temp.position.set(
        (total_data[i][0] - ranges['year'][0]) * size * xScale,
        total_data[i][2] * height * 0.5,
        (ranges['age'][1] - total_data[i][1]) * size * zScale
      );
      temp.scale.set(
        size * xScale,
        total_data[i][2] * height,
        size * zScale
      );
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix);
      ref.current.setColorAt(i, colorMap(total_data[i][2]))
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
    ref.current.instanceColor.needsUpdate = true
  }, [ranges])

  useFrame(()=>{
    plane1.constant = parseInt(bezierFunc(Math.max(0, (progress[1] - 0.3)) * 10/7) * num_year) * size - size / 2 + 0.01 * progress[1];
    if(step==2){
      plane2.constant = parseInt(bezierFunc(Math.min(1, (progress[2] * 5)) * num_age)) * size + (size / 2 + 0.01);
    }else{
      plane2.constant = num_age * size + (size / 2 + 0.01);
    }
    if(step == 4 && progress[4] < 1){
      bProgress = bezierFunc(Math.min(1, Math.max(0, (progress[4] - 0.1)) * 4));
      setRanges('whole', [
        0 + 10 * bProgress,
        80 - 10 * bProgress,
        1816 + 84 * bProgress,
        2019 - 19 * bProgress,
      ]);
    }
    if(step == 5 && progress[5] < 1){
      bProgress = bezierFunc(Math.min(1, Math.max(0, (progress[5] - 0.1)) * 4));
      setRanges('whole', [
        prevRanges['age'][0]  + diffRanges['age'][0] * bProgress,
        prevRanges['age'][1]  + diffRanges['age'][1] * bProgress,
        prevRanges['year'][0] + diffRanges['year'][0] * bProgress,
        prevRanges['year'][1] + diffRanges['year'][1] * bProgress,
      ]);
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh ref={ref} args={[null, null, total_data.length]}>
        <boxGeometry />
        <meshPhongMaterial
          opacity={1}
          transparent={true}
          clippingPlanes={step>=4?cuttingPlanes:[plane1, plane2]} />
      </instancedMesh>
      <If if={step==4}><Img_Step4/></If>
      <If if={step==5}><Img_Step5/></If>
    </group>
  )
}

// Lines for Step 3
function LineAtAge({age_start=18, age_end=40, ...props}){
  const lines1 = useRef();
  const lines2 = useRef();
  const images = useRef();
  const years = useRef();

  const progress = useStore((state) =>state.progress);

  const temp = new THREE.Object3D()
  const mySize = len_year / (age_end - age_start);
  let points = [];
  for(let i = 0; i < num_year; i++){
    points.push([]);
  }
  for (let i = 0; i < total_data.length; i++) {
    let year = total_data[i][0];
    let age = total_data[i][1];
    let mortality = total_data[i][2];

    if(age >= age_start && age <= age_end){
      points[year - 1816].push([
        (age - age_start) * mySize,
        mortality * height * 4,
        (year - 1816) * 0.03
      ]);
    }
  }

  const Lines = useMemo(() => {
    return(
      <>
        <group ref={lines1}>
          {
            [...Array(num_year).keys()].map(i => 1 * i + 0).map((year) =>{
              // two years containing the highest value
              let isWar1 = (year + 1816 == 1915);
              let isWar2 = (year + 1816 == 1944);

              return(
                <DreiLine
                  key={'LineAtAge_lines1_' + year}
                  year={year}
                  points={points[year]}
                  color={'lightgrey'}
                  lineWidth={(isWar1 || isWar2)? 1.25 : 0.6}
                  dashed={false}
                  opacity={(isWar1 || isWar2)? 1 : 0.8}
                  transparent/>
              )
            })
          }
        </group>
        <group ref={lines2}>
          {
            [99, 128].map((year) =>{
              // two years containing the highest value
              let isWar1 = (year + 1816 == 1915);
              let isWar2 = (year + 1816 == 1944);

              return(
                <DreiLine
                  key={'LineAtAge_lines2_' + year}
                  points={points[year]}
                  color={isWar1 ? 'blue' : (isWar2 ? 'green' : 'lightgrey')}
                  lineWidth={(isWar1 || isWar2)? 1.25 : 0.6}
                  dashed={false}
                  opacity={0}
                  transparent/>
              )
            })
          }
        </group>
      </>
    )
  }, []);

  function ImageRect_18to40({position=[0, 0, 0], img, ...props}){

    const texture = useLoader(TextureLoader, img);
    const planeGeom = new THREE.PlaneGeometry(2, 2.5);
    const planeMat = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide, transparent: true});
    const cylinderHeight = 0.4;
    const cylinderGeom = new THREE.CylinderGeometry(0.02, 0.005, cylinderHeight, 20);
    const cylinderMat = new THREE.MeshBasicMaterial({color: 'black', transparent: true, opacity: 0.8});

    return(
      <group position={[0, 1.65, 0]}>
        <mesh
          args={[planeGeom, planeMat, 1]}
          position={position} />
        <mesh args={[cylinderGeom, cylinderMat]}
          position={[
            position[0],
            position[1] - 1.25 - cylinderHeight / 2,
            position[2]
          ]
          } />
      </group>
    )
  }

  const Images = useMemo(() => {
    return(
      <group ref={images}>
        <ImageRect_18to40 img = {'war1.png'} position={[2 * mySize, points[1915 - 1816][2][1], (1915 - 1816) * size]} />
        <ImageRect_18to40 img = {'war2.png'} position={[7 * mySize, points[1944 - 1816][7][1], (1944 - 1816) * size]} />
      </group>
    )
  }, [])

  const Years = useMemo(() => {
    const num_Years = age_end - age_start + 1;
    return(
      <group ref={years} name={'axis_age'} position={[0, 0, len_age]}>
        {
          [...Array(num_Years).keys()].map(i => i * 1 + age_start).map((age)=>
            <group
              key={'age_' + age + '_text_line'}
              position={[(age - age_start) * mySize, 0, 0]}>
              <Text position={[0, -gap_na, 0]} text={String(age)} label={'yCT'} />
              <Line start={[0, 0, 0]} end=  {[0, -len_tick, 0]} color={'#444444'} />
            </group>
          )
        }
        <Text position={[len_year / 2, -1, 0]} text={'Age'} label={'yCC'} />
        <Line start={[-gap_ca, 0, 0]} end={[len_year, 0, 0]} color={'#444444'} />
      </group>
    )
  }, []);

  useFrame(() =>{
    images.current.traverse(child => {
      if(child.material){
        child.material.opacity = bezierFunc(Math.max(0, (progress[3] - 0.8)) * 10/2);
      }
    });
    lines1.current.traverse(child => {
      if(child.material && child.year){
        child.material.opacity = bezierFunc(
          Math.max(
            0,
            (progress[3] - 0.8 * child.year / num_year)
          ) * 1 / (1 - 0.8 * child.year / num_year)
        );
      }
    });
    lines2.current.traverse(child => {
      if(child.material){
        child.material.opacity = bezierFunc(Math.max(0, (progress[3] - 0.8)) * 10/2);
      }
    });
    years.current.traverse(child => {
      if(child.material){
        child.material.opacity = bezierFunc(Math.min(1, progress[3] * 3));
      }
    });
  })

  return (
    <group position={[0, 0, 0]}>
      {Lines}
      {Images}
      {Years}
    </group>
  )
}

const VisComponent = React.forwardRef((props, ref) =>{
  const heatmap = useRef();
  const lineAtAge = useRef();
  const axis_Years = useRef();
  const axis_Ages = useRef();
  const axis_Mortality = useRef();
  const legend = useRef();

  const {gl} = useThree();
  const step = useStore((state) => state.narrativeStep);
  const progress = useStore((state) => state.progress);

  // total Step = 6
  const visibleArr = {
    // init, heatmap, age0, lineCharts, heatmap, heatmap
    Heatmap         : [true,  true,  false, false, true,  true],
    HeatmapAtAge0   : [false,  false,  true,  false, false, false],
    LineAtAge       : [false, false, false, true,  false, false],
    Axis_Years      : [false, true,  true,  false, true,  true],
    Axis_Ages       : [false, true,  false, false, true,  true],
    Axis_Mortality  : [false, false, false,  true, false, false],
    Axis_Mortality_0: [false, false, true,  false, false, false],
    Legend          : [false, true,  false, false, true,  true],
  }

  useLayoutEffect(() =>{
    // console.log("I'm rendered")
    gl.localClippingEnabled = true;
  }, []);

  useFrame(() => {
    // console.log(gl.info.memory);
    legend.current.traverse(child => {
      if(child.material){
        child.material.opacity = Math.min(progress[1] * 2.5, 1);
      }
    });
    axis_Ages.current.traverse(child => {
      if(child.material){
        child.material.opacity = Math.min(progress[1] * 2.5, 1);
      }
    });
    axis_Mortality.current.traverse(child => {
      if(child.material){
        child.material.opacity = Math.min(Math.max(0, (progress[2] - 0.4)) * 2.5, 1);
      }
    });
  })

  return(
    <group position={[0, 0, 0]} ref={ref}>
      <group visible={visibleArr.HeatmapAtAge0[step]}>
        <HeatmapAtAge0 data={data} />
      </group>
      <group ref={heatmap} visible={visibleArr.Heatmap[step]}>
        <Heatmap data={data} />
      </group>
      <group ref={lineAtAge} visible={visibleArr.LineAtAge[step]}>
        <LineAtAge data={data} age_start={18} age_end={40} />
      </group>
      <group ref={axis_Years} visible={visibleArr.Axis_Years[step]}>
        <Axis_Years />
      </group>
      <group ref={axis_Ages} visible={visibleArr.Axis_Ages[step]}>
        <Axis_Ages />
      </group>
      <group ref={axis_Mortality} visible={visibleArr.Axis_Mortality[step]}>
        <Axis_Mortality type={Static}/>
      </group>
      <group ref={axis_Mortality} visible={visibleArr.Axis_Mortality_0[step]}>
        <Axis_Mortality_0 type={Static}/>
      </group>
      <group ref={legend} visible={visibleArr.Legend[step]}>
        <Legend/>
      </group>
    </group>
  )
});

export { VisComponent as VisComponent_Animated };
