import {storage} from '@core/utils'
import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
}

const normalize = s => {
  return {
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
  }
}

export const initialState = storage('excel-state') ?
        storage('excel-state') :
        defaultState;
