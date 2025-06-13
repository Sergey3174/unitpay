// import * as Select from '@radix-ui/react-select';
// import { Check, ChevronDown } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';

// interface Option {
//   label: string;
//   value: string;
// }

interface LabeledSelectProps {
  label: string;
  // value: string;
  // onChange?: (value: string) => void;
  // options: Option[];
  className?: string;
}

export function InfoManager({
  label,
  // value,
  // onChange,
  // options,
  className,
}: LabeledSelectProps) {
  return (
    <div className="border-1 rounded-[6px] h-[38px] w-[300px]">
      <div
        className={cn(
          'relative w-[300px] h-9 flex items-center pr-3 pl-3 justify-between',
          className,
        )}
      >
        <span className="absolute -top-[9px] left-2 px-1 bg-background text-xs text-muted-foreground z-10 select-none">
          {label}
        </span>
        <div className="flex items-center gap-1 w-full">
          <img
            className="size-9 rounded-full border-2 border-green-500 shrink-0 cursor-pointer w-6 h-6 z-20"
            src={toAbsoluteUrl('/media/avatars/300-2.png')}
            alt="User Avatar"
          />
          <div className="grow text-[#99A1B7]">
            <span className="text-sm leading-[14px] font-normal">Алина </span>
            <span className="font-inter font-normal text-[10px] leading-[10px] tracking-[-0.03em]">
              (9:00 — 18:00)
            </span>
          </div>
          <img src={toAbsoluteUrl('/media/app/email.svg')} />
          <img src={toAbsoluteUrl('/media/app/tel.svg')} />
          <img src={toAbsoluteUrl('/media/app/tg.svg')} />
        </div>
      </div>
    </div>
  );
}
