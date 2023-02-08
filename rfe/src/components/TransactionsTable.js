import { useState, useEffect } from "react";
import axios from 'axios';

function EntityRow({ id, name, income, expense }) {
    return (
        <tr>
            <td>
                <a className={"link"} href={`/entities/${id}`}>
                    {name}
                </a>
            </td>
            <td className="text-green-500 text-right">${income}</td>
            <td className="text-red-500 text-right">- ${expense}</td>
            <td className="text-right">${income - expense}</td>
        </tr>
    );
}

export default function TransactionsTable() {
    
  useEffect(() => {
    getDashboard()
    }, []
  )

  let [dashboardItems, setDashboardItems] = useState([]);
    let finalTable = [];
  const getDashboard =(async () => {
    let res = await axios.get('/dashboard');
    //let data = await JSON.stringify(res.data);
    console.log(res.data);
    setDashboardItems(res.data.payeeSorted);
  })

    // let arr = data.payeeSorted;
    dashboardItems.forEach(line => {
        console.log(line);
        finalTable.push(
           <EntityRow id={line._id} name={line.payee} income={line.totalIncome} expense={line.totalExpense} /> 
        )
    })

    return (
    <table class="table table-compact w-full">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col" class="text-right">Income</th>
                <th scope="col" class="text-right">Expense</th>
                <th scope="col" class="text-right">Net</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
                <td colspan="6">
                <p class="text-center">No transactions found.</p>
                </td>
            </tr> */}
            {finalTable}
        </tbody>
        {/* <tfoot>
            <tr>
            <td class="text-base-content uppercase">Total</td>
            <td class="text-green-500 text-right">$<%= payeeAllIncome %></td>
            <td class="text-red-500 text-right">- $<%= payeeAllExpense %></td>
            <td class="text-base-content text-right">$<%= payeeAllIncome - payeeAllExpense %></td>
            </tr>
        </tfoot> */}
    </table>
    );
}