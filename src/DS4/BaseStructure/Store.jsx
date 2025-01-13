import { create } from 'zustand'
import { Immersive } from '../../BasicElements/Constants.jsx';
import * as IMM from '../Animations/Immersive.jsx';
import * as STT from '../Animations/Static.jsx';

const useStore = create((set) => ({
  idx:0,
  immClips: [IMM.getStartClips(), IMM.getClips()],
  sttClips: [STT.getClips(), STT.getClips()],
  narrativeStep: 0,
  target: [IMM.getStartClips()[0], IMM.getClips()[0]],
  flag: true,
  flag2: false,
  control: false,
  ranges: {age: [0, 80], year:[1816, 2019]},
  prevRanges: {age: [0, 80], year:[1816, 2019]},
  diffRanges:{age: [0, 0], year:[0, 0]},
  progress: [1, 1, 1, 1, 1, 1],
  step5Clip: 6,

  setIdx: (val) => set((state) => {return {idx: val}}),
  setControl: (val) => set((state) => {return {control: val}}),
  setNarrativeStep: (val) => set((state) => {return {narrativeStep: val}}),
  setClips: (val) => set((state) => {return {clips: val}}),
  setPrev: (e, type) => set((state) => {
    console.log("Prev currentStep:", state.narrativeStep, type);
    const prevStep =  state.narrativeStep>0? state.narrativeStep - 1 : 0;
    let clips = type==Immersive?state.immClips:state.sttClips;
    let progress = state.progress;
    progress[state.narrativeStep] = 1;
    progress[prevStep] = 0;

    return {
      narrativeStep: prevStep,
      target: [clips[0][prevStep], clips[1][prevStep]],
      flag: true,
      progress: progress,
      ranges: (prevStep == 3)?{
        age: [0, 80],
        year: [1816, 2019]
      }:{
        age: [state.ranges.age[0], state.ranges.age[1]],
        year: [state.ranges.year[0], state.ranges.year[1]]
      }
    }
  }),
  setNext: (e, type) => set((state) => {
    const maxStep = 8;
    console.log("Next currentStep:", state.narrativeStep, type);
    const nextStep = state.narrativeStep<maxStep? state.narrativeStep + 1 : maxStep;
    let clips = type==Immersive?state.immClips:state.sttClips;
    let progress = state.progress;
    progress[state.narrativeStep] = 1;
    progress[nextStep] = 0;

    return {
      narrativeStep: nextStep,
      target: [clips[0][nextStep], clips[1][nextStep]],
      flag: true,
      progress: progress,
    }
  }),
  setFlag: (val) => set((state) => {return {flag: val}}),
  setFlag2: (val) => set((state) => {return {flag2: val}}),
  setRanges: (key, val) => set((state) => {
    return {
      ranges: {
        age: [
          key=='age_start'? val:(key=='whole'? val[0]:state.ranges['age'][0]),
          key=='age_end'?   val:(key=='whole'? val[1]:state.ranges['age'][1])],
        year: [
          key=='year_start'?val:(key=='whole'? val[2]:state.ranges['year'][0]),
          key=='year_end'?  val:(key=='whole'? val[3]:state.ranges['year'][1])],
      }
    }
  }),
  setPrevRanges: (key, val) => set((state) => {
    return {
      prevRanges: {
        age: [
          key=='age_start'? val:(key=='whole'? val[0]:state.prevRanges['age'][0]),
          key=='age_end'?   val:(key=='whole'? val[1]:state.prevRanges['age'][1])],
        year: [
          key=='year_start'?val:(key=='whole'? val[2]:state.prevRanges['year'][0]),
          key=='year_end'?  val:(key=='whole'? val[3]:state.prevRanges['year'][1])],
      }
    }
  }),
  setDiffRanges: (key, val) => set((state) => {
    return {
      diffRanges: {
        age: [
          key=='age_start'? val:(key=='whole'? val[0]:state.diffRanges['age'][0]),
          key=='age_end'?   val:(key=='whole'? val[1]:state.diffRanges['age'][1])],
        year: [
          key=='year_start'?val:(key=='whole'? val[2]:state.diffRanges['year'][0]),
          key=='year_end'?  val:(key=='whole'? val[3]:state.diffRanges['year'][1])],
      }
    }
  }),
  setProgress: (val) => set((state) => {return {progress: val}}),
  setStep5Clip: (val) => set((state) => {
    const presetRanges = [
      [0, 80, 1895, 1945],
      [0, 80, 1915, 1965],
      [0, 80, 1910, 1960],
      [0, 80, 1920, 1970],
      [0, 80, 1816, 1866],
      [0, 80, 1845, 1895],
      [0, 80, 1816, 2019]
    ];
    console.log("input: ", val, " step5Clip: ", state.step5Clip);
    let nextVal = (val == state.step5Clip)? 6 : val;
    let progress = state.progress;
    progress[5] = 0;
    return {
      progress: progress,
      step5Clip: nextVal,
      prevRanges: {
        age:[state.ranges['age'][0], state.ranges['age'][1],],
        year:[state.ranges['year'][0], state.ranges['year'][1]]
      },
      diffRanges: {
        age:[presetRanges[nextVal][0]-state.ranges['age'][0], presetRanges[nextVal][1]-state.ranges['age'][1],],
        year:[presetRanges[nextVal][2]-state.ranges['year'][0], presetRanges[nextVal][3]-state.ranges['year'][1]]
      },
      flag: true,
  }}),

  initStore: () => set((state) => {
    return {
      idx:0,
      immClips: [IMM.getStartClips(), IMM.getClips()],
      sttClips: [STT.getClips(), STT.getClips()],
      narrativeStep: 0,
      target: [IMM.getStartClips()[0], IMM.getClips()[0]],
      flag: true,
      flag2: false,
      control: false,
      ranges: {age: [0, 80], year:[1816, 2019]},
      prevRanges: {age: [0, 80], year:[1816, 2019]},
      diffRanges:{age: [0, 0], year:[0, 0]},
      progress: [1, 1, 1, 1, 1, 1],
      step5Clip: 6,
    }
  })
}));

export { useStore };
