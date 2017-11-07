// var service = new google.maps.places.PlacesServices(document.createElement('div'));

const db = require('./models/db');
const {Genre, Promo, User, Venue } = require('./models/index').models;


const shuffle = (array) => {
  let currentIndex = array.length, tempVal, randomIndex;

  while (currentIndex !== 0){
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -=1;
    tempVal = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempVal;
  }
  return array;
}
const seed = () => {
  return db.sync({force: true})
  .then(() => {
    // let jazz, pop, rap, electronics, country, heavyMetal, classicRock, seventies, eighties, nineties, chill;
    let genres;
    return Promise.all([
      //Genre Creation
      Genre.create({ name: 'Jazz'}),
      Genre.create({ name: 'Pop'}),
      Genre.create({ name: 'Rap'}),
      Genre.create({ name: 'Electronic'}),
      Genre.create({ name: 'Country'}),
      Genre.create({ name: 'Heavy Metal'}),
      Genre.create({ name: 'Classic Rock'}),
      Genre.create({ name: '70\'s'}),
      Genre.create({ name: '80\'s'}),
      Genre.create({ name: '90\'s'}),
      Genre.create({ name: 'Chill'})
    ])
    .then((_genres) => {
      genres = _genres;
    })
    .then(() => {
      //User Creation
      return Promise.all([
        User.create({name: 'Dan', email: 'Dan@dan.com', password: 'Dan', isBusiness: false, gender: 'male'}),
        User.create({name: 'Jon', email: 'Jon@jon.com', password: 'Jon', isBusiness: false, gender: 'male'}),
        User.create({name: 'Colin', email: 'Colin@colin.com', password: 'Colin', isBusiness: false, gender: 'male'}),
        User.create({name: 'Ravette', email: 'Rav@rav.com', password: 'Rav', isBusiness: false, gender: 'female'})
      ])
    })
    .then(() => {
      return Promise.all([

      Venue.create({ name: 'Jimmy\'s Corner', address: '140 W 44th St', lat: '40.75682592', lon: '-73.98487676'}),
      Venue.create({ name: 'Brass Monkey', address: '55 Little West 12th St', lat: '40.74079551', lon: '-74.00833672'})
      ])
    })
    .then(([venues0, venues1]) => {
      console.log(venues0)
      console.log(venues1)
      venues0.addGenre(genres[0]);
      // venues[0].addGenre(genres[0])
    // for (var i = 0; i < venues.length; i++){
    //   let shuffleGenres = shuffle(genres);
    //   venues[i].setGenres([shuffleGenres[0], shuffleGenres[1]]);
    // }
    })
  })
}

seed()
.then(() => {
  console.log('seeded')
})

