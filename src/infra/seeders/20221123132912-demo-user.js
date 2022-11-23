'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        name: 'John',
        password: 'encripted',
        email: 'john@email.com',
        phone: '35997456413',
        t_admin: false
      },
      {
        name: 'Luiz',
        password: 'encripted',
        email: 'luiz@email.com',
        phone: '35997456413',
        t_admin: false
      },
      {
        name: 'admin',
        password: 'encripted',
        email: 'admin@email.com',
        phone: '35997456413',
        t_admin: true
      },
      {
        name: 'Carlos',
        password: 'encripted',
        email: 'carlos@email.com',
        phone: '35997456413',
        t_admin: false
      }
    ]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
