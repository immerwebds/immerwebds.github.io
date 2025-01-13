import { create } from 'zustand'
import { Abstract } from './Constants.jsx';

const useBasicStore = create((set) => ({
  type: 0,
  setType: (val) => set((state) => {return {type: val,}}),

  rightMode: Abstract,
  setRightMode: (val) => set((state) => {return {rightMode: val,}}),

  reset: (val) => set((state) => {return {
    type: state.type,
    rightMode: state.rightMode,
  }}),

  clickedCondition: 0,
}));

export { useBasicStore };
