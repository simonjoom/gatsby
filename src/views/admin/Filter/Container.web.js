import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import {
  CategoriesF,
  CountriesF,
  OrganizationsForCountry,
  OrganizationsForCategory,
  availableOrganizationsForBudget,
  availableOrganizationsForBid,
} from './query.gql'
import Comp from './index'
// import ResortComp from "../resort/ResortContainer";

// TODO: Faster mutation by invalidating cache instead of using refetchQueries
function getProps(props, client) {
  const mprops = {
    Categories: () =>
      client.query({
        query: CategoriesF,
        fetchPolicy: 'network-only',
      }),
    Countries: () =>
      client.query({
        query: CountriesF,
        fetchPolicy: 'network-only',
      }),
    OrganizationsForCountry: ({ namecountry }) =>
      client.query({
        query: OrganizationsForCountry,
        fetchPolicy: 'network-only',
        variables: { namecountry },
      }),
    OrganizationsForCategory: ({ namecategory }) =>
      client.query({
        query: OrganizationsForCategory,
        fetchPolicy: 'network-only',
        variables: { namecategory },
      }),
    availableOrganizationsForBudget: ({ budget }) =>
      client.query({
        query: availableOrganizationsForBudget,
        fetchPolicy: 'network-only',
        variables: { budget },
      }),
    availableOrganizationsForBid: ({ bid }) =>
      client.query({
        query: availableOrganizationsForBid,
        fetchPolicy: 'network-only',
        variables: { bid },
      }),
  }
  mprops.Categoriesandcountries = () =>
    Promise.all([mprops.Categories(), mprops.Countries()])
  return { ...mprops, props }
}

const testl = WrappedComponent => {
  return class Wtestl extends Component {
    render() {
      this.props = getProps(this.props, this.props.client)
      return <WrappedComponent {...this.props} />
    }
  }
}

const FilterOut = compose(
  withApollo,
  testl
)(Comp)

export default FilterOut
