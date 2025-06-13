import { useEffect, useState } from 'react';
import { StoreClientTopbar } from '@/pages/store-client/components/common/topbar';
import { UserDropdownMenu } from '@/partials/topbar/user-dropdown-menu';
import { SquareMenu } from 'lucide-react';
import { useLocation } from 'react-router';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useScrollPosition } from '@/hooks/use-scroll-position';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Container } from '@/components/common/container';
import { InfoManager } from '@/components/custom/InfoManager';
import { LabeledSelect } from '@/components/custom/LabeledSelect';
import { KeenIcon } from '@/components/keenicons';
// import { SelectField } from '@/components/custom/selectCustom';
import { Breadcrumb } from './breadcrumb';
// import { MegaMenu } from './mega-menu';
import { SidebarMenu } from './sidebar-menu';
import { useNavigate } from 'react-router';

export function Header() {
  const [isSidebarSheetOpen, setIsSidebarSheetOpen] = useState(false);
  const [balance, setBalance] = useState('1000');

  const [currency, setCurrency] = useState('usd');
  const [language, setLanguage] = useState('ru');

  const { pathname } = useLocation();
  const mobileMode = useIsMobile();

  const scrollPosition = useScrollPosition();
  const headerSticky: boolean = scrollPosition > 0;

  const navigate = useNavigate();

  // Close sheet when route changes
  useEffect(() => {
    setIsSidebarSheetOpen(false);
    // setIsMegaMenuSheetOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'header fixed top-0 z-10 start-0 flex items-stretch shrink-0 border-b border-transparent bg-background end-0 pe-[var(--removed-body-scroll-bar-size,0px)]',
        headerSticky && 'border-b border-border',
      )}
    >
      <Container className="flex justify-between items-stretch lg:gap-4">
        {/* HeaderLogo */}
        <div className="flex gap-1 lg:hidden items-center gap-2.5">
          {/* <Link to="/" className="shrink-0">
            <img
              src={toAbsoluteUrl('/media/app/mini-logo.svg')}
              className="h-[25px] w-full"
              alt="mini-logo"
            />
          </Link> */}
          <div className="flex items-center">
            {mobileMode && (
              <Sheet
                open={isSidebarSheetOpen}
                onOpenChange={setIsSidebarSheetOpen}
              >
                <SheetTrigger asChild>
                  <Button className='max-sm:w-[24px] max-sm:h-[24px]' variant="ghost" mode="icon">
                    {/* <Menu className="text-muted-foreground/70" /> */}
                    <SquareMenu className='size-[26px]' />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className="p-0 gap-0 w-[275px]"
                  side="left"
                  close={false}
                >
                  <SheetHeader className="p-0 space-y-0" />
                  <SheetBody className="p-0 overflow-y-auto">
                    <SidebarMenu />
                  </SheetBody>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
        {/* Main Content (MegaMenu or Breadcrumbs) */}

        <div className="hidden lg:block lg:flex">
          <Breadcrumb />
        </div>

        {/* // !mobileMode && <MegaMenu /> */}

        {/* HeaderTopbar */}
        <div className="flex items-center gap-4">
          {pathname.startsWith('/store-client') ? (
            <StoreClientTopbar />
          ) : (
            <>
              <div className=" md:hidden hidden sm:block w-6 h-6">
                <img src={toAbsoluteUrl('/media/app/headphones-support.svg')} />
              </div>

              {/* Показывать только от 768px и выше */}
              <div className="hidden md:block">
                <InfoManager label="Ваш менеджер поддержки" />
              </div>

              <div className="hidden sm:block">
                <LabeledSelect
                  label="Язык"
                  value={language}
                  onChange={setLanguage}
                  options={[
                    {
                      label: 'RU',
                      value: 'ru',
                      icon: '/media/flags/russia.svg',
                    },
                    {
                      label: 'EN',
                      value: 'en',
                      icon: '/media/flags/united-states.svg',
                    },
                    {
                      label: 'DE',
                      value: 'de',
                      icon: '/media/flags/germany.svg',
                    },
                  ]}
                  className="w-[94px]"
                />
              </div>

              <div className="hidden sm:block">
                {' '}
                <LabeledSelect
                  label="Валюта"
                  value={currency}
                  onChange={setCurrency}
                  options={[
                    { label: 'USD', value: 'usd' },
                    { label: 'EUR', value: 'eur' },
                    { label: 'RUB', value: 'rub' },
                  ]}
                  className="w-[77px]"
                />
              </div>

              <LabeledSelect
                label="Баланс"
                value={balance}
                onChange={setBalance}
                options={[
                  { label: '1000 ₽', value: '1000' },
                  { label: '2000 ₽', value: '2000' },
                  { label: '3000 ₽', value: '3000' },
                ]}
                className="w-[104px] max-sm:w-[96px] max-sm:h-[28px]"
              />
              <div onClick={()=> navigate('/notifications')} className="hidden sm:block w-6 h-6 cursor-pointer">
                <KeenIcon
                  icon="notification"
                  className="w-full h-full block leading-none text-[24px]"
                />
              </div>

              <UserDropdownMenu
                trigger={
                  <img
                    className="size-14 rounded-full border-2 border-green-500 shrink-0 cursor-pointer max-sm:size-9"
                    src={toAbsoluteUrl('/media/avatars/300-2.png')}
                    alt="User Avatar"
                  />
                }
              />
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
