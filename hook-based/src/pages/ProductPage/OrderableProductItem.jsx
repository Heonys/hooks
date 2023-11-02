import React from "react";
import ProductItem from "../../components/ProductItem";
import { useNaivigate } from "../../lib/MyRouter";

const OrderableProductItem = ({ product }) => {
  const navigate = useNaivigate();

  const onClick = () => {
    navigate(`/cart?productId=${product.id}`);
  };
  return <ProductItem product={product} onClick={onClick} />;
};

export default OrderableProductItem;
