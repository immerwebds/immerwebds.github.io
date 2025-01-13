import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { extend } from '@react-three/fiber'
import { If } from '../../BasicElements/BasicElements.jsx';

import { xyzProps, centerPos, xLength, yLength, zLength, xPadding, yPadding, xSteps, ySteps, tickLength, totalFrame, color_lineSeg } from '../BaseStructure/Constants_DS2.jsx';
import { useStore } from '../BaseStructure/Store.jsx';
import { Text } from "troika-three-text";
import { Line } from '@react-three/drei';
extend ({ Text });

const opts = {
  font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
  // Noto Sans
  fontSize: 2.5,
  color: "black",
  maxWidth: 65,
  lineHeight: 1.15,
  letterSpacing: 0,
  textAlign: "left",
  materialType: "MeshBasicMaterial",
  // below outline is added for removal of white outline when having a background of shader material plane
  outlineColor: new THREE.Color("rgb(0, 0, 0)"),
  outlineWidth: 0.00,
};

function Disc({ height, radius = 1, idx, ...props }){
  const main = useRef();
  const note = useRef();
  const index = props.progress * totalFrame;
  const opacity = useStore((state) => state.opacity);
  const animation_dist = useStore((state) => state.animation_dist)[0]["animation"];
  const bottomPosition = xyzProps.yPadding + (idx + 0.5) * height + 0.1;
  const xMax = 50;
  let color = "rgb(" + Math.floor(255 * opacity) + "," + Math.floor(255 * opacity) + "," + Math.floor(255 * opacity) + ")";

  const depth = 100;
  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geom), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    fog: false,
    color: "rgb(221, 221, 225)"
  }), []);

  useLayoutEffect(() => {
    radius = animation_dist[index].dist[idx] * (xyzProps.xLength - xyzProps.xPadding * 2) / xMax;
    main.current.scale.set(radius, height * 0.8, depth);
    main.current.position.set(radius/2, bottomPosition, -depth/2);
    note.current.position.set(radius-1, bottomPosition, 0.2);
  }, []);

  const Disc1 = useMemo(() =>
    <>
      <group ref={main}>
        <mesh geometry={geom} material={mat} />
        <mesh>
          <lineSegments geometry={edges} renderOrder={100}>
            <lineBasicMaterial color={color_lineSeg}/>
          </lineSegments>
        </mesh>
      </group>
    </>
  , []);

  return(
    <>
      {Disc1}
      <group ref={note}>
        <text {...opts} text={(index<totalFrame * 0.99)?Math.floor(animation_dist[index].dist[idx])/10+"M":""} font={opts.font} color={color} anchorX="right" anchorY="middle"/>
      </group>
    </>
  );
}

