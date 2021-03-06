import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { history } from "../redux/configStore";

// 로그인 상태 전역 유지
import { useDispatch, useSelector } from "react-redux";
import { LoginCheck } from "../redux/modules/user";

// 라우팅
import { Route } from "react-router-dom";
import {
  DashBoard,
  Calendar,
  Record,
  Login,
  Signup,
  AddSpec,
  Main,
  FoodDetail,
  Cart,
  SignSocial,
  BodySpec,
  Notice,
  NotiDetail,
  NoticeWrite,
  MainSearch,
  CalendarDate,
  Loading4,
  UserFeedback,
  SelfAddFood,
  AboutUs,
  CalendarDateEdit,
} from "../pages";
import Naver from "../components/social/Naver";
import Google from "../components/social/Google";
import Kakao from "../components/social/Kakao";
import Nav from "./Nav";
import WebSearch from "./WebSearch";
import Modal from "../components/Modal";

// 피드백 버튼
import FloatedBtn from "./FloatedBtn";

// 테마
import theme from "./theme";

// 웹페이지 바탕
import webImg from "../img/backImg.png";

// lazy loading
import LazyLoad from "react-lazyload";

// csrf
import { get_csrf_token } from "./api";

const App = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);

  // 관리자 계정
  const admin = useSelector((state) => state.user.user_info?.email);

  // login check
  useEffect(() => {
    // history.listen(() => {
    //     dispatch(LoginCheck());
    // })
    dispatch(LoginCheck());
    // csrf 토큰 요청
    get_csrf_token();
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LazyLoad>
          {/* 1024px(아이패드 이상) 일 때 웹 버전 */}
          <WebVer />
          <FloatedBtn />
          <WebSearch />
          <Wrap>
            <Route path="/" exact component={Main} />
            <Route path="/search/:keyword" exact component={MainSearch} />
            <Route path="/fooddetail/:foodId" exact component={FoodDetail} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/loading/" exact component={Loading4} />
            <Route path="/loading/:url" exact component={Loading4} />
            <Route path="/loading/:url/:date" exact component={Loading4} />

            <Route path="/dashboard" exact component={DashBoard} />
            <Route path="/calendar" exact component={Calendar} />
            <Route path="/calendar/:date" exact component={CalendarDate} />
            <Route path="/record" exact component={Record} />
            <Route path="/modal" exact component={Modal} />
            <Route path="/addFood" exact component={SelfAddFood} />
            {/* {admin==="cadmin@calories.com" && <Route path="/onlyHQ" exact component={SelfAddFood} />} */}
            <Route path="/onlyHQ" exact component={SelfAddFood} />
            <Route path="/aboutUs" exact component={AboutUs} />
            <Route
              path="/calendarEdit/:date/:mealId/:type"
              exact
              component={CalendarDateEdit}
            />

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/signsocial" exact component={SignSocial} />
            <Route path="/body" exact component={BodySpec} />
            <Route path="/addspec" exact component={AddSpec} />
            <Route path="/notice" exact component={Notice} />
            <Route path="/notice/:postid" exact component={NotiDetail} />
            <Route path="/notiwrite" exact component={NoticeWrite} />
            <Route path="/notiwrite/:postid" exact component={NoticeWrite} />
            <Route path="/userfeedback" exact component={UserFeedback} />
            <Route path="/naver" exact component={Naver} />
            <Route path="/google" exact component={Google} />
            <Route path="/kakao" exact component={Kakao} />

            <Nav />
          </Wrap>
        </LazyLoad>
      </ThemeProvider>
    </React.Fragment>
  );
};

const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 420px;
  min-width: 280px;
  min-height: 500px;
  height: 91vh;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }

  //노트북 이상 웹페이지
  @media only screen and (min-width: 1025px) {
    position: relative;
    margin: 0 0 0 calc(50vw - 1px);
    border: 1px solid #e4e4e4;
    max-width: 422px;
    position: relative;
  }
`;

const WebVer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  z-index: -100;
  background: #ffe899;
  opacity: 0.18;

  @media only screen and (min-width: 1025px) {
    opacity: 1;
    background-size: cover;
    background-position: 50% 50%;
    background-image: url(${webImg});
  }
`;

export default App;
