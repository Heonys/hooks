import React from "react";
import Page from "../../components/Page";
import ProductItem from "../../components/ProductItem";
import Title from "../../components/Title";
import OrderForm from "./OrderForm";
import PaymentButton from "./PaymentButton";
import ProductApi from "shared/api/ProductApi";
import { withRouter } from "../../lib/MyRouter";
import { withLayout } from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";
import OrderApi from "shared/api/OrderApi";
import PaymentSuccesDialog from "./PaymentSuccesDialog";

class CartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchProduct() {
    const { productId } = this.props.params();
    const { startLoading, finishLoading, openDialog } = this.props;

    if (!productId) return;
    startLoading("장바구리 이동중 ...");
    try {
      const product = await ProductApi.fetchProduct(productId);
      this.setState({ product });
      finishLoading();
    } catch (error) {
      openDialog(<ErrorDialog />);
    }
  }

  async componentDidMount() {
    this.fetchProduct();
  }

  async handleSubmit(values) {
    const { startLoading, finishLoading, openDialog } = this.props;

    startLoading("결제중 ...");
    try {
      await OrderApi.createOrder(values);
    } catch (error) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
    openDialog(<PaymentSuccesDialog />);
  }

  render() {
    const { product } = this.state;
    return (
      <div className="CartPage">
        <Page header={<Title backUrl={"/"}>장바구니</Title>} footer={<PaymentButton />}>
          {product && (
            <>
              <ProductItem product={product} />
              <OrderForm onSubmit={this.handleSubmit} />
            </>
          )}
        </Page>
      </div>
    );
  }
}

export default withLayout(withRouter(CartPage));
