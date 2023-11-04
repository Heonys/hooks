import React, { useRef } from "react";
import FormControl from "../../components/FormControl";
// import { Form, Field, ErrorMessage } from "../../lib/MyForm";
import { Form, Field, ErrorMessage } from "../../lib/MyForm-reducer";

const OrderForm = ({ onSubmit }) => {
  const validate = (value) => {
    const error = {};
    if (!value.deliveryAddress) error.deliveryAddress = "주소를 입력하세요";
    if (!value.deliveryConact) error.deliveryConact = "연락처를 입력하세요";
    if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(value.deliveryConact))
      error.deliveryConact = "전화번호 형식으로 입력하세요";
    return error;
  };

  return (
    <Form
      className="OrderForm"
      id="order-form"
      initalValues={{
        deliveryAddress: "",
        deliveryConact: "",
        paymentMethod: "마이페이",
        messageToShop: "",
        messageToRider: "",
      }}
      validate={validate}
      onSubmit={onSubmit}
    >
      <FormControl
        label="주소"
        htmlFor="deliveryAddress"
        required
        error={<ErrorMessage name="deliveryAddress" />}
      >
        <Field
          type="text"
          name="deliveryAddress"
          id="deliveryAddress"
          placeholder="배달받을 주소를 입력하세요"
          autoFocus
          required
        />
      </FormControl>
      <FormControl
        label="연락처"
        htmlFor="deliveryConact"
        required
        error={<ErrorMessage name="deliveryConact" />}
      >
        <Field
          type="text"
          id="deliveryConact"
          name="deliveryConact"
          placeholder="연락처를 입력하세요"
        />
      </FormControl>
      <FormControl label="결제수단" htmlFor="paymentMethod" required>
        <Field as="select" name="paymentMethod" id="paymentMethod">
          <option value="마이페이">마이페이</option>
          <option value="만나서 결제">만나서결제</option>
        </Field>
      </FormControl>
      <FormControl label="가게 사장님께" htmlFor="messageToShop">
        <Field as="textarea" name="messageToShop" id="messageToShop"></Field>
      </FormControl>
      <FormControl label="라이더님께" htmlFor="messageToRider">
        <Field as="textarea" name="messageToRider" id="messageToRider"></Field>
      </FormControl>
    </Form>
  );
};

export default OrderForm;
