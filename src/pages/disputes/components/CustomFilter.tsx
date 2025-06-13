import { ArrowDown, ArrowUp, ChevronsUpDown, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Column } from '@tanstack/react-table';

interface SortableHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
}

function CustomFilter<TData, TValue>({ column, title }: SortableHeaderProps<TData, TValue>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="data-[state=open]:bg-accent gap-[4px]"
        >
          <span className='text-[#4B5675] font-normal'>{title}</span>
          {column.getIsSorted() === 'desc' ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronsUpDown className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem
          onClick={() => column.toggleSorting(false)}
          className="flex items-center"
        >
          <ArrowUp className="mr-2 h-3.5 w-3.5" />
          По возрастанию
          {column.getIsSorted() === 'asc' && (
            <Check className="ml-auto h-4 w-4" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => column.toggleSorting(true)}
          className="flex items-center"
        >
          <ArrowDown className="mr-2 h-3.5 w-3.5" />
          По убыванию
          {column.getIsSorted() === 'desc' && (
            <Check className="ml-auto h-4 w-4" />
          )}
        </DropdownMenuItem>
        {column.getIsSorted() && (
          <DropdownMenuItem
            onClick={() => column.clearSorting()}
            className="flex items-center"
          >
            <span className="mr-7">Сбросить</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export {CustomFilter};