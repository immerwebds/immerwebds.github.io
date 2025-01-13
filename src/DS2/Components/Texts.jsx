import React, { useMemo } from 'react'
import { TextBox } from '../../BasicElements/BasicElements.jsx';
import { TextComponentHeight, title, text1, text2, text3, text4, text5 } from '../BaseStructure/Constants_DS2.jsx';

function TextGroup({texts, position, type, ...props}){

  const TextGroup1 = useMemo(() =>
    <group>{
      texts.map((text, idx) =>
        <TextBox
          key={"textBox_"+type+idx}
          text={text}
          textType={type}
          fontSize={props.fontSize}
          position={position[idx]}
          lookAt={false}
          anchorX={"center"}
          anchorY={"top"}
        />
      )}
    </group>
  , [])
  return (
    <>{TextGroup1}</>
  )
}

const TextComponent = React.forwardRef((props, ref) =>{

  const titles = [title];
  const texts = [text1, text2, text3, text4, text5];
  const TextComponent1 = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} fontSize={2.5} type={"plain"}
        position={[
          [40, -0.200 * TextComponentHeight, 0],
          [40, -0.400 * TextComponentHeight, 0],
          [40, -0.600 * TextComponentHeight, 0],
          [40, -0.840 * TextComponentHeight, 0],
          [40, -1.000 * TextComponentHeight, 0],
        ]} />
    </group>
  , [])

  return(
    <>{ TextComponent1 }</>
  );
});

const TextComponent_Static = React.forwardRef((props, ref) =>{

  const titles = [title];
  const texts = [text1, text2, text3, text4, text5];
  const TextComponent1 = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"title"}
        position={[[0, -0.000 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} fontSize={2.5} type={"plain"}
        position={[
          [0, -0.335 * TextComponentHeight, 0],
          [0, -0.360 * TextComponentHeight, 0],
          [0, -0.675 * TextComponentHeight, 0],
          [0, -0.725 * TextComponentHeight, 0],
          [0, -0.775 * TextComponentHeight, 0],
        ]} />
    </group>
  , [])

  return(
    <>{ TextComponent1 }</>
  );
});

export { TextComponent, TextComponent_Static };
