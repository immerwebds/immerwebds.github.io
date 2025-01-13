const stoppers_DS1 = [0.015, 0.015, 0.015, 0.015, 0.015, 0.015, 0.015];
const clipPositions_DS1 = [0.00, 0.11, 0.30, 0.48, 0.65, 0.82, 1.00];
const totalLength = 600;

function getClips(){
  let clips = [];
  //group1
  clips.push({
    "target": "group1", "name": "group1_init",
    "pos": [0, 0, 0], "rot": [0, 0, 0], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_XY",
    "pos": [0, 0, 0], "rot": [0, Math.PI/2, 0], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_ZY",
    "pos": [0, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_zoom1",
    "pos": [-5, 10, 5], "rot": [0, Math.PI/2 + -40 * Math.PI/2 / 90, Math.PI/2], "opacity": 0.2,
  });
  clips.push({
    "target": "group1", "name": "group1_zoom2",
    "pos": [15, 10, 20], "rot": [0, Math.PI/2 + 40 * Math.PI/2 / 90, Math.PI/2], "opacity": 1,
  });
  clips.push({
    "target": "group1", "name": "group1_last",
    "pos": [0, 0, 0], "rot": [0, Math.PI/2, Math.PI/2], "opacity": 0.2,
  });

  // camera
  clips.push({
    "target": "camera", "name": "cam_init",
    "pos": [0, 0, 6250], "zoom": 6.25,
  });
  clips.push({
    "target": "camera", "name": "cam_zoom1",
    "pos": [0, 500, 6250], "zoom": 15,
  });
  clips.push({
    "target": "camera", "name": "cam_zoom2",
    "pos": [0, 800, 6250], "zoom": 14,
  });

  // text
  clips.push({
    "target": "text", "name": "text_0",
    "pos": totalLength * 0.000
  })
  clips.push({
    "target": "text", "name": "text_1",
    "pos": totalLength * 0.100
  })
  clips.push({
    "target": "text", "name": "text_2",
    "pos": totalLength * 0.320
  })
  clips.push({
    "target": "text", "name": "text_3",
    "pos": totalLength * 0.480
  })
  clips.push({
    "target": "text", "name": "text_4",
    "pos": totalLength * 0.640
  })
  clips.push({
    "target": "text", "name": "text_5",
    "pos": totalLength * 0.830
  })
  clips.push({
    "target": "text", "name": "text_6",
    "pos": totalLength * 1.000
  })

  return clips;
}

function getTransitions(){
  let transitions = [];
  transitions.push({
    "target": "group1",
    "from": {"frame": 1, "clip": "group1_init"}, "to": {"frame": 2, "clip": "group1_XY"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 2, "clip": "group1_XY"}, "to": {"frame": 3, "clip": "group1_ZY"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 3, "clip": "group1_ZY"}, "to": {"frame": 4, "clip": "group1_zoom1"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 4, "clip": "group1_zoom1"}, "to": {"frame": 5, "clip": "group1_zoom2"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });
  transitions.push({
    "target": "group1",
    "from": {"frame": 5, "clip": "group1_zoom2"},
    "to": {"frame": 6, "clip": "group1_last"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 1, "clip": "cam_init"}, "to": {"frame": 2, "clip": "cam_init"},
    "easing": "bezier",
    "motion": {
      "attribute": "pos",
      "type": "sin", // sin, linear, ...
      "args": {
        "axis": 1, // 0=x, 1=y, 2=z, pos should have axis
        "height": 1000 // sin should have height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 2, "clip": "cam_init"}, "to": {"frame": 3, "clip": "cam_init"},
    "easing": "bezier",
    "motion": {
      "attribute": "pos",
      "type": "sin", // sin, linear, ...
      "args": {
        "axis": 0, // 0=x, 1=y, 2=z, pos should have axis
        "height": -1000 // sin should have height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 3, "clip": "cam_init"}, "to": {"frame": 4, "clip": "cam_zoom1"},
    "easing": "bezier",
    "motion": {
      "attribute": "pos",
      "type": "sin", // sin, linear, ...
      "args": {
        "axis": 2, // 0=x, 1=y, 2=z, pos should have axis
        "height": 1000 // sin should have height
      }
    }
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 4, "clip": "cam_zoom1"}, "to": {"frame": 5, "clip": "cam_zoom2"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });
  transitions.push({
    "target": "camera",
    "from": {"frame": 5, "clip": "cam_zoom2"}, "to": {"frame": 6, "clip": "cam_init"},
    "easing": "bezier",
    "motion": {"type": "linear", "args": {}}
  });

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
  return transitions;
}

export { stoppers_DS1, clipPositions_DS1, getClips, getTransitions };
