import {adjustedArr1, adjustedArr2, adjustedArr3, adjustedB1, adjustedA1B2, adjustedA2B3} from '../Components/./snpData.jsx';
import{ SCALE_X } from '../BaseStructure/Constants_DS2.jsx';
const stoppers_DS2 =      [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];
const clipPositions_DS2 = [0.00, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1.00];
const LINE1_X = -SCALE_X * (adjustedA1B2.length + adjustedArr1.length - 2);
// -13900 when SCALE_X = 30
const LINE2_X = -SCALE_X * (adjustedA1B2.length + adjustedArr1.length + adjustedArr2.length + adjustedA2B3.length - 4);
const gap2to1 = (adjustedArr2[0] - adjustedArr1[0]);
const gap3to1 = (adjustedArr3[0] - adjustedArr1[0]);
const xZero_a3 = SCALE_X * (adjustedArr3.length + adjustedArr2.length + adjustedA2B3.length + adjustedA1B2.length + adjustedArr1.length + adjustedB1.length - 6)
function getClips(){
  let clips = [];
  clips.push({
    "target": "line1", "name": "only title",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 1,
    "opacityML": 0,
    "opacityExtraLine": 1,
    "opacityExtraML": 1,
    "opacityAxis": 1,
    "opacityLastAxis": 0,
    "opacityFloor23": 0,
    "opacityFloor1": 0,
    "opacityRecovery": 0,
    "moveX2": 0,
    "moveY2": 0,
    "moveX3": 0,
    "moveY3": 0,
    "cutter2": xZero_a3 + 1250,
    "cutter3": xZero_a3 + 1250,
    "high_y": 6000,
    "low_y": 2000,
    "high_x": 100,
    "low_x": 0,
    "yChanger": [0, 0],
    "camMove": [0, 15000, 0]
  });
  clips.push({
    "target": "line1", "name": "overall graph",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 1,
    "opacityML": 0,
    "opacityExtraLine": 1,
    "opacityExtraML": 1,
    "opacityAxis": 1,
    "opacityLastAxis": 0,
    "opacityFloor23": 0,
    "opacityFloor1": 0,
    "opacityRecovery": 0,
    "moveX2": 0,
    "moveY2": 0,
    "moveX3": 0,
    "moveY3": 0,
    "cutter2": xZero_a3 + 1250,
    "cutter3": xZero_a3 + 1250,
    "high_y": 6000,
    "low_y": 2000,
    "high_x": 100,
    "low_x": 0,
    "yChanger": [0, 0],
    "camMove": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "overall graph2",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 1,
    "opacityML": 0,
    "opacityExtraLine": 1,
    "opacityExtraML": 1,
    "opacityAxis": 1,
    "opacityLastAxis": 0,
    "opacityFloor23": 0,
    "opacityFloor1": 0,
    "opacityRecovery": 0,
    "moveX2": 0,
    "moveY2": 0,
    "moveX3": 0,
    "moveY3": 0,
    "cutter2": xZero_a3 + 1250,
    "cutter3": xZero_a3 + 1250,
    "high_y": 6000,
    "low_y": 2000,
    "high_x": 100,
    "low_x": 0,
    "yChanger": [0, 0],
    "camMove": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "blind line 2 & 3",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 0.7,
    "opacityML": 1,
    "opacityExtraLine": 0,
    "opacityExtraML": 0,
    "opacityAxis": 0,
    "opacityLastAxis": 1,
    "opacityFloor23": 0,
    "opacityFloor1": 0,
    "opacityRecovery": 0,
    "moveX2": 0,
    "moveY2": 0,
    "moveX3": 0,
    "moveY3": 0,
    "cutter2": 0,
    "cutter3": 0,
    "high_y": 3500,
    "low_y": 2000,
    "high_x": 15,
    "low_x": 6,
    "yChanger": [470, 3500],
    "camMove": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "move line 2 & 3",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 0.7,
    "opacityML": 1,
    "opacityExtraLine": 1,
    "opacityExtraML": 1,
    "opacityAxis": 0,
    "opacityLastAxis": 1,
    "opacityFloor23": 0,
    "opacityFloor1": 1,
    "opacityRecovery": 0,
    "moveX2": LINE1_X,
    "moveY2": -gap2to1,
    "moveX3": LINE2_X,
    "moveY3": -gap3to1,
    "cutter2": 0,
    "cutter3": 0,
    "high_y": 3500,
    "low_y": 2000,
    "high_x": 15,
    "low_x": 6,
    "yChanger": [470, 3500],
    "camMove": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "pop floor annotation",
    "color1": [110, 110, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 0.7,
    "opacityML": 1,
    "opacityExtraLine": 0.5,
    "opacityExtraML": 1,
    "opacityAxis": 0,
    "opacityLastAxis": 1,
    "opacityFloor23": 1,
    "opacityFloor1": 1,
    "opacityRecovery": 0,
    "moveX2": LINE1_X,
    "moveY2": -gap2to1,
    "moveX3": LINE2_X,
    "moveY3": -gap3to1,
    "cutter2": SCALE_X * 22,
    "cutter3":  SCALE_X * 9,
    "high_y": 3500,
    "low_y": 2000,
    "high_x": 15,
    "low_x": 6,
    "yChanger": [470, 3500],
    "camMove": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "pop recovery annotation",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 0.7,
    "opacityML": 1,
    "opacityExtraLine": 0,
    "opacityExtraML": 0,
    "opacityAxis": 0,
    "opacityLastAxis": 1,
    "opacityFloor23": 0,
    "opacityFloor1": 0,
    "opacityRecovery": 1,
    "moveX2": LINE1_X,
    "moveY2": -gap2to1,
    "moveX3": LINE2_X,
    "moveY3": -gap3to1,
    "cutter2": xZero_a3 + 1250,
    "cutter3": xZero_a3 + 1250,
    "high_y": 3500,
    "low_y": 2000,
    "high_x": 30,
    "low_x": 6,
    "yChanger": [470, 3500],
    "camMove": [0, 0, 0]
  });
  clips.push({
    "target": "line1", "name": "pop floor annotation too",
    "color1": [100, 100, 255], "color2": [100, 250, 50], "color3": [250, 10, 102],
    "opacityLine": 0.7,
    "opacityML": 1,
    "opacityExtraLine": 0,
    "opacityExtraML": 0,
    "opacityAxis": 0,
    "opacityLastAxis": 1,
    "opacityFloor23": 1,
    "opacityFloor1": 1,
    "opacityRecovery": 1,
    "moveX2": LINE1_X,
    "moveY2": -gap2to1,
    "moveX3": LINE2_X,
    "moveY3": -gap3to1,
    "cutter2": xZero_a3 + 1250,
    "cutter3": xZero_a3 + 1250,
    "high_y": 3500,
    "low_y": 2000,
    "high_x": 30,
    "low_x": 6,
    "yChanger": [470, 3500],
    "camMove": [0, 0, 0]
  });
  return clips;
}
function getTransitions(){
  let transitions = [];
  let clips = getClips();
  transitions.push({
    "target": "line1",
    "from": {"frame": 0, "clip": "only title"}, "to": {"frame": 1, "clip": "overall graph"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 1, "clip": "overall graph"}, "to": {"frame": 2, "clip": "overall graph2"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 2, "clip": "overall graph2"}, "to": {"frame": 3, "clip": "blind line 2 & 3"},
    "easing": "bezier",
    "motion": [
      { "type": "pow", "attribute": "opacityLastAxis", "args": {"axis": 1, "height": 700} },
      { "type": "pow", "attribute": "lookAt", "args": {"axis": 1, "height": 700} }
    ]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 3, "clip": "blind line 2 & 3"}, "to": {"frame": 4, "clip": "move line 2 & 3"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 4, "clip": "move line 2 & 3"}, "to": {"frame": 5, "clip": "pop floor annotation"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 5, "clip": "pop floor annotation"}, "to": {"frame": 6, "clip": "pop recovery annotation"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  transitions.push({
    "target": "line1",
    "from": {"frame": 6, "clip": "pop recovery annotation"}, "to": {"frame": 7, "clip": "pop floor annotation too"},
    "easing": "bezier",
    "motion": [{ "type": "linear", "args": {} }]
  });
  return transitions;
}
export { stoppers_DS2, clipPositions_DS2, getClips, getTransitions };
