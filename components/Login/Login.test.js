import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Login from '../Login/Login';
import renderer from 'react-test-renderer';
import { StyleSheet, TextInput , View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';


describe('Login', () => {
  let wrapper;
  let mockShowLogin;
  let mockUpdateUserToken;

  beforeEach(() => {
    mockShowLogin = jest.fn()
    mockUpdateUserToken = jest.fn()
    wrapper = shallow( <Login
      showLogin={mockShowLogin}
      newUser={true}
      updateUserToken={mockUpdateUserToken}
      selectedOption= 'sign up'
    />);
  })

  it('should match the snapshot with all data passed in correctly', () => { 
    expect(wrapper).toMatchSnapshot(); 
  })
  describe('check for error', () => {
    it('should call show update user token if no error', () => {
      let mockResult = {
        data: {
          attributes: {
            api_token: '0000'
          }
        }
      }
      wrapper.instance().checkForError(mockResult)
      expect(mockUpdateUserToken).toHaveBeenCalledWith(mockResult.data.attributes.api_token)
    })
  
    it('should udpate state if error', () => {
      let mockResult = {
        error: 'errored',
      }
      wrapper.instance().checkForError(mockResult)
      expect(wrapper.state('errorMessage')).toEqual('errored')
      expect(wrapper.state('error')).toEqual(true);
    })
  })

  it('should call the submit user func when clicked', () => { 
    const submitUserMock = jest.fn();
    const spy = wrapper.spyOn('')

    let submitUser = wrapper.instance().submitUser()
    wrapper.find(TouchableOpacity).simulate('press')
    expect(submitUser).toHaveBeenCalled(); 
  }); 

  it('should update state and reset error message when setSelected is called', () => {
    wrapper.instance().setSelected('sign up');
    expect(wrapper.state('selectedOption')).toEqual('sign up');
    expect(wrapper.state('error')).toEqual(false);
    expect(wrapper.state('firstName')).toEqual('');
    expect(wrapper.state('lastName')).toEqual('');
    expect(wrapper.state('password')).toEqual('');
    expect(wrapper.state('passwordConfirmation')).toEqual('');
    expect(wrapper.state('email')).toEqual('');
    expect(wrapper.state('errorMessage')).toEqual('');
  })

  it('should update state when name/email is typed in', () => {
    wrapper.find(TextInput).at(0).simulate('changeText')
    expect(wrapper.state('firstName')).toEqual('')
  })

  describe('submitExistingUser', () => {
    it.skip('calls fetch with the correct data when logging in', () => { 
      const mockUser = {
        email: 'ashplevi@yahoo.com',
        password: 'password'
      }
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve({
          mockUser
        })
      }))

      const expectedFetchBody = {
        method: 'POST',
        body: JSON.stringify({mockUser}),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      wrapper.instance().submitExistingUser()

      expect(window.fetch).toHaveBeenCalledWith('https://adoptr-be.herokuapp.com/api/v1/sessions', expectedFetchBody)

    });
  });


});