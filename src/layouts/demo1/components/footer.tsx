// import { generalSettings } from '@/config/general.config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Container } from '@/components/common/container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer bg-[#F1F1F4] max-sm:h-[36px] ">
      <Container>
        <div className="flex flex-row-reverse md:flex-row justify-between md:justify-between items-center gap-3 py-5 max-sm:h-[36px] py-0 px-0">
          <div className="flex order-2 md:order-1  gap-2 font-normal text-sm">
            <span className="text-muted-foreground">{currentYear} &copy;</span>
            <span className="text-[#78829D]">Unitpay</span>
          </div>
          <nav className="hidden md:flex order-1 md:order-2 gap-4 font-normal text-sm text-[#78829D]">
            <a href="#" className="hover:text-primary">
              Документы
            </a>
            <a href="#" className="hover:text-primary">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-primary">
              FAQ
            </a>
            <a href="#" className="hover:text-primary">
              Поддержка
            </a>
            <a href="#" className="hover:text-primary">
              Условия использования
            </a>
          </nav>
          <div className="md:hidden order-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-500">
                  <span className="ki-filled ki-burger-menu-2"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="shadow-none rounded-none min-w-[200px]"
                alignOffset={-15}
                sideOffset={20}
              >
                <DropdownMenuItem asChild className="text-[#78829D]">
                  <a href="#" className="w-full">
                    Документы
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-[#78829D]">
                  <a href="#" className="w-full">
                    Конфиденциальность
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-[#78829D]">
                  <a href="#" className="w-full">
                    FAQ
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-[#78829D]">
                  <a href="#" className="w-full">
                    Поддержка
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-[#78829D]">
                  <a href="#" className="w-full">
                    Условия использования
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </footer>
  );
}
