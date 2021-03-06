import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import { BodySpectSV } from "../redux/modules/user";

import styled from "styled-components";
import { Button, Text, Grid, Input } from "../elements";

import { NumberCheck } from "../shared/common";

/**
 * @역할 입력 받은 바디 스펙을 유저 정보에 저장
 * @담당자 : 성수
 */

const AddSpec = () => {
  const dispatch = useDispatch();
  const user_nickname = useSelector((state) => state.user.user_info.nickname);

  const [bodyspec, setSpec] = useState({});
  const { gender, weight, height, age } = bodyspec;
  const [page, setPage] = useState(0);

  const setGenderMan = () => {
    setSpec({ ...bodyspec, gender: "남자" });
    setPage(page + 1);
  };
  const setGenderWoman = () => {
    setSpec({ ...bodyspec, gender: "여자" });
    setPage(page + 1);
  };

  const nextPage1 = () => {
    if (!NumberCheck(Number(age))) {
      setSpec({ ...bodyspec, age: "" });
      window.alert("나이에 숫자를 입력해주세요!");
      return;
    }
    setPage(page + 1);
  };
  const nextPage2 = () => {
    if (!NumberCheck(Number(height))) {
      setSpec({ ...bodyspec, height: "" });
      window.alert("키에 숫자를 입력해주세요!");
      return;
    }
    setPage(page + 1);
  };
  const addBodySpec = () => {
    if (!NumberCheck(Number(weight))) {
      setSpec({ ...bodyspec, weight: "" });
      window.alert("몸무게에 숫자를 입력해주세요!");
      return;
    }
    dispatch(BodySpectSV(gender, weight, height, age));
    window.alert("신체 정보가 저장되었습니다!");
    history.push("/body");
  };

  return (
    <React.Fragment>
      <Container>
        <Headers>
          <Grid padding="12px">
            <Text m_size="25px" size="28px" lineheight="34px">
              <Strong>{user_nickname}</Strong>의
            </Text>

            <Text m_size="25px" size="28px" lineheight="34px">
              {/* 페이지에 따라 다른 주제 */}
              {page === 0 ? (
                <Strong>성별</Strong>
              ) : page === 1 ? (
                <Strong>나이</Strong>
              ) : page === 2 ? (
                <Strong>신장 사이즈</Strong>
              ) : (
                <Strong>몸무게</Strong>
              )}
              를 알려주세요
            </Text>
          </Grid>

          <Grid padding="12px">
            <Text m_size="11px" size="15px" lineheight="20px" color="#5F5F5F">
              {user_nickname}님의 소중한 신체데이터는 저희만 알고있을게요!
              <br />
              신장사이즈는 기초대사량을 계산하는 데에 사용됩니다.
              <br />
              <Source href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4278349/">
                bmr은 이 논문을 바탕으로 계산하였습니다.
              </Source>
            </Text>
          </Grid>
        </Headers>

        <Body>
          {/* 페이지에 따라 받아야하는 값이 다르므로 다른 input 박스 보여줌 */}
          {page === 0 ? (
            <Grid display="flex" jc="space-around">
              <GenderBox onClick={setGenderMan}>남</GenderBox>
              <GenderBox onClick={setGenderWoman}>여</GenderBox>
            </Grid>
          ) : page === 1 ? (
            <InputBox>
              &emsp;
              <Input
                border="none"
                width="80%"
                type="text"
                value={bodyspec.age}
                _onChange={(e) => setSpec({ ...bodyspec, age: e.target.value })}
              />
              <Strong>AGE&emsp;</Strong>
            </InputBox>
          ) : page === 2 ? (
            <InputBox>
              &emsp;
              <Input
                border="none"
                width="80%"
                type="text"
                value={bodyspec.height}
                _onChange={(e) =>
                  setSpec({ ...bodyspec, height: e.target.value })
                }
              />
              <Strong>CM&emsp;</Strong>
            </InputBox>
          ) : (
            //page===3
            <InputBox>
              &emsp;
              <Input
                border="none"
                width="80%"
                type="text"
                value={bodyspec.weight}
                _onChange={(e) =>
                  setSpec({ ...bodyspec, weight: e.target.value })
                }
              />
              <Strong>KG&emsp;</Strong>
            </InputBox>
          )}
          {/* 페이지가 1이상일 때 버튼 나타냄 */}
          {page < 1 ? (
            ""
          ) : (
            <Button
              bg="#FFE899"
              width="87%"
              height="56px"
              border_radius="60px"
              _onClick={
                page === 1 ? nextPage1 : page === 2 ? nextPage2 : addBodySpec
              }
            >
              <Grid cursor>
                <Text color="#404040" size="16px" lineheight="22px" bold>
                  다음
                </Text>
              </Grid>
            </Button>
          )}
        </Body>
      </Container>
    </React.Fragment>
  );
};

export default AddSpec;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Headers = styled.div`
  margin: 35% 0px 64px 3%;
`;

const Body = styled.div``;

const InputBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 87%;
  height: 56px;
  border: 1px solid #f19f13;
  border-radius: 60px;
  margin: auto;
  margin-bottom: 40px;
`;

const Strong = styled.b`
  size: 28px;
  line-height: 34px;
  font-weight: 700;
  font-family: "Pretendard";
`;

const GenderBox = styled.div`
  width: 25%;
  height: 100px;
  background-color: #ffe899;
  border-radius: 50%;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

const Source = styled.a`
  font-size: 12px;
  color: #f19f13;
`;
