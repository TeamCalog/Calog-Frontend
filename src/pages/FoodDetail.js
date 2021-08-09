import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../shared/theme';
// elements & components
import BtnHeader from '../shared/BtnHeader';
import { Grid, Text } from '../elements';
import UnderBar from '../components/Main_UnderBar';
import CalorieBar from '../components/FoodDetail_CalorieBar';
// icons
import { BsFillPlusSquareFill } from 'react-icons/bs';
// modules
import { addCartRx } from '../redux/modules/cart';
import { getDetailDB } from '../redux/modules/search';
// img
import Carbo from '../img/C_carbohydrate.jpg';
import Protein from '../img/C_protein.jpg';
import Fat from '../img/C_fat.jpg';

/** 
 * @param {*} props
 * @returns 기본정보, 영양정보, 칼로리 비교
 * @역할  음식 상세정보를 표시
 * @필수값 푸드Id에 해당하는 상세 푸드 데이터
 * @담당자 : 박용태
*/

const FoodDetail = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const foodInfo = useSelector((state) => state.search.detail);
  const foodId = props.match.params.foodId;

// 대사량과 나의 칼로리 기록
  const record = useSelector((state) => state.record.record);
  const bmr = record.length === 0 ? 2000 : record[0]?.bmr;
  const foodRecord = record.length === 0 ? [] : record[0]?.foodRecords;
  console.log(record)

// useEffect
  useEffect(() => {
    dispatch(getDetailDB(foodId))
  }, []);

  if (foodId !== foodInfo.foodId) {
    return <></>;
  };

  // 장바구니 담기!
  const addCart = () => {
    const cartUnit = {
      foodId: foodInfo.foodId,
      name: foodInfo.name,
      forOne: foodInfo.forOne,
      grams: foodInfo.grams,
      kcal: foodInfo.kcal,
      amount: 1,
    };
    dispatch(addCartRx(cartUnit));
  };

  // 현재 남은(초과한) 칼로리 계산
  const totalKcal = () => {
    let result = 0
    if(foodRecord.length !== 0) {
      foodRecord.map((f, idx) => {
        result += parseInt(f.amount) * f.resultKcal;
      });
      return result;
    } else {
      return 200;
    }
  };

  const is_over = () => {
    if (bmr === totalKcal()+foodInfo.kcal) {
      return "line";
    } else if (bmr > totalKcal()+foodInfo.kcal) {
      return "under";
    } else if (bmr < totalKcal()+foodInfo.kcal) {
      return "over";
    }
  };

  const colors = is_over() === "line" ? 
  '#59C451' 
  : is_over() === "over" ? '#EC6262' : '#6993FF' ;

  
  return (
    <React.Fragment>
      {/* 헤더 */}
      <BtnHeader title="칼로리 상세" bg={theme.color.light}/>

      <BodyContainer>
        
        <TopBack/>
        
        {/* 기본정보 */}
        <Grid padding= "2.4vh 7.6% 0 7.6%">
          <Grid>
            <Grid display="flex">
              <NameBox>{foodInfo.name}</NameBox>
              <span style={{fontSize: "13px", color: "#404040"}}>1인분 ({foodInfo.forOne}g)</span>
            </Grid>  
            <Grid is_flex>
              <Text lineheight="41px" bold size="34px" m_size="28px" color="#2A2A2A" margin="0.5% 0 1% 0" paddig="0">{foodInfo.kcal} kcal</Text>
              {/* 카트 버튼 */}

              <div style={{height: "34px"}}>
                <BsFillPlusSquareFill onClick={addCart} style={{cursor: "pointer"}} color="#F19F13" size="34px"/>
              </div>

            </Grid>
          </Grid>
          {/* 칼로리 비교정보 */}
          <Grid margin="1vh 0" m_margin="1vh 0">
            <Text lineheight="22px" m_lineheight="20px" size="15px" m_size="13px" bold color={colors} padding="0" margin="0">
              {is_over() === "line" ? 
              "현재까지 오늘의 기준치를 모두 채웠어요!" 
              : is_over() === "over" ? 
              `현재까지 기준치 ${totalKcal()+foodInfo.kcal-bmr} kcal 초과했어요!` 
              : `아직 기준치까지 ${bmr-(totalKcal()+foodInfo.kcal)} kcal 남았어요!`}
            </Text>
          </Grid>
        </Grid>

        

        {/* 영양성분 */}
        <IngreBox>
          <div>
            <div style={{maxWidth: "34px"}}>
              <img src={Carbo} width="100%" alt="carbohydrate"/>
            </div>
            <Text lineheight="15px" m_lineheight="15px" size="13px" m_size="13px" bold color="#404040" margin="2vh 0 0 0">탄수화물</Text>
            <Text lineheight="24px" m_lineheight="22px" size="22px" m_size="20px" bold color="#404040" margin="0.9vh 0 0 0">63g</Text> 
          </div>

          <div>
            <div style={{maxWidth: "34px"}}>
              <img src={Protein} width="100%" alt="carbohydrate"/>
            </div>
            <Text lineheight="15px" m_lineheight="15px" size="13px" m_size="13px" bold color="#404040" margin="2vh 0 0 0">단백질</Text>
            <Text lineheight="24px" m_lineheight="22px" size="22px" m_size="20px" bold color="#404040" margin="0.9vh 0 0 0">6g</Text> 
          </div>

          <div>
            <div style={{maxWidth: "34px"}}>
              <img src={Fat} width="100%" alt="carbohydrate"/>
            </div>
            <Text lineheight="15px" m_lineheight="15px" size="13px" m_size="13px" bold color="#404040" margin="2vh 0 0 0">지방</Text>
            <Text lineheight="24px" m_lineheight="22px" size="22px" m_size="20px" bold color="#404040" margin="0.9vh 0 0 0">8g</Text> 
          </div>
        </IngreBox>

        {/* 칼로리 수치 바 */}
        <CalorieBar kcal={foodInfo.kcal}/>

        {/* 영양정보 디테일 */}
        <IngreDetailContainer>
          {/* 탄수화물 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div style={{display: "flex", alignItems: "center", minWidth: "110px", gap: "16px"}}>
                <img src={Carbo} alt="carbohydrate"/>
                <IngreText style={{fontWeight: "bold"}}>탄수화물</IngreText>
              </div>
              <div>
               <IngreText style={{fontWeight: "bold"}}>63g</IngreText>
              </div>
            </Grid>
            <Line/>

            <Grid is_flex padding="0 8.6% 0 8.6%">
              <IngreText>식이섬유</IngreText>
              <IngreText>4g</IngreText>
            </Grid>

            <Grid is_flex padding="1.8vh 8.6% 0 8.6%">
              <IngreText>당</IngreText>
              <IngreText>7g</IngreText>
            </Grid>
          </IngreDetail>

          {/* 단백질 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div style={{display: "flex", alignItems: "center", minWidth: "110px", gap: "16px"}}>
                <img src={Protein} alt="protein"/>
                <IngreText style={{fontWeight: "bold"}}>단백질</IngreText>
              </div>
              <div>
               <IngreText style={{fontWeight: "bold"}}>63g</IngreText>
              </div>
            </Grid>
            <Line/>

            <Grid is_flex padding="0 8.6% 0 8.6%">
              <IngreText>식이섬유</IngreText>
              <IngreText>4g</IngreText>
            </Grid>

            <Grid is_flex padding="1.8vh 8.6% 0 8.6%">
              <IngreText>당</IngreText>
              <IngreText>7g</IngreText>
            </Grid>
          </IngreDetail>

          {/* 지방 */}
          <IngreDetail>
            <Grid is_flex padding="0 8.6% 0 6.5%">
              <div style={{display: "flex", alignItems: "center", minWidth: "110px", gap: "16px"}}>
                <img src={Fat} alt="fat"/>
                <IngreText style={{fontWeight: "bold"}}>지방</IngreText>
              </div>
              <div>
               <IngreText style={{fontWeight: "bold"}}>63g</IngreText>
              </div>
            </Grid>
            <Line/>

            <Grid is_flex padding="0 8.6% 0 8.6%">
              <IngreText>식이섬유</IngreText>
              <IngreText>4g</IngreText>
            </Grid>

            <Grid is_flex padding="1.8vh 8.6% 0 8.6%">
              <IngreText>당</IngreText>
              <IngreText>7g</IngreText>
            </Grid>
          </IngreDetail>

        </IngreDetailContainer>
        
        

        {/* 카트 탭 */}
        <UnderBar/>

      </BodyContainer>
    </React.Fragment>
  );
}

