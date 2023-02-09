import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AddATransaction({ transactions }) {
  
  let entitiesArr = [];
  let accountsArr = [];

  if (transactions) {
    entitiesArr = transactions.entities.map(item => {
      return (
        <option value={item._id}>{item.name}</option>
      )
    })
    accountsArr = transactions.accounts.map(item => {
      return (
        <option value={item._id}>{item.name}</option>
      )
    })
  }

  return(
    <>
      <div class="main-card">
      <header>
        <h2 class="table-title">Add a Transaction</h2>
      </header>
      <section>
        {/* <% if(locals.messages.errors){ %>
          <% messages.errors.forEach(item => { %>
            <div class="alert alert-error my-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><%= item.msg %></span>
              </div>
            </div>
          <% }) %>
        <% } %> */}
        <form class="grid grid-cols-12 gap-x-4 gap-y-2" action="/transactions/add" enctype="multipart/form-data" method="POST">
          <div class="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label for="date" class="label">
              <span class="label-text">Date</span>
            </label>
            <input
              id="date"
              class="input input-bordered input-sm"
              type="date"
              name="date"
            />
          </div>
          <div class="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label for="payee" class="label justify-start">
              <span class="label-text">Payee</span>
              <a href="/entities" class="px-2 fa fa-circle-plus fa-xl text-primary"><span class="sr-only">Add New</span></a> 
            </label>
            <select 
              class="select select-bordered select-sm"
              id="payee"
              name="payee"
            >
              <option disabled selected value="">Select</option>
              {entitiesArr}
            </select>
          </div>
          <div class="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label for="account" class="label justify-start">
              <span class="label-text">Account</span>
              <a href="/accounts" class="px-2 fa fa-circle-plus fa-xl text-primary"><span class="sr-only">Add New</span></a> 
            </label>
            <select
              class="select select-bordered select-sm"
              id="account"
              name="account"
            >
              <option disabled selected value="">Select</option>
              {accountsArr}
            </select>
          </div>
          <div class="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label for="amount" class="label">
              <span class="label-text">Amount</span>
            </label>
            <div class="input-group grid grid-cols-5">
              <span class="justify-center font-semibold bg-base-200 text-inherit">$</span>
              <input
                id="amount"
                class="input input-bordered input-sm col-span-4"
                type="number"
                name="amount"
              />
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 md:col-span-4 flex justify-around items-end gap-x-2">
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-2">Income</span> 
                <input
                  type="radio"
                  name="type"
                  class="radio checked:bg-green-500"
                  value="Income"
                />
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer ">
                <span class="label-text mr-2">Expense</span> 
                <input
                  type="radio"
                  name="type"
                  class="radio checked:bg-red-500"
                  value="Expense"
                />
              </label>
            </div>
          </div>
          <div class="form-control col-span-12 sm:col-span-6">
            <label for="imgUpload" class="label">
              <span class="label-text">Documentation</span>
            </label>
            <input
              id="imgUpload"
              type="file"
              class="input input-bordered input-sm file:btn file:btn-primary file:btn-sm file:h-full file:hover:bg-primary-focus file:mr-4 file:-ml-4 file:px-4 file:rounded-r-none"
              name="file"
            />              
          </div>
          <div class="form-control col-span-12 md:col-span-6">
            <label for="description" class="label">
              <span class="label-text">Description</span>
            </label>
            <textarea
              class="textarea textarea-bordered"
              id="description"
              name="description"
            ></textarea>
          </div>
          <div class="col-span-12 justify-self-center mt-8">
            <button id="add-transaction" class="btn btn-accent" type="submit">Add Transaction</button>
          </div>
        </form>
      </section>
      </div>
    </>
  );
}

