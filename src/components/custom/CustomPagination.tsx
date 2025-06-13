import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { LabeledSelect } from '@/components/custom';

interface PageSizeOption {
  label: string;
  value: string;
}

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: string) => void;
  pageSizeOptions?: PageSizeOption[];
}

export const CustomPagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  pageSizeOptions,
}: CustomPaginationProps) => {
  return (
    <Pagination className="sm:justify-between flex-wrap justify-center">
      <LabeledSelect
        label="Показывать по"
        value={String(itemsPerPage)}
        options={pageSizeOptions}
        onChange={onItemsPerPageChange}
      />
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            <span className="ki-filled ki-black-left text-[16px] text-[#4B5675]"></span>
          </Button>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <Button
              variant='ghost'
              size="sm"
              onClick={() => onPageChange(page)}
              className={`w-[30px] h-[30px] text-[14px] ${currentPage === page ? 'bg-[#F1F1F4] border-none' : ''}`}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="ki-filled ki-black-right text-[16px] text-[#4B5675]"></span>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
