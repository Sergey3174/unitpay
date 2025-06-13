'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

const defaultRoles = [
  'Администратор',
  'Бухгалтер',
  'Менеджер',
  'Разработчик',
  'Поддержка',
];

export default function MultiSelect() {
  const [roles, setRoles] = useState<string[]>(defaultRoles);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [customRole, setCustomRole] = useState('');
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const addCustomRole = () => {
    const trimmed = customRole.trim();
    if (trimmed && !roles.includes(trimmed)) {
      setRoles([...roles, trimmed]);
      setSelectedRoles([...selectedRoles, trimmed]);
      setCustomRole('');
    }
  };

  // Закрытие по клику вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={wrapperRef}>
      {/* Селект-хедер */}
      <div
        className="min-h-[42px] px-3 py-2 border rounded-md bg-white flex items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selectedRoles.length === 0 ? (
          <span className="text-gray-400">Выберите роли</span>
        ) : (
          <>
            <div className="flex justify-between grow-1 items-center gap-1">
              <span className="text-gray-600 text-sm w-35">
                Выбрано {selectedRoles.length}
              </span>
              <div className="flex flex-wrap gap-1 justify-end">
                {selectedRoles.map((role) => (
                  <span
                    key={role}
                    className="bg-[#EFF6FF] text-[#056EE9] px-2 py-1 rounded-[4px] text-sm flex items-center gap-1 border-1 border-[rgba(27,132,255,0.2)]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {role}
                    <X
                      className="w-3 h-3 text-[#99A1B7]"
                      onClick={() => toggleRole(role)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
        <ChevronDown className="ml-auto text-gray-400" />
      </div>

      {/* Выпадающее меню поверх, но визуально как часть селекта */}
      {open && (
        <div className="absolute z-50 left-0 right-0 mt-1 border rounded-md shadow-md bg-white p-3 text-sm">
          <div className="max-h-[200px] overflow-y-auto flex flex-col gap-4">
            {roles.map((role) => (
              <label
                key={role}
                className="flex items-center px-2 py-1 hover:bg-gray-100 rounded cursor-pointer gap-1 h-4.5 font-[14px]"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedRoles.includes(role)}
                  onClick={() => toggleRole(role)}
                />
                <span>{role}</span>
              </label>
            ))}
          </div>

          <input
            type="text"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation();
                addCustomRole();
              }
            }}
            placeholder="Ввести вручную"
            className="w-full px-2 py-1 border rounded mt-2"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              addCustomRole();
            }}
            disabled={!customRole.trim()}
            className={`mt-2 w-full py-1 text-white rounded text-sm ${
              customRole.trim()
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            Добавить
          </button>
        </div>
      )}
    </div>
  );
}
