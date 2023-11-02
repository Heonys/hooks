import React from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import OrderDeliveryCard from "./OrderDeliveryCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderStatusCard from "./OrderStatusCard";
import OrderApi from "shared/api/OrderApi";
import { withLayout } from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";

class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
    };
  }

  async fetchOrder() {
    const { startLoading, finishLoading, openDialog } = this.props;
    startLoading("주문내역 불러오는중 ...");
    try {
      const order = await OrderApi.fetchMyOrder();
      this.setState({ order });
      finishLoading();
    } catch (error) {
      openDialog(<ErrorDialog />);
    }
  }

  componentDidMount() {
    this.fetchOrder();
  }

  render() {
    const { order } = this.state;
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
  }
}

export default withLayout(OrderPage);
