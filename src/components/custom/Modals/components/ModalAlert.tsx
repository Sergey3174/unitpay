import { KeenIcon } from '@/components/keenicons';

interface IModalAlertProps {
  children: React.ReactNode;
  type?: string;
}

export function ModalAlert({ children, type }: IModalAlertProps) {
  return (
    <div
      className={`w-full ${type === 'yellow' ? 'bg-[#FFFFFF]' : 'bg-[#F8F5FF]'} rounded-md py-3 px-4 flex gap-2.5 items-center`}
    >
      <KeenIcon
        icon="information-1"
        className={`text-[20px] ${type === 'yellow' ? 'text-[#DFA000]' : 'text-[#5014D0]'}`}
      />
      <div className="text-[12px] text-[#071437] leading-none">{children}</div>
    </div>
  );
}
