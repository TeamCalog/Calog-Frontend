import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
// elements & components
import { Text } from '../elements';
// icons
import { IoIosArrowDropleft,IoIosArrowDropright } from 'react-icons/io';
// modules
import { setUpAmount, setDownAmount } from '../redux/modules/cart';


/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 카드에 들어갈 푸드 정보
 * @담당자 : 박용태
*/

const Card = (props) => {
// dispatch
  const dispatch = useDispatch();
// props
  const [count, setCount] = useState(props.amount);
// useEffect

  // 갯수 카운팅하기!
  const upCount = () => {
    setCount(count + 0.5);
    dispatch(setUpAmount(props.foodId));
  };

  const downCount = () => {
    if(count > 0.5){
      setCount(count - 0.5);
      dispatch(setDownAmount(props.foodId));
    }
  };

  return (
    <React.Fragment>
        <FoodCard>
          <Text lineheight="22px" m_lineheight="20px" size="17px" m_size="15px" margin="0" padding="0">{props.name}</Text>
          <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#2A2A2A" margin="8px 0 0 0" padding="0">{props.kcal} kcal</Text>
          <CountBox>
            <div onClick={downCount}><IoIosArrowDropleft color="gray" size="27px"/></div>
            <Text lineheight="28px" m_lineheight="25px" size="22px" m_size="20px" bold color="#000000" margin="0" padding="0">{count}</Text>
            <div onClick={upCount}><IoIosArrowDropright color="gray" size="27px"/></div>
          </CountBox>
        </FoodCard>
    </React.Fragment>
  );
}

Card.defaultProps = {

}

const FoodCard = styled.div`
  position: relative;
  /* display: flex; */
  width: calc(100% - 50px);
  margin-left: 25px;
  margin-right: 25px;
  margin-bottom: 8px;
  padding: 2.2vh 7.6%;
  background: #fff;
  border: 1px solid #F19F13;
  border-radius: 16px;
`;

const CountBox = styled.div`
  position: absolute;
  right: 5%;
  top: 4.5vh;
  min-width: 32%;
  max-width: 32%;
  display: flex;
  align-items: center;
  justify-content: space-between;  
  /* gap: auto; */

  & > div {
    width: 27px;
    height: 27px;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
`;

export default Card;