import React from "react";
import ProductItem from "../../components/ProductItem";
import { withRouter } from "../../lib/MyRouter";

const OrderableProductItem = ({ product, navigate }) => {
  const onClick = () => {
    navigate(`/cart?productId=${product.id}`);
  };
  return <ProductItem product={product} onClick={onClick} />;
};

export default withRouter(OrderableProductItem);
