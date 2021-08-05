import React from 'react';
import { Grid, Text } from '../elements';
//데이터
import {useSelector} from 'react-redux';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 : dashboard 각 타입에 기록된 칼로리 리스트
 * @필수값 : amount, name, resultKcal, type
 * @담당자 : 김나영
*/

const DashBoard_FoodItem = (props) => {

  const {amount, name, resultKcal, type} = props

  //props와 비교할 타입
  const data_type = useSelector((state) => state.record.type)

  return (
    <React.Fragment>
      {type === data_type && (
        <Grid display="flex" margin="2.5% 0 0 0">
          {/* 메뉴 */}
          <Grid width="63%">
            <Text size="15px" m_size="13px">{name}</Text>
          </Grid>
          {/* 칼로리 */}
          <Grid width="28%">
            <Text size="15px" bold m_size="13px">{resultKcal}kcal</Text>
          </Grid>
          {/* 수량 */}
          <Grid width="9.1%">
            <Text size="15px" m_size="13px">X {amount}</Text>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

DashBoard_FoodItem.defaultProps = {

}

export default DashBoard_FoodItem;