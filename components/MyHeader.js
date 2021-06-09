import React, { Component } from "react";
import { Header, Icon } from "react-native-elements";

export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  render() {
    return (
      <Header
        leftComponent={
          <Icon
            name="bars"
            type="font-awesome"
            color="black"
            onPress={() => this.props.navigation.toggleDrawer()}
          />
        }
        centerComponent={{
          text: this.props.title,
          style: {
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: -5,
          },
        }}
        backgroundColor="paleturquoise"
      />
    );
  }
}
