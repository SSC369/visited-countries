import {useState} from 'react'
import './index.css'

const Countries = props => {
  const {initialCountriesList} = props
  const [visitedCountriesList, visitCountry] = useState(initialCountriesList)

  const onClickVisit = id => {
    visitCountry(prev => {
      const filteredCountries = prev.map(country => {
        if (country.id === id) {
          return {
            ...country,
            isVisited: true,
          }
        }
        return country
      })
      return filteredCountries
    })
  }

  const onClickRemove = id => {
    visitCountry(prev => {
      const filteredCountries = prev.map(country => {
        if (country.id === id) {
          return {
            ...country,
            isVisited: false,
          }
        }
        return country
      })
      return filteredCountries
    })
  }

  const visitedPlaces = visitedCountriesList.filter(
    eachCountry => eachCountry.isVisited,
  )

  return (
    <div className="main-container">
      <h1 className="heading">Countries</h1>
      <ul className="countries-list-container">
        {visitedCountriesList.map(item => (
          <li key={item.id}>
            <p>{item.name}</p>
            {item.isVisited ? (
              <p>Visited</p>
            ) : (
              <button onClick={() => onClickVisit(item.id)} type="button">
                Visit
              </button>
            )}
          </li>
        ))}
      </ul>
      <h1>Visited Countries</h1>

      {visitedPlaces.length === 0 ? (
        <p>No Countries Visited Yet</p>
      ) : (
        <ul className="visited-countries-list">
          {visitedCountriesList.map(country => {
            if (country.isVisited) {
              return (
                <li key={country.id}>
                  <img
                    src={country.imageUrl}
                    alt="thumbnail"
                    className="image"
                  />
                  <div className="name-button-container">
                    <p className="name">{country.name}</p>
                    <button
                      onClick={() => onClickRemove(country.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            }
            return null
          })}
        </ul>
      )}
    </div>
  )
}

export default Countries
