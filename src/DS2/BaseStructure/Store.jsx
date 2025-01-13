import { create } from 'zustand';

export const idces = [0, 0, 3, 0];
export const visibleNum = [12, 6, 9, 12];

const useStore = create((set) => ({
  idx:0,
  target:0,
  step: 0,
  steps: [0, 1],
  year: 0,
  waterLevel: 1,
  opacity: 0.0,
  animation_Imm: [],
  animation_Anm: [],
  animation_Stt: [],
  animation_dist: [],

  setIdx: (val) => set((state) => {return {
    idx: Math.floor(state.idx + (state.target - state.idx) * 0.07),
    year: state.animation_dist.length>0?Math.floor(state.animation_dist[0]["animation"][Math.floor(state.idx + (state.target - state.idx) * 0.07)].yearProp):0
  }}),
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
  setTarget: (val) => set((state) => {return {target: val}}),
  setStep: (val) => set((state) => {return {step: val}}),
  setSteps: (val) => set((state) => {return {steps: val}}),
  setWaterLevel: (val) => set((state) => {return {waterLevel: val}}),
  setOpacity: (val) => set((state) => {return {opacity: val}}),
  setAnimation_Imm: (val) => set((state) => {return {animation_Imm: val}}),
  setAnimation_Anm: (val) => set((state) => {return {animation_Anm: val}}),
  setAnimation_Stt: (val) => set((state) => {return {animation_Stt: val}}),
  setAnimation_Dist: (val) => set((state) => {return {animation_dist: val}}),
}));

export { useStore };
