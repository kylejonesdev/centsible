
import TransactionsTable from "../components/TransactionsTable";

export default function Dashboard() {


  return (
    <>
      <main class="sm:container mx-auto">
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
        <div class="filter-row">
          <header class="self-center">
            <h1 class="filter-row-title">Dashboard</h1>
          </header>
          <section class="w-full lg:w-auto self-center">
            <form action="/dashboard" method="POST" class="flex flex-wrap justify-end gap-x-2 mx-4 sm:mx-0">
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
              <div class="form-control">
                <label for="filterSortBy" class="label">
                  <span class="label-text">Sort By</span>
                </label>
                <select id="filterSortBy" name="filterSortBy" class="select select-ghost select-xs max-w-xs">
                  <option value=""></option>
                  <option value="name">Name</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  {/* <!-- <option value="net">Net</option> --> */}
                </select>
              </div>
              <div class="form-control">
                <label for="filterSortDirection" class="label">
                  <span class="label-text">Direction</span>
                </label>
                <select id="filterSortDirection" name="filterSortDirection" class="select select-ghost select-xs max-w-xs">
                  <option value=""></option>
                  <option value="-1">Descending</option>
                  <option value="1">Ascending</option>
                </select>
              </div>
              <div class="form-control">
                <label for="filterDateRangeStart" class="label">
                  <span class="label-text">Start Date</span>
                </label>
                <input id="filterDateRangeStart" type="date" class="input input-ghost input-xs" name="filterDateRangeStart" value="<%= filterDateRangeStart %>" />
              </div>
              <div class="form-control">
                <label for="filterDateRangeEnd" class="label">
                  <span class="label-text">End Date</span>
                </label>
                <input id="filterDateRangeEnd" type="date" class="input input-ghost input-xs" name="filterDateRangeEnd"  value="<%= filterDateRangeEnd %>" />
              </div>
              <button class="btn btn-accent btn-sm self-center" type="submit">Apply</button>
              <a href="/dashboard" class="btn btn-outline btn-primary btn-sm self-center">Clear</a>
            </form>
          </section>
        </div>
        <div class="grid grid-cols-12 gap-x-4">
          <div class="col-span-12 lg:col-span-6 main-card">
            <header>
              <h2 class="table-title">Transactions by Payee</h2>
            </header>
            <section class="overflow-x-auto ">
              <TransactionsTable />              
            </section>
          </div>

          <div class="col-span-12 lg:col-span-6 main-card">
            <header>
              <h2 class="table-title">Transactions by Account</h2>
            </header>
            <section class="overflow-x-auto">
              <table class="table table-compact w-full">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" class="text-right">Income</th>
                        <th scope="col" class="text-right">Expense</th>
                        <th scope="col" class="text-right">Net</th>
                    </tr>
                </thead>
                {/* <tbody>
                  <% if(!accountSorted.length) { %>
                    <tr>
                      <td colspan="6">
                        <p class="text-center">No transactions found.</p>
                      </td>
                    </tr>
                  <% } %>
                  <% for(var i=0; i < accountSorted.length; i++) { %>          
                    <tr>
                      <td>
                        <a class="link" href="/accounts/<%= accountSorted[i]._id %>">
                          <%= accountSorted[i].account %>
                        </a>
                      </td>
                      <td class="text-green-500 text-right">$<%= accountSorted[i].totalIncome %></td>
                      <td class="text-red-500 text-right">- $<%= accountSorted[i].totalExpense %></td>
                      <td class="text-right">$<%= accountSorted[i].totalIncome - accountSorted[i].totalExpense %></td>
                    </tr>
                  <% } %>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="text-base-content uppercase">Total</td>
                    <td class="text-green-500 text-right">$<%= accountAllIncome %></td>
                    <td class="text-red-500 text-right">- $<%= accountAllExpense %></td>
                    <td class="text-base-content text-right">$<%= accountAllIncome - accountAllExpense %></td>
                  </tr>
                </tfoot> */}
              </table>
            </section>
          </div>
        </div>
      </main>  
    </>
  );
}