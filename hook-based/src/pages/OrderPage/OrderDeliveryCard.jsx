import React from "react";
import Card from "../../components/Card";

const OrderDeliveryCard = ({ order }) => {
  const { deliveryAddress, deliveryContact, messageToShop, messageToRider } = order;
  return (
    <Card
      data={[
        { term: "배달주소", description: <>{deliveryAddress.toLocaleString()}원</> },
        { term: "전화번호", description: <>{deliveryContact.toLocaleString()}원</> },
        { term: "가게사장님께", description: <>{messageToShop.toLocaleString()}원</> },
        { term: "라이더님께", description: <>{messageToRider.toLocaleString()}원</> },
      ]}
    />
  );
};

export default OrderDeliveryCard;
