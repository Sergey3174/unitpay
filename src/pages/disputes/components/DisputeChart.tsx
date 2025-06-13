import { useState } from 'react';
import { ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import CurrencySwitch from '@/components/custom/CurrencySwitch';
// Моковые данные для графика по дням
const dummyDailyData1 = Array.from({length: 31}, () => Math.floor(Math.random() * 200));
const dummyDailyData2 = Array.from({length: 31}, () => Math.floor(Math.random() * 200));
const dummyDailyData3 = Array.from({length: 31}, () => Math.floor(Math.random() * 200));
const permanentDailyData = Array.from({length: 31}, () => Math.floor(Math.random() * 200));

const dailyCategories = Array.from({length: 31}, (_, i) => (i + 1).toString());

// Моковые данные для графика по месяцам
const dummyChartData1: number[] = [
  200, 150, 132, 125, 135, 140, 45, 53, 56, 65, 75, 85,
];
const dummyChartData2: number[] = [
  120, 100, 88, 78, 85, 94, 52, 45, 75, 65, 55, 45,
];
const dummyChartData3: number[] = [
  85, 90, 75, 65, 78, 89, 70, 65, 59, 50, 40, 30,
];

const permanentLineData : number[] = [
  130, 120, 80, 75, 78, 99, 100, 110, 95, 66, 102, 55,
];

type ActiveChart = 'month' | 'days';

const DisputeChart = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [activeChart, setActiveChart] = useState<ActiveChart>("month")
  const [visibleSeries, setVisibleSeries] = useState({
    Visa: true,
    MasterCard: true,
    МИР: true,
  });

  const categories: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const seriesData = [
    {
      name: 'Visa',
      data: dummyChartData1,
      visible: visibleSeries.Visa,
      color: '#E42855',
    },
    {
      name: 'MasterCard',
      data: dummyChartData2,
      visible: visibleSeries.MasterCard,
      color: '#883FFF',
    },
    {
      name: 'МИР',
      data: dummyChartData3,
      visible: visibleSeries.МИР,
      color: '#00A261',
    },
  ];

  const chartSeries = [
    ...seriesData.filter(s => s.visible).map(({ name, data, color }) => ({
      name,
      data,
      color
    })),
    {
      name: 'Диспуты',
      data: permanentLineData,
      color: '#1B84FF', 
    }
  ];

  const options: ApexOptions = {
    series: chartSeries,
    chart: {
      height: 250,
      type: 'area',
      zoom: { enabled: false },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: chartSeries.map((s) => s.color),
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: 'var(--color-primary)',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 200,
      tickAmount: 5,
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
        // formatter: (defaultValue) => {
        //   return `$${defaultValue}K`;
        // },
      },
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      custom({ series, seriesIndex, dataPointIndex, w }) {
        const number = parseInt(series[seriesIndex][dataPointIndex]) * 1000;
        const month = w.globals.seriesX[seriesIndex][dataPointIndex];
        const monthName = categories[month];

        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });

        const formattedNumber = formatter.format(number);

        return `
          <div class="flex flex-col gap-2 p-3.5">
            <div class="font-medium text-sm text-secondary-foreground">${monthName}, 2024 Sales</div>
            <div class="flex items-center gap-1.5">
              <div class="font-semibold text-base text-mono">${formattedNumber}</div>
              <span class="rounded-full border border-green-200 font-medium dark:border-green-850 text-success-700 bg-green-100 dark:bg-green-950/30 text-[11px] leading-none px-1.25 py-1">+24%</span>
            </div>
          </div>
          `;
      },
    },
    markers: {
      size: 0,
      colors: 'var(--color-white)',
      strokeColors: 'var(--color-primary)',
      strokeWidth: 4,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: 'circle',
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: {
        size: 8,
        sizeOffset: 0,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.25,
        opacityTo: 0,
      },
    },
    grid: {
      borderColor: 'var(--color-border)',
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  const toggleSeries = (seriesName: keyof typeof visibleSeries) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [seriesName]: !prev[seriesName],
    }));
  };

  return (
    <Card className="h-full max-w-[1576px]">
      <CardHeader>
        <CardTitle className="text-[16px] tracking-[0.04rem] mr-[32px]">
          График
        </CardTitle>
        <div className="flex grow-1 justify-between items-center pr-[10px] flex-wrap">
          <div className="flex gap-[16px]">
            <Button variant={activeChart === "month" ? "primary" : "blue"} onClick={() => setActiveChart("month")}>По месяцам</Button>
            <Button
              variant={activeChart === "month" ? "blue" : "primary"}
              onClick={() => setActiveChart("days")}
            >
              По дням
            </Button>
          </div>
          <div className="flex items-center gap-x-[32px] flex-wrap">
            <div className="flex items-center gap-x-[4px]">
              <span className="text-[13px] text-[#78829D] tracking-[0.04rem]">
                С вызреванием
              </span>
              <span className="ki-outline ki-question-2 text-[13px] text-[#6C89A9]"></span>
              <Switch size={'sm'} />
            </div>
            <div className="flex gap-x-[24px]">
              <CurrencySwitch
                isChecked={isChecked}
                onCheckedChange={setIsChecked}
              />
              <span className="ki-filled ki-calendar text-[24px] text-[#99A1B7]"></span>
              <span className="ki-filled ki-exit-right-corner text-[24px] text-[#99A1B7]"></span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ApexChart
          options={options}
          series={options.series}
          type={activeChart === "month" ? "area" : "bar"}
          max-width={"1577px"}
          height="250"
        /> 
        <div className="flex flex-wrap gap-x-[24px]  justify-center">
          {seriesData.map((series) => (
            <div key={series.name} className="flex items-center gap-x-[4px]">
              <Checkbox
                id={`series-${series.name}`}
                checked={
                  visibleSeries[series.name as keyof typeof visibleSeries]
                }
                onCheckedChange={() =>
                  toggleSeries(series.name as keyof typeof visibleSeries)
                }
                style={
                  {
                    '--checkbox-checked-bg': series.color,
                    '--checkbox-checked-border': series.color,
                  } as React.CSSProperties
                }
                className="w-[18px] h-[18px] data-[state=checked]:bg-[var(--checkbox-checked-bg)]  data-[state=checked]:border-[var(--checkbox-checked-border)] cursor-pointer"
              />
              <label
                htmlFor={`series-${series.name}`}
                className="text-[14px] text-[#78829D] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {series.name}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DisputeChart;
