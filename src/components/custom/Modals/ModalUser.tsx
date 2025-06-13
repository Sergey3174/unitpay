import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../Input';
import { LabeledSelect } from '../LabeledSelect';
import MultiSelect from '../multiSelect';

interface IModalProfileProps {
  open: boolean;
  onOpenChange: (a: boolean) => void;
}

export function ModalUser({ open, onOpenChange }: IModalProfileProps) {
  const [language, setLanguage] = useState('ru');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[640px] p-0 grow rounded-[6px] flex flex-col gap-0 max-h-[100vh] "
        variant="default"
      >
        <DialogHeader className="p-0 border-0 mb-0">
          <DialogTitle className="px-4 py-3 h-12 flex items-center text-[16px] border-b-1">
            Добавить пользователя
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-4">
          <Input label="ФИО" className="w-full max-w-full" />
          <LabeledSelect
            label="Роль (выберите или введите самостоятельно)"
            value={language}
            onChange={setLanguage}
            options={[
              {
                label: 'RU',
                value: 'ru',
              },
              {
                label: 'EN',
                value: 'en',
              },
              {
                label: 'DE',
                value: 'de',
              },
            ]}
            className="w-full"
          />

          <LabeledSelect
            label="Доступ к разделам"
            value={language}
            onChange={setLanguage}
            options={[]}
            className="w-full"
          />
          <LabeledSelect
            label="Доступ к проектам"
            value={language}
            onChange={setLanguage}
            options={[]}
            className="w-full"
          />

          <MultiSelect />

          <div className="flex flex-wrap gap-4">
            <Button
              variant="secondary"
              className="w-full grow basis-[200px] h-10 bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 px-4 py-2 rounded-md transition duration-300 ease-in-out"
              onClick={() => onOpenChange(!open)}
            >
              Отменить
            </Button>
            <Button className="w-full h-10 grow basis-[200px]">
              Подключить Юнит.Чеки
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