function AxGr(props){
  const step = props.step;
  const opacity = props.opacity;
  const year = props.year;
  let color = "rgb(" + 0 + "," + 0 + "," + 0 + ")";
  const yAxis = useRef();

  const Axes = useMemo(() =>
    <>
      <Line color={color}
        lineWidth={0.5} points={[[0, 0, zLength], [xLength, 0, zLength]]} />
      <Line color={color}
        lineWidth={0.5} points={[[0, 0, 0], [0, yLength, 0]]} />
      {
        Array(ySteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <group key={idx} position={[-tickLength, xyzProps.yPadding + (item + 1) * (yLength - 2 * yPadding) / ySteps, 0]}>
            <If if={idx % 2 == 0}>
              <Line
                color={color}
                lineWidth={0.5} points={[[0, 0, 0], [tickLength, 0, 0]]} />
              <text {...opts}
                color={color}
                text={(idx>=(ySteps-2)?"> ":"") + (5 + 5 * item) + "K"} anchorX={"right"} anchorY={"middle"} />
            </If>
          </group>
        })
      }
      {
        Array(xSteps).fill(0).map((x, y) => x + y).map((item, idx) => {
          return <group key={idx} position={[xPadding + item * ((xLength - 2 * xPadding) / (xSteps - 1)), -tickLength, zLength]}>
            <Line
              color={color}
              lineWidth={0.5} points={[[0, 0, 0], [0, tickLength, 0]]} />
            <text {...opts}
              color={color}
              text={0 + idx * 1 + "M"} anchorX={"center"} anchorY={"top"} />
          </group>
        })
      }
      <text {...opts}
        position={[xLength / 2, -6, zLength]} rotation={[0, 0, 0]}
        color={color}
        text={"Population"} font={opts.font} anchorX="center" anchorY="bottom"/>
      <text {...opts} ref={yAxis}
        position={[-8, yLength / 2, 0]} rotation={[0, 0, Math.PI/2]}
        color={color}
        text={"Median Household Income(A$)"} font={opts.font} anchorX="center" anchorY="bottom"/>
    </>
  , []);

  const ChangePoint1 = useMemo(() =>
  <>
    <If if={step >= 4 && step <= 5}>
      <Line points={[[0, yLength * 0.47, zLength+1], [xLength, yLength * 0.47, zLength+1]]} color={"black"} lineWidth={1} dashed={true} />
      <text position={[0.2 * xLength, yLength * 0.47 + 2, zLength+1]} {...opts} color={"black"} text={"Change Point in 2009"} anchorX={"center"} anchorY={"middle"} />
    </If>
    <If if={step >= 8}>
      <Line points={[[0, yLength * 0.47, zLength+1], [xLength * opacity, yLength * 0.47, zLength+1]]} color={"black"} lineWidth={1} dashed={true} />
    </If>
    <If if={step >= 10}>
      <text position={[0.2 * xLength, yLength * 0.47 + 2, zLength+1]} {...opts} color={"black"} text={"Change Point in 2009"} anchorX={"center"} anchorY={"middle"} />
    </If>
    <If if={step >= 8}>
      <Line points={[[0, yLength * 0.72, zLength+1], [xLength * opacity, yLength * 0.72, zLength+1]]} color={"black"} lineWidth={1} dashed={true} />
    </If>
    <If if={step >= 10}>
      <text position={[0.2 * xLength, yLength * 0.72 + 2, zLength+1]} {...opts} color={"black"} text={"Change Point in 2019"} anchorX={"center"} anchorY={"middle"} />
    </If>
  </>, []);

  return(
    <group position={centerPos}>
      {Axes}
      <If if={step <= 19}>
        <text {...opts} ref={yAxis}
          position={[xLength * 0.70, yLength * 0.93, 0]} rotation={[0, 0, 0]} fontSize={6.0}
          color={"black"}
          text={year} font={opts.font} anchorX="left" anchorY="middle"/>
      </If>
      {ChangePoint1}
    </group>
  )
}

function DiscGroup(props){
  const ref = useRef();
  const height = (xyzProps.yLength - xyzProps.yPadding * 2) / 10;

  const DiscGroup1 = useMemo(() =>
    <group position={centerPos}>
      <group ref={ref} position={[xyzProps.xPadding, 0, 0]}>
      {
        Array(10).fill(0).map((x, y) => x + y).map((item, idx) => {
          return(
            <Disc
              key={idx}
              idx={idx}
              progress={props.progress}
              height={height - 0.1} />
          );
        })
      }
      </group>
    </group>
  , []);

  return(
    <>{
      DiscGroup1
    }</>
  );
}


const VisComponent = React.forwardRef((props, ref) =>{
  return(
    <group ref={ref}>
      <group position={[0, -80, 0]} >
        <AxGr opacity={0.0} year={2009} step={4} />
        <DiscGroup progress={0.6} />
      </group>
      <group position={[0, -250, 0]} >
        <AxGr opacity={1.0} year={2019} step={10} />
        <DiscGroup progress={0.99} />
      </group>
    </group>
  )
});

export { VisComponent as VisComponent_Static };
