const stoppers_DS2 =      [0.00, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];
const clipPositions_DS2 = [0.00, 0.10, 0.30, 0.40, 0.50, 0.60, 0.84, 1.00];
const totalLength = 1500;

function getClips(){
  let clips = [];
  clips.push({
    "target": "text", "name": "text_0",
    "pos": totalLength * 0.020
  })
  clips.push({
    "target": "text", "name": "text_1",
    "pos": totalLength * 0.120
  })
  clips.push({
    "target": "text", "name": "text_2",
    "pos": totalLength * 0.270
  })
  clips.push({
    "target": "text", "name": "text_3",
    "pos": totalLength * 0.370
  })
  clips.push({
    "target": "text", "name": "text_4",
    "pos": totalLength * 0.470
  })
  clips.push({
    "target": "text", "name": "text_5",
    "pos": totalLength * 0.570
  })
  clips.push({
    "target": "text", "name": "text_6",
    "pos": totalLength * 0.670
  })
  clips.push({
    "target": "text", "name": "text_7",
    "pos": totalLength * 0.765
  })
  return clips;
}

function getTransitions(){
  let transitions = [];

  transitions.push({
    "target": "text",
    "from": {"frame": 0, "clip": "text_0"}, "to": {"frame": 1, "clip": "text_1"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 1, "clip": "text_1"}, "to": {"frame": 2, "clip": "text_2"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 2, "clip": "text_2"}, "to": {"frame": 3, "clip": "text_3"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 3, "clip": "text_3"}, "to": {"frame": 4, "clip": "text_4"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 4, "clip": "text_4"}, "to": {"frame": 5, "clip": "text_5"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 5, "clip": "text_5"}, "to": {"frame": 6, "clip": "text_6"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 6, "clip": "text_6"}, "to": {"frame": 7, "clip": "text_7"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  })
  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
