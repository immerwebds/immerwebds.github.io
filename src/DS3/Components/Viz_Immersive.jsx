import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Static, Animated, Immersive } from '../../BasicElements/Constants.jsx';
import { SCALE_X, SCALE_Y } from '../BaseStructure/Constants_DS2.jsx';
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { useStore } from '../BaseStructure/Store.jsx';
import { adjustedArr1, adjustedArr2, adjustedArr3, adjustedB1, adjustedA1B2, adjustedA2B3, adjustedA3 } from './snpData.jsx';
import { GEOMS } from './Lines.jsx';
import { Text } from "troika-three-text";
import { Line as DreiLine } from '@react-three/drei';

extend({ Text });

const opts = {
  font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
  fontSize: 50.0,
  color: "black",
  maxWidth: 5000,
  lineHeight: 1.15,
  letterSpacing: 0,
  textAlign: "left",
  materialType: "MeshBasicMaterial",
};

const lineWidth = 80;

const xZero_line1 = SCALE_X * (adjustedB1.length - 1);
const xZero_a1b2  = SCALE_X * (adjustedArr1.length + adjustedB1.length - 2);
const xZero_line2 = SCALE_X * (adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 3);
const xZero_a2b3  = SCALE_X * (adjustedArr2.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 4);
const xZero_line3 = SCALE_X * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 5);
const xZero_a3    = SCALE_X * (adjustedArr3.length + adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 6)
const xZero       = SCALE_X * (0);
// -14250

