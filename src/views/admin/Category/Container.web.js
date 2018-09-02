import { graphql, compose, withApollo } from "react-apollo";

import {
  upsertCategory,
  Category,
  deleteCategory,
  Categories,
  Categoriessub
} from "./query.gql";
import { loader } from "../loader";
import Comp from "./index";
// import ResortComp from "../resort/ResortContainer";

// TODO: Faster mutation by invalidating cache instead of using refetchQueries

const CategoryOut = compose(
  withApollo,
  graphql(Categories),
  graphql(deleteCategory, {
    props: ({ mutate, ownProps }) => ({
      deleteCategory: ({ id, name }) =>
        mutate({
          variables: { id, name },
          refetchQueries: [
            {
              query: Categories
            }
          ]
        })
    })
  }),
  graphql(upsertCategory, {
    props: ({ mutate, ownProps }) => ({
      Categoriessub: () =>
        ownProps.client.subscribe({
          query: Categoriessub,
          fetchPolicy: "network-only",
          variables: {
            mutation_in: ["CREATED", "UPDATED", "DELETED"]
          }
        }),
      Category: ({ id, name }) =>
        ownProps.client.query({
          query: Category,
          fetchPolicy: "network-only",
          variables: { id, name }
        }),
      upsertCategory: ({ id, name }) =>
        mutate({
          variables: { id, name },
          refetchQueries: [
            {
              query: Categories
            }
          ]
        })
    })
  }),
  loader
)(Comp);

export default CategoryOut;
