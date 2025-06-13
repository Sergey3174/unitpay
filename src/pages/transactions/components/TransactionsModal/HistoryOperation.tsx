'use client';

import { useMemo, useState } from 'react';
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from '@tanstack/react-table';
import { Card, CardTable } from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
// import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';


interface IData {
  date: string;
  paymentMethod: string;
  amount: string;
  status: string;
}

const data: IData[] = [
  {
    date: '16.12.2025 — 16:48',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '4 500 ₽',
    status: 'Создано',
  },
  {
    date: '16.12.2025 — 16:52',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '3 200 ₽',
    status: 'Возврат',
  },
  {
    date: '16.12.2025 — 16:55',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '5 600 ₽',
    status: 'Успех',
  },
  {
    date: '16.12.2025 — 16:59',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '2 300 ₽',
    status: 'Чарджбек оспорен',
  },
  {
    date: '16.12.2025 — 17:03',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '1 150 ₽',
    status: 'Чарджбек проигран',
  },
  {
    date: '16.12.2025 — 17:07',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '6 750 ₽',
    status: 'Возврат',
  },
  {
    date: '16.12.2025 — 17:11',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '7 850 ₽',
    status: 'Частичный возврат',
  },
  {
    date: '16.12.2025 — 17:15',
    paymentMethod: '9955.66***** 6548 ***',
    amount: '8 400 ₽',
    status: 'Заморожен',
  },
];

const HistoryOperation = () => {
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
              item.date.toLowerCase().includes(searchLower) ||
              item.paymentMethod.toLowerCase().includes(searchLower) ||
              item.status.toLowerCase().includes(searchLower) ||
              item.amount.toLowerCase().includes(searchLower),
          );
        }
    
        // Apply sorting based on sortOrder
        if (sortOrder === 'latest') {
          filtered = [...filtered].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
          );
        } else if (sortOrder === 'older') {
          filtered = [...filtered].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          );
        } else if (sortOrder === 'oldest') {
          filtered = [...filtered].sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
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
        size: 150,
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
        size: 150,
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
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    getRowId: (row: IData) => String(row.date),
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
      <Card className='rounded-none'>
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
        {/* <CardFooter>
          <DataGridPagination />
        </CardFooter> */}
      </Card>
    </DataGrid>
  );
};

export default HistoryOperation;