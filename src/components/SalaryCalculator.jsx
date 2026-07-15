import React from 'react'

function SalaryCalculator() {
  return (
    <div>
        <h2>Salary Calculator</h2>
        <form action="" method="post">
            <label htmlFor="Gross Salary">Gross Salary:</label>
            <input type="number" id="Gross Salary" name="Gross Salary" />
            <button type="submit">Calculate Net Salary</button>
        </form>
        </div>
  )
}

export default SalaryCalculator