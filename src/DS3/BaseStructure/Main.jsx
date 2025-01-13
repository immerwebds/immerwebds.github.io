import '../../BasicElements/DSStyles.css'
import { Canvas } from './Canvas.jsx';

function Main3(){
  return(
    <>
      <div className="PageContents">
        <div className="Viz DS3">
          <Canvas
            gl={{ logarithmicDepthBuffer: true }}
            onCreated={(state) => (state.gl.localClippingEnabled = true)} />
        </div>
      </div>
    </>
  )
}

export default Main3;
