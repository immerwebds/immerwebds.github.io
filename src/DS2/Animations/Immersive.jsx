const stoppers_DS2 = [0.015, 0.015, 0.015, 0.015, 0.015, 0.015];
const clipPositions_DS2 = [0.00, 0.20, 0.40, 0.60, 0.84, 1.00];
const totalLength = 500;

function getClips(){
  let clips = [];
  clips.push({
    "target": "group1", "name": "group1_init",
    "pos": [0, -130, 0], "rot": [0, 0, 0], "waterLevel": 0.00, "opacity": 0.00,
  });
  // x: -35를 두면 제목과 겹치지 않게 만들 수 있음
  clips.push({
    "target": "group1", "name": "translateY",
    "pos": [0, 0, 0], "rot": [0, 0, 0], "waterLevel": 0.00, "opacity": 0.00,
  });
  clips.push({
    "target": "group1", "name": "show_distribution",
    "pos": [0, 0, 0], "rot": [0, 0, 0], "waterLevel": 0.46, "opacity": 0.00,
  });
  clips.push({
    "target": "group1", "name": "show_changepoint",
    "pos": [-25, -46, 0], "rot": [18 * Math.PI/180, -32 * Math.PI/180, 0], "waterLevel": 0.46, "opacity": 1.00,
  });
  clips.push({
    "target": "group1", "name": "show_distByTime_progress",
    "pos": [-25, -74, 0], "rot": [18 * Math.PI/180, -32 * Math.PI/180, 0], "waterLevel": 0.74, "opacity": 1.00,
  });
  clips.push({
    "target": "group1", "name": "group1_end",
    "pos": [0, -74, 0], "rot": [0, 0, 0], "waterLevel": 0.74, "opacity": 0.00,
  });

  clips.push({
    "target": "camera", "name": "init",
    "pos": [0, 0, 1000], "rot": [0, 0, 0], "zoom": 6.25,
  });
  clips.push({
    "target": "camera", "name": "show_chagepoint",
    "pos": [0, -25, 1000], "rot": [0, 0, 0], "zoom": 5.50,
  });
  clips.push({
    "target": "camera", "name": "show_distByTime_progress",
    "pos": [0, -50, 1000], "rot": [0, 0, 0], "zoom": 6.25,
  });
  clips.push({
    "target": "camera", "name": "end",
    "pos": [0, -74, 1000], "rot": [0, 0, 0], "zoom": 6.25,
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
    "from": {"frame": 0, "clip": "group1_init"}, "to": {"frame": 1, "clip": "translateY"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 1, "clip": "translateY"}, "to": {"frame": 2, "clip": "show_distribution"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 2, "clip": "show_distribution"}, "to": {"frame": 3, "clip": "show_changepoint"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 3, "clip": "show_changepoint"}, "to": {"frame": 4, "clip": "show_distByTime_progress"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 4, "clip": "show_distByTime_progress"}, "to": {"frame": 5, "clip": "group1_end"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });

  transitions.push({
    "target": "camera",
    "from": {"frame": 2, "clip": "init"}, "to": {"frame": 3, "clip": "show_chagepoint"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 3, "clip": "show_chagepoint"}, "to": {"frame": 4, "clip": "show_distByTime_progress"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 4, "clip": "show_distByTime_progress"}, "to": {"frame": 5, "clip": "end"},
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
