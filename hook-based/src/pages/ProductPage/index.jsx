import React, { useEffect, useState } from "react";
import ProductApi from "shared/api/ProductApi";
import OrderableProductItem from "./OrderableProductItem";
import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import { useDialog, useLoading } from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";

const ProductPage = () => {
  const [productList, setProductList] = useState([]);
  const { startLoading, finishLoading } = useLoading();
  const { openDialog } = useDialog();

  const fetchData = async () => {
    try {
      startLoading("메뉴목록 로딩중 ...");
      const productList = await ProductApi.fetchProductList();
      setProductList(productList);
      finishLoading();
    } catch (error) {
      openDialog(<ErrorDialog />);
      return;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ProductPage">
      <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
        <ul>
          {productList.map((product) => {
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
};

export default ProductPage;
