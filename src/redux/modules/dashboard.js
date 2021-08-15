// @역할 : 대시보드에 들어가는 푸드 외 데이터에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";

// 전역 > 서버 배포
import instance from "./instance";

// loading
import {isLoaded} from './record';

// middleware 
// dashboard - db에서 운동리스트 가져오기
export const getWorkoutDB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false))
    instance
      .get('/api/calendar/exercise')
      .then((res) => {
        const exercise_list = res.data.exercise
        dispatch(getExercise(exercise_list))
        
        dispatch(isLoaded(true))
      })
      .catch((err) => {
        console.log(err)
      }) 
  }
};

// dashboard - 바디스펙 저장하기
export const addBodySpecDB = (bodySpec) => {
  let heightBlindDB = bodySpec.includes('height') ? (bodySpec === "height_true" ? true : false) : undefined
  let weightBlindDB = bodySpec.includes('weight') ? (bodySpec === "weight_true" ? true : false) : undefined
  let bmrBlindDB = bodySpec.includes('bmr') ? (bodySpec === "bmr_true" ? true : false) : undefined

  return function (dispatch, getState, {history}) {
    instance
      .put('/api/calendar/blind', {weightBlind: weightBlindDB, heightBlind: heightBlindDB , bmrBlind: bmrBlindDB})
      .then((res) => {
      })
      .catch((err) => {
        window.alert('바디스펙을 저장하는데 오류가 있어요! 관리자에게 문의해주세요😿')
      }) 
  }
};

const initialState = {

  // 추천 운동 리스트(dashboard)
  exercise: [],

  // bmr
  bmr: 0,

  // bodySpec
  specBlind: {
    height_blind : false,
    weight_blind : false,
    bmr_blind : false,
  },
}

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {

    // 세션 클리어용
    delDashboardAll: state => {
      state.exercise = [];
      state.bmr = 0;
      state.specBlind = {
        height_blind : false,
        weight_blind : false,
        bmr_blind : false,
      };
    },


    // dashboard - 운동 리스트 가져오기
    getExercise : (state, action) => {
      state.exercise = action.payload
    },

    // bmr chk
    bmrChk : (state, action) => {
      state.bmr = action.payload
    },

    // getBodySpec
    getSpecBlind : (state, action) => {
      state.specBlind.height_blind = action.payload.heightBlind
      state.specBlind.weight_blind = action.payload.weightBlind
      state.specBlind.bmr_blind = action.payload.bmrBlind
    }
  }
});

export const {getExercise, bmrChk, heightBlindDB, weightBlindDB, bmrBlindDB, getSpecBlind, delDashboardAll} = dashboard.actions;

export default dashboard;