import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { Static, Animated, Immersive } from '../../BasicElements/Constants.jsx';
import { SCALE_X, SCALE_Y, totalFrame } from '../BaseStructure/Constants_DS2.jsx';
import { useBasicStore } from '../../BasicElements/BasicStore.jsx';
import { If } from '../../BasicElements/BasicElements.jsx';
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

function Axis(props){
  const animation_rlANM = useStore((state) => state.animation_rlANM);
  const immersiveAnimation = animation_rlANM[0]["animation"][(props.progress * totalFrame + (props.progress==1?-1:0))];
  const high_y  = immersiveAnimation.high_y;
  const low_y   = immersiveAnimation.low_y;
  const high_x  = immersiveAnimation.high_x;
  const low_x   = immersiveAnimation.low_x;

  const op = immersiveAnimation.opacityAxis;
  const opLs = immersiveAnimation.opacityLastAxis;
  const yChanger = immersiveAnimation.yChanger;
  const yTickSpaceRatio = 4000 / (high_y - low_y);
  const xTickSpaceRatio = 100 / (high_x - low_x);

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

  const Axis = useMemo(() => {return(
    <>
      <group position={[0, 0, -150]}>
        {
          <>
            // X, Y Axes
            <DreiLine points={[[0, 0, 0], [0, 150 * SCALE_Y, 0]]} color={"white"} transparent lineWidth={0.4} dashSize={60} gapSize={40} dashed={false} />
            <DreiLine points={[[0, 0, 0], [16000, 0, 0]]} color={"white"} transparent lineWidth={0.5} dashSize={60} gapSize={40} dashed={false} />
            // Y-Axis Title
            <group position={[-1000, 3000, 0]} rotation={[0, 0, Math.PI / 2]}>
              <text {...opts} text={"S&P 500"} fillOpacity={op*op} font={opts.font} fontSize={180} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
            </group>
            <group position={[-1000, 3500, 0]} rotation={[0, 0, Math.PI / 2]}>
              <text {...opts} text={"S&P 500 Variance"} fillOpacity={opLs*opLs} font={opts.font} fontSize={180} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
            </group>
          </>
        }
        {
          // Y Axis Tick, Label
          Array(20).fill(0).map((x, y) => x + y).map((item, idx) => {
            let yPos = (idx - low_y / 500) * 6000 / 8 * yTickSpaceRatio;
            let opacity = (yPos <= 6001 && yPos >= yChanger[0]-1) ? 1 : 0;

            return <group position={[0, yPos, 0]}>
              <DreiLine points={[[0, 0, 0], [-150, 0, 0]]} color={"white"} opacity={opacity} transparent lineWidth={0.6} dashSize={60} gapSize={40} dashed={false} />
              <group position={[-HrztAnnot_First.interval - 50, 0, 0]}>
                <text {...opts} text={""+(Math.floor(item * 500 - yChanger[1]))} fillOpacity={opacity} font={opts.font} fontSize={180} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
              </group>
            </group>
          })
        }
        {
          // X Axis Tick, Label
          Array(26).fill(0).map((x, y) => x + y).map((item, idx) => {
            let xPos = -low_x * 100 / (high_x - low_x) * 160 + idx * 100 / (high_x - low_x) * 16000 / 25
            let opacity = ((xPos <= 16001 && xPos >= -1) && (((50 < (high_x - low_x)) && idx % 2 == 1) || (50 >= (high_x - low_x)))) ? 1 : 0;
            return <group position={[xPos, 0, 0]}>
              <DreiLine points={[[0, 0, 0], [0, -150, 0]]} color={"white"} opacity={opacity} transparent lineWidth={0.6} dashSize={60} gapSize={40} dashed={false} />
              <group position={[0, -HrztAnnot_First.interval - 100, 0]} rotation={[0, 0, Math.PI / 4]}>
                <text {...opts} text={""+(2020 + parseInt(idx / 12)) + "." + (idx % 12 + 1)} fillOpacity={opacity} font={opts.font} fontSize={180} color={"rgb(255, 255, 255)"} anchorX="right" anchorY="middle"/>
              </group>
            </group>
          })
        }
        {
          // AnnotFirst
          Array(3).fill(0).map((x, y) => x + y).map((item, idx) => {
            let xPos = -low_x * 16000 / (high_x - low_x) + Annot_First.textPos[idx][0] * 100 / (high_x - low_x);

            return <>{
              <If if={xPos > 500 && xPos < 15000}>
                <group position={[
                  xPos,
                  -low_y * 6000 / (high_y - low_y) + Annot_First.textPos[idx][1] * 6000 / (high_y - low_y),
                  0
                ]
                }>
                  <mesh geometry={Annot_First.dotGeometry}>
                    <meshBasicMaterial opacity={0.6 * op} transparent/>
                  </mesh>
                  <DreiLine points={[[0, 0, 0], [0, -Annot_First.lengths[idx], 0]]} color={"white"} opacity={op} transparent lineWidth={0.2} dashSize={50} gapSize={100} dashed={true} />
                  <group position={[-400, -Annot_First.lengths[idx] + (Annot_First.lengths[idx]>0?-1:1) * Annot_First.interval, 0]}>
                    <text {...opts} text={Annot_First.texts[idx]} fillOpacity={op} font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX={Annot_First.anchors[idx]} anchorY="middle"/>
                  </group>
                </group>
              </If>
            }</>
          })
        }
      </group>
    </>
  )}, []);

  return(
    <>
      {Axis}
    </>
  )
}

