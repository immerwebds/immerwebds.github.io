const stoppers_DS2 = [0.00, 0.00, 0.00];
const clipPositions_DS2 = [0.00, 0.50, 1.00];
const totalLength = 340;

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "waterLevel-0",
    "pos":[0, totalLength * 0.0, 0], "waterLevel": 0.5, opacity: 0.0
  });
  clips.push({
    "target": "group1", "name": "waterLevel-1",
    "pos":[0, totalLength * 0.55, 0], "waterLevel": 0.48, opacity: 0.0
  });
  clips.push({
    "target": "group1", "name": "waterLevel-2",
    "pos":[0, totalLength * 1.10, 0], "waterLevel": 0.74, opacity: 0.0
  });

  clips.push({
    "target": "camera", "name": "init",
    "pos":[0, 0, 1000], "zoom":6.25
  });

  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 0, "clip": "waterLevel-0"}, "to": {"frame": 1, "clip": "waterLevel-1"},
    "easing": "linear",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 1, "clip": "waterLevel-1"}, "to": {"frame": 2, "clip": "waterLevel-2"},
    "easing": "linear",
    "motion": [{ "type": "linear", "args": {} }]
  });

  transitions.push({
    "target": "camera",
    "from": {"frame": 0, "clip": "init"}, "to": {"frame": 2, "clip": "init"},
    "easing": "linear",
    "motion": [{ "type": "linear", "args": {} }]
  });

  return transitions;
}

export { totalLength, stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
