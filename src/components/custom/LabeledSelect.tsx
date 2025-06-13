import { useLayoutEffect, useRef, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface LabeledSelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: Option[];
  placeholder?: string;
  className?: string;
}

export function LabeledSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
}: LabeledSelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [triggerRef.current, value, options]);

  if (!options) return null;
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <div className={cn('relative w-[120px] h-[38px]', className)}>
        <span className={`absolute -top-2 left-2 px-1 text-xs text-muted-foreground select-none ${label === "Баланс" && "max-sm:hidden"}`}>
          {label}
        </span>

        <Select.Trigger
          ref={triggerRef}
          className={cn(
            'w-full h-full border rounded-[6px] px-3 text-sm flex items-center justify-between text-muted-foreground',
            'hover:text-foreground focus:outline-none focus:ring-0 focus:border-gray-300',
          )}
          aria-label={label}
        >
          <Select.Value asChild>
            {selectedOption ? (
              <div className="flex items-center gap-2">
                {selectedOption.icon && (
                  <img
                    src={toAbsoluteUrl(selectedOption.icon)}
                    alt={selectedOption.label}
                    className="h-4 w-4 rounded-full object-cover"
                  />
                )}
                {selectedOption.label}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </Select.Value>
          <Select.Icon>
            <ChevronDown className="h-4 w-4" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            side="bottom"
            align="start"
            position="popper"
            className="z-50 bg-background border rounded shadow p-1 text-sm"
            style={{
              width: triggerWidth ? `${triggerWidth}px` : undefined,
            }}
          >
            <Select.Viewport>
              {options.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'px-3 py-2 flex items-center justify-between cursor-pointer rounded',
                    'data-[highlighted]:bg-muted data-[highlighted]:text-foreground',
                    'focus:outline-none',
                  )}
                >
                  <Select.ItemText>
                    <div className="flex items-center gap-2">
                      {opt.icon && (
                        <img
                          src={opt.icon}
                          alt={opt.label}
                          className="h-4 w-5 rounded-sm"
                        />
                      )}
                      {opt.label}
                    </div>
                  </Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="h-4 w-4 text-primary" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </div>
    </Select.Root>
  );
}
