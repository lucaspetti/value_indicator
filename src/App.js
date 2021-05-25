import { useState } from 'react'
import SearchBar from './SearchBar'
import './App.css'

const apikey = process.env.API_KEY

function App() {
  const [stockInfo, setStockInfo] = useState({})

  async function getStock(symbol) {
    const endpoint = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${apikey}`

    const response = await fetch(endpoint, {})
    const result = await response.json()

    if (Object.keys(result).length === 0) {
      setStockInfo({ error: 'Not found' })
      return ''
    }

    setStockInfo(result)
  }

  function checkStockInfo() {
    if (stockInfo.error === 'Not found') {
      return <h4>Sorry, could not find that</h4>
    } else if (stockInfo.Symbol) {
      return stockInfoList()
    } else {
      return <h4>Look for a stock</h4>
    }
  }

  function stockInfoList() {
    return (
      <ul style={{ 'listStyle': 'none' }}>
        <li>
          {stockInfo.Symbol}
        </li>
        <h4>Ratios</h4>
        <li>
          PE Ratio: {stockInfo.PERatio}
        </li>
        <li>
          PEG Ratio: {stockInfo.PEGRatio}
        </li>
        <li>
          PB Ratio: {stockInfo.PriceToBookRatio}
        </li>
        <li>
          EPS: {stockInfo.EPS}
        </li>
        <h4>Dividends</h4>
        <li>
          Dividend Per Share: {stockInfo.DividendPerShare}
        </li>
        <li>
          Dividend Yield: {stockInfo.DividendYield}
        </li>
        <li>
          Payout Ratio: {stockInfo.PayoutRatio}
        </li>
        <li>
          Dividend Date:     {stockInfo.DividendDate}
        </li>
        <li>
          Ex Dividend Date:  {stockInfo.ExDividendDate}
        </li>
      </ul>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar onSubmit={getStock} />
        {checkStockInfo()}
      </header>
    </div>
  );
}

export default App;
