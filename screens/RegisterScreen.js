import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";
import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAvoidingView } from "react-native";

export default class RegisterScreen extends Component {
  constructor() {
    super();
    this.state = {
      userId: firebase.auth().currentUser.email,
      name: "",
      gender: "",
      dob: "",
      contact: "",
      address: "",
    };
  }

  register = async (name, gender, dob) => {
    var userId = this.state.userId;
    var name = this.state.name;
    var gender = this.state.gender;
    var dob = this.state.dob;
    var contact = this.state.contact;
    var address = this.state.address;

    db.collection("registered_users").add({
      user_Id: userId,
      name: name,
      gender: gender,
      dob: dob,
      contact: contact,
      address: address,
    });

    this.setState({
      name: "",
      gender: "",
      dob: "",
      contact: "",
      address: "",
      registered: "",
    });

    return Alert.alert("Registered for Vaccination");
  };

  getVaccineRequest = () => {
    var vaccineRequest = db
      .collection("requested_users")
      .where("user_Id", "==", this.state.userId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            docId: doc.id,
          });
        });
      });
  };

  componentDidMount() {
    this.getVaccineRequest();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MyHeader title="Register" navigation={this.props.navigation} />

        <KeyboardAvoidingView style={StyleSheet.keyboardAvoidingView}>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "700",
              marginTop: RFValue(20),
              fontSize: 15,
            }}
          >
            Registration for COVISHIELD
          </Text>
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Full Name"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
            value={this.state.name}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType="numeric"
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
            value={this.state.contact}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Address"}
            multiline={true}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
            value={this.state.address}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Gender"}
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                gender: text,
              });
            }}
            value={this.state.gender}
          />
          <TextInput
            style={[styles.formTextInput, { height: 50 }]}
            placeholder={"Year of Birth"}
            maxLength={4}
            keyboardType="numeric"
            placeholderTextColor="black"
            onChangeText={(text) => {
              this.setState({
                dob: text,
              });
            }}
            value={this.state.dob}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.register();
              this.props.navigation.navigate("Status");
            }}
          >
            <Text
              style={{
                color: "paleturquoise",
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              Go to Centers Available
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: RFValue(23),
    alignSelf: "center",
    marginTop: RFValue(20),
    fontWeight: "600",
  },
  formTextInput: {
    width: "75%",
    height: RFValue(35),
    alignSelf: "center",
    borderColor: "paleturquoise",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: RFValue(16),
    padding: 10,
    fontSize: RFValue(18),
  },

  button: {
    width: "75%",
    height: RFValue(40),
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: RFValue(50),
    backgroundColor: "black",
    marginTop: RFValue(20),
  },
});
