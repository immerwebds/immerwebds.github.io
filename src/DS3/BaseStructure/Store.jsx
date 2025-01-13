import { create } from 'zustand'

const useStore = create((set) => ({
  idx:0,
  target: 0,
  step: 0,
  steps: [0, 1],
  animation_main: [],
  animation_text: [],
  animation_rl: [],
  animation_rlANM: [],
  animation_Stt: [],
  high_y: 5000,
  low_y: 2000,

  setIdx: (val) => set((state) => {
    return {
      idx: Math.floor(state.idx + (state.target - state.idx)*0.07)
    }
  }),
  setStep: (val) => set((state) => {return {step: val}}),
  setSteps: (val) => set((state) => {return {steps: val}}),
  setTarget: (val) => set((state) => {return {target: val}}),
  setAnimation_Main: (val) => set((state) => {return {animation_main: val}}),
  setAnimation_Text: (val) => set((state) => {return {animation_text: val}}),
  setAnimation_Rl: (val) => set((state) => {return {animation_rl: val}}),
  setAnimation_RlANM: (val) => set((state) => {return {animation_rlANM: val}}),
  setAnimation_Stt: (val) => set((state) => {return {animation_Stt: val}}),

  setHigh_Y: (val) => set((state) => {return {high_y: val}}),
  setLow_Y: (val) => set((state) => {return {low_y: val}}),
  setHigh_X: (val) => set((state) => {return {high_x: val}}),
  setLow_X: (val) => set((state) => {return {low_x: val}}),
}));

export { useStore };
