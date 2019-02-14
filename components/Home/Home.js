import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import APIkey from '../apiKey';
import cleanPets from '../helpers/helpers';
import Pet from '../Pet/Pet';
import {swipeDirections} from 'react-native-swipe-gestures';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPets: [],
      petIndex: 0,
      gesture: '',
      showInfo: false
    }
  }

  componentDidMount() {
    fetch(`http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=80202`)
    .then(response => response.json())
    .then(pets => cleanPets(pets.petfinder.pets.pet))
    .then(cleanPets => this.setState({allPets: cleanPets}))
    .catch(error => console.log(error))
  }

  changePet = (gesture) => {
    let newState = this.state.petIndex = this.state.petIndex + 1
    this.setState({
      petIndex: newState
    })
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  goBack = () => {
    this.setState({
      showInfo: false
    })
  }
  
  render() {
    const { allPets, petIndex, showInfo } = this.state;

    if (!showInfo) {
      return ( 
        <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} showInfo={this.state.showInfo}/>
          <TouchableOpacity onPress={this.showInfo}
              style={styles.infoButton}
            >
              <Text style={styles.infoButtonText}> more information </Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} showInfo={this.state.showInfo}/>
          <TouchableOpacity onPress={this.goBack}
              style={styles.infoButton}
            >
              <Text style={styles.infoButtonText}> go back </Text>
          </TouchableOpacity>
        </View>
      
      )
    }

  }
}

const styles = StyleSheet.create({
  infoButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 24,
    borderWidth: 2,
    width: 300,
  },
  infoButtonText: {
    fontSize: 30,
    textAlign: 'center',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 40
  }
});