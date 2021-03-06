import React from "react";
import { Grid, Text } from "../elements";
import styled from "styled-components";

// date picker
import { enGB } from "date-fns/locale";
import { DatePicker } from "react-nice-dates";
import "../styles/css/nice_date.css";

// moment
import moment from "moment";

// 날짜 보내기
import { useDispatch } from "react-redux";
import { addDate } from "../redux/modules/cart";

/**
 * @param {String} date
 * @returns {String} date 날짜
 * @역할  현재 기록하려는 칼로리를 언제 섭취했는지 날짜를 선택할 수 있는 컴포넌트
 * @필수값  오늘 날짜(변경 가능)
 * @담당자  김나영 + 용태 약간수정
 */

const Cart_Date = () => {
  const dispatch = useDispatch();

  // 날짜
  // const _SelectDate = useSelector((state) => state.cart.date);
  const Date = moment().format("M월 D일");
  const [date, setDate] = React.useState(Date);

  // 날짜를 변경했을 경우 onChange
  const Change = (date) => {
    if (moment(date).format("YYYYMMDD") > moment().format("YYYYMMDD")) {
      window.alert("오늘 이 전의 날짜만 기록할 수 있어요!");
    } else {
      setDate(moment(date).format("M월 D일"));
      // 백엔드 날짜로 data형식 맞추어 전송
      const chgDateFormat = moment(date).format("YYYY-MM-DD");
      dispatch(addDate(chgDateFormat));
    }
  };

  return (
    <Grid padding="0 9% 1vh 9%">
      {/* 실제 DatePicker */}
      <DatePicker onDateChange={Change} locale={enGB} format=" ">
        {({ inputProps, focused }) => (
          <React.Fragment>
            <Wrap>
              {/* datePicker 실제로 보이는 부분 */}
              <Text
                margin="0 2% 0 0"
                size="16px"
                m_size="16px"
                lineheight="28px"
                m_lineheight="28px"
                bold
                color="#656565"
              >
                {date}
              </Text>
              <div>
                <svg
                  width="17"
                  height="9"
                  viewBox="0 0 17 9"
                  fill="#656565"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.37245 8.712L0.291018 1.704C-0.097006 1.296 -0.097006 0.672 0.291018 0.288C0.679042 -0.096 1.30958 -0.096 1.72186 0.288L8.1 6.6L14.4781 0.288001C14.8662 -0.0959994 15.521 -0.0959993 15.909 0.288001C16.297 0.672001 16.297 1.296 15.909 1.704L8.80329 8.712C8.41527 9.096 7.78473 9.096 7.37245 8.712Z"
                    fill="#656565"
                  />
                </svg>
              </div>

              {/* datePicker 안보이게 숨김 처리 */}
              <Input
                readOnly
                className={"input" + (focused ? " -focused" : "")}
                {...inputProps}
              />
            </Wrap>
          </React.Fragment>
        )}
      </DatePicker>
    </Grid>
  );
};

const Wrap = styled.div`
  position: relative;
  display: flex;

  & > div {
    height: 28px;
    display: flex;
    align-items: center;
  }
`;

const Input = styled.input`
  border: none;
  position: absolute;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  caret-color: white;
  color: white;
`;

export default Cart_Date;
