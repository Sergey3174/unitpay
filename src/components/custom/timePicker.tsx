import { FC } from 'react';

interface TimePickerProps {
  tempDateRange: any;
  setTempDateRange: any;
}

const TimePicker: FC<TimePickerProps> = ({
  tempDateRange,
  setTempDateRange,
}) => {
  return (
    <div className="flex">
      {tempDateRange?.from && (
        <div className="flex flex-row w-6/12 justify-evenly pb-3">
          {/* Часы */}

          <select
            className="w-[auto] text-sm focus:outline-none"
            value={tempDateRange.from.getHours()}
            onChange={(e) => {
              const updatedFrom = new Date(tempDateRange.from);
              updatedFrom.setHours(Number(e.target.value));
              setTempDateRange({
                ...tempDateRange,
                from: updatedFrom,
              });
            }}
          >
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          {':'}

          {/* Минуты */}
          <select
            className="w-[auto] text-sm focus:outline-none"
            value={tempDateRange.from.getMinutes()}
            onChange={(e) => {
              const updatedFrom = new Date(tempDateRange.from);
              updatedFrom.setMinutes(Number(e.target.value));
              setTempDateRange({
                ...tempDateRange,
                from: updatedFrom,
              });
            }}
          >
            {[...Array(60).keys()].map((minute) => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      )}

      {tempDateRange?.to && (
        <div className="flex flex-row w-6/12 justify-evenly pb-3">
          {/* Часы */}

          <select
            className="w-[auto] text-sm focus:outline-none"
            value={tempDateRange.to.getHours()}
            onChange={(e) => {
              const updatedFrom = new Date(tempDateRange.to);
              updatedFrom.setHours(Number(e.target.value));
              setTempDateRange({
                ...tempDateRange,
                to: updatedFrom,
              });
            }}
          >
            {[...Array(24).keys()].map((hour) => (
              <option key={hour} value={hour}>
                {hour.toString().padStart(2, '0')}
              </option>
            ))}
          </select>

          {':'}

          {/* Минуты */}
          <select
            className="w-[auto] text-sm focus:outline-none"
            value={tempDateRange.to.getMinutes()}
            onChange={(e) => {
              const updatedFrom = new Date(tempDateRange.to);
              updatedFrom.setMinutes(Number(e.target.value));
              setTempDateRange({
                ...tempDateRange,
                to: updatedFrom,
              });
            }}
          >
            {[...Array(60).keys()].map((minute) => (
              <option key={minute} value={minute}>
                {minute.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
