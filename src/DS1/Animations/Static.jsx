const stoppers_DS1 = [0.00, 0.00];
const clipPositions_DS1 = [0.00, 1.00];
const totalLength = 340;

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "group1_init",
    "pos": [0, totalLength * 0.0, 0]
  });
  clips.push({
    "target": "group1", "name": "group1_last",
    "pos": [0, totalLength * 1.0, 0]
  });

  clips.push({
    "target": "camera", "name": "cam_init",
    "pos": [0, 0, 6250], "zoom": 5.25,
  });
  clips.push({
    "target": "camera", "name": "cam_last",
    "pos": [0, 0, 6250], "zoom": 5.25,
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 0, "clip": "group1_init"}, "to": {"frame": 1, "clip": "group1_last"},
    "easing": "linear",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 0, "clip": "cam_init"}, "to": {"frame": 1, "clip": "cam_last"},
    "easing": "linear",
    "motion": { "type": "linear", "args": {} }
  });

  return transitions;
}

export { totalLength, stoppers_DS1, clipPositions_DS1, getClips, getTransitions };
