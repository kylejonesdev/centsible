function OptionsBlock({ choices }) {
  let optionsBlock = choices.map(option => {
    return (
      <option key={option.value} value={option.value}>{option.text}</option>
    )
  })
  return optionsBlock
}

export default function SortForm(
    { 
      sortBy,
      onSortByChange,
      sortDirection,
      onSortDirectionChange,
      startDate,
      onStartDateChange,
      endDate,
      onEndDateChange,
      choices,
      clearUrl
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
            <OptionsBlock choices={choices} />
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
        {/* <button className="btn btn-accent btn-sm self-center" type="submit">Apply</button> */}
        <a href={clearUrl} className="btn btn-outline btn-primary btn-sm self-center">Clear</a>
      </form>
    );
}