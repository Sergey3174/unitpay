import { useState } from 'react';
import { useModalContext } from '@/hooks/use-modal-context';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import InfoOperation from './InfoOperation';
import HistoryOperation from './HistoryOperation';
import HistoryClient from './HistoryClient';

interface ModalTransactionProps {
  open: boolean;
  onOpenChange: (a: boolean) => void;
}

type ActivePageType = 'operation' | 'history' | 'client';

const ModalTransaction = ({ open, onOpenChange }: ModalTransactionProps) => {
  const [activePage, setActivePage] = useState<ActivePageType>('operation');
  const { selectedRowData } = useModalContext();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[1060px] p-0 grow rounded-[6px] flex flex-col gap-0 overflow-hidden max-h-[100vh] overflow-y-auto"
        variant="default"
      >
        <DialogHeader className="p-0 border-0 mb-0">
          <DialogTitle className="px-4 py-[16px] flex items-center justify-between text-[16px] border-b-1 flex-wrap gap-y-[16px]">
            Карточка транзакции — {selectedRowData?.id}
            <div className="flex gap-1 p-[3px] items-center rounded-lg border-1 border-[#F1F1F4] lg:mr-[98px] xl:w-[458px] w-full sm:flex-nowrap flex-wrap">
              <Button
                onClick={() => setActivePage('operation')}
                variant={activePage === 'operation' ? 'primary' : 'foreground'}
                className='w-full'
              >
                Информация об операции
              </Button>
              <Button
                onClick={() => setActivePage('history')}
                variant={activePage === 'history' ? 'primary' : 'foreground'}
                className='w-full'
              >
                История операции
              </Button>
              <Button
                onClick={() => setActivePage('client')}
                variant={activePage === 'client' ? 'primary' : 'foreground'}
                className='w-full'
              >
                История клиента
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        {activePage === 'operation' ? <InfoOperation /> : activePage === 'history' ? <HistoryOperation /> : <HistoryClient />}
      </DialogContent>
    </Dialog>
  );
};

export default ModalTransaction;
