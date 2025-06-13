'use client';

import { useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useModalContext } from '@/hooks/use-modal-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTable,
  CardTitle,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { LabeledSelect } from '@/components/custom/LabeledSelect';
import { ModalSettingTable } from '@/components/custom/Modals/ModalSettingTable';
import { KeenIcon } from '@/components/keenicons';

interface ICashRegister {
  id: number;
  legal_entity: string;
  project: string;
  taxation_type: string;
  kkt_id: string;
  receipt_balance: string;
  issue_date: string;
  position_type: string;
}

const cashRegisters: ICashRegister[] = [
  {
    id: 1,
    legal_entity: 'ООО «ГеймСпорт»',
    project: 'GameSport',
    taxation_type: 'Упрощённый',
    kkt_id: '2356987412',
    receipt_balance: '2356987412',
    issue_date: '12.12.2025 — 16:45',
    position_type: 'Товар',
  },
  {
    id: 2,
    legal_entity: 'ООО «СоцмирВизор»',
    project: 'SocialVisor',
    taxation_type: 'Упрощённый',
    kkt_id: '457812366',
    receipt_balance: '457812366',
    issue_date: '03.12.2025 — 17:45',
    position_type: 'Товар',
  },
  {
    id: 3,
    legal_entity: 'ЗАО «ЭкоТехнологии»',
    project: 'EcoTrack',
    taxation_type: 'Упрощённый',
    kkt_id: '7893456123',
    receipt_balance: '7893456123',
    issue_date: '12.12.2025 — 14:30',
    position_type: 'Товар',
  },
  {
    id: 4,
    legal_entity: 'ИП «Светлана Петрова»',
    project: 'HealthSync',
    taxation_type: 'Упрощённый',
    kkt_id: '1234567890',
    receipt_balance: '1234567890',
    issue_date: '23.12.2025 — 12:30',
    position_type: 'Работа',
  },
  {
    id: 5,
    legal_entity: 'ЗАО «Медицинские Решения»',
    project: 'TravelVista',
    taxation_type: 'Упрощённый',
    kkt_id: '2345678901',
    receipt_balance: '2345678901',
    issue_date: '30.12.2025 — 21:00',
    position_type: 'Работа',
  },
  {
    id: 6,
    legal_entity: 'ООО «ФинансГрупп»',
    project: 'ArtConnect',
    taxation_type: 'Упрощённый',
    kkt_id: '3456789012',
    receipt_balance: '3456789012',
    issue_date: '03.01.2026 — 08:00',
    position_type: 'Работа',
  },
  {
    id: 7,
    legal_entity: 'ООО «КиберНет»',
    project: 'Fit.Journey',
    taxation_type: 'Упрощённый',
    kkt_id: '4567890123',
    receipt_balance: '4567890123',
    issue_date: '12.01.2026 — 19:00',
    position_type: 'Услуга',
  },
  {
    id: 8,
    legal_entity: 'ИП «Николай Сидоров»',
    project: 'FinanceGuard',
    taxation_type: 'Упрощённый',
    kkt_id: '5678901234',
    receipt_balance: '5678901234',
    issue_date: '15.01.2026 — 09:15',
    position_type: 'Услуга',
  },
  {
    id: 9,
    legal_entity: 'ООО «АвтоПартнёр»',
    project: 'MusicSphere',
    taxation_type: 'Упрощённый',
    kkt_id: '6789012345',
    receipt_balance: '6789012345',
    issue_date: '26.01.2026 — 09:30',
    position_type: 'Услуга',
  },
  {
    id: 10,
    legal_entity: 'ЗАО «ЭнергетикСервис»',
    project: 'FashionFinds',
    taxation_type: 'Упрощённый',
    kkt_id: '7890123456',
    receipt_balance: '7890123456',
    issue_date: '02.02.2026 — 10:30',
    position_type: 'Платёж',
  },
  {
    id: 11,
    legal_entity: 'ИП «Анна Кузнецова»',
    project: 'PetPal',
    taxation_type: 'Упрощённый',
    kkt_id: '8901234567',
    receipt_balance: '8901234567',
    issue_date: '09.02.2026 — 11:50',
    position_type: 'Платёж',
  },
  {
    id: 12,
    legal_entity: 'ЗАО «Медицинские Решения»',
    project: 'EventSphere',
    taxation_type: 'Упрощённый',
    kkt_id: '9012345678',
    receipt_balance: '9012345678',
    issue_date: '16.02.2026 — 12:15',
    position_type: 'Платёж',
  },
];

