import React from 'react';
import styled from 'styled-components';
import {Grid, Text} from '../elements';
import theme from '../shared/theme';

/** 
 * @param {*} props
 * @returns 설명적기
 * @역할 ~~~하는 컴포넌트
 * @필수값 : bmr, contents, foodRecords, totalCalories
 * @담당자 : 김나영
*/

const CalenderDetail_Info = (props) => {

  const {bmr, totalCalories} = props

  const ten = bmr*0.1
  const twenty = bmr*0.2

  //case 1-1-1) '잘 먹었어요'의 기준(bmr+-10)
  const good = ((bmr-ten) <= totalCalories) && (totalCalories <= (bmr+ten))
  //case 1-1-2) '적당히 먹었어요'의 기준(bmr+-20)
  const well = ((bmr-twenty) <= totalCalories && totalCalories < (bmr-ten)) || ((bmr+ten) < totalCalories && totalCalories <= (bmr+twenty))
  //case 1-1-3) '너무 적게 또는 많이 먹었어요'의 기준(over)
  const bad = totalCalories < (bmr-twenty) || (bmr+twenty) < totalCalories

  //차이
  const _extra = Math.abs(bmr-totalCalories)
  const extra = Math.round(_extra)

  if(well) {
    return(
      <React.Fragment>
        <Wrap>
          <Grid is_flex padding="0 9%">
            <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
              <P>조금 더 노력하면<br/>기초대사량에 맞추어<br/>먹을 수 있던 하루!</P>
              <Text size="15px" bold m_size="11px" color={theme.color.gray_6} margin="3.8% 0 0 0">기초대사량과 {extra}kcal만큼 차이나요🧐</Text>
            </Grid>
            <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
              <Svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="22" cy="22" r="22" fill="#8C8C8C"/>
                  <path d="M18.8368 18.8727C19.3682 18.3374 19.6667 17.6114 19.6667 16.8544C19.6667 16.0973 19.3682 15.3713 18.8368 14.836C18.3054 14.3007 17.5848 14 16.8333 14C16.0819 14 15.3612 14.3007 14.8299 14.836C14.2985 15.3713 14 16.0973 14 16.8544C14 17.6114 14.2985 18.3374 14.8299 18.8727C15.3612 19.408 16.0819 19.7087 16.8333 19.7087C17.5848 19.7087 18.3054 19.408 18.8368 18.8727Z" fill="white"/>
                  <path d="M30.1701 18.8727C29.6388 19.408 28.9181 19.7087 28.1667 19.7087C27.4152 19.7087 26.6945 19.408 26.1632 18.8727C25.6318 18.3374 25.3333 17.6114 25.3333 16.8544C25.3333 16.0973 25.6318 15.3713 26.1632 14.836C26.6945 14.3007 27.4152 14 28.1667 14C28.9181 14 29.6388 14.3007 30.1701 14.836C30.7015 15.3713 31 16.0973 31 16.8544C31 17.6114 30.7015 18.3374 30.1701 18.8727Z" fill="white"/>
                  <rect x="14" y="26.1943" width="17" height="3.80581" rx="1.90291" fill="white"/>
              </Svg>
              <br/><br/><br/><br/>
            </Grid>
          </Grid>
        </Wrap>
      </React.Fragment>
    )
  }

  if(bad) {
    if (bmr > totalCalories) {
      return(
      <React.Fragment>
        <Wrap>
          <Grid is_flex padding="0 9%">
            <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
              <P>Bad<br/>기초대사량에 많이<br/>못미치는 하루였어요😿</P>
              <Text size="15px" bold m_size="11px" color={theme.color.gray_6} margin="3.8% 0 0 0">기초대사량까지 {extra}kcal 모자라요</Text>
            </Grid>
            <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
              <Svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" fill="#F87C7C"/>
                <path d="M17.8368 18.8518C18.3682 18.3188 18.6667 17.5959 18.6667 16.8421C18.6667 16.0883 18.3682 15.3654 17.8368 14.8324C17.3054 14.2994 16.5848 14 15.8333 14C15.0819 14 14.3612 14.2994 13.8299 14.8324C13.2985 15.3654 13 16.0883 13 16.8421C13 17.5959 13.2985 18.3188 13.8299 18.8518C14.3612 19.3848 15.0819 19.6842 15.8333 19.6842C16.5848 19.6842 17.3054 19.3848 17.8368 18.8518Z" fill="white"/>
                <path d="M29.1701 18.8518C28.6388 19.3848 27.9181 19.6842 27.1667 19.6842C26.4152 19.6842 25.6945 19.3848 25.1632 18.8518C24.6318 18.3188 24.3333 17.5959 24.3333 16.8421C24.3333 16.0883 24.6318 15.3654 25.1632 14.8324C25.6945 14.2994 26.4152 14 27.1667 14C27.9181 14 28.6388 14.2994 29.1701 14.8324C29.7015 15.3654 30 16.0883 30 16.8421C30 17.5959 29.7015 18.3188 29.1701 18.8518Z" fill="white"/>
                <path d="M26.203 31.7377C25.7721 31.483 25.4595 31.0674 25.3337 30.5818C24.8407 28.9315 23.0803 28.202 21.4936 28.202C19.9069 28.202 18.1446 28.9334 17.6535 30.5818C17.5203 31.0586 17.2064 31.4642 16.7789 31.7117C16.3514 31.9592 15.8443 32.0291 15.3661 31.9062C14.8879 31.7834 14.4766 31.4777 14.2203 31.0545C13.964 30.6313 13.883 30.1243 13.9947 29.642C14.9732 26.33 18.1219 24.4126 21.4936 24.4126C24.7368 24.4126 28.1633 26.3073 28.9925 29.6382C29.1158 30.1244 29.0418 30.6398 28.7868 31.0714C28.5318 31.5029 28.1166 31.8154 27.6322 31.9403C27.1479 32.0652 26.6339 31.9924 26.203 31.7377Z" fill="white"/>
              </Svg>
              <br/><br/><br/><br/>
            </Grid>
          </Grid>
        </Wrap>
      </React.Fragment>
      )
    } else {
      return(
        <React.Fragment>
        <Wrap>
          <Grid is_flex padding="0 9%">
            <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
              <P>Bad<br/>기초대사량을 많이<br/>초과한 하루였네요😿</P>
              <Text size="15px" bold m_size="11px" color={theme.color.gray_6} margin="3.8% 0 0 0">기초대사량보다 {extra}kcal 많이 섭취했어요</Text>
            </Grid>
            <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
              <Svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="22" fill="#F87C7C"/>
                <path d="M17.8368 18.8518C18.3682 18.3188 18.6667 17.5959 18.6667 16.8421C18.6667 16.0883 18.3682 15.3654 17.8368 14.8324C17.3054 14.2994 16.5848 14 15.8333 14C15.0819 14 14.3612 14.2994 13.8299 14.8324C13.2985 15.3654 13 16.0883 13 16.8421C13 17.5959 13.2985 18.3188 13.8299 18.8518C14.3612 19.3848 15.0819 19.6842 15.8333 19.6842C16.5848 19.6842 17.3054 19.3848 17.8368 18.8518Z" fill="white"/>
                <path d="M29.1701 18.8518C28.6388 19.3848 27.9181 19.6842 27.1667 19.6842C26.4152 19.6842 25.6945 19.3848 25.1632 18.8518C24.6318 18.3188 24.3333 17.5959 24.3333 16.8421C24.3333 16.0883 24.6318 15.3654 25.1632 14.8324C25.6945 14.2994 26.4152 14 27.1667 14C27.9181 14 28.6388 14.2994 29.1701 14.8324C29.7015 15.3654 30 16.0883 30 16.8421C30 17.5959 29.7015 18.3188 29.1701 18.8518Z" fill="white"/>
                <path d="M26.203 31.7377C25.7721 31.483 25.4595 31.0674 25.3337 30.5818C24.8407 28.9315 23.0803 28.202 21.4936 28.202C19.9069 28.202 18.1446 28.9334 17.6535 30.5818C17.5203 31.0586 17.2064 31.4642 16.7789 31.7117C16.3514 31.9592 15.8443 32.0291 15.3661 31.9062C14.8879 31.7834 14.4766 31.4777 14.2203 31.0545C13.964 30.6313 13.883 30.1243 13.9947 29.642C14.9732 26.33 18.1219 24.4126 21.4936 24.4126C24.7368 24.4126 28.1633 26.3073 28.9925 29.6382C29.1158 30.1244 29.0418 30.6398 28.7868 31.0714C28.5318 31.5029 28.1166 31.8154 27.6322 31.9403C27.1479 32.0652 26.6339 31.9924 26.203 31.7377Z" fill="white"/>
              </Svg>
              <br/><br/><br/><br/>
            </Grid>
          </Grid>
        </Wrap>
      </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      <Wrap>
        <Grid is_flex padding="0 9%">
          <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
            <P>Good<br/>기초대사량을<br/>충분히 채운 하루네요!</P>
            <Text size="15px" bold m_size="11px" color={theme.color.gray_6} margin="3.8% 0 0 0">기초대사량과 {extra}kcal만큼 차이나요🧐</Text>
          </Grid>
          <Grid width="auto" margin="13.2% 0 0 0" m_margin="8% 0 0 0">
            <Svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="22" r="22" fill="#6993FF"/>
              <path d="M17.8368 18.852C18.3682 18.319 18.6667 17.596 18.6667 16.8422C18.6667 16.0884 18.3682 15.3655 17.8368 14.8325C17.3054 14.2994 16.5848 14 15.8333 14C15.0819 14 14.3612 14.2994 13.8299 14.8325C13.2985 15.3655 13 16.0884 13 16.8422C13 17.596 13.2985 18.319 13.8299 18.852C14.3612 19.385 15.0819 19.6845 15.8333 19.6845C16.5848 19.6845 17.3054 19.385 17.8368 18.852Z" fill="white"/>
              <path d="M29.1701 18.852C28.6388 19.385 27.9181 19.6845 27.1667 19.6845C26.4152 19.6845 25.6945 19.385 25.1632 18.852C24.6318 18.319 24.3333 17.596 24.3333 16.8422C24.3333 16.0884 24.6318 15.3655 25.1632 14.8325C25.6945 14.2994 26.4152 14 27.1667 14C27.9181 14 28.6388 14.2994 29.1701 14.8325C29.7015 15.3655 30 16.0884 30 16.8422C30 17.596 29.7015 18.319 29.1701 18.852Z" fill="white"/>
              <path d="M16.7921 24.6744C17.223 24.9291 17.5356 25.3448 17.6614 25.8304C18.1544 27.4807 19.9148 28.2103 21.5015 28.2103C23.0882 28.2103 24.8505 27.4789 25.3416 25.8304C25.4748 25.3535 25.7887 24.948 26.2162 24.7004C26.6437 24.4529 27.1509 24.383 27.6291 24.5059C28.1072 24.6287 28.5185 24.9344 28.7748 25.3576C29.0311 25.7808 29.1121 26.2879 29.0004 26.7702C28.022 30.0823 24.8732 31.9999 21.5015 31.9999C18.2583 31.9999 14.8318 30.1051 14.0026 26.774C13.8793 26.2878 13.9533 25.7724 14.2083 25.3408C14.4633 24.9092 14.8785 24.5967 15.3629 24.4718C15.8473 24.3469 16.3612 24.4197 16.7921 24.6744Z" fill="white"/>
            </Svg>
            <br/><br/><br/><br/>
          </Grid>
        </Grid>
      </Wrap>
    </React.Fragment>
  );
}

CalenderDetail_Info.defaultProps = {

}

const Wrap = styled.div`
  background-color: white;
  width: 88%;
  height: 22.5vh;
  margin: 0 auto;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
`;

const Svg = styled.svg`
  width: 44px;
  height: 44px;

  @media ${theme.device.mobileMini} {
    width: 35px;
    height: 35px;
  }
`;

const P = styled.p`
  font-size: 22px;
  font-weight: bold;
  line-height: 28px;
  
  @media ${theme.device.mobileMini} {
    font-size: 17px;
    line-height: 20px;
  }
`;

export default CalenderDetail_Info;