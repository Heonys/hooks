import React from "react";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import { useNaivigate } from "../../lib/MyRouter";
import { useDialog } from "../../lib/MyLayout";

const PaymentSuccesDialog = () => {
  const navigate = useNaivigate();
  const { closeDialog } = useDialog();

  const handleClickOk = () => {
    closeDialog();
    navigate("/order");
  };
  const handleClickNo = () => {
    closeDialog();
    navigate("/");
  };

  return (
    <Dialog
      header={<>결제완료</>}
      footer={
        <>
          <Button style={{ marginRight: "1rem" }} onClick={handleClickNo}>
            아니오
          </Button>
          <Button styleType={"brand"} onClick={handleClickOk}>
            네, 확인 합니다.
          </Button>
        </>
      }
    >
      결제가 완료되었습니다. 주문 상태를 보러 가시겠습니까?
    </Dialog>
  );
};

export default PaymentSuccesDialog;
