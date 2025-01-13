import {adjustedArr1, adjustedArr2, adjustedArr3, adjustedB1, adjustedA1B2, adjustedA2B3} from '../Components/./snpData.jsx';

import{ SCALE_X, SCALE_Y } from '../BaseStructure/Constants_DS2.jsx';
const lineWidth = 80;
const interval = 3;

const stoppers_DS2 =      [0.00, 0.01,  0.00,  0.00,  0.01,  0.01,  0.01,  0.01,  0.01,  0.00,  0.00];
const clipPositions_DS2 = [0.00, 0.10,  0.16,  0.24,  0.30,  0.40,  0.50,  0.60,  0.84,  0.91,  1.00];
//                    only ax   overall   endter3d  rotate    linesmov   goLine1   gotomin  seesky   goto1end   endrotate   exit3d
const LINE1_X = SCALE_X * (adjustedB1.length - 1);
// -13900 when SCALE_X = 30
const LINE2_X = SCALE_X * (adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 3);
const LINE3_X = SCALE_X * (adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 5);
const LINE1_Y = adjustedArr1[0];
const xZero_a3 = SCALE_X * (adjustedArr3.length + adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 6)
const gap2to1 = (adjustedArr2[0] - adjustedArr1[0]);
const gap3to1 = (adjustedArr3[0] - adjustedArr1[0]);

