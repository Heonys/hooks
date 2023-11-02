import React, { createRef } from "react";
import FormControl from "../../components/FormControl";

const OrderForm = ({ onSubmit }) => {
  const getInputValueByName = (name) => {
    //TODO:
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const deliveryAddress = getInputValueByName("deliveryAddress");
    const deliveryConact = getInputValueByName("deliveryConact");
    const paymentMethod = getInputValueByName("paymentMethod");
    const messageToShop = getInputValueByName("messageToShop");
    const messageToRider = getInputValueByName("messageToRider");

    onSubmit({
      deliveryAddress,
      deliveryConact,
      paymentMethod,
      messageToRider,
      messageToShop,
    });
  };

  return (
    <form className="OrderForm" id="order-form" ref={null} onSubmit={handleSubmit}>
      <FormControl label="주소" htmlFor="deliveryAddress" required>
        <input
          type="text"
          id="deliveryAddress"
          name="deliveryAddress"
          placeholder="배달받을 주소를 입력하세요"
          required
          autoFocus
        />
      </FormControl>
      <FormControl label="연락처" htmlFor="deliveryConact" required>
        <input
          type="text"
          id="deliveryConact"
          name="deliveryConact"
          placeholder="연락처를 입력하세요"
          required
          pattern="^\d{2,3}-\d{3,4}-\d{4}$"
        />
      </FormControl>
      <FormControl label="결제수단" htmlFor="paymentMethod" required>
        <select name="paymentMethod" id="paymentMethod">
          <option value="마이페이">마이페이</option>
          <option value="만나서 결제">만나서결제</option>
        </select>
      </FormControl>
      <FormControl label="가게 사장님께" htmlFor="messageToShop">
        <textarea name="messageToShop" id="messageToShop"></textarea>
      </FormControl>
      <FormControl label="라이더님께" htmlFor="messageToRider">
        <textarea name="messageToRider" id="messageToRider"></textarea>
      </FormControl>
    </form>
  );
};

export default OrderForm;
