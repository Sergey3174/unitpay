import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type ModalId = string;

interface ModalContextType {
  selectedRowData: any;
  setSelectedRowData: Dispatch<SetStateAction<any>>;
  modals: Record<ModalId, boolean>;
  isModalOpen: (modalId: ModalId) => boolean;
  openModal: (modalId: ModalId) => void;
  closeModal: (modalId: ModalId) => void;
  setModals: Dispatch<SetStateAction<Record<ModalId, boolean>>>;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [modals, setModals] = useState<Record<ModalId, boolean>>({});

  const openModal = (modalId: ModalId) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: true,
    }));
  };

  const closeModal = (modalId: ModalId) => {
    setModals((prev) => ({
      ...prev,
      [modalId]: false,
    }));
    setSelectedRowData(null); // по желанию
  };

  const isModalOpen = (modalId: ModalId) => !!modals[modalId];

  return (
    <ModalContext.Provider
      value={{
        selectedRowData,
        setSelectedRowData,
        modals,
        isModalOpen,
        openModal,
        closeModal,
        setModals,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
