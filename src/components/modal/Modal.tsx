import { useEffect, useRef } from "react";
import Portal from "../portal";

type IModalBaseProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isOpenModal: boolean;
  onClick: () => void;
};

function Modal({ children, onClick, isOpenModal, className }: IModalBaseProps) {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    switch (isOpenModal) {
      case true:
        document.body.style.overflowY = "hidden";
        break;
      default:
        document.body.style.overflowY = "";
    }
  }, [isOpenModal]);

  if (!isOpenModal) return;

  return (
    <Portal>
      <div
        ref={nodeRef}
        className="fixed inset-0 flex items-center justify-center w-full h-screen z-[60]"
      >
        <div
          onClick={onClick}
          className="absolute inset-0 z-50 bg-black opacity-90"
        ></div>
        <div className={className}>{children}</div>
      </div>
    </Portal>
  );
}

export default Modal;
