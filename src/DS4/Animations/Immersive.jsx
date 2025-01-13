//immersive 카메라 뷰
//주석 처리해놓은 것들은 perspective 카메라 안쓰고 ortho쓸때의 앵글들
function getStartClips(){
  let clips = [];
  clips.push({
    "target": "camera", "name": "title",
    "pos":  [10, 10, 3],
    "look": [10, 0, 3],
    "zoom": 45,
  });
  clips.push({
    "target": "camera", "name": "axis",
    "pos": [10, 10, 3],
    "look": [10, 0, 3],
    "zoom": 1,
  });
  clips.push({
    "target": "camera", "name": "infant",
    "pos": [0, 3.8, 19],
    "look": [1, 3.8, 0],
    "zoom": 1,
  });
  clips.push({
    "target": "camera", "name": "world war1",
    "pos": [-12, 1.5, 5.5],
    "look":[1, 1.0, 5.5],
    "zoom": 0.8,
  }); //z : 80
  clips.push({
    "target": "camera", "name": "lower",
    "pos": [7, 5.6, 5],
    "look": [12, 1.3, 6],
    "zoom": 0.9,
  });
  clips.push({
    "target": "camera", "name": "explore",
    "pos": [15, 2, 7],
    "look": [13, 0.8, 5],
    "zoom": 1,
  });
  return clips;
}

function getClips(){
  let clips = [];
  clips.push({
    "target": "camera", "name": "title",
    "pos":  [10, 10, 3],
    "look": [10, 0, 3],
    "zoom": 45,
    "type": "bezier",
  });

  clips.push({
    "target": "camera", "name": "axis",
    "pos": [-7.8, 12, 9.8],
    "look": [2, 1.2, 3],
    "zoom": 1,
    "type": "bezier"
  });
  clips.push({
    "target": "camera", "name": "infant",
    "pos": [13.3, 2.8, 19],
    "look": [12.3, 2.8, 0],
    "zoom": 1,
    "type": "linear", "speed": 0.02,
  });
  clips.push({
    "target": "camera", "name": "worldwar1",
    "pos": [6.5, 2.8, 3],
    "look": [10.2, 1.6, 5],
    "zoom": 1.4,
    "type": "linear", "speed": 0.015,
  });
  clips.push({
    "target": "camera", "name": "lower mortality",
    "pos": [15.8, 3.2, 6.2],
    "look": [12.5, 1.0, 4.3],
    "zoom": 1,
    "type": "bezier",
  });
  clips.push({
    "target": "camera", "name": "explore",
    "pos": [-3, 3.5, 4.5],
    "look": [7, 2, 4],
    "zoom": 0.7,
    "type": "bezier",
  });
  return clips;
}

export { getClips, getStartClips };
