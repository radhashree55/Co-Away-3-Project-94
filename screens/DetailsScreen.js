import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Header, Icon } from "react-native-elements";
import firebase from "firebase";
import db from "../config.js";
import { RFValue } from "react-native-responsive-fontsize";

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: firebase.auth().currentUser.email,
      emailId: "",
      placeName: this.props.navigation.getParam("details")["nameOfPlace"],
      address: this.props.navigation.getParam("details")["address"],
      name: "",
      contact: "",
      address: "",
    };
  }

  getUserDetails = (userId) => {
    db.collection("registered_users")
      .where("user_Id", "==", userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            name: doc.data().name,
            contact: doc.data().contact,
            address: doc.data().address,
            emailId: doc.data().user_Id,
          });
        });
      });
  };

  componentDidMount() {
    this.getUserDetails(this.state.userId);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.1 }}>
          <Header
            leftComponent={
              <Icon
                name="arrow-left"
                type="feather"
                color="black"
                onPress={() => this.props.navigation.goBack()}
              />
            }
            centerComponent={{
              text: "Status",
              style: {
                color: "black",
                fontSize: RFValue(25),
                fontWeight: "bold",
                marginTop: RFValue(-10),
              },
            }}
            backgroundColor="paleturquoise"
          />
        </View>
        <View style={{ flex: 0.9 }}>
          {this.state.emailId == this.state.userId ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.styleText}>
                {"Dear " +
                  this.state.name +
                  ", you have been registered at " +
                  this.state.placeName +
                  " for a Covishield vaccination shot."}
              </Text>
              <Text style={[styles.styleText, { fontSize: RFValue(18) }]}>
                Please arrive between 10am to 3pm and show this message.
              </Text>
              <Text
                style={[
                  styles.styleText,
                  { fontSize: RFValue(18), color: "red" },
                ]}
              >
                ~Please carry an ID-Proof~
              </Text>
              <View style={{ borderWidth: 5, marginTop: RFValue(20) }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: RFValue(24),
                    alignSelf: "center",
                  }}
                >
                  Patient's Information
                </Text>
                <Text style={styles.detailsText}>Name: {this.state.name}</Text>

                <Text style={styles.detailsText}>
                  Contact: {this.state.contact}
                </Text>

                <Text style={styles.detailsText}>
                  Address: {this.state.address}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.updateStatus();
                  alert("Registration is Done");
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: RFValue(20) }}>
                  Agree
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 0.9 }}>
              <Text
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: RFValue(150),
                  fontSize: RFValue(20),
                  fontWeight: "bold",
                }}
              >
                Please REGISTER yourself first!
              </Text>
              <Image
                source={require("../assets/injection2.png")}
                style={{
                  width: 200,
                  height: 200,
                  marginTop: RFValue(10),
                  alignSelf: "center",
                  marginLeft: RFValue(-30),
                }}
              />
              <TouchableOpacity
                style={{
                  width: "65%",
                  height: RFValue(40),
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  borderRadius: RFValue(20),
                  backgroundColor: "paleturquoise",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  elevation: 20,
                  marginTop: 50,
                }}
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: RFValue(20) }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "65%",
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: RFValue(20),
    backgroundColor: "paleturquoise",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 20,
    marginTop: 50,
  },
  styleText: {
    fontWeight: "bold",
    fontSize: RFValue(23),
    textAlign: "center",
    marginTop: RFValue(20),
  },
  detailsText: {
    fontWeight: "400",
    fontSize: RFValue(20),
    marginTop: RFValue(15),
    alignSelf: "flex-start",
  },
});
