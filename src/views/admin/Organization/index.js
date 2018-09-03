import React, { Component } from 'react'
import Helper from '../helper/helper'

class Organization extends Component {
  constructor(props) {
    super(props)
    this.initfetch = [
      {
        id: '',
        name: '',
        owner: null,
        budget: 0,
        bid: 0,
        category: [],
        country: [],
        persons: [],
      },
    ]
    this.initplaceholder = {
      id: 'ID',
      name: 'String*@',
      budget: 'Int*@',
      bid: 'Int*@',
      category: '[Category]',
      country: '[Country]',
      owner: 'User',
      persons: '[Person]',
    }
  }

  render() {
    const {
      data,
      deleteOrganization,
      upsertOrganization,
      organization,
      organizationsub,
      screenProps,
      navigation,
      parentId,
    } = this.props

    //const selected = this.state.selected;
    console.log('updateOrganization', data.organizations, this.props)
    //  const organizations = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allOrganizations;
    const initfetch = this.initfetch[0]
    let datas = data.organizations
    const valid = datas && datas.length > 0
    if (!valid) {
      datas = this.initfetch
    } else {
      //make sure null rows are replaced by initvalue
      let cp = datas.map(slot => {
        Object.keys(slot).map((key, index) => {
          var n = slot[key]
          slot[key] = n == null ? initfetch[key] : n
        })
        return slot
      })
      datas = cp
    }

    const passProps = {
      ...this.props.navigation.state.params,
    }
    /*
    const SwitchChildren = createSwitchNavigator({
      Person: mRoute.Routes["Person"],
      User: mRoute.Routes["User"]
    });*/
    //{organizations && organizations.map((organization, i) => (<Title key={"tt" + i}>{organization.name}</Title>))}
    return (
      <Helper
        tofetch={datas}
        initfetch={initfetch}
        placeholder={this.initplaceholder}
        selector="name"
        subscribe={organizationsub}
        navigation={navigation}
        deleteQuery={deleteOrganization}
        upsertQuery={upsertOrganization}
        selectQuery={organization}
        selectResultSelect="organization"
        root="Organization"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    )
  }
}
//
Organization.propTypes = {}
Organization.defaultProps = {
  connected: false,
  parent: '',
  parentId: 0,
  selectedId: null,
}

export default Organization
