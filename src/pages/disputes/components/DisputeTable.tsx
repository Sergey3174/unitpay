import { useMemo, useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { LabeledSelect } from '@/components/custom';
import { CustomFilter } from './CustomFilter';

interface IReportData {
  date: string;
  totalQuantity: number;
  totalSum: number;
  operations1: number;
  percentTotal: number;
  sum1: number;
  percent1: number;
  operations2: number;
  percent2: number;
  sum2: number;
  percent3: number;
  operations3: number;
  percent4: number;
  sum3: number;
  percent5: number;
}

const data: IReportData[] = [
  {
    date: '15.12.2025',
    totalQuantity: 326985,
    totalSum: 2326985,
    percentTotal: 0.23,
    operations1: 326985,
    sum1: 2326985,
    percent1: 0.23,
    operations2: 326985,
    sum2: 2326985,
    percent2: 0.23,
    operations3: 326985,
    sum3: 2326985,
    percent3: 0.23,
    percent4: 0.23,
    percent5: 0.23,
  },
  {
    date: '16.12.2025',
    totalQuantity: 658963,
    totalSum: 16658963,
    percentTotal: 1.2,
    operations1: 658963,
    sum1: 16658963,
    percent1: 0.88,
    operations2: 658963,
    sum2: 16658963,
    percent2: 1.2,
    operations3: 658963,
    sum3: 16658963,
    percent3: 0.23,
    percent4: 0.23,
    percent5: 0.23,
  },
  {
    date: '17.12.2025',
    totalQuantity: 450000,
    totalSum: 3200000,
    percentTotal: 0.5,
    operations1: 450000,
    sum1: 3200000,
    percent1: 0.45,
    operations2: 450000,
    sum2: 3200000,
    percent2: 0.5,
    operations3: 450000,
    sum3: 3200000,
    percent3: 0.55,
    percent4: 0.55,
    percent5: 0.55,
  }, // конец
];

const DisputeTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'user', desc: false },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo<ColumnDef<IReportData>[]>(
    () => [
      {
        id: 'allOperation',
        header: () => (
          <div className="flex items-center justify-between h-full">
            <span className="font-semibold text-[#071437] text-[16px]">
              Все операции
            </span>
            <LabeledSelect
              label="Показывать"
              placeholder="По дням"
              value={'Все'}
              options={[]}
            />
          </div>
        ),
        meta: {
          headerClassName: 'h-[56px] bg-white',
        },
        columns: [
          {
            id: 'date',
            accessorKey: 'date',
            header: ({ column }) => (
            <CustomFilter column={column} title="Дата" />
          ),
            cell: ({ row }) => row.original.date,
            size: 120,
            enableSorting: true,
          },
          {
            id: 'totalQuantity',
            accessorKey: 'totalQuantity',
             header: ({ column }) => (
            <CustomFilter column={column} title="Всего, шт." />
          ),
            cell: ({ row }) => row.original.totalQuantity.toLocaleString(),
            size: 100,
          },
          {
            id: 'totalSum',
            accessorKey: 'totalSum',
            header: ({ column }) => (
            <CustomFilter column={column} title="Сумма всего, ₽" />),
            cell: ({ row }) => row.original.totalSum.toLocaleString(),
            size: 140,
          },
        ],
      },
      {
        id: 'mir',
        header: () => (
          <div className="flex items-center justify-center h-full">
            <img src="/media/customIcons/banks/mir.svg" alt="mir" />
          </div>
        ),
        meta: {
          headerClassName: '!px-0 bg-[#17C65333]', // Убираем паддинг у ячейки заголовка
        },
        columns: [
          {
            id: 'operations1',
            accessorKey: 'operations1',
            header: () => (
              <div className="flex items-center justify-center h-full">
                Операции
              </div>
            ),
            meta: {
              headerClassName: 'bg-[#17C65333]',
            },
            cell: ({ row }) => row.original.operations1.toLocaleString(),
            size: 100,
          },
          {
            id: 'percentTotal',
            accessorKey: 'percentTotal',
            header: '%',
            cell: ({ row }) => row.original.percentTotal,
            size: 80,
            meta: {
              headerClassName: 'bg-[#17C65333]',
            },
          },
          {
            id: 'sum1',
            accessorKey: 'sum1',
            header: 'Сумма, ₽',
            cell: ({ row }) => row.original.sum1.toLocaleString(),
            size: 120,
            meta: {
              headerClassName: 'bg-[#17C65333]',
            },
          },
          {
            id: 'percent1',
            accessorKey: 'percent1',
            header: '%',
            cell: ({ row }) => row.original.percent1,
            size: 80,
            meta: {
              headerClassName: 'bg-[#17C65333]',
            },
          },
        ],
      },
      {
        id: 'visa',
        header: () => (
          <div className="flex items-center justify-center h-full">
            <img src="/media/customIcons/banks/visa.svg" alt="visa" />
          </div>
        ),
        meta: {
          headerClassName: '!px-0 bg-[#7239EA33]', // Убираем паддинг у ячейки заголовка
        },
        columns: [
          {
            id: 'operations2',
            accessorKey: 'operations2',
            header: 'Операций',
            cell: ({ row }) => row.original.operations2.toLocaleString(),
            size: 100,
            meta: {
              headerClassName: 'bg-[#7239EA33]',
            },
          },
          {
            id: 'percent2',
            accessorKey: 'percent2',
            header: '%',
            cell: ({ row }) => row.original.percent2,
            size: 80,
            meta: {
              headerClassName: 'bg-[#7239EA33]',
            },
          },
          {
            id: 'sum2',
            accessorKey: 'sum2',
            header: 'Сумма, ₽',
            cell: ({ row }) => row.original.sum2.toLocaleString(),
            size: 120,
            meta: {
              headerClassName: 'bg-[#7239EA33]',
            },
          },
          {
            id: 'percent3',
            accessorKey: 'percent3',
            header: '%',
            cell: ({ row }) => row.original.percent3,
            size: 80,
            meta: {
              headerClassName: 'bg-[#7239EA33]',
            },
          },
        ],
      },
      {
        id: 'mastercard',
        header: () => (
          <div className="flex items-center justify-center h-full">
            <img
              src="/media/customIcons/banks/masterCard.svg"
              alt="masterCard"
            />
          </div>
        ),
        meta: {
          headerClassName: '!px-0 bg-[#EFF6FF]',
        },
        columns: [
          {
            id: 'operations3',
            accessorKey: 'operations3',
            header: 'Операций',
            cell: ({ row }) => row.original.operations3.toLocaleString(),
            size: 100,
            meta: {
              headerClassName: 'bg-[#EFF6FF]',
            },
          },
          {
            id: 'percent4',
            accessorKey: 'percent4',
            header: '%',
            cell: ({ row }) => row.original.percent4,
            size: 80,
            meta: {
              headerClassName: 'bg-[#EFF6FF]',
            },
          },
          {
            id: 'sum3',
            accessorKey: 'sum3',
            header: 'Сумма, ₽',
            cell: ({ row }) => row.original.sum3.toLocaleString(),
            size: 120,
            meta: {
              headerClassName: 'bg-[#EFF6FF]',
            },
          },
          {
            id: 'percent5',
            accessorKey: 'percent5',
            header: '%',
            cell: ({ row }) => row.original.percent5,
            size: 80,
            meta: {
              headerClassName: 'bg-[#EFF6FF]',
            },
          },
        ],
      },
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: data,
    pageCount: Math.ceil((data?.length || 0) / pagination.pageSize),
    getRowId: (row: IReportData) => String(row.date),
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
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full border-separate border-spacing-0">
            <thead className="bg-[#FCFCFC]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const column = header.column;
                    const isPinned = column.getIsPinned();
                    const isLastLeftPinned =
                      isPinned === 'left' && column.getIsLastColumn('left');
                    const isFirstRightPinned =
                      isPinned === 'right' && column.getIsFirstColumn('right');

                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.getSize(),
                          left:
                            isPinned === 'left'
                              ? `${column.getStart('left')}px`
                              : undefined,
                          right:
                            isPinned === 'right'
                              ? `${column.getAfter('right')}px`
                              : undefined,
                          position: isPinned ? 'sticky' : 'relative',
                          zIndex: isPinned ? 1 : 0,
                        }}
                        className={cn(
                          'h-10 px-4 text-left align-middle text-[13px] font-normal text-[#4B5675] border-b border-e',
                          column.columnDef.meta?.headerClassName,
                          isLastLeftPinned && 'border-e!',
                          isFirstRightPinned && 'border-s!',
                          isPinned && 'bg-background/90 backdrop-blur-xs',
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'hover:bg-muted/40',
                    row.getIsSelected() && 'bg-muted/50',
                    'border-b border-border',
                    'border-b border-solid border-[#E5E7EB]'
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    const column = cell.column;
                    const isPinned = column.getIsPinned();
                    const isLastLeftPinned =
                      isPinned === 'left' && column.getIsLastColumn('left');
                    const isFirstRightPinned =
                      isPinned === 'right' && column.getIsFirstColumn('right');

                    return (
                      <td
                        key={cell.id}
                        style={{
                          left:
                            isPinned === 'left'
                              ? `${column.getStart('left')}px`
                              : undefined,
                          right:
                            isPinned === 'right'
                              ? `${column.getAfter('right')}px`
                              : undefined,
                          position: isPinned ? 'sticky' : 'relative',
                          zIndex: isPinned ? 1 : 0,
                        }}
                        className={cn(
                          'px-4 py-3 align-middle border-e',
                          isLastLeftPinned && 'border-e!',
                          isFirstRightPinned && 'border-s!',
                          isPinned && 'bg-background/90 backdrop-blur-xs',
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* <div className="text-sm text-muted-foreground">
        Показано {table.getRowModel().rows.length} из{' '}
        {table.getFilteredRowModel().rows.length} строк
      </div> */}
      
      {/* <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Строк на странице</p>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="h-8 w-[70px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none"
          >
            {[5, 10, 15, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            className="h-8 w-8 p-0 rounded-md border border-input bg-background shadow-sm disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Предыдущая страница</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
          
          <span className="text-sm font-medium">
            Страница {table.getState().pagination.pageIndex + 1} из{' '}
            {table.getPageCount()}
          </span>
          
          <button
            className="h-8 w-8 p-0 rounded-md border border-input bg-background shadow-sm disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Следующая страница</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div> */}
      </CardContent>
    </Card>
  );
};

export default DisputeTable;
