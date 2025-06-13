import { ReactNode } from 'react';

interface CollapsibleProps {
  isOpen: boolean;
  children: ReactNode;
}

export const Collapsible = ({ isOpen, children }: CollapsibleProps) => {
  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-200 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      {children}
    </div>
  );
};
