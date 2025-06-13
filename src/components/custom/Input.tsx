import React from 'react';
import { cn } from '@/lib/utils';

type InputType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'search'
  | 'tel'
  | 'url'
  | 'date';

interface InputProps {
  label?: string;
  type?: InputType;
  icon?: React.ReactNode;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      icon,
      value,
      onChange,
      placeholder = '',
      className,
      required = false,
      disabled = false,
    },
    ref,
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const combinedRef = (instance: HTMLInputElement | null) => {
      if (typeof ref === 'function') {
        ref(instance);
      } else if (ref) {
        ref.current = instance;
      }
      inputRef.current = instance;
    };

    const handleIconClick = () => {
      console.info('open date picker');
      if (type === 'date') {
        console.info('open date picker');
        inputRef.current?.showPicker();
      }
    };
    return (
      <div className={cn('relative w-full', className)}>
        {label && (
          <label className="absolute top-[-10px] left-2 px-1 bg-background:transparent text-xs text-muted-foreground z-10 select-none">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={combinedRef}
            type={type}
            value={value ?? ''}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={cn(
              'w-full h-[38px] border rounded-[6px] px-3 text-sm',
              'text-muted-foreground',
              'focus:outline-none focus:ring-0 focus:border-gray-300',
              {
                'hide-date-icon': type === 'date',
              },
              className,
            )}
          />

          {icon && (
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pl-3 text-muted-foreground z-10 select-none"
              onClick={() => handleIconClick()}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
// className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pl-3 text-muted-foreground z-10 select-none"

//  className="absolute left-[260px] inset-y-0 left-0 flex items-center pl-3 text-muted-foreground z-10 select-none"
