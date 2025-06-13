'use client';

import { useMemo, useState } from 'react';
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { RiCheckboxCircleFill } from '@remixicon/react';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { EllipsisVertical, Filter, Search, Settings2, X } from 'lucide-react';
import { toast } from 'sonner';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { useModalContext } from '@/hooks/use-modal-context';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { ModalSettingTable } from '@/components/custom/Modals/ModalSettingTable';
import { KeenIcon } from '@/components/keenicons';

interface IData {
  id: string;
  date: string;
  operator: string;
  successful_operations: string;
  commission: string;
  refunds: string;
  debates: string;
  won: string;
  lost: string;
  paid_out: string;
  settings: string;
}

const data: IData[] = [
  {
    id: '1',
    date: '16.12.2025',
    user: {
      avatar: '300-3.png',
      name: 'Tyler Hero',
      email: 'tyler.hero@gmail.com',
    },
    clientId: 'MS-23456832',
    ordersValue: '$427,456.09',
    location: {
      flag: 'estonia.svg',
      name: 'Estonia',
    },
    activity: 'Current session',
  },
  {
    id: '2',
    date: '16.12.2025',
    user: {
      avatar: '300-1.png',
      name: 'Esther Howard',
      email: 'esther.howard@gmail.com',
    },
    clientId: 'MS-52967418',
    ordersValue: '$45,800.90',
    location: {
      flag: 'malaysia.svg',
      name: 'Malaysia',
    },
    activity: 'Week ago',
  },
  {
    id: '3',
    date: '16.12.2025',
    user: {
      avatar: '300-11.png',
      name: 'Jacob Jones',
      email: 'jacob.jones@gmail.com',
    },
    clientId: 'MS-43765928',
    ordersValue: '$63,250.30',
    location: {
      flag: 'ukraine.svg',
      name: 'Ukraine',
    },
    activity: 'Week ago',
  },
  {
    id: '4',
    date: '16.12.2025',
    user: {
      avatar: '300-2.png',
      name: 'Cody Fisher',
      email: 'cody.fisher@gmail.com',
    },
    clientId: 'MS2-9846571',
    ordersValue: '$80,100.45',
    location: {
      flag: 'canada.svg',
      name: 'Canada',
    },
    activity: 'Current session',
  },
];

