import { useModalContext } from '@/hooks/use-modal-context';
import { Button } from '@/components/ui/button';
import { ModalAtolKassa } from '@/components/custom/Modals/ModalAtolKassa';
import { ModalCheckOnline } from '@/components/custom/Modals/ModalCheckOnline';
import { ModalDigitalKassa } from '@/components/custom/Modals/ModalDigitalKassa';
import { ModalEComKassa } from '@/components/custom/Modals/ModalEComKassa';
import { ModalKitOnline } from '@/components/custom/Modals/ModalKitOnline';
import { ModalModulKassa } from '@/components/custom/Modals/ModalModulKassa';
import { ModalOrder } from '@/components/custom/Modals/ModalOrder';
import { ModalUnitChek } from '@/components/custom/Modals/ModalUnitCheck';
import { TableBoxOffice } from './components/tableBoxOffice';

const MODAL_COMPONENTS = {
  order: ModalOrder,
  unitCheck: ModalUnitChek,
  atolKassa: ModalAtolKassa,
  modulKassa: ModalModulKassa,
  eComKassa: ModalEComKassa,
  kitOnline: ModalKitOnline,
  checkOnline: ModalCheckOnline,
  digitalKassa: ModalDigitalKassa,
} as const;

type ModalId = keyof typeof MODAL_COMPONENTS;

const BoxOffice = () => {
  const { openModal, closeModal, isModalOpen } = useModalContext();

  const handleOpen = () => openModal('order');

  return (
    <>
      <div className="px-[24px] pb-5 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[20px] sm:text-[26px] xl:text-[30px]  sm:h-auto xl:h-10 font-semibold h-7  font-family: Inter text-[#071437] tracking-normal">
            Кассы
          </h1>
          <span className="text-[12px] sm:text-[12px] xl:text-[14px]">
            Описание раздела
          </span>
        </div>
        <Button className="h-8 sm:h-10 xl:h-12 w-[159px]" onClick={handleOpen}>
          Добавить кассу
        </Button>
      </div>
      <div className="box-border">
        <TableBoxOffice />
      </div>

      {(
        Object.entries(MODAL_COMPONENTS) as [
          ModalId,
          React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }>,
        ][]
      ).map(([modalId, ModalComponent]) => (
        <ModalComponent
          key={modalId}
          open={isModalOpen(modalId)}
          onOpenChange={(open) => {
            if (!open) closeModal(modalId);
          }}
        />
      ))}
    </>
  );
};

export default BoxOffice;
