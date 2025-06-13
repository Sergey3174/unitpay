import { useState } from 'react';
import { Card } from '@/components/ui/card';
import CurrencySwitch from '@/components/custom/CurrencySwitch';

interface ITrend {
  direction: boolean;
  value: string;
}

interface ITransactionCard {
  id: number;
  title: string;
  value: string;
  trend: ITrend;
}

const transactionsDataMock: ITransactionCard[] = [
  {
    id: 1,
    title: 'successOperat',
    value: '3 265',
    trend: {
      direction: true,
      value: '0.0%',
    },
  },
  {
    id: 2,
    title: 'denaiOperat',
    value: '3 265',
    trend: {
      direction: true,
      value: '0.0%',
    },
  },
  {
    id: 3,
    title: 'primaryPay',
    value: '30 265',
    trend: {
      direction: true,
      value: '0.0%',
    },
  },
  {
    id: 4,
    title: 'returns',
    value: '1 265',
    trend: {
      direction: true,
      value: '0.0%',
    },
  },
];

const TransactionInfo = () => {
  const [isChecked, setIsChecked] = useState(false);

  const trendIndicator = (trend: ITrend) => {
    const isPositive = trend.direction;
    const arrowIcon = isPositive
      ? 'media/app/arrow-up.svg'
      : 'media/app/arrow-down.svg';
    const colorBack = isPositive ? 'bg-[#EAFFF1]' : 'bg-[#FFEEF3]';
    const colorText = isPositive ? 'text-[#17C653]' : 'text-[#F8285A]';
    return (
      <div
        className={`flex gap-[3px] p-[7px] ${colorBack} rounded-md items-center`}
      >
        <img className="w-[10px]" src={arrowIcon} alt="arrowup" />
        <span className={`${colorText} text-xs font-semibold`}>
          {trend.value}
        </span>
      </div>
    );
  };

  const getIconConfig = (title: string) => {
    switch (title) {
      case 'successOperat':
        return {
          icon: 'ki-filled ki-double-check-circle',
          color: 'text-[#04B440]',
          label: 'Успешные операции',
        };
      case 'denaiOperat':
        return {
          icon: 'ki-filled ki-cross-circle',
          color: 'text-[#D81A48]',
          label: 'Отменённые операции',
        };
      case 'primaryPay':
        return {
          icon: 'ki-filled ki-user-tick',
          color: 'text-[#04B440]',
          label: 'Первичные оплаты',
        };
      case 'returns':
        return {
          icon: 'ki-duotone ki-arrow-circle-left',
          color: 'text-[#D81A48]',
          label: 'Возвраты',
        };
      default:
        return {
          icon: 'ki-filled ki-question-2',
          color: 'text-[#78829D]',
          label: title,
        };
    }
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-end">
        <CurrencySwitch isChecked={isChecked} onCheckedChange={setIsChecked} />
      </div>
      <div className="flex gap-[12px] flex-wrap max-sm:gap-[8px]">
        {transactionsDataMock.map((transaction) => {
          const { icon, color, label } = getIconConfig(transaction.title);

          return (
            <Card
              key={transaction.id}
              className="pt-[14px] px-[16px] pb-[16px] w-full
                        flex-grow
                        sm:flex-[1_1_calc(50%-12px)]
                        lg:flex-[1_1_calc(25%-12px)]
                        max-w-full
                        sm:max-w-[calc(50%-12px)]
                        lg:max-w-[calc(25%-12px)]
                        min-w-[246px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className={`${icon} text-[30px] ${color}`}></span>
                  <div className="flex flex-col">
                    <span className="text-[14px] text-[#78829D]">{label}</span>
                    <div className="flex gap-[12px] items-center">
                      <span className="text-[18px] font-semibold">
                        {transaction.value}
                      </span>
                      {trendIndicator(transaction.trend)}
                    </div>
                  </div>
                </div>
                <span className="ki-filled ki-question-2 text-[22px] text-[#99A1B7]"></span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionInfo;