const TableBoxOffice = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  const [language, setLanguage] = useState('ru');
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'updated_at', desc: true },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { isModalOpen, closeModal, openModal } = useModalContext();
  // const [searchQuery, setSearchQuery] = useState('');

  // const filteredData = useMemo(() => {
  //   if (!searchQuery) return cashRegisters;
  //   return cashRegisters.filter(
  //     (item) =>
  //       item.legal_entity.toLowerCase().includes(searchQuery.toLowerCase()),
  //     // item.description.toLowerCase().includes(searchQuery.toLowerCase()),
  //   );
  // }, [searchQuery]);

  const columns = useMemo<ColumnDef<ICashRegister>[]>(
    () => [
      {
        id: 'legal_entity',
        accessorFn: (row) => row.legal_entity,
        header: ({ column }) => (
          <DataGridColumnHeader title="Юр.лицо" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.legal_entity}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 365,
        meta: {
          headerText: 'Юр.лицо',
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
              <Skeleton className="h-2.5 w-[90px]" />
            </div>
          ),
        },
      },
      {
        id: 'project',
        accessorFn: (row) => row.project,
        header: ({ column }) => (
          <DataGridColumnHeader title="Проект" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.project}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 365,
        meta: {
          headerText: 'Проект',
          skeleton: <Skeleton className="h-5 w-[60px]" />,
        },
      },
      {
        id: 'taxation_type',
        accessorFn: (row) => row.taxation_type,
        header: ({ column }) => (
          <DataGridColumnHeader title="Тип налогооблажения" column={column} />
        ),
        cell: ({ row }) => row.original.taxation_type,
        enableSorting: false,
        size: 182,
        meta: {
          headerText: 'Тип налогооблажения',
          skeleton: <Skeleton className="h-5 w-[70px]" />,
        },
      },
      {
        id: 'kkt_id',
        accessorFn: (row) => row.kkt_id,
        header: ({ column }) => (
          <DataGridColumnHeader title="ID ИККТ" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.kkt_id}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 125,
        meta: {
          headerText: 'ID ИККТ',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'receipt_balance',
        accessorFn: (row) => row.receipt_balance,
        header: ({ column }) => (
          <DataGridColumnHeader title="Остаток чеков" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.receipt_balance}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 133,
        meta: {
          headerText: 'Остаток чеков',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'issue_date',
        accessorFn: (row) => row.issue_date,
        header: ({ column }) => (
          <DataGridColumnHeader title="Дата выдачи" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.issue_date}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 175,
        meta: {
          headerText: 'Дата выдачи',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'position_type',
        accessorFn: (row) => row.position_type,
        header: ({ column }) => (
          <DataGridColumnHeader title="Тип позиции" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none  hover:text-primary">
              {row.original.position_type}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 120,
        meta: {
          headerText: 'Тип позиции',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'setting',

        header: ({ column }) => (
          <DataGridColumnHeader title="Настройки" column={column} />
        ),
        cell: () => (
          <div className="flex gap-5 items-center justify-center pt-[2.5px] pb-[2.5px]">
            <KeenIcon
              icon="shield-cross"
              className="text-[24px] text-[#F6B100]"
            />
            <KeenIcon icon="setting-2" className="text-[24px] text-[#1B84FF]" />
          </div>
        ),
        enableSorting: false,
        size: 110,
        meta: {
          headerText: 'Настройки',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: cashRegisters,
    pageCount: Math.ceil((cashRegisters?.length || 0) / pagination.pageSize),
    getRowId: (row: ICashRegister) => String(row.id),
    state: {
      pagination,
      sorting,
      rowSelection,
    },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <DataGrid
      table={table}
      recordCount={cashRegisters?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card className="mx-4 sm:mx-6 xl:mx-6">
        <CardHeader className="py-5 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center flex-wrap sm:flex-nowrap gap-4 sm:gap-8 grow w-full">
              <span className="font-bold tracking-normal">
                Существующие кассы
              </span>
              <LabeledSelect
                label="Юр. лицо"
                value={language}
                onChange={setLanguage}
                options={[
                  { label: 'Game Sport', value: 'ru' },
                  { label: 'EN', value: 'en' },
                  { label: 'DE', value: 'de' },
                ]}
                className="w-full sm:min-w-[212px] sm:max-w-[338px]"
              />
            </CardTitle>

            <CardToolbar className="w-full min-w-[187px] sm:w-auto">
              <Button
                variant="outline"
                className="h-10 w-full xl:w-full sm:w-auto"
                onClick={() => openModal('setting')}
              >
                <KeenIcon icon="setting-2" className="text-[16px]" />
                Настройка таблицы
              </Button>
            </CardToolbar>
          </div>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        <CardFooter>
          <DataGridPagination />
        </CardFooter>
      </Card>
      <ModalSettingTable
        open={isModalOpen('setting')}
        onOpenChange={(open) => {
          if (!open) closeModal('setting');
        }}
        columns={table.getAllColumns()} // передаём все колонки
      />
    </DataGrid>
  );
};

export { TableBoxOffice };
