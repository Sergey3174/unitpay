import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { MenuItem } from '@/config/types';
import { cn } from '@/lib/utils';
import { useMenu } from '@/hooks/use-menu';
import { KeenIcon } from '@/components/keenicons';

export function Breadcrumb() {
  const { pathname } = useLocation();
  const { getBreadcrumb, isActive } = useMenu(pathname);
  const items: MenuItem[] = getBreadcrumb(MENU_SIDEBAR);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.25 text-xs lg:text-sm font-medium  lg:mb-0">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        const active = item.path ? isActive(item.path) : false;

        return (
          <Fragment key={`root-${index}`}>
            <span
              className={cn(
                active ? 'text-mono' : 'text-secondary-foreground',
                'flex items-center pl-2',
              )}
              key={`item-${index}`}
            >
              {/* {item.icon && <span className="mr-1">{item.icon({})}</span>} */}
              <KeenIcon icon="home" className="text-[16px]" />
              <ChevronRight size={18} />
              {item.title}
            </span>
            {!last && (
              <ChevronRight
                className="size-3.5 text-muted-foreground"
                key={`separator-${index}`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
