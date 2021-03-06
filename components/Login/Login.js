import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
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
      error: false,
      errorMessage: '',
      selectedOption: 'sign up'
    }
  }

  submitUser = () => {
    if (this.state.selectedOption === 'sign up') {
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
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => this.checkForError(result))
      .catch(error => console.log(error))
  }

  checkForError = (result) => {
    if (result.error) {
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
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => this.checkForError(result))
      .catch(error => console.log(error))
  }

  setSelected = (selectedOption) => {
    this.setState({
      selectedOption
    })
    this.setState({
      error: false,
      errorMessage: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
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
          <Text style={styles.titleText}>
            AdoptR
          </Text>
          <Icon
            name='paw'
            type='font-awesome'
            color='white'
            size={36}
            iconStyle={styles.pawprint}
          />
        </View>
        <View style={this.state.selectedOption === 'sign up' ? styles.formSignUp : styles.formSignIn}>
          <RadioButtons
            style={styles.radioButtons}
            options={selectOptions}
            onSelection={this.setSelected}
            selectedOption={this.state.selectedOption}
            renderOption={this.renderOption}
            renderContainer={this.renderContainer}
          />
          <TextInput
            style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
            placeholder='first name'
            autoCapitalize={"none"}
            value={this.state.firstName}
            onChangeText={(value) => this.setState({ firstName: value })}
          />
          <TextInput
            style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
            placeholder='last name'
            autoCapitalize={"none"}
            value={this.state.lastName}
            onChangeText={(value) => this.setState({ lastName: value })}
          />
          <TextInput
            type='email'
            autoCapitalize={"none"}
            style={styles.input}
            placeholder='email'
            value={this.state.email}
            onChangeText={(value) => this.setState({ email: value })}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='password'
            autoCapitalize={"none"}
            value={this.state.password}
            onChangeText={(value) => this.setState({ password: value })}
          />
          <TextInput
            style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
            secureTextEntry={true}
            placeholder='confirm password'
            value={this.state.passwordConfirmation}
            onChangeText={(value) => this.setState({ passwordConfirmation: value })}
          />
          <Text style={this.state.error ? styles.errorMessage : styles.hidden}>
            {this.state.errorMessage}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submitUser()} >
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
    fontSize: 20
  },
  form: {
    backgroundColor: '#E5E5E5',
    fontSize: 50,
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
    marginTop: 20,
    paddingTop: 60,
    paddingBottom: 100,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: .8,
    shadowRadius: 4,
  },
  formSignIn: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    flex: 1,
    fontSize: 60,
    marginTop: 20,
    paddingBottom: 100,
    paddingTop: 100,
    width: '96%',
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: .8,
    shadowRadius: 4,
  },
  input: {
    borderBottomColor: '#048BA8',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    fontSize: 20,
    height: 66,
    textAlign: 'left',
    width: 320,
    fontFamily: 'Kohinoor Bangla'
  },
  title: {
    alignItems: 'center',
    backgroundColor: '#048BA8',
    borderRadius: 24,
    color: 'white',
    flexDirection: 'row',
    fontFamily: 'Kohinoor Bangla',
    fontSize: 50,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    textAlign: 'center',
    top: 60,
    width: 280,
    zIndex: 3,
  },
  titleText: {
    fontFamily: 'Kohinoor Bangla',
    fontSize: 52,
    textAlign: 'center',
    color: 'white',
  },
  pawprint: {
    color: 'white',
    marginLeft: 20
  },
  hidden: {
    display: 'none'
  },
  button: {
    backgroundColor: '#048BA8',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: .8,
    shadowRadius: 4,
    width: 280,
    position: 'absolute',
    bottom: 50,
  },
  submitButtonText: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla'
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#048BA8',
    textDecorationLine: 'underline',
    textDecorationColor: '#048BA8',
    fontSize: 32,
    fontFamily: 'Kohinoor Bangla'
  },
  unselectedText: {
    fontSize: 32,
    fontFamily: 'Kohinoor Bangla',
    color: 'grey',
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
    fontFamily: 'Kohinoor Bangla',
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    bottom: 16
  }
});