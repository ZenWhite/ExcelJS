import {storage} from '@core/utils'
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  date: new Date().toJSON()
}

const normalize = state => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
  }
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState;
}