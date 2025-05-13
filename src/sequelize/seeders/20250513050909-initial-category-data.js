const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_categories', [
      {
        id: uuidV4(),
        name: 'electronics',
        name_fa: 'کالای دیجیتال',
        short_explanation: 'لپ تاپ و تبلت و موبایل و ...',
        boxColor: '#4d96ff',
        image: '/assets/images/categories/electronics.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'cooking_tools',
        name_fa: 'ابزار آشپزی',
        short_explanation: 'ابزارآلات برای آشپزی بهتر',
        boxColor: '#A8A8A8',
        image: '/assets/images/categories/cooking_tools.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'clothing',
        name_fa: 'پوشاک',
        short_explanation: 'پیراهن و شلوار و کفش و ...',
        boxColor: '#E63946',
        image: '/assets/images/categories/clothing.jpeg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'homeـappliances',
        name_fa: 'لوازم خانگی',
        short_explanation: 'جارو برقی و ماشین لباس شویی و یخچال و ...',
        boxColor: '#457B9D',
        image: '/assets/images/categories/homeـappliances.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'book',
        name_fa: 'کتاب',
        short_explanation: 'کتاب های مختلف و زیبا برای خواندن',
        boxColor: '#D4A373',
        image: '/assets/images/categories/book.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'bicycle',
        name_fa: 'دوچرخه',
        short_explanation: 'انواع دوچرخه برای افراد مختلف',
        boxColor: '#2A9D8F',
        image: '/assets/images/categories/bicycle.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'musical_instruments',
        name_fa: 'آلات موسیقی',
        short_explanation: 'ساز های مختلف برای نواختن',
        boxColor: '#6D597A',
        image: '/assets/images/categories/musical_instruments.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_categories', null, {});
  }
};
