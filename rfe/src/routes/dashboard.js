
import TransactionsTable from "../components/TransactionsTable";

export default function Dashboard() {

  return (
    <main className="sm:container mx-auto">
      {/* <div class="main-card">
        <header>
          <h1 class="page-title">Dashboard</h1>
          <h2 class="table-title">Quick Navigation</h2>
        </header>
        <section class="flex flex-wrap gap-4 justify-between">
          <div class="">
            <a href="/transactions" class="btn btn-accent">Add Transaction</a>
          </div>
          <div class="">
            <a href="/entities" class="btn btn-accent">Add Entity</a>
          </div>
          <div class="">
            <a href="/accounts" class="btn btn-accent">Add Account</a>
          </div>
        </section>
      </div> */}
      <div className="filter-row">
        <header className="self-center">
          <h1 className="filter-row-title">Dashboard</h1>
        </header>
        <section className="w-full lg:w-auto self-center">
          <form action="/dashboard" method="POST" className="flex flex-wrap justify-end gap-x-2 mx-4 sm:mx-0">
            {/* <!-- <div class="form-control">
              <label for="filterQuickDate" class="label">
                <span class="label-text">Quick Date Range</span>
              </label>
              <select id="filterQuickDate" name="filterQuickDate" class="select select-ghost select-xs max-w-xs" onchange="this.form.submit()">
                <option value=""></option>
                <option value="filterLastYear" >One year ago</option>
                <option value="filterLast30" >Last 30 days</option>
              </select>
            </div> --> */}
            <div className="form-control">
              <label htmlFor="filterSortBy" className="label">
                <span className="label-text">Sort By</span>
              </label>
              <select id="filterSortBy" name="filterSortBy" className="select select-ghost select-xs max-w-xs">
                <option value=""></option>
                <option value="name">Name</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                {/* <!-- <option value="net">Net</option> --> */}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="filterSortDirection" className="label">
                <span className="label-text">Direction</span>
              </label>
              <select id="filterSortDirection" name="filterSortDirection" className="select select-ghost select-xs max-w-xs">
                <option value=""></option>
                <option value="-1">Descending</option>
                <option value="1">Ascending</option>
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="filterDateRangeStart" className="label">
                <span className="label-text">Start Date</span>
              </label>
              <input id="filterDateRangeStart" type="date" className="input input-ghost input-xs" name="filterDateRangeStart" value="<%= filterDateRangeStart %>" />
            </div>
            <div className="form-control">
              <label htmlFor="filterDateRangeEnd" className="label">
                <span className="label-text">End Date</span>
              </label>
              <input id="filterDateRangeEnd" type="date" className="input input-ghost input-xs" name="filterDateRangeEnd"  value="<%= filterDateRangeEnd %>" />
            </div>
            <button className="btn btn-accent btn-sm self-center" type="submit">Apply</button>
            <a href="/dashboard" className="btn btn-outline btn-primary btn-sm self-center">Clear</a>
          </form>
        </section>
      </div>
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-12 lg:col-span-6 main-card">
          <header>
            <h2 className="table-title">Transactions by Payee</h2>
          </header>
          <section className="overflow-x-auto ">
            <TransactionsTable options={{url: "/dashboard", objName: "payee"}} />              
          </section>
        </div>
        <div className="col-span-12 lg:col-span-6 main-card">
          <header>
            <h2 className="table-title">Transactions by Account</h2>
          </header>
          <section className="overflow-x-auto">
            <TransactionsTable options={{url: "/dashboard", objName: "account"}} />
          </section>
        </div>
      </div>
    </main>
  );
}