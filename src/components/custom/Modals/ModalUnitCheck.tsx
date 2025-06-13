import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '../../ui/button';
import { Input } from '../Input';
import { LabeledSelect } from '../LabeledSelect';
import { ModalAlert } from './components/ModalAlert';

interface IModalProfileProps {
  open: boolean;
  onOpenChange: (a: boolean) => void;
}

export function ModalUnitChek({ open, onOpenChange }: IModalProfileProps) {
  const [language, setLanguage] = useState('ru');
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full max-w-[640px] p-0 grow rounded-[6px] flex flex-col gap-0 overflow-hidden max-h-[100vh] overflow-y-auto"
        variant="default"
      >
        <DialogHeader className="p-0 border-0 mb-0">
          <DialogTitle className="px-4 py-3 h-12 flex items-center text-[16px] border-b-1">
            Добавить Юнит.Чеки
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 flex flex-col gap-6">
          <div className="w-full flex flex-col gap-1 text-[12px] text-[#78829D] leading-none	">
            Касса будет автоматически создана и интегрирована с вашими
            проектами.
          </div>
          <Input label="Название кассы" className="w-full max-w-full" />

          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-6 flex-wrap">
              <LabeledSelect
                label="Тип налогообложения"
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
                className="grow basis-[200px]"
              />
              <LabeledSelect
                label="Ставка НДС (по умолчанию)"
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
                className="grow basis-[200px]"
              />
            </div>
            <div className="text-[12px] text-[#78829D] leading-none">
              Если при формировании платежа будут передаваться данные ставки
              НДС, то они будут в чеке, иначе ставка “по умолчанию”, подробности
              по ссылке
            </div>
          </div>

          <div className="w-full bg-[#F9F9F9] rounded-[6px] flex flex-col border-1 p-4 gap-4">
            <div className="w-full flex gap-4 flex-wrap">
              {' '}
              <LabeledSelect
                label="Способ расчета"
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
                className="bg-[#FCFCFC] grow basis-[200px]"
              />
              <LabeledSelect
                label="Тип позиции"
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
                className="grow basis-[200px] bg-[#FCFCFC] "
              />
            </div>
            <div className="w-full flex gap-4 flex-wrap">
              <Input
                label="Телефон"
                className="grow basis-[200px] bg-[#FCFCFC]"
              />
              <Input
                label="Email"
                className="grow basis-[200px] bg-[#FCFCFC]"
              />
            </div>
            <ModalAlert type="yellow">
              Обратите внимание, данные, указанные в этих графах, будут
              отобржаться в чеке.
            </ModalAlert>
          </div>
          <ModalAlert>
            <span>
              Важно: чтобы касса смогла сформировать чек, требуется передать
              несколько параметров при создании поля. Если онлайн-касса
              подключена, а необходимые параметры не переданы, все платежи будут
              ошибочны. Подробнее тут
            </span>
          </ModalAlert>
          <div className="flex gap-2 items-center">
            <Checkbox defaultChecked />
            <span className="text-[12px] text-[#071437]">
              Ознакомился и согласен с условиями агентского договора
              “Юнит.Чекам”
            </span>
            <KeenIcon
              icon="exit-right-corner"
              className="text-[#1B84FF] text-[16px]"
            />
          </div>
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
