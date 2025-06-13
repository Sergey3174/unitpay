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
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
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
import { ModalSettingTable } from '@/components/custom/Modals/ModalSettingTable';
import { KeenIcon } from '@/components/keenicons';

interface IUser {
  id: number;
  status: 'Активен' | 'Приостановлен';
  full_name: string;
  telegram: string;
  email: string;
  role: 'Админ' | 'Модератор' | 'Рядовой';
  project_id: number;
  project_name: string;
}

const users: IUser[] = [
  {
    id: 1,
    status: 'Активен',
    full_name: 'Леонид Цыпкин',
    telegram: '@UserName',
    email: 'dolores.chambers@example.com',
    role: 'Админ',
    project_id: 659832,
    project_name: 'GameSport',
  },
  {
    id: 2,
    status: 'Активен',
    full_name: 'Ирина Голубова',
    telegram: '@UserName',
    email: 'willie.jennings@example.com',
    role: 'Рядовой',
    project_id: 659832,
    project_name: 'SocialVisor',
  },
  {
    id: 3,
    status: 'Активен',
    full_name: 'Федор Трунов',
    telegram: '@UserName',
    email: 'felicia.reid@example.com',
    role: 'Админ',
    project_id: 659832,
    project_name: 'EcoTrack',
  },
  {
    id: 4,
    status: 'Активен',
    full_name: 'Диана Рогулева',
    telegram: '@UserName',
    email: 'alma.lawson@example.com',
    role: 'Модератор',
    project_id: 659832,
    project_name: 'HealthSync',
  },
  {
    id: 5,
    status: 'Активен',
    full_name: 'Константин Мальцев',
    telegram: '@UserName',
    email: 'sara.cruz@example.com',
    role: 'Админ',
    project_id: 659832,
    project_name: 'TravelVista',
  },
  {
    id: 6,
    status: 'Активен',
    full_name: 'Анастасия Ермилович',
    telegram: '@UserName',
    email: 'debra.holt@example.com',
    role: 'Модератор',
    project_id: 659832,
    project_name: 'ArtConnect',
  },
  {
    id: 7,
    status: 'Приостановлен',
    full_name: 'Ольга Шевцова',
    telegram: '@UserName',
    email: 'nathan.roberts@example.com',
    role: 'Админ',
    project_id: 659832,
    project_name: 'Fit.Journey',
  },
  {
    id: 8,
    status: 'Приостановлен',
    full_name: 'Юнона Деренжер',
    telegram: '@UserName',
    email: 'debbie.baker@example.com',
    role: 'Модератор',
    project_id: 659832,
    project_name: 'FinanceGuard',
  },
  {
    id: 9,
    status: 'Приостановлен',
    full_name: 'Виктория Пальчикова',
    telegram: '@UserName',
    email: 'tim.jennings@example.com',
    role: 'Рядовой',
    project_id: 659832,
    project_name: 'MusicSphere',
  },
  {
    id: 10,
    status: 'Приостановлен',
    full_name: 'Евгения Жигунова',
    telegram: '@UserName',
    email: 'bill.sanders@example.com',
    role: 'Рядовой',
    project_id: 659832,
    project_name: 'FashionFinds',
  },
  {
    id: 11,
    status: 'Приостановлен',
    full_name: 'Петр Снежков',
    telegram: '@UserName',
    email: 'nevaeh.simmons@example.com',
    role: 'Модератор',
    project_id: 659832,
    project_name: 'PetPal',
  },
  {
    id: 12,
    status: 'Приостановлен',
    full_name: 'Тимур Золин',
    telegram: '@UserName',
    email: 'deanna.curtis@example.com',
    role: 'Модератор',
    project_id: 659832,
    project_name: 'EventSphere',
  },
];

const TableUsers = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });
  // const [language, setLanguage] = useState('ru');
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

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: 'status',
        accessorFn: (row) => row.status,
        header: ({ column }) => (
          <DataGridColumnHeader title="Статус" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex gap-2 items-center">
            <div
              className={cn(
                'w-2 h-2 rounded-full',
                row.original.status === 'Активен'
                  ? 'bg-[#04B440]'
                  : row.original.status === 'Приостановлен'
                    ? 'bg-[#DFA000]'
                    : 'bg-gray-400',
              )}
            ></div>
            <span className="leading-none hover:text-primary">
              {row.original.status}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 260,
        meta: {
          headerText: 'Статус',
          skeleton: (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-[125px]" />
              <Skeleton className="h-2.5 w-[90px]" />
            </div>
          ),
        },
      },
      {
        id: 'full_name',
        accessorFn: (row) => row.full_name,
        header: ({ column }) => (
          <DataGridColumnHeader title="ФИО" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.full_name}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 260,
        meta: {
          headerText: 'ФИО',
          skeleton: <Skeleton className="h-5 w-[60px]" />,
        },
      },
      {
        id: 'telegram',
        accessorFn: (row) => row.telegram,
        header: ({ column }) => (
          <DataGridColumnHeader title="Telegram" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <img
              className="size-4"
              src={toAbsoluteUrl('/media/customIcons/Telegram.svg')}
              alt="tg"
            />
            <span className="text-[#1B84FF]">{row.original.telegram}</span>
          </div>
        ),
        enableSorting: false,
        size: 143,
        meta: {
          headerText: 'Telegram',
          skeleton: <Skeleton className="h-5 w-[70px]" />,
        },
      },
      {
        id: 'email',
        accessorFn: (row) => row.email,
        header: ({ column }) => (
          <DataGridColumnHeader title="Email" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <KeenIcon icon="sms" />
            <span className="text-[#1B84FF]">{row.original.email}</span>
          </div>
        ),
        enableSorting: false,
        size: 280,
        meta: {
          headerText: 'Email',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'role',
        accessorFn: (row) => row.role,
        header: ({ column }) => (
          <DataGridColumnHeader title="Роль" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <span className="leading-none hover:text-primary">
              {row.original.role}
            </span>
          </div>
        ),
        enableSorting: false,
        size: 260,
        meta: {
          headerText: 'Роль',
          skeleton: <Skeleton className="h-6 w-[75px]" />,
        },
      },
      {
        id: 'project',
        accessorFn: (row) => row.project_id,
        header: ({ column }) => (
          <DataGridColumnHeader title="Проект" column={column} />
        ),
        cell: ({ row }) => (
          <div className="leading-none hover:text-primary">
            <span className="text-[#78829D]">{row.original.project_id} </span>
            <span>{row.original.project_name}</span>
          </div>
        ),
        enableSorting: true,
        size: 260,
        meta: {
          headerText: 'Проект',
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
            <KeenIcon icon="trash" className="text-[24px] text-[#D81A48]" />
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
    data: users,
    pageCount: Math.ceil((users.length || 0) / pagination.pageSize),
    getRowId: (row: IUser) => String(row.id),
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
      recordCount={users?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card className="mx-4 sm:mx-6 xl:mx-6 mt-6">
        <CardHeader className="py-5 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            <CardTitle className="flex flex-col sm:flex-row sm:items-center flex-wrap sm:flex-nowrap gap-4 sm:gap-8 grow w-full">
              <span className="">Список пользователей</span>
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

export { TableUsers };
