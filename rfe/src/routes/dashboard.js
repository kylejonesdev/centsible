import { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "../components/TransactionsTable";
import Header from "../components/Header";
import Footer from "../components/Footer";

function SortForm(
  { 
    sortBy,
    onSortByChange,
    sortDirection,
    onSortDirectionChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange
  }) {

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(sortBy);
    console.log(sortDirection);
  }
  return (
    <form 
      onSubmit={handleFormSubmit}
      className="flex flex-wrap justify-end gap-x-2 mx-4 sm:mx-0"
    >
      <div className="form-control">
        <label htmlFor="filterSortBy" className="label">
          <span className="label-text">Sort By</span>
        </label>
        <select
          id="filterSortBy"
          name="filterSortBy"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)} 
          className="select select-ghost select-xs max-w-xs"
          >
          <option value=""></option>
          <option value="name">Name</option>
          <option value="totalIncome">Income</option>
          <option value="totalExpense">Expense</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="filterSortDirection" className="label">
          <span className="label-text">Direction</span>
        </label>
        <select
        id="filterSortDirection"
        name="filterSortDirection"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value)}
        className="select select-ghost select-xs max-w-xs">
          <option value=""></option>
          <option value="-1">Descending</option>
          <option value="1">Ascending</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="filterDateRangeStart" className="label">
          <span className="label-text">Start Date</span>
        </label>
        <input
          id="filterDateRangeStart"
          type="date"
          className="input input-ghost input-xs"
          name="filterDateRangeStart"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="filterDateRangeEnd" className="label">
          <span className="label-text">End Date</span>
        </label>
        <input
          id="filterDateRangeEnd"
          type="date"
          className="input input-ghost input-xs"
          name="filterDateRangeEnd"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </div>
      <button className="btn btn-accent btn-sm self-center" type="submit">Apply</button>
      <a href="/dashboard" className="btn btn-outline btn-primary btn-sm self-center">Clear</a>
    </form>
  );
}

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