import React from "react";
import Dialog from "./Dialog";
import Button from "./Button";
import { withLayout } from "../lib/MyLayout";

const ErrorDialog = ({ closeDialog }) => {
  return (
    <Dialog header={<>오류</>} footer={<Button onClick={closeDialog}>확인</Button>}>
      잠시 후 다시 시도해 주세요
    </Dialog>
  );
};

export default withLayout(ErrorDialog);