function getClips(){
  let clips = [];
  clips.push({
    "target": "line1", "name": "only axis",
    "pos":    [xZero_a3 / 2, 20000, 4900000], "rot": [0, 0, 0], "zoom": 600,
    "lookAt": [xZero_a3 / 2, 20000, 3999900] ,
    "lookAtGap":0, "railMove": [0, 0],
    "pos2": [LINE2_X, 0, 0],
    "pos3": [LINE3_X, 0, 0],
    "axisMove": [0,0],
    "opacityLine": 1, "opacityGrid": 0, "opacityML": 0, "opacityAxis": 1, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 1
  });
  clips.push({
    "target": "line1", "name": "overall graph",
    "pos":    [xZero_a3 / 2, 0, 4900000], "rot": [0, 0, 0], "zoom": 600,
    "lookAt": [xZero_a3 / 2, 0, 3999900] ,
    "lookAtGap":0, "railMove": [0, 0],
    "pos2": [LINE2_X, 0, 0],
    "pos3": [LINE3_X, 0, 0],
    "axisMove": [0,0],
    "opacityLine": 1, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 1, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 1
  });
  clips.push({
    "target": "line1", "name": "enter 3d",
    "pos":    [LINE1_X, LINE1_Y + 1 * SCALE_X, 5000], "rot": [0, 0, 0], "zoom": 1,
    "lookAt": [LINE1_X, LINE1_Y + 1 * SCALE_X, 280] ,
    "lookAtGap":0, "railMove": [0, 0],
    "pos2": [LINE2_X, 0, 0],
    "pos3": [LINE3_X, 0, 0],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0, "opacityML": 1, "opacityAxis": 0.9, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "start rotate",
    "pos":    [LINE1_X - 4.4 * SCALE_X, LINE1_Y + 1 * SCALE_X, 280], "rot": [-20, 0, 0], "zoom": 1,
    "lookAt": [LINE1_X, LINE1_Y + 1 * SCALE_X, 280] ,
    "lookAtGap":1, "railMove": [0,2],
    "pos2": [LINE2_X, 0, 0],
    "pos3": [LINE3_X, 0, 0],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 1, "opacityExtraLine": 0.5
  });
  clips.push({
    "target": "line1", "name": "lines move",
    "pos":    [LINE1_X - 4.4 * SCALE_X, LINE1_Y + 1 * SCALE_X, 280], "rot": [-20, 0, 0], "zoom": 1,
    "lookAt": [LINE1_X, LINE1_Y + 1 * SCALE_X, 280] ,
    "lookAtGap":1, "railMove": [0,2],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to line1",
    "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 5.33 * SCALE_X, 40], "rot": [0, 0, 0], "zoom": 1,
    "lookAt": [LINE1_X + 13 * SCALE_X, LINE1_Y + 5.33 * SCALE_X, 40] ,
    "lookAtGap":1, "railMove": [0,1],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to min",
    "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 40], "rot": [-60, 0, 0], "zoom": 1,
    "lookAt": [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 40] ,
    "lookAtGap":1, "railMove": [8.5, -5.9],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "compare min",
    "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 40], "rot": [85, -50, 0], "zoom": 1,
    "lookAt": [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 40] ,
    "lookAtGap":1, "railMove": [8.5, -5.9],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "go to line1 end",
    "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 40], "rot": [-20, -179.9, 0], "zoom": 1,
    "lookAt": [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 40] ,
    "lookAtGap":1, "railMove": [41.5, 0],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [0,0],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "end rotate",
    "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 5000], "rot": [0, -270, 0], "zoom": 3,
    "lookAt": [LINE1_X - 5.33 * SCALE_X, LINE1_Y + 8 * SCALE_Y, 5000] ,
    "lookAtGap":1, "railMove": [20.5, -6],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [SCALE_X * (adjustedB1.length-1),2000],
    "opacityLine": 0.7, "opacityGrid": 0.5, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 0,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  clips.push({
    "target": "line1", "name": "exit 3d",
    "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y, 800000], "rot": [0, -270, 0], "zoom": 400,
    "lookAt": [LINE1_X - 5.33 * SCALE_X, LINE1_Y, 800000],
    "lookAtGap":0, "railMove": [20, -5.5],
    "pos2": [LINE1_X, -gap2to1, 1*interval*lineWidth],
    "pos3": [LINE1_X, -gap3to1, 2*interval*lineWidth],
    "axisMove": [SCALE_X * (adjustedB1.length-1),2000],
    "opacityLine": 1, "opacityGrid": 0.0, "opacityML": 1, "opacityAxis": 0, "opacityLastAxis": 1,
    "opacity3dAnnot": 1, "opacityExtraML": 0, "opacityExtraLine": 0
  });
  // "pos":    [LINE1_X - 5.33 * SCALE_X, LINE1_Y, 780000], "rot": [0, -270, 0], "zoom": 400,
  // "lookAt": [LINE1_X - 5.33 * SCALE_X, LINE1_Y, 39990],
  return clips;
}

function getTransitions(){
  let transitions = [];
  let clips = getClips();
  transitions.push({
    "target": "line1",
    "from": {"frame": 0, "clip": "only axis"}, "to": {"frame": 1, "clip": "overall graph"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 1, "clip": "overall graph"}, "to": {"frame": 2, "clip": "enter 3d"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 2, "clip": "enter 3d"}, "to": {"frame": 3, "clip": "start rotate"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 3, "clip": "start rotate"}, "to": {"frame": 4, "clip": "lines move"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 4, "clip": "lines move"}, "to": {"frame": 5, "clip": "go to line1"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 5, "clip": "go to line1"}, "to": {"frame": 6, "clip": "go to min"},
    "easing": "bezier",
    "motion": [
      { "type": "sin", "attribute": "pos", "args": {"axis": 1, "height": 700} },
      { "type": "sin", "attribute": "lookAt", "args": {"axis": 1, "height": 700} }
    ]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 6, "clip": "go to min"}, "to": {"frame": 7, "clip": "compare min"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 7, "clip": "compare min"}, "to": {"frame": 8, "clip": "go to line1 end"},
    "easing": "bezier",
    "motion": [
      { "type": "-sin", "attribute": "rot", "args": {"axis": 1, "height": 50, "skewness": 1.2} },
      { "type": "-skewedSine", "attribute": "pos", "args": {"axis": 2, "height": 700, "skewness": 1.5} },
      { "type": "-skewedSine", "attribute": "lookAt", "args": {"axis": 2, "height": 700, "skewness": 1.5 } },
      { "type": "-sin", "attribute": "pos", "args": {"axis": 1, "height": 500} },
      { "type": "-sin", "attribute": "lookAt", "args": {"axis": 1, "height": 500} }
    ]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 8, "clip": "go to line1 end"}, "to": {"frame": 9, "clip": "end rotate"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 9, "clip": "end rotate"}, "to": {"frame": 10, "clip": "exit 3d"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });


  return transitions;
}

export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
