import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configStore";
import theme from "../shared/theme";
// modules
import { deleteCartRx } from "../redux/modules/cart";
// elements & components
import { Grid, Text } from "../elements";
// icons
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";

/**
 * @param {*} props
 * @returns 장바구니 내역 및 버튼
 * @역할 장바구니를 보여주는 언더바
 * @담당자 : 박용태
 */

const UnderBar = () => {
  const dispatch = useDispatch();

  // 카트리스트
  const cart_list = useSelector((state) => state.cart.cart);

  // 열고 닫는
  const [barOnOff, barSet] = useState(false);

  const toggleCart = () => {
    if (barOnOff === false) {
      barSet(true);
    } else {
      barSet(false);
    }
  };

  // 카트 내용 삭제
  const deleteCart = (foodId) => {
    dispatch(deleteCartRx(foodId));
  };

  if (cart_list.length === 0) {
    return <></>;
  }
  return (
    <React.Fragment>
      <CartContainer
        style={{
          transform: `translate(0, ${barOnOff ? "0%" : "calc(100% - 10vh)"})`,
        }}
      >
        {/* 언더바 버튼 */}
        <Grid
          _onClick={toggleCart}
          display="flex"
          jc="center"
          align-items="center"
          height="2.3vh"
          width="20px"
          margin="1.2vh auto"
          m_margin="1.2vh auto"
          cursor
        >
          {barOnOff ? (
            <IoIosArrowDown size="20px" color="#757575" />
          ) : (
            <IoIosArrowUp size="20px" color="#757575" />
          )}
        </Grid>

        {/* 즐겨찾기 항목 */}
        <Grid padding="0 5% 3% 5%" display="flex" fw="wrap">
          {cart_list.map((cart, idx) => {
            // 브랜드명 분리
            const NameNBrand =
              cart.name.indexOf("[") === 0 ? cart.name.split(":") : false;
            // const brand = cart.name.indexOf('[') === 0 ? NameNBrand[0] : '';
            const name =
              cart.name.indexOf("[") === 0 ? NameNBrand[1] : cart.name;

            return (
              <CartButton key={idx}>
                <CartText>{name}</CartText>
                <div
                  onClick={() => {
                    deleteCart(cart.foodId);
                  }}
                >
                  <TiDeleteOutline size="17px" color="#404040" />
                </div>
              </CartButton>
            );
          })}
        </Grid>

        {/* 계산하러가기 버튼 */}
        <CalcBox>
          <div
            onClick={() => {
              history.push("/cart");
            }}
          >
            <Text size="17px" m_size="15px" bold padding="0" margin="0">
              계산하러가기
            </Text>
          </div>
        </CalcBox>
      </CartContainer>
    </React.Fragment>
  );
};

UnderBar.defaultProps = {};

const CartContainer = styled.div`
  max-width: 420px;
  width: 100%;
  min-height: 12.5%;
  position: fixed;
  bottom: 9%;
  border: none;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  box-shadow: 0px -5px 22px -8px rgba(0, 0, 0, 0.14);
  background: #fff;
  z-index: 70;
  transition: 1s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CalcBox = styled.div`
  width: 100%;
  padding: 3.8vh 20px 2.8vh 20px;

  & > div {
    width: 100%;
    height: 6.25vh;
    background: #ffe899;
    border: none;
    border-radius: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const CartButton = styled.div`
  height: 4vh;
  padding: 5px 1.9% 5px 2.8%;
  background: #e4e4e4;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 1%;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const CartText = styled.div`
  line-height: 18px;
  font-size: 13px;
  color: #2a2a2a;
  margin-right: 6px;

  @media ${theme.device.mobileS} {
    margin-right: 3px;
  }
`;

export default UnderBar;
