// @역할 : 유저가 입력한 칼로리 기록에 관한 모듈
// @담당자 : 김나영

import { createSlice } from "@reduxjs/toolkit";

// 전역 > 서버 배포
import instance from "./instance";
import { recordDeleted, clearDeleted } from "./user";

// sentry
import * as Sentry from '@sentry/react';

// middleware
// 기록하기 - 사진, 메모
export const addRecordDB = (type, url, memo, recordId, date) => {
  return function (dispatch, getState, {history}) {
    instance
      .post(`/api/record/${recordId}/urlContents`, {type:type, url:url, contents:memo})
      .then((res) => {
        console.log(res)
        history.push(`/loading/calendar/${date}`)
        dispatch(delImgAll())
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
        window.alert('게시글 업로드에 오류가 발생했어요! 관리자에게 문의해주세요😿')
        history.push('/')
      })
  }
};

// 기록 삭제하기 - 전체
export const delRecordDB = (id, date, type) => {
  return function (dispatch, getState, {history}) {
    instance
      .delete(`/api/record/${id}`, {data : {date:date, type:type}})
      .then((res) => {
        let deleted_list = getState().record.record[0].foodRecords;
        
        console.log(deleted_list);
        console.log(res);
        let result = deleted_list.filter((d,idx) => {
          if (d.type === type) {
            return d;
          }
        });
        dispatch(recordDeleted(result));

        // 기존 삭제
        dispatch(delRecord(type));
        history.push(`/loading/calendar`);
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
        window.alert('게시글 삭제에 오류가 발생했어요! 관리자에게 문의해주세요😿')
      })
  }
};

// 기록 삭제하기 - 사진
export const delImgDB = (recordId, type, date) => {
  return function (dispatch, getState, {history}) {
    instance
      .delete(`/api/record/${recordId}/url`, {data : {type:type}})
      .then((res) => {
        window.alert('사진이 삭제되었어요!')
        history.push(`/loading/calendar/${date}`)
      })
      .catch((err) => {
        window.alert('앗! 오류가 발생했어요:(')
        history.push(`/loading/calendar/${date}`)
      })
  }
};

// 기록 삭제하기 - 메모
export const delMemoDB = (recordId, type, date) => {
  return function (dispatch, getState, {history}) {
    instance
      .delete(`/api/record/${recordId}/contents`, {data : {type:type}})
      .then((res) => {
        window.alert('메모가 삭제되었어요!')
        history.push(`/loading/calendar/${date}`)
      })
      .catch((err) => {
        window.alert('앗! 오류가 발생했어요:(')
        history.push(`/loading/calendar/${date}`)
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
        Sentry.captureException(`Catched Error : ${err}`);
        console.log(err)
        window.alert('기록을 불러오는데 오류가 발생했어요! 관리자에게 문의해주세요😿')
        history.push('/')
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
        Sentry.captureException(`Catched Error : ${err}`);
        window.alert('게시글 로드에 문제가 발생했어요! 관리자에게 문의해주세요😿')
        history.push('/')
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

        // 기록이 없을 경우 alert, dashboard로 이동
        // 기록이 있을 경우 액션
        if (record_list.length === 0) {
          window.alert('기록된 칼로리가 없어요!')
          history.push('/dashboard')
        } else {dispatch(getRecord(record_list))}
        dispatch(isLoaded(true))
      })
      .catch((err) => {
        Sentry.captureException(`Catched Error : ${err}`);
        window.alert('기록을 로드하는데 오류가 있어요! 관리자에게 문의해주세요😿')
        history.push('/loading/calendar')
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
  type: null,

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

    // 세션 클리어용
    delRecordAll: state => {
      state.record = [];
      state.calendar = [];
      state.type = null;
      state.kcal = [];
      state.img = [];
    },

    // dashboard&calendar - 하루 기록 칼로리 리스트 가져오기
    getRecord : (state, action) => {
      state.record = action.payload;
    },

    // 기록 삭제하기
    delRecord : (state, action) => {
      const food_list = state.record[0].foodRecords
      for(let idx = 0; idx<food_list?.length; idx++) {
        let food_idx = food_list.findIndex((f) => f.type === action.payload)
        if (food_idx !== -1) {
          food_list.splice(food_idx, 1);
        }
      }
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
      state.img.files.splice(action.payload, 1)
      state.img.newFileList.splice(action.payload, 1)
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

export const {getRecord, delRecord, getAllRecord, typeChk, ttlKcal, addImage, delImage, delImgAll, isLoaded, delRecordAll} = record.actions;

export default record;