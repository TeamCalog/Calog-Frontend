import React from "react";
import { Button, Grid, Text } from "../elements";
import styled from "styled-components";
import theme from "../shared/theme";

// 컴포넌트
import DashBoard_FoodItem from "./DashBoard_FoodItem";
import DashBoard_When from "./DashBoard_When";

// redux
import { useSelector } from "react-redux";

// history
import { history } from "../redux/configStore";

/**
 * @param {object} r
 * @returns {object} r 유저가 기록한 foodRecords의 리스트를 반환
 * @역할  유저가 기록한 칼로리 상세 리스트를 확인하는 대시보드의 컴포넌트(
 * @필수값  각 끼니마다의 칼로리 목록(foodRecords), is_login
 * @담당자  김나영
 */

const DashBoard_Food = (props) => {
  const record = props[0];
  const { is_login } = props;

  // props와 비교할 타입
  const data_type = useSelector((state) => state.record.type);

  // 각 type 리스트 칼로리의 합계
  let list_kcal = 0;
  for (let idx = 0; idx < record?.length; idx++) {
    record[idx]?.type === data_type && (list_kcal += record[idx]?.resultKcal);
  }

  // case1) 기록이 있을 경우
  if (record?.length > 0) {
    return (
      <React.Fragment>
        {/* type 버튼 */}
        <Grid margin="9.8% 0 0 0" m_margin="9.8% 0 0 0">
          <DashBoard_When {...props} />
        </Grid>

        {/* 총 칼로리 */}
        <Grid margin="4.7% 0 0 8%" width="35%" m_margin="4.7% 0 0 8%">
          <Button height="36px" border_radius="20px" bg={theme.color.light}>
            <P>{list_kcal}kcal</P>
          </Button>
        </Grid>

        {/* 기록 칼로리 리스트 */}
        <List>
          {/* data_type이 없는 경우 >> 로그인 후 아무 버튼도 누르지 않았을 때 */}
          {data_type === null ? (
            <Grid text_align="center" margin="2.5% 0 0 0">
              <Text size="15px" m_size="13px">
                버튼을 눌러 식단을 확인해보세요.
              </Text>
            </Grid>
          ) : (
            <React.Fragment>
              {record?.map((r, idx) => {
                return (
                  <DashBoard_FoodItem
                    data_type={data_type}
                    key={r._id}
                    {...r}
                  />
                );
              })}
            </React.Fragment>
          )}
        </List>
      </React.Fragment>
    );
  }

  // case2) 기록이 없을 경우
  return (
    <React.Fragment>
      {/* type 버튼 */}
      <Grid margin="9.7% 0 0 0" m_margin="9.7% 0 0 0">
        <DashBoard_When />
      </Grid>

      {/* 칼로리 등록하기 버튼 타이틀 */}
      <Grid
        width="88%"
        border_radius="15px"
        margin="2% auto 0 auto"
        m_margin="2% auto 0 auto"
      >
        <Grid text_align="center" padding="11% 0 0 0" line_height="120%">
          <Text size="15px" m_size="13px">
            오늘의 칼로리를 등록하고
            <br />
            나의 식단을 기록해보세요!
          </Text>
        </Grid>

        {/* case2-1) 유저인데 기록이 없는 경우 */}
        {is_login ? (
          // 칼로리 검색 페이지 이동 버튼
          <Grid
            margin="6.5% auto"
            width="94%"
            m_margin="7% auto"
            cursor="pointer"
          >
            <Button
              _onClick={() => history.push("/")}
              height="56px"
              border_radius="60px"
              bg={theme.color.light}
            >
              <Text size="16px" bold m_size="14px" cursor="pointer">
                칼로리 등록하기
              </Text>
            </Button>
          </Grid>
        ) : (
          // case2-2) 비유저여서 기록이 없는 경우
          // 로그인 페이지 이동 버튼
          <Grid
            margin="6.5% auto"
            width="94%"
            m_margin="7% auto"
            cursor="pointer"
          >
            <Button
              _onClick={() => history.push("/signsocial")}
              height="56px"
              border_radius="60px"
              bg={theme.color.light}
            >
              <Text size="16px" bold m_size="14px" cursor="pointer">
                로그인하기
              </Text>
            </Button>
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
};

const List = styled.div`
  height: auto;
  padding: 4.8% 8% 0 8%;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: bold;
  cursor: default;

  @media ${theme.device.mobileM} {
    font-size: 17px;
  }

  @media only screen and (max-width: 300px) {
    font-size: 12px;
  } ;
`;

export default DashBoard_Food;
