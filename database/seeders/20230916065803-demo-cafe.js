const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const defaultLogo = `data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../../assets/logos/coffee-cup-abstract-3267ld.png'), 'base64')}`;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cafes', [{
      id: uuidv4(),
      name: 'ABC Cafe',
      description: 'No more hungry',
      location: "Singapore",
      logo: defaultLogo
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cafes', null, {});
  }
};
