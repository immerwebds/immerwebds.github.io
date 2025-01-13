import * as THREE from 'three'
import React, { useRef, useMemo, useLayoutEffect } from 'react'
import { useThree, useLoader, useFrame, extend } from '@react-three/fiber'
import { ChangePoint, Lerp, If } from '../../BasicElements/BasicElements.jsx';
import { xyzProps, centerPos, xLength, yLength, zLength, xPadding, yPadding, xSteps, ySteps, tickLength, totalFrame, color_ocean1, color_lineSeg } from '../BaseStructure/Constants_DS2.jsx';
import { useStore } from '../BaseStructure/Store.jsx';
import { Water } from '../../BasicElements/Water.jsx';
import { Text } from "troika-three-text";
import { Line } from '@react-three/drei';
extend ({ Water, Text });

const opts = {
  font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
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
  const index = useStore((state) => state.idx);
  const step = useStore((state) => state.step);
  const opacity = useStore((state) => state.opacity);
  let color = "rgb(" + Math.floor(255 * (1 - opacity)) + "," + Math.floor(255 * (1 - opacity)) + "," + Math.floor(255 * (1 - opacity)) + ")";
  const animation_dist = useStore((state) => state.animation_dist)[0]["animation"];
  const bottomPosition = xyzProps.yPadding + (idx + 0.5) * height + 0.1;
  const xMax = 50;

  const depth = 100;
  const geom = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geom), []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    fog: false,
    color: "rgb(221, 221, 225)"
  }), []);

  useLayoutEffect(() => {
    console.log("i'm rerendered")
  }, [])

  useFrame(() => {
    radius = animation_dist[index].dist[idx] * (xyzProps.xLength - xyzProps.xPadding * 2) / xMax;
    main.current.scale.set(radius, height * 0.8, depth);
    main.current.position.set(radius/2, bottomPosition, -depth/2);
    note.current.position.set(radius-1, bottomPosition, 0.2);
    // console.log(note.current.children[0]);
  });

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
        <text {...opts}
          text={(index<totalFrame * 0.99)?Math.floor(animation_dist[index].dist[idx])/10+"M":""}
          font={opts.font} color={step > 6?color:"rgb(0, 0, 0)"} anchorX="right" anchorY="middle"/>
      </group>
    </>
  );
}

