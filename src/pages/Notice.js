import React from "react";

import { useSelector } from "react-redux";
import { history } from "../redux/configStore";

import styled from "styled-components";
import { Grid, Text } from "../elements";
import theme from "../shared/theme";

import { Back } from "../img/svg";

import Loading from "./Loading4";
/**
 * @returns 공지사항
 * @역할 공지사항 페이지
 * @담당자 : 성수 + 나영(게시글 관리)
 */

const Notice = () => {
  const admin = useSelector((state) => state.user.user_info?.email);
  const notilist = useSelector((state) => state.notice.list);
  const notilist_reverse = [];

  // 공지사항 리스트 배열 뒤집기
  notilist.map((i) => {
    notilist_reverse.unshift(i);
  });

  // loading
  const is_loaded = useSelector((state) => state.record.is_loaded);

  if (!is_loaded) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <Container>
        <Head>
          <td
            onClick={() => {
              history.push("/body");
            }}
          >
            <Grid cursor="pointer">{Back}</Grid>
          </td>
          <Text size="17px" lineheight="22px" bold color="#000000">
            공지사항
          </Text>

          {/* 관리자 아이디 */}
          {admin === "cadmin@calories.com" ? (
            <Tag
              onClick={() => {
                history.push("/notiwrite");
              }}
            >
              <Text size="13px" lineheight="25px">
                <u>쓰기</u>
              </Text>
            </Tag>
          ) : (
            <p>&emsp;&emsp;</p>
          )}
        </Head>

        <hr color="#F5F5F5" />
        <PostList>
          {/* 공지사항 db로 받을 경우 디테일 수정이 어려워 프론트에서 md처럼 관리 */}
          <Post>
            <Tag
              onClick={() => {
                history.push(`/notice/notice5`);
              }}
            >
              <Grid display="flex">
                <Text
                  size="17px"
                  ineheight="22px"
                  cursor="pointer"
                  margin="auto 0"
                >
                  ✌🏽 Calog 버전 업그레이드 (.ver2)
                </Text>
                <Grid
                  width="auto"
                  border_radius="20px"
                  bg={theme.color.light}
                  padding="1%"
                  margin="auto auto auto 2%"
                  m_margin="auto auto auto 2%"
                >
                  <Text size="13px" m_size="11px">
                    New
                  </Text>
                </Grid>
              </Grid>
              <Text size="17px" lineheight="22px" color="#A9A9A9">
                2021-08-30
              </Text>
            </Tag>
            <hr color="#F5F5F5" />
          </Post>

          <Post>
            <Tag
              onClick={() => {
                history.push(`/notice/notice4`);
              }}
            >
              <Text size="17px" ineheight="22px" cursor="pointer">
                🍓 Calog 데이터 관련 공지
              </Text>
              <Text size="17px" lineheight="22px" color="#A9A9A9">
                2021-08-27
              </Text>
            </Tag>
            <hr color="#F5F5F5" />
          </Post>

          <Post>
            <Tag
              onClick={() => {
                history.push(`/notice/notice3`);
              }}
            >
              <Text size="17px" ineheight="22px" cursor="pointer">
                📲 ios/안드로이드 홈 화면 추가 방법
              </Text>
              <Text size="17px" lineheight="22px" color="#A9A9A9">
                2021-08-27
              </Text>
            </Tag>
            <hr color="#F5F5F5" />
          </Post>

          <Post>
            <Tag
              onClick={() => {
                history.push(`/notice/notice2`);
              }}
            >
              <Text size="17px" ineheight="22px" cursor="pointer">
                🎈피드백 이벤트 안내
              </Text>
              <Text size="17px" lineheight="22px" color="#A9A9A9">
                2021-08-26
              </Text>
            </Tag>
            <hr color="#F5F5F5" />
          </Post>

          <Post>
            <Tag
              onClick={() => {
                history.push(`/notice/notice1`);
              }}
            >
              <Text size="17px" ineheight="22px" cursor="pointer">
                🎉 Calog 정식런칭!
              </Text>
              <Text size="17px" lineheight="22px" color="#A9A9A9">
                2021-08-26
              </Text>
            </Tag>
            <hr color="#F5F5F5" />
          </Post>
        </PostList>
      </Container>
    </React.Fragment>
  );
};

export default Notice;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  padding-top: 30px;
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Post = styled.div`
  padding: 0px 15px 10px 15px;
`;

const Tag = styled.a`
  &:hover {
    cursor: pointer;
  }
`;