FoodDetail.defaultProps = {

}

const BodyContainer = styled.div`
  position: relative;
  max-width: 420px;
  max-height: 80vh;
  padding-bottom: 10vh;
  /* padding-top: 2.4vh; */
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TopBack = styled.div`
  position: absolute;
  z-index: -100;
  width: 100%;
  min-width: 280px;
  max-width: 420px;
  background-color: ${theme.color.light};
  height: 26.6vh;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
`;

const NameBox = styled.div`
  line-height: 22px;
  /* min-width: 160px; */
  font-weight: bold; 
  font-size: 15px;
  color: #5F5F5F;
  margin: 0 2% 0 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  letter-spacing: -0.0041em;
  
  @media ${theme.device.mobileH} {
    font-size: 17px;
  }
`;

const IngreBox = styled.div`

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
  gap: 0.9vh;
`;

const IngreDetail = styled.div`
  width: 87.6%;
  border: 1px solid #E4E4E4;
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  padding: 1.3vh 0 1.8vh 0;
  background: #ffffff;
`;

const IngreText = styled.div`
  line-height: 18px; 
  font-size: 13px; 
  /* font-weight: bold; */
  color: #404040;
`;

const Line = styled.div`
  margin-top: 1.3vh;
  margin-bottom: 1.8vh;
  border: 1px solid #E4E4E4;
  height: 1px;
  width: 100%;
`;


export default FoodDetail;