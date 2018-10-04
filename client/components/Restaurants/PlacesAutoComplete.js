import debounce from 'lodash.debounce'
import React, {Component, Fragment} from 'react'
import {Search} from 'semantic-ui-react'

const autocompleteService = new google.maps.places.AutocompleteService()

export default class PlacesAutoComplete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      results: [],
      value: '',
      selectedPlace: {}
    }
  }

  handleResultSelect = (e, {result}) => {
    this.setState({value: result.title, selectedPlace: result})
  }

  handleSearchChange = (e, {value}) => {
    console.log(value.length)

    if (value.length === 0) {
      this.setState({
        isLoading: false,
        results: [],
        value: '',
        selectedPlace: {}
      })
      return
    }

    this.setState({isLoading: true, value})
    autocompleteService.getPlacePredictions(
      {input: value},
      this.handleAutocompleteResult
    )
  }

  handleAutocompleteResult = (predictions, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.setState({
        isLoading: false,
        results: predictions.map(prediction => {
          return {
            key: prediction.id,
            title: prediction.structured_formatting.main_text,
            description: prediction.structured_formatting.secondary_text,
            source: prediction
          }
        })
      })
    }
  }

  render() {
    const {isLoading, value, results, selectedPlace} = this.state
    console.log({value})

    return (
      <Fragment>
        <Search
          placeholder="Search for restaurants by name to add more"
          fluid
          input={{fluid: true}}
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props}
        />
      </Fragment>
    )
  }
}
