import { useState } from 'react';
import { FilterToggle, LabeledSelect } from '@/components/custom';
import { DateSinglePickerInput } from '@/components/custom/DateSinglePickerInput';
import { KeenIcon } from '@/components/keenicons';
import DisputeChart from './components/DisputeChart';
import DisputeTable from './components/DisputeTable';

const Disputes = () => {
  const [showAllFilter, setShowAllFilter] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());


  return (
    <div className="2xl:px-[32px] md:px-[24px] px-[16px] flex flex-col gap-y-[24px]">
      <div className="flex justify-between items-center gap-x-[40px] gap-y-[16px] sm:flex-nowrap flex-wrap">
        <div className="flex flex-col shrink-0">
          <h1 className="2xl:text-[30px] xl:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold leading-[33px] text-[#071437]">
            Диспуты
          </h1>
          <span className="text-[12px] sm:text-[12px] xl:text-[14px]">
            Описание раздела
          </span>
        </div>
        <div className="flex gap-[16px] w-full sm:justify-end justify-start sm:flex-nowrap flex-wrap">
          <LabeledSelect
            label="Юр.лицо"
            value={'Все'}
            options={[]}
            className="max-w-[507px] min-w-[210px] w-full"
          />
          <LabeledSelect
            label="Проект"
            value={'Все'}
            options={[]}
            className="max-w-[507px] min-w-[210px] w-full"
          />
        </div>
      </div>
      <FilterToggle
        showAllFilter={showAllFilter}
        onToggle={() => setShowAllFilter((prev) => !prev)}
      />
      {showAllFilter && (
        <div className='flex gap-x-[24px] gap-y-[16px] xl:flex-nowrap flex-wrap w-full'>
          <div className='h-10 w-full grow-1 basis-[200px]'>
            <DateSinglePickerInput
              label="Период"
              value={selectedDate}
              icon={<KeenIcon icon="calendar" />}
              onChange={()=> setSelectedDate}
              placeholder="Выберите дату и время"
            />
          </div>
          <LabeledSelect
            label="Тип отображения"
            value={'Все'}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
          <LabeledSelect
            label="Платёжная система"
            value={'Все'}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
          <LabeledSelect
            label="Банк плательщика"
            value={'Все'}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
          <LabeledSelect
            label="Платёжный метод"
            value={'Все'}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
          <LabeledSelect
            label="Тип диспута"
            value={'Все'}
            options={[]}
            className="h-10 w-full grow-1 basis-[200px]"
          />
        </div>
      )}
      <DisputeChart />
      <DisputeTable />
    </div>
  );
};

export default Disputes;
