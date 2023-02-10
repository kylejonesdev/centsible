function EntityRow({ id, name, income, expense }) {
    let total = income - expense
    return (
        <tr>
            <td>
                <a className={"link"} href={`/entities/${id}`}>
                    {name}
                </a>
            </td>
            <td className="text-green-500 text-right">${income}</td>
            <td className="text-red-500 text-right">- ${expense}</td>
            <td className="text-right">${total}</td>
        </tr>
    );
}

function TotalRow({ income, expense}) {
    let total = income - expense;
    return (
        <tr>
        <td className="text-base-content uppercase">Total</td>
        <td className="text-green-500 text-right">${income}</td>
        <td className="text-red-500 text-right">- ${expense}</td>
        <td className="text-base-content text-right">${total}</td>
        </tr>
    );
}

export default function TransactionsTable({ options }) {
    let transactionsTableRows = [];
    let totalExpense = 0;
    let totalIncome = 0;
    if(options.data) {
        options.data[`${options.objName}Sorted`].forEach(line => {
            totalIncome += line.totalIncome;
            totalExpense += line.totalExpense;
            transactionsTableRows.push(
               <EntityRow key={line._id} id={line._id} name={line[options.objName]} income={line.totalIncome} expense={line.totalExpense} /> 
            )
        })        
    }
    return (
    <table className="table table-compact w-full">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col" className="text-right">Income</th>
                <th scope="col" className="text-right">Expense</th>
                <th scope="col" className="text-right">Net</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
                <td colspan="6">
                <p class="text-center">No transactions found.</p>
                </td>
            </tr> */}
            {transactionsTableRows}
        </tbody>
        <tfoot>
            <TotalRow income={totalIncome} expense={totalExpense}/>
        </tfoot>
    </table>
    );
}