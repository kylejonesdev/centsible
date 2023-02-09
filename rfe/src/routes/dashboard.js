import { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "../components/TransactionsTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SortForm from "../components/SortForm";

export default function Dashboard() {

  let [sortBy, setSortBy] = useState("");
  let [sortDirection, setSortDirection] = useState("");
  let [dashboardItems, setDashboardItems] = useState(null);
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios.post(
      '/dashboard',
      {
          filterSortBy: sortBy,
          filterSortDirection: sortDirection,
          filterDateRangeStart: startDate,
          filterDateRangeEnd: endDate
      },
    )
    .then((res) => setDashboardItems(res.data))
  }, [sortBy, sortDirection, startDate, endDate])

  return (
    <>
      <Header />
      <main className="sm:container mx-auto">
        <div className="filter-row">
          <header className="self-center">
            <h1 className="filter-row-title">Dashboard</h1>
          </header>
          <section className="w-full lg:w-auto self-center">
            <SortForm
            sortBy={sortBy}
            onSortByChange={setSortBy}
            sortDirection={sortDirection}
            onSortDirectionChange={setSortDirection}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            choices={
              [
                {value: "name", text: "Name"},
                {value: "totalIncome", text: "Income"},
                {value: "totalExpense", text: "Expense"}
              ]
            }
            clearUrl={'/dashboard'}
            />
          </section>
        </div>
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 lg:col-span-6 main-card">
            <header>
              <h2 className="table-title">Transactions by Payee</h2>
            </header>
            <section className="overflow-x-auto ">
              <TransactionsTable
                options={
                  {
                    data: dashboardItems, 
                    objName: "payee",
                  }
                }
              />              
            </section>
          </div>
          <div className="col-span-12 lg:col-span-6 main-card">
            <header>
              <h2 className="table-title">Transactions by Account</h2>
            </header>
            <section className="overflow-x-auto">
              <TransactionsTable
                options={
                  {
                    data: dashboardItems, 
                    objName: "account"
                  }
                }
              />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}