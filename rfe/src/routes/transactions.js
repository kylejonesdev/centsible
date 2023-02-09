import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SortForm from '../components/SortForm';

function AddATransaction({ transactions }) {
  
  let entitiesArr = [];
  let accountsArr = [];

  if (transactions) {
    entitiesArr = transactions.entities.map(item => {
      return (
        <option key={item._id} value={item._id}>{item.name}</option>
      )
    })
    accountsArr = transactions.accounts.map(item => {
      return (
        <option key={item._id} value={item._id}>{item.name}</option>
      )
    })
  }

  return(
    <>
      <div className="main-card">
      <header>
        <h2 className="table-title">Add a Transaction</h2>
      </header>
      <section>
        {/* <% if(locals.messages.errors){ %>
          <% messages.errors.forEach(item => { %>
            <div className="alert alert-error my-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span><%= item.msg %></span>
              </div>
            </div>
          <% }) %>
        <% } %> */}
        <form className="grid grid-cols-12 gap-x-4 gap-y-2" action="/transactions/add" encType="multipart/form-data" method="POST">
          <div className="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="date" className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              id="date"
              className="input input-bordered input-sm"
              type="date"
              name="date"
            />
          </div>
          <div className="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="payee" className="label justify-start">
              <span className="label-text">Payee</span>
              <a href="/entities" className="px-2 fa fa-circle-plus fa-xl text-primary"><span className="sr-only">Add New</span></a> 
            </label>
            <select 
              className="select select-bordered select-sm"
              id="payee"
              name="payee"
              defaultValue=""
            >
              <option disabled value="">Select</option>
              {entitiesArr}
            </select>
          </div>
          <div className="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="account" className="label justify-start">
              <span className="label-text">Account</span>
              <a href="/accounts" className="px-2 fa fa-circle-plus fa-xl text-primary"><span className="sr-only">Add New</span></a> 
            </label>
            <select
              className="select select-bordered select-sm"
              id="account"
              name="account"
              defaultValue=""
            >
              <option disabled value="">Select</option>
              {accountsArr}
            </select>
          </div>
          <div className="form-control col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="amount" className="label">
              <span className="label-text">Amount</span>
            </label>
            <div className="input-group grid grid-cols-5">
              <span className="justify-center font-semibold bg-base-200 text-inherit">$</span>
              <input
                id="amount"
                className="input input-bordered input-sm col-span-4"
                type="number"
                name="amount"
              />
            </div>
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4 flex justify-around items-end gap-x-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">Income</span> 
                <input
                  type="radio"
                  name="type"
                  className="radio checked:bg-green-500"
                  value="Income"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer ">
                <span className="label-text mr-2">Expense</span> 
                <input
                  type="radio"
                  name="type"
                  className="radio checked:bg-red-500"
                  value="Expense"
                />
              </label>
            </div>
          </div>
          <div className="form-control col-span-12 sm:col-span-6">
            <label htmlFor="imgUpload" className="label">
              <span className="label-text">Documentation</span>
            </label>
            <input
              id="imgUpload"
              type="file"
              className="input input-bordered input-sm file:btn file:btn-primary file:btn-sm file:h-full file:hover:bg-primary-focus file:mr-4 file:-ml-4 file:px-4 file:rounded-r-none"
              name="file"
            />              
          </div>
          <div className="form-control col-span-12 md:col-span-6">
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              id="description"
              name="description"
            ></textarea>
          </div>
          <div className="col-span-12 justify-self-center mt-8">
            <button id="add-transaction" className="btn btn-accent" type="submit">Add Transaction</button>
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
        <a className="link" href={`/entities/${line.payeeId}`}>
          {line.payee}
        </a>
      </td>
      <td>
        <a className="link" href={`/entities/${line.accountId}`}>
          {line.account}
        </a>
      </td>
      {
        line.income > 0 ? 
        <td className="text-green-500 text-right">${line.income}</td> : 
        <td className="text-red-500 text-right">- ${line.expense}</td>
      }
      <td className="border-b-0 text-right">
        <a href={`/transactions/${line._id}`}>
          <button className="btn btn-outline btn-primary btn-xs fa-solid fa-ellipsis" value="transaction-details"><span className="sr-only">Details</span></button>
        </a>
        <form action={`/transactions/delete/${line._id}?_method=DELETE`} method="POST" className="inline">
          <button className="btn btn-error btn-xs fa fa-trash" type="submit" value="delete-transaction"><span className="sr-only">Delete</span></button>
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
    <div className="main-card">
      <header>
        <h2 className="table-title">Transactions</h2>
      </header>
      {/* {readable} */}
      <section className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
              <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Payee</th>
                  <th scope="col">Account</th>
                  <th scope="col" className="text-right">Amount</th>
                  <th scope="col" className="text-right">Info/Delete</th>
              </tr>
          </thead>
          <tbody>
            {/* <% if(!transactions.length) { %>
              <tr>
                <td colspan="6">
                  <p className="text-center">No transactions found.</p>
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
              <td className="uppercase text-base-content">Total</td>
              <td className="text-base-content text-right">${transactionsTotal}</td>
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
  let [sortBy, setSortBy] = useState("");
  let [sortDirection, setSortDirection] = useState("");
  let [startDate, setStartDate] = useState("");
  let [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios.post(
      '/transactions',
      {
        filterSortBy: sortBy,
        filterSortDirection: sortDirection,
        filterDateRangeStart: startDate,
        filterDateRangeEnd: endDate
      }
    )
    .then((res) => setTransactions(res.data))
  }, [sortBy, sortDirection, startDate, endDate])

  return (
    <>
      <Header />
      <main className="sm:container mx-auto">
        <header>
          <h1 className="page-title">Transactions</h1>
        </header>
        <AddATransaction transactions={transactions} />
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
                {value: "date", text: "Date"},
                {value: "payee", text: "Payee"},
                {value: "account", text: "Account"},
                {value: "income", text: "Income"},
                {value: "expense", text: "Expense"}
              ]
            }
            clearUrl={'/transactions'}
        />
        <TransactionsTable transactions={transactions} />
      </main>
      <Footer />
    </>
  );
}