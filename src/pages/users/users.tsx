// import { useModalContext } from '@/hooks/use-modal-context';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useModalContext } from '@/hooks/use-modal-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LabeledSelect } from '@/components/custom';
import { ModalUser } from '@/components/custom/Modals/ModalUser';
import { KeenIcon } from '@/components/keenicons';
import { TableUsers } from './components/table-users';

// import { ModalAtolKassa } from '@/components/custom/Modals/ModalAtolKassa';
// import { ModalCheckOnline } from '@/components/custom/Modals/ModalCheckOnline';
// import { ModalDigitalKassa } from '@/components/custom/Modals/ModalDigitalKassa';
// import { ModalEComKassa } from '@/components/custom/Modals/ModalEComKassa';
// import { ModalKitOnline } from '@/components/custom/Modals/ModalKitOnline';
// import { ModalModulKassa } from '@/components/custom/Modals/ModalModulKassa';
// import { ModalOrder } from '@/components/custom/Modals/ModalOrder';
// import { ModalUnitChek } from '@/components/custom/Modals/ModalUnitCheck';
// import { TableBoxOffice } from './components/tableBoxOffice';

// const MODAL_COMPONENTS = {
//   order: ModalOrder,
//   unitCheck: ModalUnitChek,
//   atolKassa: ModalAtolKassa,
//   modulKassa: ModalModulKassa,
//   eComKassa: ModalEComKassa,
//   kitOnline: ModalKitOnline,
//   checkOnline: ModalCheckOnline,
//   digitalKassa: ModalDigitalKassa,
// } as const;

// type ModalId = keyof typeof MODAL_COMPONENTS;

const Users = () => {
  //   const { openModal, closeModal, isModalOpen } = useModalContext();

  //   const handleOpen = () => openModal('order');
  const [language, setLanguage] = useState('ru');
  const { isModalOpen, closeModal, openModal } = useModalContext();
  return (
    <>
      <div className="px-[24px] pb-3 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-[20px] sm:text-[26px] xl:text-[30px] h-6 sm:h-auto font-semibold">
            Пользователи
          </h1>
          <span className="text-[12px] sm:text-[12px] xl:text-[14px]">
            Описание раздела
          </span>
        </div>
        <Button
          className="h-8 sm:h-10 xl:h-12 sm:w-[167px] xl:w-[214px]"
          onClick={() => openModal('user')}
        >
          Добавить пользователя
        </Button>
      </div>
      <div className="px-6">
        <div className="flex flex-wrap gap-6 items-center md:flex-nowrap">
          <div className="relative flex w-full md:flex-grow">
            <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Поиск"
              className="ps-9 w-full bg-transparent shadow-none h-[40px]"
            />
          </div>

          <LabeledSelect
            label="Искать по параметрам"
            value={language}
            placeholder="ФИО"
            onChange={setLanguage}
            options={[]}
            className="h-10 w-full xl:max-w-[365px]"
          />

          <div className="flex items-center gap-6 w-full md:w-auto md:basis-[88px]">
            <KeenIcon icon="question-2" className="text-[24px]" />
            <Button className="h-10 w-full md:w-auto">Искать</Button>
          </div>
        </div>
        <div className="my-4 h-[1px] w-full bg-[#DBDFE9]"></div>
        <div className="flex gap-6 flex-wrap w-full">
          <LabeledSelect
            label="Искать по параметрам"
            value={language}
            placeholder="ФИО"
            onChange={setLanguage}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
          <LabeledSelect
            label="Искать по параметрам"
            value={language}
            placeholder="ФИО"
            onChange={setLanguage}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
          <LabeledSelect
            label="Искать по параметрам"
            value={language}
            placeholder="ФИО"
            onChange={setLanguage}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
        </div>
      </div>
      <TableUsers />
      <ModalUser
        open={isModalOpen('user')}
        onOpenChange={(open) => {
          if (!open) closeModal('user');
        }}
      />
    </>
  );
};

export default Users;
