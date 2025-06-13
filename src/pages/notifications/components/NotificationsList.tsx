import { useState } from 'react';
import { CustomPagination } from '@/components/custom/CustomPagination';
import NotificationCard from './NotificationCard';

const mockNotifications = [
  {
    id: 1,
    type: 'info',
    title: 'Регистрация (свернутое непрочитанное уведомление)',
    description:
      'Поздравляем! Вы успешно зарегистрировались в системе Unitpay. Пожалуйста, ознакомьтесь с документацией. О том, как начать получать средства на ваш счёт, читайте в разделе «Выплаты». Если у вас возникнут вопросы в дальнейшей работе, то можете почитать FAQ для партнеров или обратитесь в нашу службу поддержки (контакты поддержки находятся в вашем личном кабинете на главной странице).',
    date: '20.09.2025 — 14:45',
    isRead: false,
  },
  {
    id: 2,
    type: 'primary',
    title: "Проект добавлен в систему и одобрен проект 'Стартовый'",
    description:
      'Ваш проект - тест боты для всех - предварительно одобрен и добавлен в систему. Ему присвоена «Стартовая» категория. Рекомендуем ознакомиться с документацией по ссылке. Что дальше? Ожидайте полной модерации. Проверка проводится службой безопасности в течение 24 часов. После проверки вы получите уведомление. Полноценный приём платежей станет доступен после завершения проверки. Подписывайтесь на наш Telegram-канал, в нем мы публикуем самую актуальную информацию.',
    date: '21.09.2025 — 09:30',
    isRead: false,
  },
  {
    id: 3,
    type: 'success',
    title: 'Проект прошел полную модерацию',
    description:
      'Хорошие новости! Ваш проект «магазин одежды» получил окончательную категорию. Вы уже можете приступить к настройке интеграции. С документацией можно ознакомиться по ссылке. Подключить онлайн кассу можно здесь. Если на этапе модерации проекта у вас возникли проблемы, то напишите в наш отдел контроля качества: feedback-security@unipay.ru или https://t.moj.UnipayFeedback_bot. Мы разберемся в ситуации и постараемся помочь. Подписывайтесь на наш Telegram-канал, в нем мы публикуем самую актуальную информацию.',
    date: '22.09.2025 — 11:15',
    isRead: false,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Проблема с кассой',
    description:
      'Внимание! Стало невозможным провести чек по кассе. Убедитесь, что касса не отключена, а фискальный накопитель не переполнен.',
    date: '23.09.2025 — 16:20',
    isRead: false,
  },
  {
    id: 5,
    type: 'danger',
    title: 'Критическая ошибка',
    description:
      'Внимание! Стало невозможным провести чек по кассе. Убедитесь, что касса не отключена, а фискальный накопитель не переполнен.',
    date: '24.09.2025 — 08:45',
    isRead: false,
  },
  {
    id: 6,
    type: 'danger',
    title: 'Свернутое прочитанное уведомление без кнопок действия',
    description:
      'Это тестовое уведомление без дополнительных действий. Оно уже было прочитано пользователем.',
    date: '25.09.2025 — 13:10',
    isRead: true,
  },
];

const NotificationsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mockNotifications.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(mockNotifications.length / itemsPerPage);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col grow-1 justify-between gap-y-[24px]">
      <div className="flex flex-col gap-[8px] flex-wrap">
        {currentItems.map((item) => (
          <NotificationCard
            key={item.id}
            title={item.title}
            date={item.date}
            type={item.type}
            description={item.description}
            isRead={item.isRead}
          />
        ))}
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        pageSizeOptions={[
          { label: '5', value: '5' },
          { label: '10', value: '10' },
          { label: '15', value: '15' },
        ]}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default NotificationsList;
