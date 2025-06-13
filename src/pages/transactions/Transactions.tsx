import TransactionsFilter from "./components/TransactionsFilter";
import TransactionInfo from "./components/TransactionsInfo";
import TransactionTable from "./components/TransactionTable";

const Transaction = () => {
    return (
        <div className="2xl:px-[32px] md:px-[24px] px-[16px] flex flex-col gap-[14px] max-sm:gap-[9px]">
            <div className="flex flex-col">
                <h1 className="2xl:text-[30px] xl:text-[26px] md:text-[24px] sm:text-[22px] text-[18px] font-semibold 2xl:leading-[40px] xl:leading-[32px] sm:leading-[30px] leading-[16px] tracking-[0.06rem]">Транзакции</h1>
                <span className="text-[12px] xl:text-[14px] sm:text-[12px] tracking-[0.04rem]">Описание раздела</span>
            </div>
            <TransactionInfo />
            <TransactionsFilter />
            <TransactionTable />
        </div>
    )
}

export default Transaction;