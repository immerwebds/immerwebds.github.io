function Teaser({props}){

  return(
    <>
      <div className="teaser">
        <img style={{margin: '6px', marginTop: '72px'}} src="imgs/Teaser.jpg" width="1000px" />
        <p style={{width:"900px"}}><b>Abstract ─</b> An increasing number of web articles engage the reader with the feeling of being immersed in the data space. However, the exact characteristics of spatial immersion in the context of visual storytelling remain vague. For example, what are the common design patterns of data stories with spatial immersion? How do they affect the reader’s experience? To gain a deeper understanding of the subject, we collected 23 distinct data stories with spatial immersion, and identified six design patterns, such as cinematic camera shots and transitions, intuitive data representations, realism, naturally moving elements, direct manipulation of camera or visualization, and dynamic dimension. Subsequently, we designed four data stories and conducted a crowdsourced user study comparing three design variations (static, animated, and immersive). Our results suggest that data stories with the design patterns for spatial immersion are more interesting and persuasive than static or animated ones, but no single condition was deemed more understandable or trustworthy.</p>
        {/* <div className="gif-Grid">
          <div>
            <img style={{margin: '6px'}} src="gifs/DS1_Stt.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS1_Anm.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS1_Imm.gif" width="270" />
          </div>
          <div>
            <img style={{margin: '6px'}} src="gifs/DS2_Stt.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS2_Anm.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS2_Imm.gif" width="270" />
          </div>
          <div>
            <img style={{margin: '6px'}} src="gifs/DS3_Stt.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS3_Anm.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS3_Imm.gif" width="270" />
          </div>
          <div>
            <img style={{margin: '6px'}} src="gifs/DS4_Stt.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS4_Anm.gif" width="270" />
            <img style={{margin: '6px'}} src="gifs/DS4_Imm.gif" width="270" />
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Teaser;
