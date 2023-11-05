import React from "react";
import ReactDOM from "react-dom";
import Form from "./Form";
import Dialog from "./Dialog";
import { DialogContainer, useDialog } from "./Layout";

const LoginForm = () => {
  const { openDialog, closeDialog } = useDialog();
  function validate(values) {
    const errors = {};
    if (!values.email) errors.email = "이메일을 입력하세요";
    if (!values.password) errors.password = "패스워드를 입력하세요";
    return errors;
  }

  function onSubmit(values) {
    openDialog(
      <>
        <div>로그인되었습니다</div>
        <button onClick={closeDialog}>닫기</button>
      </>
    );
  }

  return (
    <Form initalValue={{ email: "", password: "" }} validate={validate} onSubmit={onSubmit}>
      <Form.Field name={"email"} autoFocus />
      <Form.ErrorMessage name={"email"} />
      <Form.Field name={"password"} />
      <Form.ErrorMessage name={"password"} />
      <Form.Button text={"로그인"} />
      <DialogContainer />
    </Form>
  );
};

export default LoginForm;
