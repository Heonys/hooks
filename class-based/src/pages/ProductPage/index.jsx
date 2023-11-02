import React from "react";
import ProductApi from "shared/api/ProductApi";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Title from "../../components/Title";
import OrderableProductItem from "./OrderableProductItem";
import { withLayout } from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
    };
  }

  async fetchData() {
    const { startLoading, finishLoading, openDialog } = this.props;

    startLoading("메뉴목록 로딩중 ...");
    try {
      const productList = await ProductApi.fetchProductList();
      this.setState({ productList });
      finishLoading();
    } catch (error) {
      openDialog(<ErrorDialog />);
      return;
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="ProductPage">
        <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
          <ul>
            {this.state.productList.map((product) => {
              return (
                <li key={product.id}>
                  <OrderableProductItem product={product} />
                </li>
              );
            })}
          </ul>
        </Page>
      </div>
    );
  }
}

export default withLayout(ProductPage);