const Chart = React.forwardRef((props, ref) =>{
  const {gl} = useThree();
  const line1 = useRef();
  const line2 = useRef();
  const line3 = useRef();
  const firstaxis = useRef();
  const finalaxis = useRef();
  const bfr1 = useRef();
  const aftr2bfr3 = useRef();
  const aftr1bfr2 = useRef();
  const aftr3 = useRef();
  const animation_rlANM = useStore((state) => state.animation_rlANM);

  // console.log((props.progress * totalFrame + (props.progress==1?-1:0)));
  const immersiveAnimation = animation_rlANM[0]["animation"][(props.progress * totalFrame + (props.progress==1?-1:0))];

  const high_y  = immersiveAnimation.high_y;
  const low_y   = immersiveAnimation.low_y;
  const high_x  = immersiveAnimation.high_x;
  const low_x   = immersiveAnimation.low_x;

  const yRatio_Scale = 6000 /   (high_y - low_y);
  const yRatio_Trans = 6000 /   (high_y - low_y);
  const xRatio_Scale = 100 /    (high_x - low_x);
  const xRatio_Trans = 16000 /  (high_x - low_x);

  const  lineOp  = immersiveAnimation.opacityLine;
  const  mlOp    = immersiveAnimation.opacityML;
  const  extOp   = immersiveAnimation.opacityExtraLine;
  const  extMlOp = immersiveAnimation.opacityExtraML;
  const cutter2  = immersiveAnimation.cutter2;
  const cutter3  = immersiveAnimation.cutter3;
  const flOp23     = immersiveAnimation.opacityFloor23;
  const flOp1     = immersiveAnimation.opacityFloor1;
  const laOp     = immersiveAnimation.opacityLastAxis;
  const rcOp = immersiveAnimation.opacityRecovery;
  // let xRatio_Scale = 100 /    (high_x - low_x);

  const COLOR_LINE1   = new THREE.Color("rgb(100, 100, 255)");
  const COLOR_LINE2   = new THREE.Color("rgb(100, 250, 50)");
  const COLOR_LINE3   = new THREE.Color("rgb(250, 10, 102)");

  const COLOR_MESH    = new THREE.Color("rgb(110, 110, 110)");
  const COLOR_LINESEG = new THREE.Color("rgb(200, 200, 200)");
  const COLOR_LINE    = new THREE.Color("rgb(160, 160, 160)");

  const mat_mesh = new THREE.MeshBasicMaterial({color: COLOR_MESH, opacity: extOp, transparent: true})
  const mat_lineseg = new THREE.LineBasicMaterial({color: COLOR_LINESEG, opacity: extOp, transparent: true})
  const mat_line = new THREE.LineBasicMaterial({color: COLOR_LINE, opacity: extMlOp, transparent: true})
  const mat_line1 = new THREE.MeshBasicMaterial({color: COLOR_LINE1, opacity: lineOp, transparent: true})
  const mat_line1seg = new THREE.LineBasicMaterial({color: COLOR_LINE1, opacity: lineOp, transparent: true})
  const mat_line2 = new THREE.MeshBasicMaterial({color: COLOR_LINE2, opacity: lineOp, transparent: true})
  const mat_line2seg = new THREE.LineBasicMaterial({color: COLOR_LINE2, opacity: lineOp, transparent: true})
  const mat_line3 = new THREE.MeshBasicMaterial({color: COLOR_LINE3, opacity: lineOp, transparent: true})
  const mat_line3seg = new THREE.LineBasicMaterial({color: COLOR_LINE3, opacity: lineOp, transparent: true})

  useLayoutEffect(() => {
    gl.localClippingEnabled = true;
    const immersiveAnimation = animation_rlANM[0]["animation"][(props.progress * totalFrame + (props.progress==1?-1:0))];
    const moveX2 = immersiveAnimation.moveX2;
    const moveY2 = immersiveAnimation.moveY2;
    const moveX3 = immersiveAnimation.moveX3;
    const moveY3 = immersiveAnimation.moveY3;

    line1.current.scale.set(          xRatio_Scale, yRatio_Scale, 1);
    line2.current.scale.set(          xRatio_Scale, yRatio_Scale, 1);
    line3.current.scale.set(          xRatio_Scale, yRatio_Scale, 1);
    bfr1.current.scale.set(           xRatio_Scale, yRatio_Scale, 1);
    aftr1bfr2.current.scale.set(      xRatio_Scale, yRatio_Scale, 1);
    aftr2bfr3.current.scale.set(      xRatio_Scale, yRatio_Scale, 1);
    aftr3.current.scale.set(          xRatio_Scale, yRatio_Scale, 1);

    line1.current.position.setY(      -low_y * yRatio_Trans);
    line2.current.position.setY(      -low_y * yRatio_Trans + moveY2*yRatio_Scale);
    line3.current.position.setY(      -low_y * yRatio_Trans + moveY3*yRatio_Scale);
    bfr1.current.position.setY(       -low_y * yRatio_Trans);
    aftr1bfr2.current.position.setY(  -low_y * yRatio_Trans);
    aftr2bfr3.current.position.setY(  -low_y * yRatio_Trans);
    aftr3.current.position.setY(      -low_y * yRatio_Trans);

    line1.current.position.setX(      -low_x * xRatio_Trans + xRatio_Scale * xZero_line1);
    line2.current.position.setX(      -low_x * xRatio_Trans + xRatio_Scale * (xZero_line2 + moveX2));
    line3.current.position.setX(      -low_x * xRatio_Trans + xRatio_Scale * (xZero_line3 + moveX3));
    bfr1.current.position.setX(       -low_x * xRatio_Trans + xRatio_Scale * xZero);
    aftr1bfr2.current.position.setX(  -low_x * xRatio_Trans + xRatio_Scale * xZero_a1b2);
    aftr2bfr3.current.position.setX(  -low_x * xRatio_Trans + xRatio_Scale * xZero_a2b3);
    aftr3.current.position.setX(      -low_x * xRatio_Trans + xRatio_Scale * xZero_a3);
  }, []);

  const Annot_Last = {
    texts: [`recovery of the initial impact D+182`, `recovery of the Delta variant D+50`, `recovery of the Omicron variant D+23`, `floor at 2237.4`, `floor at 4307.54`, `floor at 4513.04`],
    text3: `Omicron variant emerges
    (NOV 2021)`,
    positions:[
      [(adjustedArr1.length - 1) * SCALE_X * xRatio_Scale, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y, 0],
      [(adjustedArr2.length - 1) * SCALE_X * xRatio_Scale, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y, 0],
      [(adjustedArr3.length - 1) * SCALE_X * xRatio_Scale, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y, 0],
      [24 * SCALE_X * xRatio_Scale, 5.5 * SCALE_Y * yRatio_Scale, 0],
      [22 * SCALE_X * xRatio_Scale, 28.5 * SCALE_Y * yRatio_Scale, 0],
      [9  * SCALE_X * xRatio_Scale, 29.5 * SCALE_Y * yRatio_Scale, 0],
    ],
    lengths: [500, -500, 500, -500, -500, -500],
    intervals: [100, -100, 100, -100, -100, -100],
    anchors: ["right", "left", "left", "left", "left", "left"],
    opacity: [rcOp, rcOp, rcOp, flOp1, flOp23, flOp23],
    dotGeometry: new THREE.CircleGeometry(60, 50)
  };

  return(
    <group position={[-64, 0, 0]} ref={ref} scale={[0.008, 0.008, 0.008]}>
      {
        <>
          <group position={[0, 0, 0]}>
            <group ref={line1}>
              <mesh geometry={GEOMS.line_1} material={mat_line1} />
              <lineSegments geometry={GEOMS.edge_1} material={mat_line1seg} renderOrder={100} />
            </group>
            <group ref={line2}>
              <mesh geometry={GEOMS.line_2} material={mat_line2} />
              <lineSegments geometry={GEOMS.edge_2} material={mat_line2seg} renderOrder={110} />
            </group>
            <group ref={line3}>
              <mesh geometry={GEOMS.line_3} material={mat_line3} />
              <lineSegments geometry={GEOMS.edge_3} material={mat_line3seg} renderOrder={120} />
            </group>

            <group ref={aftr2bfr3}>
              <mesh geometry={GEOMS.A2B3} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeA2B3} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlA2B3} material={mat_line} />
            </group>

            <group ref={aftr1bfr2}>
              <mesh geometry={GEOMS.A1B2} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeA1B2} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlA1B2} material={mat_line} />
            </group>

            <group ref={bfr1}>
              <mesh geometry={GEOMS.B1} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeB1} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlB1} material={mat_line} />
            </group>

            <group ref={aftr3}>
              <mesh geometry={GEOMS.A3} material={mat_mesh} />
              <lineSegments geometry={GEOMS.edgeA3} renderOrder={120} material={mat_lineseg} />
              <mesh position={[0,0,lineWidth/2]} geometry={GEOMS.mlA3} material={mat_line} />
            </group>
          </group>
          <Axis ref={firstaxis} progress={props.progress}/>
          {
            Array(6).fill(0).map((x, y) => x + y).map((item, idx) => {
              return <group position={Annot_Last.positions[idx]}>
                <mesh geometry={Annot_Last.dotGeometry}>
                  <meshBasicMaterial opacity={Annot_Last.opacity[idx]} transparent />
                </mesh>
                <DreiLine points={[[0, 0, 0], [0, Annot_Last.lengths[idx], 0]]} color={"white"} opacity={Annot_Last.opacity[idx]} transparent lineWidth={0.4} dashSize={50} gapSize={100} dashed={true} />
                <group position={[0, Annot_Last.lengths[idx] + Annot_Last.intervals[idx], 0]}>
                  <text {...opts} text={Annot_Last.texts[idx]} fillOpacity={Annot_Last.opacity[idx]} font={opts.font} fontSize={200} color={"rgb(255, 255, 255)"} anchorX={Annot_Last.anchors[idx]} anchorY="middle"/>
                </group>
              </group>
            })
          }
          <DreiLine points={[[0, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y, 0], [16000, adjustedArr1[0] * 0.01025 * yRatio_Scale * SCALE_Y, 0]]} color={"white"} opacity={0.7*laOp} transparent lineWidth={0.4} dashSize={150} gapSize={200} dashed={true} />
        </>
      }
    </group>
  )
});

const VisComponent = React.forwardRef((props, ref) =>{
  return(
    <group ref={ref}>
      <group position={[0, -50, 0]} >
        <Chart progress={0} />
      </group>
      <group position={[0, -220, 0]} >
        <Chart progress={1} />
      </group>
    </group>
  )
});

export { VisComponent as VisComponent_Static };
