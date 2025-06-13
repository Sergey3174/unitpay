import React, { useState } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateSinglePickerInputProps {
  label?: string;
  value?: Date;
  icon?: React.ReactNode;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export const DateSinglePickerInput = React.forwardRef<
  HTMLDivElement,
  DateSinglePickerInputProps
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
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);

    const defaultStartDate = new Date();

    const handleApply = () => {
      onChange?.(selectedDate);
      setIsOpen(false);
    };

    const handleReset = () => {
      setSelectedDate(undefined);
    };

    const formatDate = (date: Date | undefined) => {
      if (!date) return '';
      return format(date, 'dd.MM.yyyy', { locale: ru });
    };
    const displayValue = selectedDate ? formatDate(selectedDate) : placeholder;

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
          <PopoverContent className="w-auto p-0 text-[#78829D]" align="start">
            <Calendar
              mode="single"
              defaultMonth={selectedDate || defaultStartDate}
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ru}
              numberOfMonths={1}
            />

            <div className="flex items-center justify-end gap-1.5 border-t border-border p-3">
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

DateSinglePickerInput.displayName = 'DateRangePickerInput';
