const faker = require('faker');

const createCampSite = () => {
  return {
    name: faker.company.companyName(),
    image: 'https://placeimg.com/240/180/nature'
  }
}

const createCampSites = (numSites = 5)=> {
  return Array(numSites)
        .fill(null)
        .map(createCampSite)
}

module.exports = {
  createCampSites
};

