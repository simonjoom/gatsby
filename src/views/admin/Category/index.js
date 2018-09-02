import React, { Component } from "react";
import Helper from "../helper/helper";

//import { mRoute } from "src/config/AdminStack";
//import Person from "../Person/Container";
//import User from "../User/Container";

class Category extends Component {
  constructor(props) {
    super(props);
    this.initfetch = [
      {
        id: "",
        name: ""
      }
    ];
    this.initplaceholder = {
      id: "ID",
      name: "String*@"
    };
  }

  render() {
    const {
      data,
      deleteCategory,
      upsertCategory,
      Category,
      Categoriessub,
      screenProps,
      navigation,
      parentId,
    } = this.props;

    //const selected = this.state.selected;
    console.log("updateCategory", data.categories, this.props);
    //  const Categorys = (!!this.state.fetched_list.length) ? this.state.fetched_list : data.allCategorys;

    let datas = data.categories;
    if (!(datas && datas.length > 0)) datas = this.initfetch;
    const passProps = {
      ...this.props.navigation.state.params
    };
/*
    const SwitchChildren = createSwitchNavigator({
      Person: mRoute.Routes["Person"],
      User: mRoute.Routes["User"]
    });*/
    
    //{Categorys && Categorys.map((Category, i) => (<Title key={"tt" + i}>{Category.name}</Title>))}
    return (
      <Helper
        tofetch={datas}
        placeholder={this.initplaceholder}
        selector="id"
        subscribe={Categoriessub}
        navigation={navigation}
        deleteQuery={deleteCategory}
        upsertQuery={upsertCategory}
        selectQuery={Category}
        selectResultSelect="category"
        root="Category"
        parentId={parentId} 
        passProps={passProps}
        screenProps={screenProps}
      />
    );
  }
}
//
Category.propTypes = {};
Category.defaultProps = {
  connected: false, 
  parentId: 0,
};

export default Category;
