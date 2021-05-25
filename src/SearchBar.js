import { useState } from 'react'

const SearchBar = (props) => {
  const [query, setQuery] = useState('')

  const searchSymbol = event => {
    props.onSubmit(query)
    event.preventDefault()
  }

  function handleQueryChange(event) {
    setQuery(event.target.value)
  }

  return (
    <form action="/" method="get" onSubmit={searchSymbol}>
      <input
        value={query}
        onChange={handleQueryChange}
        type="text"
        id="header-search"
        placeholder="AAPL"
        name="s"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
