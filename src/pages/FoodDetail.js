import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import theme from "../shared/theme";

// elements & components
import BtnHeader from "../shared/BtnHeader";
import { Grid, Text } from "../elements";
import CalorieBar from "../components/FoodDetail_CalorieBar";
import Loading from "./Loading4";

// icons
import { BsFillPlusSquareFill } from "react-icons/bs";

// modules
import { addCartRx } from "../redux/modules/cart";
import { getDetailDB } from "../redux/modules/search";

// img
import Carbo from "../img/C_carbohydrate.jpg";
import Protein from "../img/C_protein.jpg";
import Fat from "../img/C_fat.jpg";

/**
 * @param {*} props
 * @returns 기본정보, 영양정보, 칼로리 비교
 * @역할  음식 상세정보를 표시
 * @담당자 : 박용태
 */

const FoodDetail = (props) => {
  const dispatch = useDispatch();

  // params로 가져오는 foodId
  const foodId = props.match.params.foodId;

  // 로그인체크
  const is_login = useSelector((state) => state.user.is_login);

  // 현페이지의 메인 정보
  const foodInfo = useSelector((state) => state.search.detail);

  // bmr을 가져오기 위한 유저정보
  const user = useSelector((state) => state.user.user_info);

  // 스피너를 위한 로딩유무
  const is_loaded = useSelector((state) => state.record.is_loaded);

  // 대사량 비교를 위한 오늘의 칼로리 기록
  const record = useSelector((state) => state.record.record);

  // 기존 음식일경우 foodId에 해당하는 디테일 정보 불러오기 || 직접등록 음식일 경우 useEffect를 막아준다..
  useEffect(() => {
    (foodInfo.length === 0 && dispatch(getDetailDB(foodId))) ||
      (foodInfo.foodId !== foodId && dispatch(getDetailDB(foodId)));
  }, []);

  // 대사량과 나의 칼로리 기록
  const bmr = !is_login ? 0 : user.bmr[0]?.bmr === 0 ? 0 : user.bmr[0]?.bmr;
  const foodRecord = record?.length === 0 ? [] : record[0]?.foodRecords;

  if (foodId !== foodInfo.foodId) {
    return <></>;
  }

  // 장바구니 담기!
  const addCart = () => {
    const cartUnit = {
      foodId: foodInfo.foodId,
      name: foodInfo.name,
      forOne: foodInfo.forOne,
      measurement: foodInfo.measurement,
      kcal: Math.round(foodInfo.kcal * 10) / 10,
      amount: 1,
    };
    dispatch(addCartRx(cartUnit));
  };

  // 현재 남은(초과한) 칼로리 계산
  const totalKcal = () => {
    let result = 0;
    if (foodRecord?.length !== 0) {
      foodRecord?.map((f, idx) => {
        result += f.resultKcal;
      });
      return result;
    } else {
      return 0;
    }
  };

  // 현재 남은 기초대사량의 상태값
  const is_over = () => {
    if (bmr === totalKcal()) {
      return "line";
    } else if (bmr > totalKcal()) {
      return "under";
    } else if (bmr < totalKcal()) {
      return "over";
    }
  };

  // 상태값에 해당하는 텍스트 배경색
  const colors =
    is_over() === "line"
      ? "#59C451"
      : is_over() === "over"
      ? "#EC6262"
      : "#6993FF";

  // 상태text
  const StatusText = styled.div`
    width: auto;
    line-height: 22px;
    font-size: 15px;
    font-weight: bold;
    color: ${colors};
    background: #fff;

    @media ${theme.device.mobileM} {
      line-height: 20px;
      font-size: 13px;
    }
  `;

  // 브랜드명 분리
  const NameNBrand =
    foodInfo.name.indexOf("[") === 0 ? foodInfo.name.split(":") : false;
  const brand = foodInfo.name.indexOf("[") === 0 ? NameNBrand[0] : "";
  const name = foodInfo.name.indexOf("[") === 0 ? NameNBrand[1] : foodInfo.name;

  // 스피너
  if (!is_loaded) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="칼로리 상세" bg={theme.color.light} />

      <BodyContainer>
        <TopBack />

        {/* 기본정보 */}
        <HeaderBox>
          <Grid>
            <Text
              size="17px"
              m_size="17px"
              lineheight="22px"
              m_lineheight="20px"
              bold
              color="#5F5F5F"
            >
              {brand}
            </Text>
            <Grid display="flex">
              <NameBox>{name}</NameBox>
              <span
                style={{
                  fontSize: "13px",
                  color: "#404040",
                  fontFamily: "Pretendard",
                }}
              >
                1인분 ({foodInfo.forOne + foodInfo.measurement})
              </span>
            </Grid>
            <Grid is_flex>
              <Text
                lineheight="41px"
                bold
                size="34px"
                m_size="28px"
                color="#2A2A2A"
                margin="0.5% 0 1% 0"
                paddig="0"
              >
                {Math.round(foodInfo.kcal * 10) / 10} kcal
              </Text>

              {/* 카트 버튼 */}
              <div style={{ height: "34px" }}>
                <BsFillPlusSquareFill
                  onClick={addCart}
                  style={{ cursor: "pointer" }}
                  color="#F19F13"
                  size="34px"
                />
              </div>
            </Grid>
          </Grid>

          {/* 칼로리 비교정보 */}
          <Grid is_flex margin="1vh 0" m_margin="1vh 0">
            <StatusText color={colors}>
              {bmr === 0
                ? " 바디스펙이 없어 기초대사량 확인이 어려워요! "
                : is_over() === "line"
                ? " 오늘의 기초대사량을 모두 채웠어요! "
                : is_over() === "over"
                ? ` 기초대사량에서 ${totalKcal() - bmr} kcal를 초과했어요! `
                : ` 기초대사량까지 ${bmr - totalKcal()} kcal 남았어요! `}
            </StatusText>
          </Grid>
        </HeaderBox>

        {/* 영양성분 */}
        <IngreBox>
          <div>
            <div style={{ maxWidth: "34px" }}>
              <img src={Carbo} width="100%" alt="carbohydrate" />
            </div>
            <Text
              lineheight="15px"
              m_lineheight="15px"
              size="13px"
              m_size="13px"
              bold
              color="#404040"
              margin="2vh 0 0 0"
            >
              탄수화물
            </Text>
            <Text
              lineheight="24px"
              m_lineheight="22px"
              size="22px"
              m_size="20px"
              bold
              color="#404040"
              margin="0.9vh 0 0 0"
            >
              {foodInfo.carbo}g
            </Text>
          </div>

          <div>
            <div style={{ maxWidth: "34px" }}>
              <img src={Protein} width="100%" alt="carbohydrate" />
            </div>
            <Text
              lineheight="15px"
              m_lineheight="15px"
              size="13px"
              m_size="13px"
              bold
              color="#404040"
              margin="2vh 0 0 0"
            >
              단백질
            </Text>
            <Text
              lineheight="24px"
              m_lineheight="22px"
              size="22px"
              m_size="20px"
              bold
              color="#404040"
              margin="0.9vh 0 0 0"
            >
              {foodInfo.protein}g
            </Text>
          </div>

          <div>
            <div style={{ maxWidth: "34px" }}>
              <img src={Fat} width="100%" alt="carbohydrate" />
            </div>
            <Text
              lineheight="15px"
              m_lineheight="15px"
              size="13px"
              m_size="13px"
              bold
              color="#404040"
              margin="2vh 0 0 0"
            >
              지방
            </Text>
            <Text
              lineheight="24px"
              m_lineheight="22px"
              size="22px"
              m_size="20px"
              bold
              color="#404040"
              margin="0.9vh 0 0 0"
            >
              {foodInfo.fat}g
            </Text>
          </div>
        </IngreBox>

        {/* 칼로리 수치 바 */}
        <CalorieBar
          bmr={bmr}
          kcal={Math.round(foodInfo.kcal * 10) / 10}
          totalKcal={totalKcal()}
        />

        {/* 영양정보 디테일 */}
        <IngreDetailContainer>
          {/* 탄수화물 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "110px",
                  gap: "16px",
                }}
              >
                <img src={Carbo} alt="carbohydrate" />
                <IngreText style={{ fontWeight: "bold" }}>탄수화물</IngreText>
              </div>
              <div>
                <IngreText style={{ fontWeight: "bold" }}>
                  {foodInfo.carbo}g
                </IngreText>
              </div>
            </Grid>
            <Line />

            <Grid is_flex padding="0 8.6% 0 8.6%">
              <IngreText>당</IngreText>
              <IngreText>{foodInfo.sugars}g</IngreText>
            </Grid>
          </IngreDetail>

          {/* 단백질 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "110px",
                  gap: "16px",
                }}
              >
                <img src={Protein} alt="protein" />
                <IngreText style={{ fontWeight: "bold" }}>단백질</IngreText>
              </div>
              <div>
                <IngreText style={{ fontWeight: "bold" }}>
                  {foodInfo.protein}g
                </IngreText>
              </div>
            </Grid>
          </IngreDetail>

          {/* 지방 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "110px",
                  gap: "16px",
                }}
              >
                <img src={Fat} alt="fat" />
                <IngreText style={{ fontWeight: "bold" }}>지방</IngreText>
              </div>
              <div>
                <IngreText style={{ fontWeight: "bold" }}>
                  {foodInfo.fat}g
                </IngreText>
              </div>
            </Grid>
            <Line />

            <Grid is_flex padding="0 8.6% 0 8.6%">
              <IngreText>포화지방</IngreText>
              <IngreText>{foodInfo.fattyAcid}g</IngreText>
            </Grid>

            <Grid is_flex padding="1.8vh 8.6% 0 8.6%">
              <IngreText>트랜스지방</IngreText>
              <IngreText>{foodInfo.transFattyAcid}g</IngreText>
            </Grid>

            <Grid is_flex padding="1.8vh 8.6% 0 8.6%">
              <IngreText>불포화지방</IngreText>
              <IngreText>{foodInfo.unFattyAcid}g</IngreText>
            </Grid>
          </IngreDetail>

          {/* 콜레스테롤 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "110px",
                  gap: "16px",
                }}
              >
                <IngreText style={{ fontWeight: "bold" }}>콜레스테롤</IngreText>
              </div>
              <div>
                <IngreText style={{ fontWeight: "bold" }}>
                  {foodInfo.cholesterol}mg
                </IngreText>
              </div>
            </Grid>
          </IngreDetail>

          {/* 나트륨 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: "110px",
                  gap: "16px",
                }}
              >
                <IngreText style={{ fontWeight: "bold" }}>나트륨</IngreText>
              </div>
              <div>
                <IngreText style={{ fontWeight: "bold" }}>
                  {foodInfo.natrium}mg
                </IngreText>
              </div>
            </Grid>
          </IngreDetail>
        </IngreDetailContainer>
      </BodyContainer>
    </React.Fragment>
  );
};

FoodDetail.defaultProps = {};

const BodyContainer = styled.div`
  position: relative;
  max-width: 420px;
  max-height: 80vh;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopBack = styled.div`
  position: absolute;
  z-index: 0;
  width: 100%;
  min-width: 280px;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 26.6vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const HeaderBox = styled.div`
  position: relative;
  z-index: 1;
  padding: 2.4vh 7.6% 0 7.6%;
`;

const NameBox = styled.div`
  line-height: 22px;
  /* min-width: 160px; */
  font-weight: bold;
  font-size: 15px;
  color: #5f5f5f;
  margin: 0 2% 0 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.0041em;
  font-family: "Pretendard";

  @media ${theme.device.mobileH} {
    font-size: 17px;
  }
`;

const IngreBox = styled.div`
  position: relative;
  z-index: 1;
  width: 87.6%;
  margin: 4.4vh auto 0 auto;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  padding: 3vh 11% 2.2vh 11%;
  background: #ffffff;
  display: flex;
  justify-content: space-between;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 52px;
  }
`;

const IngreDetailContainer = styled.div`
  /* height: 25vh;
  overflow: scroll;
  padding-bottom: 10vh; */

  margin-top: 3.5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 0.9vh; */
`;

const IngreDetail = styled.div`
  width: 87.6%;
  border: 1px solid #e4e4e4;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  padding: 1.3vh 0 1.8vh 0;
  background: #ffffff;
  margin-bottom: 0.9vh;
`;

const IngreText = styled.div`
  line-height: 18px;
  font-size: 13px;
  /* font-weight: bold; */
  color: #404040;
  font-family: "Pretendard";
`;

const Line = styled.div`
  margin-top: 1.3vh;
  margin-bottom: 1.8vh;
  border: 1px solid #e4e4e4;
  height: 1px;
  width: 100%;
`;

export default FoodDetail;
