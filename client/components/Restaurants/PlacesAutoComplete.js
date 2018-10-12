import debounce from 'lodash.debounce'
import React, {Component} from 'react'
import {saveRestaurant} from '../../store'
import {connect} from 'react-redux'
import {Search, Button, Icon, Container, Form} from 'semantic-ui-react'
import styles from '../Utils/Global.css'

const autocompleteService = new google.maps.places.AutocompleteService()

class PlacesAutoComplete extends Component {
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

  handleSubmit = async event => {
    event.preventDefault()
    console.log('PLACE', this.state.selectedPlace)
    await this.props.addRestaurant(this.state.selectedPlace)
  }

  handleSearchChange = (e, {value}) => {
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
    const {isLoading, value, results} = this.state
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group inline>
            <Search
              style={styles.placeSearch}
              placeholder="Add restaurant by name"
              input={{fluid: true}}
              loading={isLoading}
              fluid
              onResultSelect={this.handleResultSelect}
              onSearchChange={debounce(this.handleSearchChange, 500, {
                leading: true
              })}
              results={results}
              value={value}
            />
            <Button icon="plus" color="google plus" size="medium" style={styles.mLeft}/>
          </Form.Group>
        </Form>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addRestaurant: rest => dispatch(saveRestaurant(rest))
})

export default connect(null, mapDispatchToProps)(PlacesAutoComplete)
