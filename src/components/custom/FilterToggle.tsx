import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterToggleProps {
  showAllFilter: boolean;
  onToggle: () => void;
}

export const FilterToggle = ({
  showAllFilter,
  onToggle,
}: FilterToggleProps) => {
  return (
    <div className="flex items-center gap-3 text-[#78829D] text-[13px] px-1">
      <span>Фильтры</span>
      <div className="border border-[#DBDFE9] w-full h-[1px]"></div>
      <span
        onClick={onToggle}
        className="flex gap-1 cursor-pointer text-[13px]"
      >
        {showAllFilter ? 'свернуть' : 'развернуть'}
        {showAllFilter ? <ChevronUp /> : <ChevronDown />}
      </span>
    </div>
  );
};
