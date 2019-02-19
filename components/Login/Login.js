import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons'
import { Icon } from 'react-native-elements';




export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: true,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      error: true,
      errorMessage: '',
      selectedOption: 'sign up'
    }
  }

  submitUser = () => {
    if(this.state.selectedOption === 'sign up') {
      this.submitNewUser()
    } else {
      this.submitExistingUser()
    }
  }

  submitExistingUser = () => {
    const { email, password } = this.state;
    const postBody = {
      email,
      password
    }
    fetch('https://adoptr-be.herokuapp.com/api/v1/sessions', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json())
    .then( result => this.checkForError(result))
    .catch(error => console.log(error))
  }

  checkForError = (result) => {
    if(result.error) {
      this.setState({
        error: true,
        errorMessage: result.error
      })
    } else {
      this.props.updateUserToken(result.data.attributes.api_token)
    }
  }

  submitNewUser = () => {
    const { firstName, lastName, email, password, passwordConfirmation } = this.state;
    const postBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: passwordConfirmation
    }
    fetch('https://adoptr-be.herokuapp.com/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json())
    .then( result => this.checkForError(result))
    .catch(error => console.log(error))
  }
  
  toggleLogin = () => {
    this.setState({
      newUser: false,
      error: false,
      errorMessage: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  toggleSignUp = () => {
    this.setState({
      newUser: true,
      error: false,
      errorMessage: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  setSelected = (selectedOption) => {
    this.setState({
      selectedOption
    })
  }

  renderOption = (option, selected, onSelect, index) => {
    const selectedRadio = selected ? styles.selectedRadio : styles.unselectedRadio
    const selectedText = selected ? styles.selectedText : styles.unselectedText
    return (
      <TouchableOpacity onPress={onSelect} key={index} style={selectedRadio} >
        <Text style={selectedText}>{option}</Text>
      </TouchableOpacity>
    )
  }

  renderContainer = (optionNodes) => {
    return (<View style={styles.radioButtons}>
        {optionNodes}
          </View>)
  }

  render() {
    const selectOptions = ["sign in", "sign up"]

    return (
      <View style={styles.form}>
        <View style={styles.title}> 
          <Icon
              name='paw'
              type='font-awesome'
              color='white'
              size= {60}
              iconStyle={styles.pawprint}
            />
          <Text style={styles.titleText}> 
            AdoptR 
          </Text>
        </View>
        <View style={this.state.selectedOption === 'sign up' ? styles.formSignUp : styles.formSignIn}>
          <RadioButtons
                style={styles.radioButtons}
                options={ selectOptions }
                onSelection={ this.setSelected }
                selectedOption={this.state.selectedOption }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
        <TextInput 
          style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
          placeholder='first name'
          autoCapitalize={"none"}
          value={this.state.firstName}
          onChangeText={(value) => this.setState({firstName: value})}
        />
        <TextInput 
          style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
          placeholder='last name'
          autoCapitalize={"none"}
          value={this.state.lastName}
          onChangeText={(value) => this.setState({lastName: value})}
        />
        <TextInput 
          type='email'
          autoCapitalize={"none"}
          style={styles.input}
          placeholder='email'
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='password'
          autoCapitalize={"none"}
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <TextInput
          style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
          secureTextEntry={true}
          placeholder='confirm password'
          value={this.state.passwordConfirmation}
          onChangeText={(value) => this.setState({passwordConfirmation: value})}
        />
        <Text style={this.state.error ? styles.errorMessage : styles.hidden}>
          {this.state.errorMessage}
        </Text>
        </View>
        <TouchableOpacity
        style={styles.button}
        onPress={()=>this.submitUser()} > 
          <Text style={styles.submitButtonText}  > 
          submit 
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 32
  },
  form: {
    backgroundColor: '#048BA8',
    fontSize: 60,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: 160,
    paddingBottom: 140
  },
  formSignUp: {
    backgroundColor: 'white',
    fontSize: 60,
    width: '96%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 16,
    margin: 10,
    paddingTop: 60,
    paddingBottom: 10,
    // paddingBottom: 100
  },
  formSignIn: {
    // justifyContent: 'space-around',
    // paddingBottom: 100
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    flex: 1,
    fontSize: 60,
    height: 200,
    margin: 10,
    paddingBottom: 10,
    paddingTop: 100,
    width: '96%',
  },
  input: {
    // backgroundColor: 'rgba(255,255,255, 0.8)',
    borderBottomColor: 'black',
    // borderRadius: 24,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    fontSize: 28,
    height: 66,
    // shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'left',
    width: 320,
    fontFamily: 'Kohinoor Bangla'
  },
  title: {
    color: 'white',
    position: 'absolute',
    top: 60,
    zIndex: 3,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    fontFamily: 'Kohinoor Bangla',
    fontSize: 60,
    textAlign: 'center',
    shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
  },
  titleText: {
    fontFamily: 'Kohinoor Bangla',
    fontSize: 60,
    textAlign: 'center',
  },
  pawprint: {
    color: 'black',
    marginRight: 20
  },
  hidden: {
    display: 'none'
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 24,
    borderWidth: 2,
    width: 300,
    position: 'absolute',
    bottom: 50,
  },
  submitButtonText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla'
  },
  selectedText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 28,
    fontFamily: 'Kohinoor Bangla'
  },
  unselectedText: {
    fontSize: 28,
    fontFamily: 'Kohinoor Bangla'
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: 260,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    zIndex: 2
  },
  errorMessage: {
    color: 'red'
  }
});