function LineItem({ line }) {
  return (
    <tr>
      <td>{line.date}</td>
      <td>
        <a class="link" href={`/entities/${line.payeeId}`}>
          {line.payee}
        </a>
      </td>
      <td>
        <a class="link" href={`/entities/${line.accountId}`}>
          {line.account}
        </a>
      </td>
      {
        line.income > 0 ? 
        <td class="text-green-500 text-right">${line.income}</td> : 
        <td class="text-red-500 text-right">- ${line.expense}</td>
      }
      <td class="border-b-0 text-right">
        <a href={`/transactions/${line._id}`}>
          <button class="btn btn-outline btn-primary btn-xs fa-solid fa-ellipsis" value="transaction-details"><span class="sr-only">Details</span></button>
        </a>
        <form action={`/transactions/delete/${line._id}?_method=DELETE`} method="POST" class="inline">
          <button class="btn btn-error btn-xs fa fa-trash" type="submit" value="delete-transaction"><span class="sr-only">Delete</span></button>
        </form>
      </td>
    </tr>
  )
}

function TransactionsTable({ transactions }) {
  let readable = JSON.stringify(transactions);
  let lineItems = [];
  let transactionsTotal = 0;
  if(transactions) {
    transactions.transactions.forEach(line => {
      lineItems.push(
        <LineItem key={line._id} line={line}/>
      );
      transactionsTotal += (line.income - line.expense)
    })
  }

  return (
    <div class="main-card">
      <header>
        <h2 class="table-title">Transactions</h2>
      </header>
      {/* {readable} */}
      <section class="overflow-x-auto">
        <table class="table table-compact w-full">
          <thead>
              <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Payee</th>
                  <th scope="col">Account</th>
                  <th scope="col" class="text-right">Amount</th>
                  <th scope="col" class="text-right">Info/Delete</th>
              </tr>
          </thead>
          <tbody>
            {/* <% if(!transactions.length) { %>
              <tr>
                <td colspan="6">
                  <p class="text-center">No transactions found.</p>
                </td>
              </tr>
            <% } %>
            <% for(var i=0; i < transactions.length; i++) { %>          
              
            <% } %> */}
            {lineItems}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td class="uppercase text-base-content">Total</td>
              <td class="text-base-content text-right">${transactionsTotal}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </section> 
    </div>
  );
}

export default function Transactions() {
  
  let [transactions, setTransactions] = useState(null);
  
  useEffect(() => {
    axios.get(
      '/transactions',
    )
    .then((res) => setTransactions(res.data))
  }, [])

  return (
    <>
      <Header />
      <main class="sm:container mx-auto">
        <header>
          <h1 class="page-title">Transactions</h1>
        </header>
        <AddATransaction transactions={transactions} />
        <section>
          {/* <!-- Start of filter fields --> */}
          {/* <form action="/transactions/filter" method="POST" class="flex flex-wrap justify-end gap-x-2 m-4 sm:m-0"> 
            <!-- <div class="form-control">
              <label for="filterQuickDate" class="label">
                <span class="label-text">Quick Date Range</span>
              </label>
              <select id="filterQuickDate" name="filterQuickDate" class="select select-ghost select-xs max-w-xs" onchange="this.form.submit()">
                <option value=""></option>
                <option value="filterLastYear" >One year ago</option>
                <option value="filterLast30" >Last 30 days</option>
              </select>
            </div> -->
            <div class="form-control">
              <label for="filterSortBy" class="label">
                <span class="label-text">Sort By</span>
              </label>
              <select id="filterSortBy" name="filterSortBy" class="select select-ghost select-xs max-w-xs">
                <option value=""></option>
                <option value="date">Date</option>
                <option value="payee">Payee</option>
                <option value="account">Account</option>
                <option value="type">Income/Expense</option>
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
              <input id="filterDateRangeStart" type="date" class="input input-ghost input-xs" name="filterDateRangeStart" value="<%= filterDateRangeStart %>">
            </div>
            <div class="form-control">
              <label for="filterDateRangeEnd" class="label">
                <span class="label-text">End Date</span>
              </label>
              <input id="filterDateRangeEnd" type="date" class="input input-ghost input-xs" name="filterDateRangeEnd"  value="<%= filterDateRangeEnd %>">
            </div>
            <button class="btn btn-accent btn-sm self-center" type="submit">Apply</button>
            <a href="/transactions" class="btn btn-outline btn-primary btn-sm self-center">Clear</a>
          </form> */}
          {/* <!-- End of filter fields --> */}
        </section>
        <TransactionsTable transactions={transactions} />
      </main>
      <Footer />
    </>
  );
}