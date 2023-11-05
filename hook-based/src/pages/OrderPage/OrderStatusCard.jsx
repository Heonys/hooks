import React, { useCallback, useMemo } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import { useDialog } from "../../lib/MyLayout";
import Dialog from "../../components/Dialog";

const OrderStatusCard = ({ order }) => {
  const { id, orderDate, status, name, position } = order;
  const { openDialog, closeDialog } = useDialog();

  const calculateDeliveryMinute = () => {
    const delay = 99999;
    for (let i = 0; i < delay; i++) {}
    if (!position[0]) return "-";
    return `${position[0]}분`;
  };

  const exptectedDeliveryMinute = useMemo(calculateDeliveryMinute, [position[0]]);

  const handleClick = useCallback(() => {
    openDialog(
      <Dialog header={<>도착정보</>} footer={<Button onClick={closeDialog}>확인</Button>}>
        <ul>
          <li>위도 {position[0]}</li>
          <li>경도 {position[1]}</li>
        </ul>
      </Dialog>
    );
  }, [position[0], position[1]]);

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
        {
          term: "도착 예상 시간",
          description: (
            <ExptectedDeliveryMinutes value={exptectedDeliveryMinute} onClick={handleClick} />
          ),
        },
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

const ExptectedDeliveryMinutes = React.memo(({ value, onClick }) => {
  return (
    <>
      {value}
      <Button onClick={onClick}>위치보기</Button>
    </>
  );
});