function Axis({position=[0,0,0], ...props}){
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);



  // HrztAnnotFirst
  const HrztAnnot_First = useMemo(() => { return {
    interval: 200,
  }}, []);

  // AnnotFirst
  const Annot_First = useMemo(() => { return {
    interval: 350,
    texts: [
      `the first impact of COVID-19
      (FEB 2020)`,
      `Delta variant emerges
      (SEPT 2021)`,
      `Omicron variant emerges
      (NOV 2021)`
    ],
    anchors: ["left", "left", "left"],
    lengths: [
      -10 * SCALE_Y,
      -10 * SCALE_Y,
      30 * SCALE_Y
    ],
    textPos: [
      [xZero_line1, adjustedArr1[0], 0],
      [xZero_line2, adjustedArr2[0], 0],
      [xZero_line3, adjustedArr3[0], 0]
    ],
    dotGeometry: new THREE.CircleGeometry(40, 50)
  }}, []);

  // Opacity Animation
  let op = animation_rl[0]["animation"][idx].opacityAxis;

  return(
    <>
      <group position={position} visible={op == 0? false:true}>
        {
          <>
            // X, Y Axes
            <DreiLine points={[[0, 0, 0], [0, 150 * SCALE_Y, 0]]} color={"white"} opacity={op} transparent lineWidth={0.4} dashSize={60} gapSize={40} dashed={false} />
            <DreiLine points={[[0, 0, 0], [16000, 0, 0]]} color={"white"} opacity={op} transparent lineWidth={0.5} dashSize={60} gapSize={40} dashed={false} />
            // Y-Axis Title
            <group position={[-1000, 70 * SCALE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <text {...opts} text={"S&P 500"} fillOpacity={op} font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
            </group>
          </>
        }
        {
          // Y Axis Tick, Label
          Array(5).fill(0).map((x, y) => x + y).map((item, idx) => {
            return <group position={[0, idx * 30 * SCALE_Y, 0]}>
              <DreiLine points={[[0, 0, 0], [-150, 0, 0]]} color={"white"} opacity={op} transparent lineWidth={0.6} dashSize={60} gapSize={40} dashed={false} />
              <group position={[-HrztAnnot_First.interval - 50, 0, 0]}>
                <text {...opts} text={""+(2000 + item * 500)} fillOpacity={op} font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
              </group>
            </group>
          })
        }
        {
          // X Axis Tick, Label
          Array(26).fill(0).map((x, y) => x + y).map((item, idx) => {
            return <group position={[idx * 16000 / 25, 0, 0]} visible={idx%2==1?true:false}>
              <DreiLine points={[[0, 0, 0], [0, -150, 0]]} color={"white"} opacity={op} transparent lineWidth={0.6} dashSize={60} gapSize={40} dashed={false} />
              <group position={[0, -HrztAnnot_First.interval - 100, 0]} rotation={[0, 0, Math.PI / 4]}>
                <text {...opts} text={""+(2020 + parseInt(idx / 12)) + "." + (idx % 12 + 1)} fillOpacity={op} font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
              </group>
            </group>
          })
        }
        {
          // AnnotFirst
          Array(3).fill(0).map((x, y) => x + y).map((item, idx) => {
            return <group position={Annot_First.textPos[idx]}>
              <mesh geometry={Annot_First.dotGeometry}>
                <meshBasicMaterial opacity={0.6 * op} transparent/>
              </mesh>
              <DreiLine points={[[0, 0, 0], [0, -Annot_First.lengths[idx], 0]]} color={"white"} opacity={op} transparent lineWidth={0.2} dashSize={50} gapSize={100} dashed={true} />
              <group position={[-20 * SCALE_X, -Annot_First.lengths[idx] + (Annot_First.lengths[idx]>0?-1:1) * Annot_First.interval, 0]}>
                <text {...opts} text={Annot_First.texts[idx]} fillOpacity={op} font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX={Annot_First.anchors[idx]} anchorY="middle"/>
              </group>
            </group>
          })
        }
      </group>
    </>
  )
}

function FinalAxis({position=[0,0,0], lenX, ...props}){
  const animation_rl = useStore((state) => state.animation_rl);
  const idx = useStore((state) => state.idx);



  // HrztAnnotFirst
  const HrztAnnot_First = useMemo(() => { return {
    interval: 20,
  }}, []);

  // Opacity Animation
  let op = animation_rl[0]["animation"][idx].opacityLastAxis;

  return(
    <>
      <group position={position} visible={op == 0? false:true}>
        {
          <>
            // dashed upper line
            <DreiLine points={[[0, 2 * 13 * SCALE_Y +350, 0], [3850, 2 * 13 * SCALE_Y +350, 0]]} color={"white"} opacity={0.5*op} transparent lineWidth={0.5} dashSize={50} gapSize={80} dashed={true} />
            // X, Y Axes
            <DreiLine points={[[0, 0, 0], [0, 38 * SCALE_Y, 0]]} color={"white"} opacity={op} transparent lineWidth={0.4} dashSize={60} gapSize={40} dashed={false} />
            <DreiLine points={[[0, 0, 0], [3850, 0, 0]]} color={"white"} opacity={op} transparent lineWidth={0.5} dashSize={60} gapSize={40} dashed={false} />
            // Y-Axis Title
            <group position={[-350, 23 * SCALE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <text {...opts} text={"S&P 500 Variance"} fillOpacity={op} font={opts.font} fontSize={60} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
            </group>
          </>
        }
        {
          // Y Axis Tick, Label
          Array(3).fill(0).map((x, y) => x + y).map((item, idx) => {
            return <group position={[0, idx * 13 * SCALE_Y +350, 0]}>
              <DreiLine points={[[0, 0, 0], [-38, 0, 0]]} color={"white"} opacity={op} transparent lineWidth={0.6} dashSize={60} gapSize={40} dashed={false} />
              <group position={[-HrztAnnot_First.interval - 50, 0, 0]}>
                <text {...opts} text={""+(item * 500- 1000)} fillOpacity={op} font={opts.font} fontSize={60} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
              </group>
            </group>
          })
        }
        {
          // X Axis Tick, Label
          Array(6).fill(0).map((x, y) => x + y).map((item, idx) => {
            return <group position={[idx * 3850 / 6 + 300, 0, 0]} visible>
              <DreiLine points={[[0, 0, 0], [0, -38, 0]]} color={"white"} opacity={op} transparent lineWidth={0.6} dashSize={60} gapSize={40} dashed={false} />
              <group position={[0, -HrztAnnot_First.interval - 100, 0]} rotation={[0, 0, Math.PI / 4]}>
                <text {...opts} text={""+(2020 + parseInt(idx / 12)) + "." + (idx % 12 + 3)} fillOpacity={op} font={opts.font} fontSize={60} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
              </group>
            </group>
          })
        }
      </group>
      </>
  )
}

const VisComponent = React.forwardRef((props, ref) =>{
  const line1 = useRef();
  const line2 = useRef();
  const line3 = useRef();
  const grid = useRef();
  const firstaxis = useRef();
  const finalaxis = useRef();
  const bfr1 = useRef();
  const aftr2bfr3 = useRef();
  const aftr1bfr2 = useRef();
  const aftr3 = useRef();
  const animation_rl = useStore((state) => state.animation_rl);
  const type = useBasicStore((state) => state.type);
  const idx = useStore((state) => state.idx);

  useFrame((state, delta) => {
    let immersiveAnimation = animation_rl[0]["animation"][idx];
    line2.current.position.set(immersiveAnimation.pos2[0], immersiveAnimation.pos2[1], immersiveAnimation.pos2[2]);
    line3.current.position.set(immersiveAnimation.pos3[0], immersiveAnimation.pos3[1], immersiveAnimation.pos3[2]);
    // firstaxis.current.scale.set(0.5,0.5,1);

  });

  useLayoutEffect(() => {
    line1.current.translateX(xZero_line1);
    bfr1.current.translateX(xZero);
    aftr1bfr2.current.translateX(xZero_a1b2);
    aftr2bfr3.current.translateX(xZero_a2b3);
    aftr3.current.translateX(xZero_a3);

    grid.current.position.setY(85 * SCALE_Y);
    grid.current.translateX(-8);
  }, []);

  let immersiveAnimation = animation_rl[0]["animation"][idx];

  let  gridOp = immersiveAnimation.opacityGrid;
  let  lineOp = immersiveAnimation.opacityLine;
  let  mlOp   = immersiveAnimation.opacityML;
  let  extOp = immersiveAnimation.opacityExtraLine;
  let  extMlOp = immersiveAnimation.opacityExtraML;

  const color1 = new THREE.Color("rgb(100, 100, 255)");
  const color2 = new THREE.Color("rgb(100, 250, 50)");
  const color3 = new THREE.Color("rgb(250, 10, 102)");

  const COLOR_MESH    = new THREE.Color("rgb(110, 110, 110)");
  const COLOR_LINESEG = new THREE.Color("rgb(200, 200, 200)");
  const COLOR_LINE    = new THREE.Color("rgb(160, 160, 160)");

  let mat_mesh = new THREE.MeshStandardMaterial({color: COLOR_MESH, opacity: extOp, transparent: true})
  let mat_lineseg = new THREE.LineBasicMaterial({color: COLOR_LINESEG, opacity: extOp, transparent: true})
  let mat_line = new THREE.LineBasicMaterial({color: COLOR_LINE, opacity: extMlOp, transparent: true})
  let xRatio_Scale = 100 / (30 - 6) *38/150;
  let yRatio_Scale = 6000 / (3500 - 2000) * 3850/16000
  let Annot_Last = {
    texts: [`recovery of the initial impact D+182`, `recovery of the Delta variant D+50`, `recovery of the Omicron variant D+23`, `floor at 2237.4`, `floor at 4307.54`, `floor at 4513.04`],
    text3: `Omicron variant emerges
    (NOV 2021)`,
    positions:[
      [(adjustedArr1.length - 1) * SCALE_X * xRatio_Scale + 750, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y + 2050, 700],
      [(adjustedArr2.length - 1) * SCALE_X * xRatio_Scale + 930, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y + 2050, 700],
      [(adjustedArr3.length - 1) * SCALE_X * xRatio_Scale + 930, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y + 2050, 700],
      [24 * SCALE_X * xRatio_Scale + 920, 5.5 * SCALE_Y * yRatio_Scale + 2010, 700],
      [22 * SCALE_X * xRatio_Scale + 925, 28.5 * SCALE_Y * yRatio_Scale + 2050, 700],
      [9  * SCALE_X * xRatio_Scale + 940, 29.5 * SCALE_Y * yRatio_Scale + 2050, 700],
    ],
    lengths: [150, -150, 150, -110, -150, -350],
    intervals: [30, -30, 30, -30, -30, -30],
    anchors: ["right", "left", "left", "left", "left", "left"],
    opacity: immersiveAnimation.opacityLastAxis,
    dotGeometry: new THREE.CircleGeometry(15, 50)
  };
  // [SCALE_X * (adjustedB1.length-1),2000]
  return(
    <group position={[0, 0, 0]} ref={ref}>
      {
        <>
          <group position={[0, 0, 0]}>
            <group ref={line1} visible={lineOp == 0? false:true}>
              <mesh geometry={GEOMS.line_1}>
                <meshStandardMaterial attach="material" color={color1} opacity={lineOp} transparent />
              </mesh>
              <lineSegments geometry={GEOMS.edge_1} renderOrder={100}>
                <lineBasicMaterial attach="material" color={color1} opacity={lineOp} transparent />
              </lineSegments>
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.midLine_1}>
                <meshStandardMaterial attachArray="material" color={color1} opacity={1} transparent />
                <meshStandardMaterial attachArray="material" color={color1} opacity={1} transparent />
              </mesh>
            </group>
            <group ref={line2} visible={lineOp == 0? false:true}>
              <mesh geometry={GEOMS.line_2}>
                <meshStandardMaterial attach="material" color={color2} opacity={lineOp} transparent />
              </mesh>
              <lineSegments geometry={GEOMS.edge_2} renderOrder={110}>
                <lineBasicMaterial attach="material" color={color2} opacity={lineOp} transparent />
              </lineSegments>
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.midLine_2}>
                <lineBasicMaterial attach="material" color={color2} opacity={mlOp} transparent />
              </mesh>
            </group>
            <group ref={line3} visible={lineOp == 0? false:true}>
              <mesh geometry={GEOMS.line_3}>
                <meshStandardMaterial attach="material" color={color3} opacity={lineOp} transparent />
              </mesh>
              <lineSegments geometry={GEOMS.edge_3} renderOrder={120}>
                <lineBasicMaterial attach="material" color={color3} opacity={lineOp} transparent />
              </lineSegments>
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.midLine_3}>
                <lineBasicMaterial attach="material" color={color3} opacity={mlOp} transparent />
              </mesh>
            </group>

            <group ref={aftr2bfr3} visible={extOp == 0? false:true}>
              <mesh geometry={GEOMS.A2B3} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeA2B3} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlA2B3} material={mat_line} />
            </group>

            <group ref={aftr1bfr2} visible={extOp == 0? false:true}>
              <mesh geometry={GEOMS.A1B2} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeA1B2} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlA1B2} material={mat_line} />
            </group>

            <group ref={bfr1} visible={extOp == 0? false:true}>
              <mesh geometry={GEOMS.B1} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeB1} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlB1} material={mat_line} />
            </group>

            <group ref={aftr3} visible={extOp == 0? false:true}>
              <mesh geometry={GEOMS.A3} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeA3} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlA3} material={mat_line} />
            </group>

            <gridHelper ref={grid} args={[14400 * 3, 180 * 3]}>
            <lineBasicMaterial attach="material" color={new THREE.Color("rgb(150, 150, 150)")} opacity={gridOp} transparent />
            </gridHelper>
          </group>
          <Axis ref={firstaxis} position={[0, 0, -150]} />
          <FinalAxis ref={finalaxis} position={[immersiveAnimation.axisMove[0], immersiveAnimation.axisMove[1], -150]} />


          {
            Array(6).fill(0).map((x, y) => x + y).map((item, idx) => {
              return <group position={Annot_Last.positions[idx]} >
                <mesh geometry={Annot_Last.dotGeometry}>
                  <meshBasicMaterial opacity={Annot_Last.opacity} transparent />
                </mesh>
                <DreiLine points={[[0, 0, 0], [0, Annot_Last.lengths[idx], 0]]} color={"white"} opacity={immersiveAnimation.opacityLastAxis} transparent lineWidth={0.4} dashSize={10} gapSize={30} dashed={true} />
                <group position={[0, Annot_Last.lengths[idx] + Annot_Last.intervals[idx], 0]} >
                  <text {...opts} text={Annot_Last.texts[idx]} fillOpacity={immersiveAnimation.opacityLastAxis} font={opts.font} fontSize={60} color={"rgb(255, 255, 255)"} anchorX={Annot_Last.anchors[idx]} anchorY="middle" />
                </group>
              </group>
            })
          }
        </>
      }
    </group>
  )
});

export { VisComponent as VisComponent_Immersive };
