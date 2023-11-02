import React, { useEffect, useState } from "react";
import Page from "../../components/Page";
import Title from "../../components/Title";
import PaymentButton from "./PaymentButton";
import ProductApi from "shared/api/ProductApi";
import OrderApi from "shared/api/OrderApi";
import ProductItem from "../../components/ProductItem";
import OrderForm from "./OrderForm";
import { useParams } from "../../lib/MyRouter";
import { useDialog, useLoading } from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";
import PaymentSuccesDialog from "./PaymentSuccesDialog";

const CartPage = () => {
  const [product, setProduct] = useState();
  const { productId } = useParams();
  const { openDialog } = useDialog();
  const { startLoading, finishLoading } = useLoading();

  const fetchProduct = async (productId) => {
    startLoading("장바구리 이동중 ...");
    try {
      const product = await ProductApi.fetchProduct(productId);
      setProduct(product);
    } catch (error) {
      finishLoading();
      openDialog(<ErrorDialog />);
    }
    finishLoading();
  };

  const handleSubmit = async (values) => {
    startLoading("결제중 ...");
    try {
      await OrderApi.createOrder(values);
    } catch (error) {
      finishLoading();
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
    openDialog(<PaymentSuccesDialog />);
  };

  useEffect(() => {
    fetchProduct(productId);
  }, []);

  return (
    <div className="CartPage">
      <Page header={<Title backUrl={"/"}>장바구니</Title>} footer={<PaymentButton />}>
        {product && (
          <>
            <ProductItem product={product} />
            <OrderForm onSubmit={handleSubmit} />
          </>
        )}
      </Page>
    </div>
  );
};

export default CartPage;
