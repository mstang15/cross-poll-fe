import React from 'react'; 
import { shallow, mount } from 'enzyme';
import Pet from '../Pet/Pet';
import renderer from 'react-test-renderer';





//           userLocation={this.props.userLocation}

describe('Pet', () => {
  let mockPet;
  let mockShelter;
  let mockUserAPIToken;

  beforeEach(() => {
    mockPet = {
      animal: 'Cat',
      breed: 'Domestic Short Hair',contactInfo: {},
      description: '12 year old..',
      id: '42736275',
      name: 'Zoey',
      photos: ['http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=60&-pnt.jpg',
      'http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=95&-fpm.jpg',
      'http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=500&-x.jpg',
      'http://photos.petfinder.com/photos/pets/42736275/1/?bust=1536778269&width=300&-pn.jpg'],
      sex: 'F',
      shelterId: 'CO186',
      size: 'M'
    };

    mockShelter = {
      city: 'Denver',
      email: 'barnwatercat@aol.com',
      id: 'CO186',
      latitude: '39.6788',
      longitude: '-104.9636',
      name: 'Barnwater Cats Rescue Organization',
      phone: '(303) 759-2855',
      state: 'CO',
      zip: '80210'
    };

    mockUserAPIToken= 'ajgd87sa6';

    mockUserLocation= {};


  })

  it('should match the snapshot with all data passed in correctly', () => { 

    const wrapper = shallow( <Pet
      pet={mockPet}
      changePet={jest.fn()}
      loading={false}
      showInfo={false}
      showFilter={false}
      fetchShelter={jest.fn()}
      shelter={mockShelter}
      addToFavorites={jest.fn()}
      userAPIToken={mockUserAPIToken}
      showFavorites={false}
      userLocation={mockUserLocation}
    />);

    expect(wrapper).toMatchSnapshot(); 
  })
});