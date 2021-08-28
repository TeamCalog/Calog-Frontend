import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../redux/configStore';

// css
import styled from 'styled-components';

// modules
import { getRecentDB } from '../redux/modules/recent';
import { getFavoriteDB } from '../redux/modules/favorite';
import { getRecommendedDB, getMostUsedKeyDB } from '../redux/modules/search';
import { ChkModal } from '../redux/modules/dashboard';

// elements & components
import MainBody from '../components/Main_MainBody';
import LogoHeader from '../shared/LogoHeader';
import Loading from './Loading4';
import Modal from '../components/Modal';

// helmet
import {Helmet} from 'react-helmet';

/** 
 * @param {*} props
 * @returns Header, MainBody
 * @역할 Main 페이지
 * @담당자 : 박용태
*/

const Main = (props) => {

  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const is_loaded = useSelector((state) => state.record.is_loaded);

  // 카트목록의 유무 확인
  const cart_list = useSelector((state) => state.cart.cart);


  // 최근검색어, 즐겨찾기, 추천음식, 인기검색어
  useEffect(() => {
    if (is_login) {
      dispatch(getRecentDB());
      dispatch(getFavoriteDB());
    }
    dispatch(getRecommendedDB())
    dispatch(getMostUsedKeyDB());

  }, []);

  // 홈 화면 추가 안내
  const ModalState = useSelector((state) => state.dashboard.chk_modal)
  const [addHome, setAddHome] = useState(ModalState)
  const [modal, setModal] = useState(true)
  const close = (e) => {
    const clicked = e.target.closest('.info');
    if (clicked) return;
    else {
      setModal(false)
      dispatch(ChkModal(true))
    }
  }

  // 로그인 페이지 이동!
  const confirm = () => {
    if (window.confirm("피드백 페이지로 이동하시겠어요?")) {
      history.push('/userfeedback');
    } else {
      return;
    }
  }

  if (!is_loaded) {
    return <Loading/>;
  }

  return (
    <React.Fragment>
      
      {/* 헬멧 */}
      <Helmet>
        <title>[Calog] 칼로리 검색</title>
      </Helmet>

      <LogoHeader/>
      <MainBody/>

      <FloatFeedback>
        <svg 
          onClick={()=>{is_login ? history.push("/userfeedback") : confirm() }} 
          width="12vh" height="12vh" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d)">
          <circle cx="48" cy="45" r="40" fill="white"/>
          </g>
          <path d="M39.2504 31.909H53.7504C54.1147 31.909 54.4095 31.6142 54.4095 31.2499C54.4095 30.8856 54.1147 30.5908 53.7504 30.5908H39.2504C38.8861 30.5908 38.5913 30.8856 38.5913 31.2499C38.5914 31.6143 38.8862 31.909 39.2504 31.909Z" fill="#F19F13"/>
          <path d="M47.1595 38.5H39.2504C38.8861 38.5 38.5913 38.7948 38.5913 39.1591C38.5913 39.5234 38.8861 39.8182 39.2504 39.8182H47.1595C47.5238 39.8182 47.8186 39.5234 47.8186 39.1591C47.8186 38.7948 47.5238 38.5 47.1595 38.5Z" fill="#F19F13"/>
          <path d="M61.1133 26.6364C61.0751 26.6364 61.0381 26.646 61 26.6478V26.6364C61 25.1824 59.817 24 58.3636 24H34.6364C33.183 24 32 25.1824 32 26.6364V52.3409C32 52.6074 32.1609 52.8481 32.4068 52.9498C32.4879 52.9839 32.5741 53 32.659 53C32.8303 53 32.9989 52.9331 33.1251 52.8069L39.5229 46.4091H58.3636C59.817 46.4091 61 45.2268 61 43.7727V32.8408L62.8975 30.9436C62.8975 30.9436 62.8975 30.9436 62.8975 30.943C63.3673 30.4732 63.6363 29.8231 63.6363 29.1594C63.6363 27.7679 62.5049 26.6364 61.1133 26.6364ZM59.6818 43.7727C59.6818 44.4994 59.0909 45.0909 58.3636 45.0909H39.25C39.0749 45.0909 38.9075 45.1604 38.784 45.284L33.3182 50.7498V26.6364C33.3182 25.9097 33.9091 25.3182 34.6363 25.3182H58.3636C59.091 25.3182 59.6818 25.9097 59.6818 26.6364V27.0866C59.5567 27.1726 59.437 27.2672 59.3291 27.3753L52.1578 34.5455H39.25C38.8857 34.5455 38.5909 34.8403 38.5909 35.2046C38.5909 35.5689 38.8857 35.8637 39.25 35.8637H51.1003L50.4674 39.0298C50.4237 39.2461 50.4919 39.4694 50.6476 39.6251C50.7725 39.75 50.9412 39.8182 51.1137 39.8182C51.1562 39.8182 51.1999 39.8137 51.2424 39.8054L54.5366 39.1463C54.6653 39.1205 54.7824 39.0581 54.8738 38.966L59.6818 34.1588V43.7727ZM54.0834 37.8931L51.9543 38.3192L52.3804 36.1874L58.3633 30.2044L60.0679 31.909L54.0834 37.8931ZM61.9654 30.0116L61 30.9771L59.2952 29.2724L60.261 28.3066C60.485 28.0833 60.7953 27.9545 61.1132 27.9545C61.7775 27.9545 62.3181 28.4952 62.3181 29.1594C62.3182 29.4761 62.1894 29.787 61.9654 30.0116Z" fill="#F19F13"/>
          <path d="M39.1181 70.9914H40.5045V61.2068H39.1181V70.9914ZM37.1999 63.2162H38.0698V62.1108H32.5318V63.2162H33.4016V67.6146C33.0066 67.6222 32.6267 67.6222 32.2697 67.6222L32.3988 68.739C34.1878 68.7352 36.4517 68.6972 38.5331 68.3553L38.461 67.3374C38.0508 67.3867 37.6291 67.4285 37.1999 67.4627V63.2162ZM35.8667 63.2162V67.5463C35.4831 67.5653 35.0994 67.5767 34.7234 67.5881V63.2162H35.8667ZM44.1949 65.7383V63.1364H49.6873V62.0273H42.8426V66.836H49.7556V65.7383H44.1949ZM41.7905 69.7987H50.7318V68.6706H41.7905V69.7987ZM58.3876 63.6074H57.5672V61.393H56.2948V67.0563H57.5672V64.7165H58.3876V67.1057H59.6867V61.222H58.3876V63.6074ZM54.2588 61.8298V63.22H52.9256V61.8298H51.6304V66.5587H55.5275V61.8298H54.2588ZM52.9256 65.48V64.2645H54.2588V65.48H52.9256ZM58.3231 68.6516V70.9914H59.6867V67.5539H52.9294V68.6516H58.3231ZM61.3487 62.221L61.4931 67.6716H62.8681L63.0124 62.221H61.3487ZM62.1806 70.095C62.663 70.095 63.0808 69.6923 63.0846 69.1948C63.0808 68.701 62.663 68.2983 62.1806 68.2983C61.683 68.2983 61.2728 68.701 61.2804 69.1948C61.2728 69.6923 61.683 70.095 62.1806 70.095Z" fill="black"/>
          <defs>
            <filter id="filter0_d" x="0.727273" y="0.636364" width="94.5455" height="94.5455" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="2.90909"/>
              <feGaussianBlur stdDeviation="3.63636"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
          </defs>
        </svg>
        <div>
          <svg width="15vh" height="6vh" viewBox="0 0 129 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 34.2432C0 37.9749 3.0251 41 6.75676 41H122.243C125.975 41 129 37.9749 129 34.2432V6.75676C129 3.0251 125.975 0 122.243 0H6.75676C3.02511 0 0 3.0251 0 6.75676V34.2432Z" fill="#6993FF"/>
            <path d="M25.7652 19.0815H27.2776V8.40746H25.7652V19.0815ZM23.6727 10.5994H24.6215V9.39365H18.5801V10.5994H19.529V15.3978C19.0981 15.4061 18.6837 15.4061 18.2942 15.4061L18.4351 16.6243C20.3867 16.6202 22.8564 16.5787 25.1271 16.2058L25.0483 15.0953C24.6008 15.1492 24.1409 15.1948 23.6727 15.232V10.5994ZM22.2182 10.5994V15.3232C21.7997 15.3439 21.3812 15.3564 20.971 15.3688V10.5994H22.2182ZM31.3035 13.3508V10.5124H37.2952V9.30249H29.8283V14.5483H37.3698V13.3508H31.3035ZM28.6806 17.7804H38.4347V16.5497H28.6806V17.7804ZM46.7865 11.0262H45.8915V8.6105H44.5034V14.7887H45.8915V12.2362H46.7865V14.8425H48.2037V8.42403H46.7865V11.0262ZM42.2824 9.08702V10.6036H40.828V9.08702H39.415V14.2459H43.6664V9.08702H42.2824ZM40.828 13.0691V11.7431H42.2824V13.0691H40.828ZM46.7161 16.529V19.0815H48.2037V15.3315H40.8321V16.529H46.7161ZM54.2475 12.3398C53.474 12.337 52.811 12.2652 52.2585 12.1243C51.7088 11.9834 51.2875 11.7776 50.9947 11.5069C50.7046 11.2362 50.5596 10.9061 50.5596 10.5166C50.5596 10.1326 50.7046 9.80663 50.9947 9.53867C51.2875 9.27072 51.7088 9.06768 52.2585 8.92956C52.811 8.78867 53.474 8.71823 54.2475 8.71823C55.0209 8.71823 55.6825 8.78729 56.2323 8.92541C56.782 9.06354 57.2019 9.26796 57.4919 9.53867C57.782 9.80663 57.927 10.1326 57.927 10.5166C57.927 10.9061 57.782 11.2362 57.4919 11.5069C57.2019 11.7776 56.782 11.9834 56.2323 12.1243C55.6825 12.2652 55.0209 12.337 54.2475 12.3398ZM54.2475 9.41436C53.6784 9.41436 53.1881 9.45856 52.7765 9.54696C52.3676 9.63536 52.0555 9.76243 51.84 9.92818C51.6245 10.0912 51.5182 10.2873 51.5209 10.5166C51.5182 10.7541 51.6232 10.9572 51.8359 11.1257C52.0513 11.2914 52.3635 11.4185 52.7723 11.5069C53.1812 11.5925 53.6729 11.6354 54.2475 11.6354C54.8248 11.6354 55.3179 11.5925 55.7267 11.5069C56.1384 11.4185 56.4519 11.2914 56.6674 11.1257C56.8828 10.9572 56.9906 10.7541 56.9906 10.5166C56.9906 10.2873 56.8814 10.0912 56.6632 9.92818C56.4477 9.76243 56.1342 9.63536 55.7226 9.54696C55.311 9.45856 54.8193 9.41436 54.2475 9.41436ZM49.5071 13.7901V13.0442H59.0044V13.7901H49.5071ZM57.7779 17.0221H51.5872V18.1077H58.0928V18.837H50.6839V16.3425H56.8745V15.3978H50.6591V14.6934H57.7779V17.0221ZM71.0172 10.9309H72.5917V11.7099H71.0172V14.4282H70.0973V8.5442H71.0172V10.9309ZM69.1194 13.1602C68.2796 13.3287 67.4605 13.4489 66.6622 13.5207C65.8666 13.5898 65.0475 13.6243 64.205 13.6243H63.3763V9.0663H64.3044V12.8536C65.089 12.8508 65.8666 12.8135 66.6373 12.7417C67.408 12.6699 68.1967 12.5525 69.0033 12.3895L69.1194 13.1602ZM71.0172 18.8039H64.4205V15H71.0172V18.8039ZM70.1221 15.7293H65.3155V18.058H70.1221V15.7293ZM80.9228 18.953V8.53591H81.8427V18.953H80.9228ZM78.7599 9.67127C78.7543 11.2403 78.3566 12.6519 77.5665 13.9061C76.7792 15.1575 75.5444 16.1878 73.8621 16.9972L73.3648 16.2431C74.7543 15.5856 75.8193 14.7652 76.5596 13.7818C77.2999 12.7983 77.7212 11.6768 77.8234 10.4171H73.8455V9.67127H78.7599ZM91.3092 13.3674H88.8645V14.3039H84.0827V9.44751H88.8645V10.3757H91.3092V8.5442H92.2291V16.1436H91.3092V13.3674ZM84.9943 13.5663H87.9611V10.2017H84.9943V13.5663ZM91.3092 12.605V11.1464H88.8645V12.605H91.3092ZM86.4197 15.4641V17.9586H92.4694V18.721H85.4915V15.4641H86.4197ZM23.1381 25.9213C23.826 27.2887 25.2058 28.337 27.0663 28.7058L27.7251 27.4627C25.3094 27.0525 23.9254 25.3826 23.9296 23.8163V23.0497H22.3343V23.8163C22.326 25.366 20.9337 27.0401 18.5635 27.4627L19.2058 28.7058C21.0539 28.3329 22.4378 27.2804 23.1381 25.9213ZM18.3191 31.7721H28.0732V30.5414H18.3191V31.7721ZM36.1764 25.0262H34.2123V23.0414H32.733V24.5497H30.6322V23.0414H29.1322V28.279H34.2123V26.2362H36.1764V28.7762H37.6681V22.4075H36.1764V25.0262ZM30.6322 27.0815V25.6975H32.733V27.0815H30.6322ZM36.1764 30.4254V33.0815H37.6681V29.232H30.338V30.4254H36.1764ZM50.0771 28.0428C50.4376 26.3149 50.4376 25.076 50.4417 23.9738V23.0124H42.9334V24.1934H49.0122C49.008 24.5497 49.0039 24.9227 48.9832 25.3246L42.5937 25.5028L42.7635 26.7749L48.8879 26.4682C48.8298 26.9489 48.7428 27.471 48.6102 28.0428H41.7981V29.2486H45.9086V33.0566H47.4127V29.2486H51.5274V28.0428H50.0771ZM57.7576 27.0069H60.9441V25.8467H59.6264V24.0028H61.0145V22.8052H53.0132V24.0028H54.3971V25.8467H53.0836V27.0069H56.2576V28.0014H52.1596V29.1782H61.8889V28.0014H57.7576V27.0069ZM58.1223 24.0028V25.8467H55.8889V24.0028H58.1223ZM53.3322 29.8702V32.895H60.7784V31.6892H54.8322V29.8702H53.3322ZM65.9774 27.2845C66.6017 27.2017 67.197 27.029 67.7633 26.7666C68.3323 26.5014 68.7923 26.1782 69.1431 25.797C69.4939 25.413 69.6707 25.011 69.6735 24.5912V24.5829H66.3006V23.8287H69.6735V22.5276H70.5768V23.8287H73.958V24.5829H70.5851V24.5912C70.5851 25.011 70.7591 25.413 71.1072 25.797C71.4553 26.1782 71.9124 26.5014 72.4787 26.7666C73.045 27.029 73.6403 27.2017 74.2647 27.2845L73.9249 28.0304C73.3834 27.9475 72.8641 27.8052 72.3669 27.6036C71.8696 27.3992 71.4263 27.1464 71.0368 26.8453C70.65 26.5442 70.3489 26.2086 70.1334 25.8384C69.9152 26.2113 69.61 26.5483 69.2177 26.8494C68.8282 27.1506 68.3834 27.4019 67.8834 27.6036C67.3834 27.8052 66.8613 27.9475 66.3171 28.0304L65.9774 27.2845ZM65.3807 28.8343H74.8779V29.605H70.5768V32.9696H69.6735V29.605H65.3807V28.8343ZM78.854 26.1782C78.6275 26.7279 78.2836 27.2086 77.8223 27.6202C77.361 28.029 76.8195 28.3343 76.198 28.5359L75.7422 27.8149C76.256 27.6575 76.7132 27.4254 77.1137 27.1188C77.5143 26.8122 77.8264 26.4544 78.0502 26.0456C78.2739 25.634 78.3858 25.2017 78.3858 24.7486V24.5166H76.0322V23.7707H78.3858V22.4862H79.314V23.7707H81.6427V24.5166H79.2974V24.7486C79.2974 25.174 79.4107 25.5773 79.6372 25.9586C79.8637 26.3398 80.1786 26.6727 80.582 26.9572C80.9853 27.2417 81.4438 27.4586 81.9576 27.6077L81.5267 28.337C80.9107 28.1547 80.3692 27.8771 79.9024 27.5041C79.4383 27.1285 79.0889 26.6865 78.854 26.1782ZM83.4576 25.4613V22.5359H84.3775V28.7099H83.4576V26.2238H81.3444V25.4613H83.4576ZM84.3775 32.8122H77.5654V29.2403H84.3775V32.8122ZM83.4742 29.9945H78.4853V32.058H83.4742V29.9945ZM89.6445 26.1326C90.2605 26.0608 90.842 25.9171 91.3889 25.7017C91.9359 25.4862 92.3793 25.2169 92.719 24.8936C93.0616 24.5704 93.2411 24.2182 93.2577 23.837H89.9759V23.0663H97.7494V23.837H94.4511C94.4649 24.2155 94.6403 24.5677 94.9773 24.8936C95.3171 25.2169 95.7619 25.4862 96.3116 25.7017C96.8613 25.9171 97.4483 26.0608 98.0726 26.1326L97.7329 26.8619C97.1527 26.7901 96.6016 26.6588 96.0795 26.4682C95.5602 26.2776 95.1058 26.0345 94.7163 25.739C94.3268 25.4406 94.0395 25.1036 93.8544 24.7279C93.6666 25.1036 93.3779 25.4406 92.9884 25.739C92.5989 26.0345 92.1445 26.2776 91.6251 26.4682C91.1058 26.6588 90.5561 26.7901 89.9759 26.8619L89.6445 26.1326ZM89.1058 28.2541V27.4917H98.603V28.2541H89.1058ZM93.8461 29.1657C94.5892 29.1657 95.2287 29.2403 95.7646 29.3895C96.3033 29.5359 96.7149 29.7514 96.9994 30.0359C97.2867 30.3177 97.4317 30.6575 97.4345 31.0552C97.4317 31.453 97.2867 31.7914 96.9994 32.0704C96.7149 32.3522 96.3047 32.5649 95.7688 32.7086C95.2329 32.855 94.592 32.9282 93.8461 32.9282C93.0975 32.9282 92.4538 32.855 91.9152 32.7086C91.3765 32.5649 90.9635 32.3522 90.6762 32.0704C90.3917 31.7914 90.2494 31.453 90.2494 31.0552C90.2494 30.6575 90.3917 30.3177 90.6762 30.0359C90.9635 29.7514 91.3765 29.5359 91.9152 29.3895C92.4566 29.2403 93.1003 29.1657 93.8461 29.1657ZM93.8461 32.1906C94.3958 32.1906 94.8696 32.145 95.2674 32.0539C95.6679 31.9655 95.9746 31.837 96.1873 31.6685C96.4027 31.4972 96.5119 31.2928 96.5146 31.0552C96.5119 30.8122 96.4041 30.605 96.1914 30.4337C95.9787 30.2597 95.6721 30.1271 95.2715 30.0359C94.8737 29.9448 94.3986 29.8978 93.8461 29.895C93.2909 29.8978 92.813 29.9448 92.4124 30.0359C92.0146 30.1271 91.7094 30.2597 91.4967 30.4337C91.2867 30.605 91.1831 30.8122 91.1859 31.0552C91.1831 31.2928 91.2867 31.4972 91.4967 31.6685C91.7094 31.837 92.016 31.9655 92.4166 32.0539C92.8171 32.145 93.2936 32.1906 93.8461 32.1906ZM105.078 26.0166V25.2541H107.183V22.5359H108.103V28.7431H107.183V26.0166H105.078ZM102.645 25.9834C102.422 26.5939 102.078 27.1312 101.614 27.5953C101.152 28.0594 100.611 28.4088 99.9894 28.6436L99.5087 27.9144C100.02 27.7293 100.477 27.4586 100.88 27.1022C101.284 26.7459 101.597 26.337 101.821 25.8757C102.047 25.4144 102.161 24.9392 102.161 24.4503V24.0608H99.8071V23.2983H105.418V24.0608H103.089V24.442C103.089 24.8895 103.197 25.3246 103.412 25.7472C103.627 26.1671 103.93 26.5414 104.319 26.8702C104.709 27.1961 105.155 27.4448 105.658 27.616L105.177 28.3536C104.597 28.1436 104.087 27.8315 103.648 27.4171C103.209 27.0028 102.875 26.5249 102.645 25.9834ZM104.647 29.0663C105.365 29.0663 105.985 29.1436 106.507 29.2983C107.032 29.4503 107.434 29.6713 107.713 29.9613C107.995 30.2514 108.136 30.5994 108.136 31.0055C108.136 31.4116 107.995 31.7583 107.713 32.0456C107.434 32.3356 107.034 32.5566 106.511 32.7086C105.989 32.8633 105.368 32.942 104.647 32.9448C103.923 32.942 103.299 32.8633 102.774 32.7086C102.252 32.5566 101.851 32.3356 101.572 32.0456C101.293 31.7583 101.155 31.4116 101.158 31.0055C101.155 30.5994 101.293 30.2514 101.572 29.9613C101.851 29.6713 102.253 29.4503 102.778 29.2983C103.303 29.1436 103.926 29.0663 104.647 29.0663ZM104.647 32.2072C105.174 32.2099 105.632 32.163 106.018 32.0663C106.405 31.9724 106.702 31.8343 106.909 31.6519C107.119 31.4696 107.224 31.2541 107.224 31.0055C107.224 30.7541 107.119 30.5373 106.909 30.355C106.702 30.1699 106.405 30.029 106.018 29.9323C105.632 29.8356 105.174 29.7873 104.647 29.7873C104.116 29.7873 103.657 29.8356 103.267 29.9323C102.88 30.029 102.583 30.1699 102.376 30.355C102.169 30.5373 102.067 30.7541 102.069 31.0055C102.067 31.2541 102.169 31.4696 102.376 31.6519C102.583 31.8343 102.88 31.9724 103.267 32.0663C103.657 32.163 104.116 32.2099 104.647 32.2072ZM110.367 23.5138H111.519L111.437 29.605H110.45L110.367 23.5138ZM110.948 32.0663C110.812 32.0663 110.685 32.0331 110.566 31.9669C110.45 31.8978 110.358 31.8052 110.289 31.6892C110.222 31.5732 110.191 31.4475 110.193 31.3122C110.191 31.1768 110.222 31.0511 110.289 30.9351C110.358 30.8191 110.45 30.7279 110.566 30.6616C110.685 30.5925 110.812 30.558 110.948 30.558C111.083 30.558 111.209 30.5925 111.325 30.6616C111.441 30.7279 111.532 30.8191 111.598 30.9351C111.667 31.0511 111.702 31.1768 111.702 31.3122C111.702 31.4475 111.667 31.5732 111.598 31.6892C111.532 31.8052 111.441 31.8978 111.325 31.9669C111.209 32.0331 111.083 32.0663 110.948 32.0663Z" fill="white"/>
            <path d="M108.5 48L104 41H112.5L108.5 48Z" fill="#6993FF"/>
          </svg>
        </div>
      </FloatFeedback>

    {window.navigator.standalone === addHome && (
      <Add onClick={close} >
        <Modal title="addHome" open={modal} className="info"/>
      </Add>
    )}
    </React.Fragment>
  );
}

const Add = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const FloatFeedback = styled.div`
  position: fixed;
  bottom: 11%;
  right: 4%;
  width: 12vh;
  height: 12vh;
  cursor: pointer;
  z-index: 500;

  & > svg {
    cursor: pointer;
  }

  & > div {
    position: absolute;
    right: 28%;
    top: -50%;
  }

  @media only screen and (min-width: 421px) {
    display: none;
  }
`;

export default Main;