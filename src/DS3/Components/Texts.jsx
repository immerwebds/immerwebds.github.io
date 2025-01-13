import React, { useMemo } from 'react'
import { TextBox } from '../../BasicElements/BasicElements.jsx';
import { TextComponentHeight, title, text1, text2, text3, text4, text5, text6, text7} from '../BaseStructure/Constants_DS2.jsx';

function TextGroup({texts, position, type}){
  return (
    <group>{
      texts.map((text, idx) =>
        <TextBox
          key={"textBox_"+type+idx}
          text={text}
          textType={type}
          position={position[idx]}
          lookAt={false}
          anchorX={"center"}
          anchorY={"top"}

        />
      )}
    </group>
  )
}

const TextComponent = React.forwardRef((props, ref) =>{

  const titles = [title];
  const texts = [text1, text2, text3, text4, text5, text6, text7];

  const TextComponent1 = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"DS3_title"}
        position={[[0, -0.030 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"DS3_plain"}
        position={[
          [0, -0.150 * TextComponentHeight, 0],
          [0, -0.300 * TextComponentHeight, 0],
          [0, -0.400 * TextComponentHeight, 0],
          [0, -0.500 * TextComponentHeight, 0],
          [0, -0.600 * TextComponentHeight, 0],
          [0, -0.700 * TextComponentHeight, 0],
          [0, -0.800 * TextComponentHeight, 0],
        ]} />
    </group>
  )

  return(
    <>{ TextComponent1 }</>
  );
});

const TextComponent_Animated = React.forwardRef((props, ref) =>{

  const titles = [title];
  const texts = [text1, text2, text3, text4, text5, text6, text7];

  const TextComponent1 = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"DS3_title"}
        position={[[0, -0.030 * TextComponentHeight, 0]]} />
      <TextGroup texts={texts} type={"DS3_plain"}
        position={[
          [0, -0.200 * TextComponentHeight, 0],
          [0, -0.300 * TextComponentHeight, 0],
          [0, -0.400 * TextComponentHeight, 0],
          [0, -0.500 * TextComponentHeight, 0],
          [0, -0.600 * TextComponentHeight, 0],
          [0, -0.700 * TextComponentHeight, 0],
          [0, -0.800 * TextComponentHeight, 0],
        ]} />
    </group>
  )

  return(
    <>{ TextComponent1 }</>
  );
});

const TextComponent_Static = React.forwardRef((props, ref) =>{

  const titles = [title];
  const textHeight = 500;
  const texts = [text1.concat('\n', text2).concat('\n', text3), text4.concat('\n', text5).concat('\n', text6).concat('\n', text7)];
  const TextComponent1 = useMemo(() =>
    <group ref={ref}>
      <TextGroup texts={titles} type={"DS3_title"}
        position={[[0, -0.030 * textHeight, 0]]} />
      <TextGroup texts={texts} type={"DS3_plain"}
        position={[
          [0, -0.250 * textHeight, 0],
          [0, -0.590 * textHeight, 0],
        ]} />
    </group>
  )

  return(
    <>{ TextComponent1 }</>
  );
});

export { TextComponent, TextComponent_Animated, TextComponent_Static };
