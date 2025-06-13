import { useEffect, useState } from 'react';
import { Column } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface ColumnMeta {
  headerText?: string;
}

interface IModalProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  columns: Column<any, unknown, ColumnMeta>[];
}

export function ModalSettingTable({
  open,
  onOpenChange,
  columns,
}: IModalProfileProps) {
  const [visibilityState, setVisibilityState] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    if (open) {
      const initialState = Object.fromEntries(
        columns
          .filter((col) => col.getCanHide())
          .map((col) => [col.id, col.getIsVisible()]),
      );
      setVisibilityState(initialState);
    }
  }, [open, columns]);

  const toggleColumn = (id: string, value: boolean) => {
    setVisibilityState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const toggleAll = (value: boolean) => {
    const updatedState = Object.fromEntries(
      columns.filter((col) => col.getCanHide()).map((col) => [col.id, value]),
    );
    setVisibilityState(updatedState);
  };

  const handleSave = () => {
    for (const col of columns) {
      if (col.getCanHide()) {
        col.toggleVisibility(visibilityState[col.id]);
      }
    }
    onOpenChange(false);
  };

  const allVisible = Object.values(visibilityState).every(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-8 w-full max-w-[438px] rounded-[6px] flex flex-col gap-0 overflow-hidden">
        <DialogHeader className="p-0 border-0 mb-4">
          <DialogTitle>
            <div className="flex items-center justify-between flex-wrap gap-5">
              <h1 className="text-[16px] font-semibold leading-none text-mono">
                Настройка отображения полей
              </h1>
              <div className="flex gap-2 items-center justify-between">
                <span className="text-[14px] text-[#071437]">Все</span>
                <Switch
                  checked={allVisible}
                  onCheckedChange={(val) => toggleAll(val)}
                  className="w-[34px] h-[22px] rounded-[30px]"
                />
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          {columns
            .filter((column) => column.getCanHide())
            .map((column) => (
              <div
                key={column.id}
                className="flex items-center justify-between py-4 border-t-1"
              >
                <span className="text-[14px] text-[#071437]">
                  {column.columnDef.meta?.headerText || column.id}
                </span>
                <Switch
                  checked={visibilityState[column.id] ?? true}
                  onCheckedChange={(val) => toggleColumn(column.id, val)}
                  className="w-[34px] h-[22px] rounded-[30px]"
                />
              </div>
            ))}
        </div>

        <Button onClick={handleSave} className="h-10">
          Сохранить
        </Button>
      </DialogContent>
    </Dialog>
  );
}
