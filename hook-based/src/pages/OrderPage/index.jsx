import React, { useEffect, useState } from "react";
import OrderStatusCard from "./OrderStatusCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderDeliveryCard from "./OrderDeliveryCard";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import OrderApi from "shared/api/OrderApi";
import { useDialog, useLoading } from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";

const OrderPage = () => {
  const [order, setOrder] = useState();
  const { startLoading, finishLoading } = useLoading();
  const { openDialog } = useDialog();

  const fetchOrder = async () => {
    try {
      startLoading("주문내역 불러오는중 ...");
      const order = await OrderApi.fetchMyOrder();
      setOrder(order);
    } catch (error) {
      openDialog(<ErrorDialog />);
    }
    finishLoading();
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="OrderPage">
      <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
        {order && (
          <>
            <OrderStatusCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderDeliveryCard order={order} />
          </>
        )}
      </Page>
    </div>
  );
};

export default OrderPage;
