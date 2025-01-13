import { create } from 'zustand'
import { Lerp } from '../../BasicElements/BasicElements.jsx';
import { xyzProps, centerPos, rectWidth, rectDepth } from './Constants_DS1.jsx';

export const idces = [0, 0, 3, 0];
export const visibleNum = [12, 6, 9, 12];
export const width = [rectWidth, rectDepth, rectDepth * xyzProps.dataA1.length / visibleNum[1], rectDepth * xyzProps.dataA1.length / visibleNum[2], rectDepth];


const useStore = create((set) => ({
  idx:0,
  target:0,
  step: 0,
  steps: [0, 1],
  opacity: 1,
  progress: [0,0,0,0,0,0],
  currentIdx: 0,
  currentWidth: rectWidth,
  rectGroupPos: centerPos,
  animation_Imm: [],
  animation_Anm: [],
  animation_Stt: [],

  setIdx: (val) => set((state) => {
    // console.log(state.target, state.idx);
    return {idx: Math.floor(state.idx + (state.target - state.idx) * 0.07)}
  }),
  setTarget: (val) => set((state) => {return {target: val,}}),
  reset: (val) => set((state) => {return {
    idx: 0,
    target: 0,
    step: 0,
    steps: [0, 1],
    year: 0,
    waterLevel: 1,
    opacity: 0.0,
    animation_Imm: [],
    animation_Anm: [],
    animation_Stt: [],
    animation_dist: [],
  }}),
  setStep: (val) => set((state) => {return {step: val}}),
  setSteps: (val) => set((state) => {return {steps: val}}),
  setOpacity: (val) => set((state) => {return {opacity: val}}),
  setProgress: (val) => set((state) => {
    // console.log(state.progress, val);
    return {
      progress: val,
      currentIdx: Lerp(Lerp(Lerp(idces[0],idces[1],state.progress[3]),idces[2],state.progress[4]),idces[3],state.progress[5]),
      currentWidth: Lerp(Lerp(Lerp(Lerp(width[0],width[1],state.progress[1]),width[2],state.progress[3]),width[3],state.progress[4]),width[4],state.progress[5]),
      rectGroupPos: [centerPos[0] - 0.5 * (xyzProps.zLength - xyzProps.xLength) * state.progress[1], centerPos[1], centerPos[2]]
    }
  }),
  setAnimation_Imm: (val) => set((state) => {return {animation_Imm: val}}),
  setAnimation_Anm: (val) => set((state) => {return {animation_Anm: val}}),
  setAnimation_Stt: (val) => set((state) => {return {animation_Stt: val}}),
}));

export { useStore };
