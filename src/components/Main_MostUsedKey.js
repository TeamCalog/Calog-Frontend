import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// elements & components
import { Text } from "../elements";
// modules
import {
  searchKeywordDB,
  countKeywordDB,
  addMostUsedKey,
} from "../redux/modules/search";
import { searchRecentDB, addRecent } from "../redux/modules/recent";
/**
 * @param {*} props
 * @returns 인기검색어 3개
 * @역할 인기검색어를 보여주는
 * @담당자 : 박용태
 */

const MostUsedKey = () => {
  // dispatch
  const dispatch = useDispatch();

  // 인기검색어 목록
  const most_list = useSelector((state) => state.search.most);

  // 로그인체크
  const is_login = useSelector((state) => state.user.is_login);

  // 인기검색어 누르면 검색되게!
  const search = (keyword) => {
    const data = {
      keyword: keyword,
      min: 0,
      max: 5000,
    };
    dispatch(searchKeywordDB(data));
    {
      is_login
        ? dispatch(countKeywordDB(keyword))
        : dispatch(addMostUsedKey(keyword));
    }
    {
      is_login
        ? dispatch(searchRecentDB(keyword))
        : dispatch(addRecent(keyword));
    }
  };

  return (
    <React.Fragment>
      <MostContainer>
        {most_list.map((m, idx) => {
          if (idx < 4) {
            return (
              <MostButton
                onClick={() => {
                  search(m.keyword);
                }}
                key={idx}
              >
                <Text
                  lineheight="14px"
                  m_lineheight="14px"
                  size="12px"
                  m_size="12px"
                  color="#404040"
                  padding="0"
                  margin="0"
                  cursor="pointer"
                >
                  {m.keyword}
                </Text>
              </MostButton>
            );
          }
        })}
      </MostContainer>
    </React.Fragment>
  );
};

MostUsedKey.defaultProps = {};

const MostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.2vh;
  min-height: 3.4vh;
`;

const MostButton = styled.div`
  min-width: 14%;
  height: 2.2vh;
  padding: 2px 3.8%;
  border: none;
  border-radius: 12.5px;
  background: #fff7da;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 1%;
`;

export default MostUsedKey;
