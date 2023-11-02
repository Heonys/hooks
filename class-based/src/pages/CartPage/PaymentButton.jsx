import React from "react";
import Button from "../../components/Button";
import { RouterContext, withRouter } from "../../lib/MyRouter";

const PaymentButton = () => {
  return (
    <div className="PaymentButton">
      <Button styleType={"brand-solid"} block form="order-form" style={{ padding: "12px 0" }}>
        결제하기
      </Button>
    </div>
  );
};

export default PaymentButton;
