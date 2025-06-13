'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from '@tanstack/react-table';
import { useModalContext } from '@/hooks/use-modal-context';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardHeading, CardTable } from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ModalSettingTable } from '@/components/custom/Modals/ModalSettingTable';
import { KeenIcon } from '@/components/keenicons';
import ModalTransaction from './TransactionsModal/ModalTransaction';


interface IData {
  id: string;
  date: string;
  type: string;
  paymentMethod: string;
  amount: string;
  status: string;
}

const data: IData[] = [
  {
    id: '1165462981665564',
    date: '16.12.2025 — 16:48',
    type: 'Оплата',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '4 500 ₽',
    status: 'Успешно',
  },
  {
    id: '5151916448781481',
    date: '16.12.2025 — 16:52',
    type: 'Чарджбек',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '3 200 ₽',
    status: 'Ошибка 322',
  },
  {
    id: '8302018475600142',
    date: '16.12.2025 — 16:55',
    type: 'Возврат',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '5 600 ₽',
    status: 'Чарджбек принят',
  },
  {
    id: '7481623940821357',
    date: '16.12.2025 — 16:59',
    type: 'Оплата',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '2 300 ₽',
    status: 'Чарджбек оспорен',
  },
  {
    id: '5627384916249753',
    date: '16.12.2025 — 17:03',
    type: 'Оплата',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '1 150 ₽',
    status: 'Чарджбек проигран',
  },
  {
    id: '2038475919283746',
    date: '16.12.2025 — 17:07',
    type: 'Оплата',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '6 750 ₽',
    status: 'Возврат',
  },
  {
    id: '3948571264892537',
    date: '16.12.2025 — 17:11',
    type: 'Оплата',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '7 850 ₽',
    status: 'Частичный возврат',
  },
  {
    id: '1827364950182736',
    date: '16.12.2025 — 17:15',
    type: 'Оплата',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '8 400 ₽',
    status: 'Заморожен',
  },
];

const TransactionTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'user', desc: false },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const { openModal, closeModal, isModalOpen, setSelectedRowData } = useModalContext();

  const handleOpen = (id: string) => {
    const rowData = data.find(item => item.id === id);
    openModal("ModalTransaction");
    setSelectedRowData(rowData);
  } 

  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by activity
    if (selectedActivities.length > 0) {
      filtered = filtered.filter((item) =>
        selectedActivities.includes(item.amount),
      );
    }

    // Filter by search query (case-insensitive)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.id.toLowerCase().includes(searchLower) ||
          item.date.toLowerCase().includes(searchLower) ||
          item.type.toLowerCase().includes(searchLower) ||
          item.paymentMethod.toLowerCase().includes(searchLower) ||
          item.status.toLowerCase().includes(searchLower) ||
          item.amount.toLowerCase().includes(searchLower),
      );
    }

    // Apply sorting based on sortOrder
    if (sortOrder === 'latest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime(),
      );
    } else if (sortOrder === 'older') {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.id).getTime() - new Date(b.id).getTime(),
      );
    } else if (sortOrder === 'oldest') {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.id).getTime() - new Date(b.id).getTime(),
      );
    }

    return filtered;
  }, [searchQuery, selectedActivities, sortOrder]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Успешно':
        return '#04B440';
      case 'Ошибка 322':
        return '#DFA000';
      case 'Чарджбек принят':
        return '#5014D0';
      case 'Чарджбек оспорен':
        return '#04B440';
      case 'Чарджбек проигран':
        return '#D81A48';
      case 'Возврат':
        return '#D81A48';
      case 'Заморожен':
        return '#056EE9';
      default:
        return '#DFA000';
    }
  };

  const columns = useMemo<ColumnDef<IData>[]>(
    () => [
      {
        id: 'id',
        accessorFn: (row) => row.id,
        header: ({ column }) => (
          <DataGridColumnHeader title="ID транзакции" column={column} />
        ),
        cell: ({ row }) => (
          <Button onClick={() => handleOpen(row.original.id)} mode={'link'} className="font-normal text-[14px]">
            {row.original.id}
          </Button>
        ),
        enableSorting: false,
        size: 140,
        meta: {
          headerText: "ID транзакции",
          skeleton: <Skeleton className="h-5 w-[60px]" />,
        },
      },
      {
        id: 'date',
        accessorFn: (row) => row.date,
        header: ({ column }) => (
          <DataGridColumnHeader title="Дата" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal text-[14px]">
            {row.original.date}
          </span>
        ),
        enableSorting: true,
        size: 120,
        meta: {
          headerText: "Дата",
        }
        // className: 'flex items-center gap-2.5',
      },
      {
        id: 'type',
        accessorFn: (row) => row.type,
        header: ({ column }) => (
          <DataGridColumnHeader title="Тип" column={column} />
        ),
        cell: ({ row }) => (
          <div className="text-foreground font-normal flex justify-between">
            <span className="text-[14px]">{row.original.type}</span>
            <span className="ki-filled ki-cheque text-[18px] text-[#1B84FF]"></span>
          </div>
        ),
        enableSorting: false,
        size: 120,
        meta: {
          headerText: "Тип",
        }
      },
      {
        id: 'paymentMethod',
        accessorFn: (row) => row.paymentMethod,
        header: ({ column }) => (
          <DataGridColumnHeader title="Платежный метод" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal text-[14px]">
            {row.original.paymentMethod}
          </span>
        ),
        enableSorting: false,
        size: 180,
        meta: {
          headerText: "Платежный метод"
        }
      },
      {
        id: 'amount',
        accessorFn: (row) => row.amount,
        header: ({ column }) => (
          <DataGridColumnHeader title="Сумма" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal text-[14px]">
            {row.original.amount}
          </span>
        ),
        enableSorting: true,
        size: 120,
        meta: {
          headerText: "Сумма"
        }
      },
      {
        id: 'status',
        header: ({ column }) => (
          <DataGridColumnHeader title="Статус" column={column} />
        ),
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-[8px] items-center text-foreground font-normal text-[14px]">
            <span
              style={{ backgroundColor: getStatusColor(row.original.status) }}
              className={`h-[6px] w-[6px] rounded-[50%]`}
            ></span>
            <span>{row.original.status}</span>
          </div>
        ),
        size: 120,
        meta: {
          headerText: "Статус"
        }
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => String(row.id),
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
      recordCount={filteredData?.length || 0}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card className='mt-[21px]'>
        <CardHeader className='py-[20px]'>
          <h1 className="font-semibold text-base leading-4 tracking-[0%] font-family:Inter text-[#071437]">
            Успешные операции
          </h1>
          <CardHeading></CardHeading>
          {/* <Toolbar /> */}
          <Button
            variant="outline"
            className="h-10 w-full sm:w-auto"
            onClick={() => openModal('setting')}
          >
            <KeenIcon icon="setting-2" className="text-[16px] text-[#99A1B7]" />
            Настройка таблицы
          </Button>
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
      {isModalOpen('ModalTransaction') && (
        <ModalTransaction
          open={isModalOpen('ModalTransaction')}
          onOpenChange={(open) => {
            if (!open) closeModal('ModalTransaction');
          }}
        />
      )}
    </DataGrid>
  );
};

export default TransactionTable;