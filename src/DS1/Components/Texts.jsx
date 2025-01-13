import * as THREE from 'three'
import React, { useMemo } from 'react'
import { title, text1, text2, text3, text4, text5, text6 } from '../BaseStructure/Constants_DS1.jsx';
import { xyzProps, TextComponentHeight } from '../BaseStructure/Constants_DS1.jsx';

function getOpts(type){
  return type == "title"? {
    font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
    fontSize: 7.5,
    color: "black",
    maxWidth: 100,
    lineHeight: 1.15,
    letterSpacing: 0,
    textAlign: "center",
    materialType: "MeshBasicMaterial",
  } : type == "plain"? {
      font: "https://fonts.gstatic.com/s/notosans/v7/o-0IIpQlx3QUlC5A4PNr5TRG.woff",
      fontSize: 2.5,
      color: "black",
      maxWidth: 65,
      lineHeight: 1.15,
      letterSpacing: 0,
      textAlign: "left",
      materialType: "MeshBasicMaterial",
      outlineColor: new THREE.Color("rgb(248, 245, 240)"),
      outlineOpacity: 0.50,
      outlineWidth: 0.75,
      outlineBlur: 5,
  } : {
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
  }
}

function TextGroup({texts, position, type}){
  const opts = getOpts(type);

  const TextGroup1 = useMemo(() =>
    <group>{
      texts.map((text, idx) =>
        <group position={position[idx]}>
          <text {...opts}
            key={"textBox_"+type+idx}
            text={text}
            anchorX={"center"} anchorY={"top"} />
        </group>
      )}
    </group>
  , [])
  return (<>{
    TextGroup1
  }</>)
}

const TextComponent = React.forwardRef((props, ref) =>{
  const textPos = [-xyzProps.xLength / 2, -xyzProps.yLength / 2, -xyzProps.zLength / 2];
  const xWidth = -2*textPos[0]
  const titles = [title];
  const texts = [text1, text2, text3, text4, text5, text6];

  const text = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.180 * TextComponentHeight, 0],
          [xWidth*0.75, -0.330 * TextComponentHeight, 0],
          [0, -0.520 * TextComponentHeight, 0],
          [0, -0.680 * TextComponentHeight, 0],
          [0, -0.870 * TextComponentHeight, 0],
          [0, -1.000 * TextComponentHeight, 0],
        ]} />
    </group>
  , []);

  return(<>{
    text
  }</>);
});

const TextComponent_Static = React.forwardRef((props, ref) =>{
  const titles = [title];
  const texts = [text1, text2, text3 + text4 + text5, text6];

  const text = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"plain"}
        position={[
          [0, -0.115 * TextComponentHeight * 10 / 6, 0],
          [0, -0.215 * TextComponentHeight * 10 / 6, 0],
          [0, -0.315 * TextComponentHeight * 10 / 6, 0],
          [0, -0.345 * TextComponentHeight * 10 / 6, 0],
        ]} />
    </group>
  , []);

  return(<>{
    text
  }</>);
});

export { TextComponent, TextComponent_Static };
