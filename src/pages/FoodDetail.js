import React, {useEffect} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// elements & components
import BtnHeader from '../shared/BtnHeader';
import { Grid, Text } from '../elements';
import UnderBar from '../components/Main_UnderBar';
// icons
import { AiOutlinePlusCircle } from 'react-icons/ai';
// modules
import { addCartRx } from '../redux/modules/cart';
import { getDetailDB } from '../redux/modules/search';
/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 푸드Id에 해당하는 상세 푸드 데이터
 * @담당자 : 박용태
*/

const FoodDetail = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const foodInfo = useSelector((state) => state.search.detail);
  const foodId = props.match.params.foodId;
// useEffect
  useEffect(() => {
    dispatch(getDetailDB(foodId))
  }, [])
  console.log(foodInfo)

  if (foodId !== foodInfo.foodId) {
    return <></>;
  }

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

  return (
    <React.Fragment>
      <BtnHeader title="칼로리 상세"/>

      <BodyContainer>
        
        <Grid margin="2.7vh 0" m_margin="2.7vh 0" padding= "0 7.6%">
          <div><AiOutlinePlusCircle onClick={addCart} style={{cursor: "pointer"}} size="26px"/></div>
        </Grid>
        
        <Grid is_flex padding= "0 7.6%">
          <Grid>
            <Grid display="flex">
              <Text lineheight="22px" bold size="17px" m_size="15px" color="#5F5F5F" margin="0 10px 0 0" paddig="0">{foodInfo.name}</Text>
              <span style={{fontSize: "13px", color: "#404040"}}>1인분 ({foodInfo.forOne}g)</span>
            </Grid>  
            <Text lineheight="41px" bold size="34px" m_size="28px" color="#2A2A2A" margin="0.6% 0" paddig="0">{foodInfo.kcal} kcal</Text>
          </Grid>
          <Grid width="27%" padding="0 8px" display="flex" jc="center" fw="wrap">
            오늘의 기준치를 100kcal를 초과해요!
          </Grid>
        </Grid>

        <Grid margin="7vh 0 0 0" m_margin="7vh 0 0 0" padding= "0 7.6%">
          <Text lineheight="22px" bold size="17px" m_size="15px" color="#5F5F5F" margin="0" padding="0">영양성분</Text>
        </Grid>
        
        <Grid is_flex margin="2vh 0 6.25vh 0" m_margin="2vh 0 6.25vh 0" padding= "0 6%">
          <IngredientCircle>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">탄수화물</Text>
            <Text lineheight="28px" bold size="22px" m_size="20px" color="#000000" padding="0" margin="0">63g</Text>
          </IngredientCircle>
          <IngredientCircle>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">단백질</Text>
            <Text lineheight="28px" bold size="22px" m_size="20px" color="#000000" padding="0" margin="0">6g</Text>
          </IngredientCircle>
          <IngredientCircle>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">지방</Text>
            <Text lineheight="28px" bold size="22px" m_size="20px" color="#000000" padding="0" margin="0">8g</Text>
          </IngredientCircle>
        </Grid>

        <Grid padding= "0 6%">
          <Grid is_flex padding="0.9vh 0.5vh">
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">탄수화물</Text>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">63g</Text>
          </Grid>
          <Line style={{border: "1px solid #F19F13"}}/>
          <Grid is_flex padding="0.9vh 0.5vh 0.9vh 0.9vh">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">식이섬유</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">4g</Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 0.5vh 0.9vh 0.9vh">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">당</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">7g</Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 0.5vh">
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">단백질</Text>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">459g</Text>
          </Grid>
          <Line style={{border: "1px solid #F19F13"}}/>          
          <Grid is_flex padding="0.9vh 0.5vh 0.9vh 0.9vh">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">나트륨</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">549g</Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 0.5vh 0.9vh 0.9vh">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0">칼륨</Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0"></Text>
          </Grid>
          <Line style={{border: "1px solid #FFE899"}}/>          
          <Grid is_flex padding="0.9vh 0.5vh">
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">지방</Text>
            <Text lineheight="18px" bold size="13px" m_size="13px" color="#404040" padding="0" margin="0">459mg</Text>
          </Grid>
          <Line style={{border: "1px solid #F19F13"}}/>          
          <Grid is_flex padding="0.9vh 0.5vh">
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0"></Text>
            <Text lineheight="18px" size="13px" m_size="13px" color="#5F5F5F" padding="0" margin="0"></Text>
          </Grid>
        </Grid>

        <UnderBar/>

      </BodyContainer>
    </React.Fragment>
  );
}

FoodDetail.defaultProps = {

}

const BodyContainer = styled.div`
  max-width: 420px;
  max-height: 80vh;
  padding-bottom: 10vh;
  overflow: scroll;
`;

const IngredientCircle = styled.div`
  width: 12vh;
  height: 12vh;
  border: 3px solid #F19F13;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Line = styled.div`
  width: 87%;
  height: 1px;
  padding: 0;
  margin: auto; 
`;

export default FoodDetail;