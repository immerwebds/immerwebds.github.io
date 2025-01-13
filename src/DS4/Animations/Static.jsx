//immersive 카메라 뷰
//주석 처리해놓은 것들은 perspective 카메라 안쓰고 ortho쓸때의 앵글들

function getClips(){
  let clips = [];
  clips.push({
    "target": "camera", "name": "title",
    "pos":  [8.8, 100, 1.3],
    "look": [8.8, 0, 1.3],
    "zoom": 40,
  });

  clips.push({
    "target": "camera", "name": "heatmap1",
    "pos":  [8.8, 100, 1.3],
    "look": [8.8, 0, 1.3],
    "zoom": 40,
  });
  clips.push({
    "target": "camera", "name": "age0",
    "pos": [9.6, 7, 100],
    "look": [9.6, 7, 0],
    "zoom": 40,
  });
  clips.push({
    "target": "camera", "name": "severalAges",
    "pos": [9.6, 7, 100],
    "look": [9.6, 7, 0],
    "zoom": 40,
  });
  clips.push({
    "target": "camera", "name": "heatmap2",
    "pos":  [8.8, 100, 1.3],
    "look": [8.8, 0, 1.3],
    "zoom": 40,
  });
  clips.push({
    "target": "camera", "name": "heatmap3",
    "pos":  [8.8, 100, 1.3],
    "look": [8.8, 0, 1.3],
    "zoom": 40,
  });
  return clips;
}

export { getClips };
