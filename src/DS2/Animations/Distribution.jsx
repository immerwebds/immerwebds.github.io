const stoppers_Dist2 = [0.01, 0.01, 0.01, 0.01, 0.00, 0.00, 0.01, 0.01];
const clipPositions_Dist2 = [0.00, 0.20, 0.40, 0.60, 0.68, 0.76, 0.84, 1.00];

function getClips(){
  let clips = [];
  clips.push({
    "target": "dist", "name": "init",
    "dist": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
    "yearProp": 2009,
  });
  clips.push({
    "target": "dist", "name": "2009",
    "dist": [4, 7, 14, 28, 42, 41, 31, 19, 11, 5],
    "yearProp": 2009,
  });
  clips.push({
    "target": "dist", "name": "2012",
    "dist": [4, 7, 13, 29, 41, 41, 30, 20, 12, 6],
    "yearProp": 2012,
  });
  clips.push({
    "target": "dist", "name": "2016",
    "dist": [5, 8, 15, 30, 44, 42, 34, 19, 13, 7],
    "yearProp": 2016,
  });
  clips.push({
    "target": "dist", "name": "2019",
    "dist": [5, 8, 17, 31, 43, 40, 33, 18, 12, 6],
    "yearProp": 2019,
  });
  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "dist",
    "from": {"frame": 1, "clip": "init"}, "to": {"frame": 2, "clip": "2009"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "dist",
    "from": {"frame": 3, "clip": "2009"}, "to": {"frame": 4, "clip": "2012"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "dist",
    "from": {"frame": 4, "clip": "2012"}, "to": {"frame": 5, "clip": "2016"},
    "easing": "linear",
    "motion": { "type": "linear", "args": {} }
  });
  transitions.push({
    "target": "dist",
    "from": {"frame": 5, "clip": "2016"}, "to": {"frame": 6, "clip": "2019"},
    "easing": "bezier",
    "motion": { "type": "linear", "args": {} }
  });


  return transitions;
}

export { stoppers_Dist2, clipPositions_Dist2, getClips, getTransitions };
