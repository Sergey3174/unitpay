import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import TimePicker from './timePicker';

interface DateRangePickerInputProps {
  label?: string;
  value?: DateRange;
  icon?: React.ReactNode;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateRangePickerInput = React.forwardRef<
  HTMLDivElement,
  DateRangePickerInputProps
>(
  (
    {
      label,
      value,
      icon,
      onChange,
      placeholder = 'Выберите период',
      className,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(
      value,
    );

    const defaultStartDate = new Date();

    const handleApply = () => {
      onChange?.(tempDateRange);
      setIsOpen(false);
    };

    const handleReset = () => {
      setTempDateRange(undefined);
    };

    const formatDate = (date: Date | undefined) => {
      if (!date) return '';
      return format(date, 'dd.MM.yyyy HH:mm', { locale: ru });
    };

    const displayValue = value?.from
      ? value.to
        ? `${formatDate(tempDateRange?.from)} - ${formatDate(tempDateRange?.to)}`
        : formatDate(tempDateRange?.from)
      : placeholder;

    console.log('displayValue', displayValue);

    return (
      <div className={cn('relative w-full', className)} ref={ref}>
        {label && (
          <label className="absolute top-[-10px] left-2 px-1 bg-[#F9F9F9] text-xs text-muted-foreground z-1 select-none">
            {label}
          </label>
        )}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-between w-full border rounded-[6px] py-[8px] px-3 text-sm cursor-pointer text-left">
              <span
                className={
                  displayValue === placeholder
                    ? 'text-muted-foreground focus:outline-none focus:ring-0 focus:border-gray-300'
                    : 'text-muted-foreground focus:outline-none focus:ring-0 focus:border-gray-300'
                }
              >
                {displayValue}
              </span>
              {icon}
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-[90vw] max-w-[582px] min-w-[250px] p-0 text-[#78829D] max-sm:w-[50vw]"
            align="start"
          >
            <Calendar
              mode="range"
              defaultMonth={tempDateRange?.from || defaultStartDate}
              selected={tempDateRange}
              locale={ru}
              onSelect={setTempDateRange}
              numberOfMonths={2}
            />
            <TimePicker
              tempDateRange={tempDateRange}
              setTempDateRange={setTempDateRange}
            />
            <div className="flex items-center justify-end gap-1.5 border-t border-border p-3 flex-wrap">
              <div className="mx-auto my-0 font-medium text-[13px] leading-[14px] tracking-[-1%] font-family: Inter">
                {tempDateRange ? `${displayValue}` : ''}
              </div>
              <Button variant="outline" onClick={handleReset}>
                Отменить
              </Button>
              <Button onClick={handleApply}>Применить</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);

DateRangePickerInput.displayName = 'DateRangePickerInput';
