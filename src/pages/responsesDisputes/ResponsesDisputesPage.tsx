import { useState } from 'react';
import { Search } from 'lucide-react';
import { DateSinglePickerInput } from '@/components/custom/DateSinglePickerInput';
import { Collapsible, FilterToggle, Input } from '@/components/custom/index';
import { LabeledSelect } from '@/components/custom/LabeledSelect';
import { KeenIcon } from '@/components/keenicons';
import { StoreClients } from './disputes-table/components/index';

const ResponsesDisputesPage = () => {
  const [language, setLanguage] = useState('ru');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [valueSearch, setValueSearch] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full p-[32px] pt-1 max-sm:p-[17px]">
      <div className="w-[100%]">
        <div className="flex flex-col w-[100%] pb-[24px]">
          <h1 className="font-semibold text-3xl leading-[30px] tracking-[-2%] align-middle font-family: Inter text-[#071437] mb-[8px]">
            Ответы на диспуты
          </h1>
          <p className="font-normal text-sm leading-[14px] tracking-[0%] align-middle font-family: Inter text-[#4B5675]">
            описание раздела
          </p>
        </div>
        <FilterToggle
          showAllFilter={isOpen}
          onToggle={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Collapsible isOpen={isOpen}>
          <div className="flex flex-wrap gap-[24px] mb-[32px] pt-4 max-sm:flex-col">
            <LabeledSelect
              label="Банк"
              value={language}
              placeholder="Дням"
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />

            <LabeledSelect
              label="Юр. лицо"
              value={language}
              placeholder="Все"
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />

            <LabeledSelect
              label="Проект"
              value={language}
              placeholder="GameSport"
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />

            <div className="w-[376px] h-[42px] max-sm:w-[90vw]">
              <DateSinglePickerInput
                label="Дата и время"
                value={selectedDate}
                icon={<KeenIcon icon="calendar" />}
                onChange={setSelectedDate}
                placeholder="Выберите дату и время"
              />
            </div>

            {/* <Input
              label="Дата"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              icon={<KeenIcon icon="calendar" />}
              className="w-[350px] h-[42px] max-sm:w-[90vw]"
            /> */}

            <LabeledSelect
              label="Метод оплаты"
              value={language}
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />
            <LabeledSelect
              label="МПС"
              value={language}
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />
            <LabeledSelect
              label="Тип диспута"
              value={language}
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />
            <Input
              label="Поиск"
              type="text"
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              icon={
                <Search className="absolute left-[-3px] size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
              }
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />

            <LabeledSelect
              label="Статус"
              value={language}
              onChange={setLanguage}
              options={[]}
              className="w-[376px] h-[42px] max-sm:w-[90vw]"
            />

            {/* <button className="bg-white text-blue-500 border border-blue-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 px-4 py-2 rounded-md transition duration-300 ease-in-out">
              Выгрузить
            </button> */}
          </div>
        </Collapsible>
        <div>
          <StoreClients />
        </div>
      </div>
    </div>
  );
};

export default ResponsesDisputesPage;
