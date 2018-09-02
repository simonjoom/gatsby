import { graphql, compose, withApollo } from "react-apollo";

import {
  upsertCountry,
  Country,
  deleteCountry,
  Countries,
  Countriessub
} from "./query.gql";
import { loader } from "../loader";
import Comp from "./index";
// import ResortComp from "../resort/ResortContainer";

import { createStackNavigator } from "react-navigation";
// TODO: Faster mutation by invalidating cache instead of using refetchQueries

const CountryOut = compose(
  withApollo,
  graphql(Countries),
  graphql(deleteCountry, {
    props: ({ mutate, ownProps }) => ({
      deleteCountry: ({ name }) =>
        mutate({
          variables: { name },
          refetchQueries: [
            {
              query: Countries
            }
          ]
        })
    })
  }),
  graphql(upsertCountry, {
    props: ({ mutate, ownProps }) => ({
      Countriessub: () =>
        ownProps.client.subscribe({
          query: Countriessub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
      Country: ({ id }) =>
        ownProps.client.query({
          query: Country,
          fetchPolicy: "network-only",
          variables: { id }
        }),
      upsertCountry: ({ id, name }) =>
        mutate({
          variables: { id, name },
          refetchQueries: [
            {
              query: Countries
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default CountryOut;
