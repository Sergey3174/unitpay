import { useModalContext } from '@/hooks/use-modal-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface IModalProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ModalOrder({ open, onOpenChange }: IModalProfileProps) {
  const { openModal, closeModal } = useModalContext();

  const handleOpenModal = (modal: string) => {
    closeModal('order'); // Закрываем текущую модалку
    openModal(modal); // Открываем выбранную
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-8 grow w-[328px] rounded-[6px] flex flex-col gap-0 overflow-hidden "
        variant="default"
      >
        <DialogHeader className="p-0 border-0 mb-4">
          <DialogTitle className="text-right">
            <div className="flex items-center justify-between flex-wrap grow gap-5">
              <div className="flex flex-col justify-center gap-2">
                <h1 className="text-xl font-semibold leading-none text-mono">
                  Выберите кассу
                </h1>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 box-border">
          <div className="h-[1.5px] bg-[#F1F1F4] w-full"></div>
          <Button className="h-10" onClick={() => handleOpenModal('unitCheck')}>
            Юнит.Чеки
          </Button>
          <Button className="h-10" onClick={() => handleOpenModal('atolKassa')}>
            Атол Онлайн
          </Button>
          <Button
            className="h-10"
            onClick={() => handleOpenModal('modulKassa')}
          >
            МодульКасса
          </Button>
          <Button className="h-10" onClick={() => handleOpenModal('eComKassa')}>
            E-COM касса
          </Button>
          <Button className="h-10" onClick={() => handleOpenModal('kitOnline')}>
            Kit Online
          </Button>
          <Button
            className="h-10"
            onClick={() => handleOpenModal('checkOnline')}
          >
            Чек Онлайн
          </Button>
          <Button
            className="h-10"
            onClick={() => handleOpenModal('digitalKassa')}
          >
            Digitalkassa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
