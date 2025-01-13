const stoppers_DS2 = [0.015, 0.015, 0.015, 0.015, 0.015, 0.015];
const clipPositions_DS2 = [0.00, 0.20, 0.40, 0.60, 0.84, 1.00];
const totalLength = 500;

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "group1_init",
    "waterLevel": 0.5, opacity: 0.0
  });
  clips.push({
    "target": "group1", "name": "ground_topCorner1",
    "waterLevel": 0.5, opacity: 0.0
  });
  clips.push({
    "target": "group1", "name": "ground_topCorner2",
    "waterLevel": 0.48, opacity: 0.0
  });
  clips.push({
    "target": "group1", "name": "group1_end1",
    "waterLevel": 0.74, opacity: 0.0
  });
  clips.push({
    "target": "group1", "name": "group1_end2",
    "waterLevel": 0.74, opacity: 1.0
  });

  // text
  clips.push({
    "target": "text", "name": "text_0",
    "pos": totalLength * 0.000
  })
  clips.push({
    "target": "text", "name": "text_1",
    "pos": totalLength * 0.200
  })
  clips.push({
    "target": "text", "name": "text_2",
    "pos": totalLength * 0.400
  })
  clips.push({
    "target": "text", "name": "text_3",
    "pos": totalLength * 0.600
  })
  clips.push({
    "target": "text", "name": "text_4",
    "pos": totalLength * 0.840
  })
  clips.push({
    "target": "text", "name": "text_5",
    "pos": totalLength * 1.000
  })

  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 1, "clip": "group1_init"}, "to": {"frame": 2, "clip": "ground_topCorner1"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 2, "clip": "ground_topCorner1"}, "to": {"frame": 3, "clip": "ground_topCorner2"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 3, "clip": "ground_topCorner2"}, "to": {"frame": 4, "clip": "group1_end1"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 4, "clip": "group1_end1"}, "to": {"frame": 5, "clip": "group1_end2"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });

  transitions.push({
    "target": "text",
    "from": {"frame": 0, "clip": "text_0"}, "to": {"frame": 1, "clip": "text_1"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 1, "clip": "text_1"}, "to": {"frame": 2, "clip": "text_2"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 2, "clip": "text_2"}, "to": {"frame": 3, "clip": "text_3"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 3, "clip": "text_3"}, "to": {"frame": 4, "clip": "text_4"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  })
  transitions.push({
    "target": "text",
    "from": {"frame": 4, "clip": "text_4"}, "to": {"frame": 5, "clip": "text_5"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  })
  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
