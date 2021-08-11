// @역할 : 유저가 입력한 칼로리 기록에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";

// 추가 액션
import {delCartAll} from './cart';

// 전역 > 서버 배포
import instance from "./instance";

// middleware
// 기록하기
export const addRecordDB = (date, list, type, url, memo) => {
  return function (dispatch, getState, {history}) {
    instance
      .post('/api/record', {date:date, foodList:list, type:type, url:url, contents:memo})
      .then((res) => {
        window.alert('식사 기록되었어요! 칼로리즈와 함께 건강해져요💪🏻')
        dispatch(delCartAll())
        dispatch(delImgAll())
        dispatch(typeChk(type))
        history.replace('/dashboard')
      })
      .catch((err) => {
        window.alert('게시글 업로드에 오류가 발생했어요! 관리자에게 문의해주세요😿')
      })
  }
};

// db에서 오늘의 칼로리 리스트 가져오기(dashboard)
export const getTodayRecordDB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false))
    instance
      .get('/api/calendar/dash')
      .then((res) => {
          const food_list = res.data.record
          dispatch(getRecord(food_list)) 
          dispatch(isLoaded(true))
      })
      .catch((err) => {
        console.log(err)
        window.alert('기록을 불러오는데 오류가 발생했어요! 관리자에게 문의해주세요😿')
      }) 
  }
};

// 전체 기록 불러오기 (calendar)
export const getAllRecordDB = (monthFormat) => {
  return function (dispatch, getState, {history}) {
    instance
      .get(`/api/calendar/${monthFormat}`)
      .then((res) => {
        const data_list = res.data.record
        dispatch(getAllRecord(data_list))
      })
      .catch((err) => {
        window.alert('게시글 로드에 문제가 발생했어요! 관리자에게 문의해주세요😿')
      }) 
  }
};

// 특정 일자 기록 불러오기(calendar)
export const getRecordDB = (date) => {
  return function (dispatch, getState, {history}) {
    dispatch(isLoaded(false))
    instance
      .get(`/api/calendar/detail/${date}`)
      .then((res) => {
        const record_list = res.data.record

        //기록이 없을 경우 alert, dashboard로 이동
        //기록이 있을 경우 액션
        if (record_list.length === 0) {
          window.alert('기록된 칼로리가 없어요!')
          history.push('/dashboard')
        } else {dispatch(getRecord(record_list))}
        dispatch(isLoaded(true))
      })
      .catch((err) => {
        window.alert('기록을 로드하는데 오류가 있어요! 관리자에게 문의해주세요😿')
      }) 
  }
};

// initial State 
const initialState = {

  // 하루 칼로리 리스트(dashboard, calendar_detail)
  record: [],

  // 한 달 캘린더(calendar)
  calendar: [],

  // type
  type: [],

  // kcal
  kcal: [],

  // record_img
  img: [],

  // loading
  is_loaded: false,
}

// redux
const record = createSlice({
  name: "record",
  initialState,
  reducers: {

    // dashboard&calendar - 하루 기록 칼로리 리스트 가져오기
    getRecord : (state, action) => {
      state.record = action.payload
    },

    // calendar - 한 달 칼로리 가져오기
    getAllRecord : (state, action) => {
      state.calendar = action.payload
    },

    // type chk
    typeChk : (state, action) => {
      state.type = action.payload
    },

    // ttl kcal
    ttlKcal : (state, action) => {
      state.kcal = action.payload
    },

    // recordImg
    addImage : (state, action) => {
      state.img = action.payload
    },

    // record one Img delete
    delImage : (state, action) => {
      state.img.splice(action.payload, 1)
    },

    // record to dashboard >> all Img delete
    delImgAll : (state, action) => {
      state.img = []
    },

    // loading
    isLoaded : (state, action) => {
      state.is_loaded = action.payload
    },
  }
});

export const {getRecord, getAllRecord, typeChk, ttlKcal, addImage, delImage, delImgAll, isLoaded} = record.actions;

export default record;