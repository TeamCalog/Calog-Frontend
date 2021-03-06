import React from "react";
import styled from "styled-components";
import theme from "../shared/theme";

const Text = (props) => {
  // bold : font-weight / size : font-size / lineheight: line-height
  // to : text-overflow / ws : white-space
  const {
    children,
    width,
    bold,
    color,
    size,
    margin,
    lineheight,
    to,
    ws,
    overflow,
    cursor,

    // media
    m_size,
  } = props;

  const styles = {
    width,
    bold,
    color,
    size,
    margin,
    lineheight,
    overflow,
    to,
    ws,
    cursor,

    // media
    m_size,
  };

  return (
    <React.Fragment>
      <DefaultText {...styles}> {children} </DefaultText>
    </React.Fragment>
  );
};

Text.defaultProps = {
  children: null,
  width: "auto",
  bold: false,
  color: "black",
  size: "1em",
  margin: "auto",
  lineheight: "null",
  cursor: "default",

  // media
  m_size: "1em",
  overflow: false,
  to: false,
  ws: false,
};

const DefaultText = styled.p`
  font-family: "Pretendard";
  width: ${(props) => props.width};
  font-weight: ${(props) => (props.bold ? "700" : "400")};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  margin: ${(props) => props.margin};
  ${(props) => (props.lineheight ? `line-height: ${props.lineheight}` : "")};
  ${(props) => (props.overflow ? `overflow: ${props.overflow}` : "")};
  ${(props) => (props.to ? "text-overflow: ellipsis" : "")};
  ${(props) => (props.ws ? `white-space: ${props.ws}` : "")};
  cursor: ${(props) => props.cursor};

  @media ${theme.device.mobileM} {
    font-size: ${(props) => props.m_size};
    ${(props) =>
      props.m_lineheight ? `line-height: ${props.m_lineheight}` : ""};
  }
`;

export default Text;
