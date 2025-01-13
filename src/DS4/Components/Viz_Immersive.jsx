import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { Line, If } from '../../BasicElements/BasicElements.jsx';
import { Immersive } from '../../BasicElements/Constants.jsx';
import { total_data, colorMap, Legend, Text, ImageRect, size, gap_na, gap_ca, len_age, len_year, len_mortality, len_tick } from '../BaseStructure/Constants_DS4.jsx';
import { useStore } from '../BaseStructure/Store.jsx';

//parameter
const height = 20; //scale of value

const data = total_data //total_data
const rowNum = 81;


function AxisYears(){
  const step = useStore((state) => state.narrativeStep);

  const Years = useMemo(() => {
    return(
      <>
        {
          [...Array(21).keys()].map(i => i * 10 + 1820).map((year)=>
            <group
              key={'year_' + year + '_text_line'}
              position={[(year - 1816) * size, 0, 0]}>
              <If if={step!=2}>
                <Text position={[0, 0, gap_na]} text={String(year)} label={'xLC'} />
                <Line start={[0, 0, 0]} end={[0, 0, len_tick]} color={'#444444'} />
              </If>
              <If if={step==2}>
                <Text position={[0, -gap_na, 0]} text={String(year)} label={'-xyLC'} />
                <Line start={[0, 0, 0]} end=  {[0, -len_tick, 0]} color={'#444444'} />
              </If>
            </group>
          )
        }
        <If if={step!=2}>
          <Text position={[len_year / 2, 0, 1]} text={'Year'} label={'-zCC'} />
        </If>
        <If if={step==2}>
          <Text position={[len_year / 2, -1, 0]} text={'Year'} label={'yCC'} />
        </If>
        <Line start={[-gap_ca, 0, 0]} end={[len_year, 0, 0]} color={'#444444'} />
      </>
    )
  }, [step==2]);

  return(
    <group name={'axis_age'} position={[0, 0, len_age]}>
      {Years}
    </group>
  )
}

function AxisAges(){
  const Ages = useMemo(() => {
    const tickNum = 9;
    const len = len_age;

    return(
      <>
        {
          [...Array(9).keys()].map(i => i * 10 + 0).map((val) =>{
            return(
              <group key={'age_' + val + '_text_line'}>
                <Text
                  position={[0 - gap_na, 0, len_age - gap_ca - (val * size)]}
                  text={String(val)}
                  label={'xCT'} />
                <Line
                  start={[0, 0, len_age - gap_ca - (val * size)]}
                  end={[-len_tick, 0, len_age - gap_ca - (val * size)]}
                  color={'#444444'} />
              </group>
            )
          })
        }
        <Text position={[-0.7, 0, len_age / 2]} text={'Age'} label={'xCC'} />
        <Line start ={[0, 0, 0]} end={[0, 0, len_age]} color={'#444444'} />
      </>
    )
  }, []);

  return(
    <group position={[-gap_ca, 0, 0]}>
      {Ages}
    </group>
  )
}

function AxisMortality(){
  const Mortality = useMemo(() => {
    const tickNum = 8;
    const len = len_mortality;

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
      {
        Mortality
      }
    </group>
  )
}

function HeatmapAtAge0(){
  const step = useStore((state) => state.narrativeStep);
  const ref = useRef();
  const temp = new THREE.Object3D();

  useLayoutEffect(() => {
    // Set positions
    for(let i=0; i<total_data.length; i+=rowNum) {
      temp.position.set((total_data[i][0] - 1816) * size, total_data[i][2] * height * 0.5, (80 - total_data[i][1]) * size);
      temp.scale.set(size, total_data[i][2] * height, size);
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix);
      ref.current.setColorAt(i, colorMap(total_data[i][2]));
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true;
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, total_data.length]}>
      <boxGeometry />
      <meshPhongMaterial />
    </instancedMesh>
  )
}

function Heatmap(){
  const step = useStore((state) => state.narrativeStep);
  const ref = useRef();
  const temp = new THREE.Object3D()

  useLayoutEffect(() => {
    // Set positions
    for(let i = 0; i < total_data.length; i++) {
      if(i%rowNum != 0){
        temp.position.set((total_data[i][0] - 1816) * size, total_data[i][2] * height * 0.5, (80 - total_data[i][1]) * size);
        temp.scale.set(size, total_data[i][2] * height, size);
        temp.updateMatrix()
        ref.current.setMatrixAt(i, temp.matrix);
        ref.current.setColorAt(i, colorMap(total_data[i][2]))
      }
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <instancedMesh ref={ref} args={[null, null, total_data.length]}>
      <boxGeometry />
      <meshPhongMaterial transparent={true} opacity={step==2?0.20:1} side={THREE.DoubleSide} />
    </instancedMesh>
  )
}

function ImageGroup(){
  const step = useStore((state) => state.narrativeStep);

  const war1        = [0, 0, 0, 1, 0, 1];
  const war2        = [0, 0, 0, 1, 0, 1];
  const penicillin  = [0, 0, 0, 0, 1, 1];
  const childbirth  = [0, 0, 0, 0, 1, 1];
  const cholera     = [0, 0, 0, 0, 0, 1];
  const prussianwar = [0, 0, 0, 0, 0, 1];

  return(
    <group>
      <ImageRect position={[9.8, 0.78, 6.0]}  img = {'war1.png'} visible={war1} step={step} />
      <ImageRect position={[12.4, 0.5, 5.8]}  img = {'war2.png'} visible={war2} step={step} />
      <ImageRect position={[11.6, 0.1, 5.3]}  img = {'childbirth.png'} visible={childbirth} step={step} />
      <ImageRect position={[12.9, 0.13, 4]}   img = {'penicillin.png'} visible={penicillin} step={step} />
      <ImageRect position={[1.5, 0.3, 3]}     img = {'cholera.png'} visible={cholera} step={step} />
      <ImageRect position={[5.4, 0.4, 3]}     img = {'prussianwar.png'} visible={prussianwar} step={step} />
    </group>
  )
}

const VisComponent = React.forwardRef((props, ref) =>{
  const step = useStore((state) => state.narrativeStep);

  const {gl} = useThree();

  const visibleArr = {
    // init, heatmap, age0, lineCharts, heatmap, heatmap
    HeatmapAtAge0   : [true, true,  true,  true, true,  true],
    Heatmap         : [true, true,  true,  true, true,  true],
    AxisYears       : [false, true,  true,  true, true,  true],
    AxisAges        : [false, true,  true,  true, true,  true],
    AxisMortality   : [false, true,  true,  true, true,  true],
    ImageGroup      : [false, false,  false,  true, true,  true],
    Legend          : [true, true,  false,  true, true,  true],
  }

  useFrame(() => {
    console.log(gl.info.memory);
  })

  return(
    <group position={[0, 0, 0]} ref={ref}>
      <group visible={visibleArr.HeatmapAtAge0[step]}>
        <HeatmapAtAge0 data={data} />
      </group>
      <group visible={visibleArr.Heatmap[step]}>
        <Heatmap data={data} />
      </group>
      <group visible={visibleArr.AxisYears[step]}>
        <AxisYears />
      </group>
      <group visible={visibleArr.AxisAges[step]}>
        <AxisAges />
      </group>
      <group visible={visibleArr.AxisMortality[step]}>
        <AxisMortality type={Immersive}/>
      </group>
      <group visible={visibleArr.ImageGroup[step]}>
        <ImageGroup/>
      </group>
      <group visible={visibleArr.Legend[step]}>
        <Legend/>
      </group>
    </group>
  )
});

export { VisComponent as VisComponent_Immersive };