function ActionsCell({ row }: { row: Row<IData> }) {
  const { copyToClipboard } = useCopyToClipboard();
  const handleCopyId = () => {
    copyToClipboard(String(row.original.id));
    const message = `Client ID successfully copied: ${row.original.id}`;
    toast.custom(
      (t) => (
        <Alert
          variant="mono"
          icon="success"
          close={false}
          onClose={() => toast.dismiss(t)}
        >
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>{message}</AlertTitle>
        </Alert>
      ),
      {
        position: 'top-center',
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" mode="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => {}}>View Invoice</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyId}>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const StoreClients = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'user', desc: false },
  ]);
  const { isModalOpen, closeModal, openModal } = useModalContext();
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('latest');

  const filteredData = useMemo(() => {
    let filtered = data;

    // Filter by activity
    if (selectedActivities.length > 0) {
      filtered = filtered.filter((item) =>
        selectedActivities.includes(item.activity),
      );
    }

    // Filter by search query (case-insensitive)
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.user.name.toLowerCase().includes(searchLower) ||
          item.user.email.toLowerCase().includes(searchLower) ||
          item.clientId.toLowerCase().includes(searchLower) ||
          item.ordersValue.toLowerCase().includes(searchLower) ||
          item.location.name.toLowerCase().includes(searchLower) ||
          item.activity.toLowerCase().includes(searchLower),
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

  const activityCounts = useMemo(() => {
    return data.reduce(
      (acc, item) => {
        const activity = item.activity;
        acc[activity] = (acc[activity] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, []);

  const handleActivityChange = (checked: boolean, value: string) => {
    setSelectedActivities((prev = []) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );
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
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col">{row.original.date}</div>
          </div>
        ),
        enableSorting: true,
        size: 179,
        meta: {
          headerText: 'Дата',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
        className: 'flex items-center gap-2.5',
      },
      {
        id: 'operations',
        accessorFn: (row) => row.clientId,
        header: ({ column }) => (
          <DataGridColumnHeader title="Операции" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.clientId}
          </span>
        ),
        enableSorting: true,
        size: 179,
        meta: {
          headerText: 'Операции',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'successful_operations',
        accessorFn: (row) => row.ordersValue,
        header: ({ column }) => (
          <DataGridColumnHeader title="Успешные операции" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.ordersValue}
          </span>
        ),
        enableSorting: true,
        size: 179,
        meta: {
          headerText: 'Успешные операции',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'commission',
        accessorFn: (row) => row.location,
        header: ({ column }) => (
          <DataGridColumnHeader title="Комиссия" column={column} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <img
              src={toAbsoluteUrl(`/media/flags/${row.original.location.flag}`)}
              className="size-4 rounded-full shrink-0"
              alt="image"
            />
            <span className="text-foreground font-normal">
              {row.original.location.name}
            </span>
          </div>
        ),
        enableSorting: true,
        size: 179,
        meta: {
          headerText: 'Комиссия',
          skeleton: <Skeleton className="h-4 w-[150px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'refunds',
        accessorFn: (row) => row.activity,
        header: ({ column }) => (
          <DataGridColumnHeader title="Возвраты" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.activity}
          </span>
        ),
        enableSorting: true,
        size: 179,
        meta: {
          headerText: 'Возвраты',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'debates',
        header: ({ column }) => (
          <DataGridColumnHeader title="Диспуты" column={column} />
        ),
        enableSorting: false,
        cell: () => {
          return (
            <div className="text-center">
              <Button mode="link" underlined="dashed">
                View
              </Button>
            </div>
          );
        },
        size: 129,
        meta: {
          headerText: 'Диспуты',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'won',
        accessorFn: (row) => row.ordersValue,
        header: ({ column }) => (
          <DataGridColumnHeader title="Выиграл" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.ordersValue}
          </span>
        ),
        enableSorting: true,
        size: 129,
        meta: {
          headerText: 'Выиграл',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'lost',
        accessorFn: (row) => row.ordersValue,
        header: ({ column }) => (
          <DataGridColumnHeader title="Проиграл" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.ordersValue}
          </span>
        ),
        enableSorting: true,
        size: 129,
        meta: {
          headerText: 'Проиграл',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'paid_out',
        accessorFn: (row) => row.ordersValue,
        header: ({ column }) => (
          <DataGridColumnHeader title="К выплате" column={column} />
        ),
        cell: ({ row }) => (
          <span className="text-foreground font-normal">
            {row.original.ordersValue}
          </span>
        ),
        enableSorting: true,
        size: 179,
        meta: {
          headerText: 'К выплате',
          skeleton: <Skeleton className="h-4 w-[150px]" />,
          headerClassName: '',
        },
      },
      {
        id: 'settings',
        header: ({ column }) => (
          <DataGridColumnHeader title="Настройки" column={column} />
        ),
        cell: ({ row }) => (
          <img
            src={toAbsoluteUrl(`/media/customIcons/xls.svg`)}
            className="w-[25px] relative left-[28px] size-8 rounded-full shrink-0"
            alt="image"
          />
        ),
        enableSorting: false,
        size: 110,
        meta: {
          headerText: 'Настройки',
          skeleton: <Skeleton className="h-4 w-[100px]" />,
          headerClassName: '',
        },
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

  const Toolbar = () => {
    const { table } = useDataGrid();

    return (
      <CardToolbar>
        <Button>
          <Settings2 size={16} />
          Filters
        </Button>
        <DataGridColumnVisibility
          table={table}
          trigger={
            <Button variant="outline">
              <Settings2 />
              Columns
            </Button>
          }
        />
      </CardToolbar>
    );
  };

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
      <Card>
        <CardHeader>
          <h1 className="font-semibold text-base leading-4 tracking-[0%] font-family:Inter text-[#071437]">
            Отчеты
          </h1>
          <CardHeading></CardHeading>
          {/* <Toolbar /> */}
          <button
            className="flex gap-[5px] h-[38px] w-[188px] mx-0 my-[20px] items-center bg-white text-blue-500 border border-gray-500 hover:bg-gray-50 hover:text-blue-600 hover:border-blue-600 px-4 py-2 rounded-md transition duration-300 ease-in-out"
            onClick={() => openModal('setting')}
          >
            <div className="text-[#99A1B7]">
              <KeenIcon icon="setting-2" />
            </div>

            <p className="font-medium text-sm leading-[14px] tracking-[0%] text-[#4B5675] font-family: Inter">
              Настройки таблицы
            </p>
          </button>
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

export { StoreClients };
