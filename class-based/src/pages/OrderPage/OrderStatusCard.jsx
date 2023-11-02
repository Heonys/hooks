import React from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";

const OrderStatusCard = ({ order }) => {
  const { id, orderDate, status, name } = order;
  return (
    <Card
      header={
        <>
          {status}
          <br />
          {name}
        </>
      }
      data={[
        { term: "주문일시", description: <>{orderDate.toLocaleString()}원</> },
        { term: "주문번호", description: <>{id.toLocaleString()}원</> },
      ]}
      footer={
        <>
          <Button>전화</Button>
          <Button>가게보기</Button>
        </>
      }
    />
  );
};

export default OrderStatusCard;
