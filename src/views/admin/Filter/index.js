import React, { Component } from 'react'
import { View, TouchableOpacity, Dimensions, Text } from 'react-native'
import NavigationButton from 'src/components/navigationbuttonenhanced'

let { width, height } = {
  width: (Dimensions.get('window').width * 2) / 3,
  height: (Dimensions.get('window').height * 2) / 3,
}

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: { error: null, loading: true },
    }
    this.props.Categoriesandcountries().then(data => {
      console.log(data)
      if (!data[0].data.loading && !data[1].data.loading) {
        this.setState({
          data: {
            categories: data[0].data.categories,
            countries: data[1].data.countries,
            error: null,
            loading: false,
          },
        })
      }
    })
  }
  Button_OrganizationsForCountry = ({ text, validator, selector, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      mkey="name"
      selector={selector}
      onPress={name => {
        return this.props
          .OrganizationsForCountry({ namecountry: name })
          .then(({ data }) => {
            console.log(data)
            const map = data.organizations.filter(a => a.country.length > 0)
            const res = map.map(a => a.id)
            console.log('OrganizationsForCountry', name, res)
            return res
          })
          .catch(err => {
            console.log('error', err)
          })
      }}
    />
  )

  Button_OrganizationsForCategory = ({ text, validator, selector, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      mkey="name"
      selector={selector}
      onPress={name => {
        return this.props
          .OrganizationsForCategory({ namecategory: name })
          .then(({ data }) => {
            console.log(data)
            const map = data.organizations.filter(a => a.category.length > 0)
            const res = map.map(a => a.id)
            console.log('OrganizationsForCategory', name, res)
            return res
          })
          .catch(err => {
            console.log('error', err)
          })
      }}
    />
  )
  Button_availableOrganizationsForBudget = ({ text, validator, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      init="0"
      mkey="Budget"
      onPress={() => {
        return this.props
          .availableOrganizationsForBudget()
          .then(({ data }) =>
            console.log('availableOrganizationsForBudget', data)
          )
          .catch(err => {
            console.log('error', err)
          })
      }}
    />
  )
  Button_availableOrganizationsForBid = ({ text, validator, error }) => (
    <NavigationButton
      enabled={validator}
      text={text}
      init="0"
      mkey="Bid"
      onPress={() => {
        return this.props
          .availableOrganizationsForBid()
          .then(({ data }) => console.log('availableOrganizationsForBid', data))
          .catch(err => {
            console.log('error', err)
          })
      }}
    />
  )

  render() {
    const {
      data: { error, loading },
    } = this.state

    if (loading) return <View />
    else {
      const data = this.state.data
      console.log(
        'updatecountries',
        data.countries,
        data.categories,
        this.props
      )
      //  const organizations = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allOrganizations;

      let datacountries = data.countries
      const validcountries = datacountries && datacountries.length > 0
      let datacategories = data.categories
      const validcategories = datacategories && datacategories.length > 0
      console.log('datacategories', validcategories, datacategories)
      const Arr_but = [
        <this.Button_OrganizationsForCountry
          text="Filter Country"
          validator={validcountries}
          selector={datacountries}
        />,
        <this.Button_OrganizationsForCategory
          text="Filter Category"
          validator={validcategories}
          selector={datacategories}
        />,
        <this.Button_availableOrganizationsForBudget
          text="Filter Budget"
          validator="inputnotnull"
        />,
        <this.Button_availableOrganizationsForBid
          text="Filter Bid "
          validator="inputnotnull"
        />,
      ]

      return <View style={{ width: width }}>{Arr_but}</View>
    }
  }
}

export default Filter