function Ocean({ surfacePosition, clippingSize, ...props }) {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const segNum = 64;
  const waterNormals = useLoader(
    THREE.TextureLoader, "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg"
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(1024, 1024, segNum-1, segNum-1), []);
  geom.rotateZ(Math.PI/2);
  const position = geom.attributes.position;
	position.usage = THREE.DynamicDrawUsage;

  const config = useMemo(
    () => ({
      textureWidth: 64,
      textureHeight: 64,
      waterNormals,
      sunColor: new THREE.Color("#ffffff"),
      waterColor: color_ocean1,
      distortionScale: 2,
      side: THREE.DoubleSide,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  useLayoutEffect(() => {
    ref.current.material.toneMapped = false;
    ref.current.material.transparent = true;
    ref.current.material.uniforms.size.value = 2;
    ref.current.material.uniforms.alpha.value = 0.75;
  },[]);

  useFrame((state, delta) => {
    // console.log(state.clock.getElapsedTime());
    for(let i = 0; i < position.count; i++){
			position.setZ( i, 1 * Math.sin(Math.floor(i/segNum) * 0.5 + 2.0 * state.clock.getElapsedTime()));
		}
    position.needsUpdate = true;
    ref.current.material.uniforms.time.value += delta * 0.5;
  });

  const water = useMemo(() =>
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      position={[0, surfacePosition, -400 - 30]}
    />
  , []);

  return (
    <>{water}</>
  );
}

function AxGr({props}){
  const step = useStore((state) => state.step);
  const opacity = useStore((state) => state.opacity);
  const year = useStore((state) => state.year);
  let color = "rgb(" + Math.floor(255 * opacity) + "," + Math.floor(255 * opacity) + "," + Math.floor(255 * opacity) + ")";
  const yAxis = useRef();

  useFrame((state) => {
    // yAxis.current.lookAt(new THREE.Vector3(state.camera.position.x, state.camera.position.y, state.camera.position.z));
  });

  const ChangePoints = useMemo(() =>
  <>
    <If if={step >= 4 && step <= 5}>
      <>
        <Line points={[[0, yLength * 0.47, zLength+1], [xLength, yLength * 0.47, zLength+1]]} color={"black"} lineWidth={1} dashed={true} />
        <text position={[0.2 * xLength, yLength * 0.47 + 2, zLength+1]} {...opts} color={"black"} text={"Change Point in 2009"} anchorX={"center"} anchorY={"middle"} />
      </>
    </If>
    <If if={step >= 10}>
      <ChangePoint
        pos={0.2} color={"black"} linewidth={1} text={"Change Point in 2009"}
        start={[0, yLength * 0.47, zLength+1]}
        end={[xLength, yLength * 0.47, zLength+1]} />
      <ChangePoint
        pos={0.2} color={"black"} linewidth={1} text={"Change Point in 2019"}
        start={[0, yLength * 0.72, zLength+1]}
        end={[xLength, yLength * 0.72, zLength+1]} />
    </If>
  </>, [step]);

  return(
    <group position={centerPos}>
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
      <text {...opts} ref={yAxis}
        position={[xLength * 0.70, yLength * 0.93, 0]} rotation={[0, 0, 0]} fontSize={6.0}
        color={"black"}
        text={year} font={opts.font} anchorX="left" anchorY="middle"/>
      {ChangePoints}
    </group>
  )
}

function DiscGroup(props){
  const ref = useRef();
  const step = useStore((state) => state.step);
  const animationSpeed = 1.5;
  const height = (xyzProps.yLength - xyzProps.yPadding * 2) / 10;

  useFrame((clock) =>{
    if(step >= 6 && step <= 9){
      // corner view makes discGroup breathe...?
      ref.current.position.x = Lerp(ref.current.position.x, xyzProps.xPadding + 1.0 * Math.sin(clock.clock.elapsedTime), 0.2);
      ref.current.position.y = Lerp(ref.current.position.y, 0 + 1.2 * Math.sin(clock.clock.elapsedTime), 0.2);
      ref.current.position.z = Lerp(ref.current.position.z, 0 + 0.2 * Math.sin(clock.clock.elapsedTime), 0.2);

      ref.current.rotation.x = Lerp(ref.current.rotation.x, 0.0 * Math.PI / 360 + 0.0 * Math.PI / 360 * Math.sin(animationSpeed * 0.0 * clock.clock.elapsedTime), 0.2);
      ref.current.rotation.y = Lerp(ref.current.rotation.y, 0.0 * Math.PI / 360 + 0.0 * Math.PI / 360 * Math.sin(animationSpeed * 0.0 * clock.clock.elapsedTime + 1), 0.2);
      ref.current.rotation.z = Lerp(ref.current.rotation.z, 0.0 * Math.PI / 360 + 1.2 * Math.PI / 360 * Math.sin(animationSpeed * 0.7 * clock.clock.elapsedTime + 2), 0.2);
    }else{
      // init the positiona and rotation for legibility
      ref.current.position.x = xyzProps.xPadding + (ref.current.position.x - xyzProps.xPadding) * 0.85;
      ref.current.position.y = 0 + ref.current.position.y * 0.85;
      ref.current.position.z = 0 + ref.current.position.z * 0.85;

      ref.current.rotation.x = 0 + ref.current.rotation.x * 0.85;
      ref.current.rotation.y = 0 + ref.current.rotation.y * 0.85;
      ref.current.rotation.z = 0 + ref.current.rotation.z * 0.85;
    }
  });

  const DiscGroup1 = useMemo(() =>
    <group position={centerPos}>
      <group ref={ref} position={[xyzProps.xPadding, 0, 0]}>
      {
        Array(10).fill(0).map((x, y) => x + y).map((item, idx) => {
          return(
            <Disc
              key={idx}
              idx={idx}
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

function OceanGroup(props){
  const ref = useRef();
  const plane1 = useRef();
  const plane2 = useRef();
  const plane3 = useRef();
  const plane4 = useRef();
  const planeSize = 1000;

  const waterLevel = useStore((state) => state.waterLevel);
  const opacity = useStore((state) => state.opacity);
  const geom = new THREE.PlaneGeometry(planeSize, planeSize);
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color("rgb(20, 55, 120)"), side: THREE.FrontSide, transparent: true});

  useLayoutEffect(() => {
    const width = planeSize;
    const height = 0.5 * planeSize;
    const depth = planeSize;
    plane1.current.position.set(0, -height - 48, -depth - 10);
    plane2.current.rotateY(Math.PI/2);
    plane2.current.position.set(-0.5 * width, -height - 48, -0.5 * depth - 10);
    plane3.current.rotateY(Math.PI/2);
    plane3.current.position.set(0.5 * width, -height - 48, -0.5 * depth - 10);
    plane4.current.rotateX(Math.PI/2);
    plane4.current.position.set(0, -2 * height, -0.5 * depth);
    // depthObj.current.position.set(0, -height - 52, -0.5 * depth + 2);
  }, []);

  useFrame((clock) =>{
    ref.current.position.y = waterLevel * 100;

    plane1.current.material.opacity = opacity;
    plane2.current.material.opacity = opacity;
    plane3.current.material.opacity = opacity;
    plane4.current.material.opacity = opacity;
  })

  const OceanGroup1 = useMemo(() =>
    <group ref={ref} position={[0, 0, -planeSize/2 + planeSize * 0.420]}>
      <Ocean surfacePosition={-xyzProps.yLength/2} />
      <mesh ref={plane1} geometry={geom} material={mat} />
      <mesh ref={plane2} geometry={geom} material={mat} />
      <mesh ref={plane3} geometry={geom} material={mat} />
      <mesh ref={plane4} geometry={geom} material={mat} />
    </group>
  , []);

  return(
    <>
      {OceanGroup1}
    </>
  );
}

const VisComponent = React.forwardRef((props, ref) =>{
  return(
    <group position={[0, 0, 0]} ref={ref}>
      <AxGr />
      <OceanGroup />
      <DiscGroup />
    </group>
  )
});

export { VisComponent as VisComponent_Immersive };
