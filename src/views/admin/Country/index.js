import React, { Component } from 'react'
import Helper from '../helper/helper'

class Country extends Component {
  constructor(props) {
    super(props)
    this.initfetch = [
      {
        id: '',
        name: '',
      },
    ]
    this.initplaceholder = {
      id: 'ID',
      name: 'String*@',
    }
  }

  render() {
    const {
      data,
      deleteCountry,
      upsertCountry,
      Country,
      Countriessub,
      screenProps,
      navigation,
      parentId,
    } = this.props

    //const selected = this.state.selected;
    console.log('updateCountry', data.countries, this.props)
    //  const Countrys = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allCountrys;

    let datas = data.countries
    if (!(datas && datas.length > 0)) datas = this.initfetch
    const passProps = {
      ...this.props.navigation.state.params,
    }
    /*
    const SwitchChildren = createSwitchNavigator({
      Person: mRoute.Routes["Person"],
      User: mRoute.Routes["User"]
    });*/

    //{Countrys && Countrys.map((Country, i) => (<Title key={"tt" + i}>{Country.name}</Title>))}
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="id"
        subscribe={Countriessub}
        navigation={navigation}
        deleteQuery={deleteCountry}
        upsertQuery={upsertCountry}
        selectQuery={Country}
        selectResultSelect="country"
        root="Country"
        parentId={parentId}
        passProps={passProps}
        screenProps={screenProps}
      />
    )
  }
}
//
Country.propTypes = {}
Country.defaultProps = {
  connected: false,
  parentId: 0,
}

export default Country
