const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_advertiseCards', [
      {
        id: uuidV4(),
        title: 'فقط سه مرحله : سفارش - پردازش - ارسال',
        short_explanation: 'اعتبار شما اعتبار ماست.',
        image: '/assets/gifs/online-shopping.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        title: 'پشتیبانی ۲۴ ساعته عین رفیق کنارته!',
        short_explanation: 'حل مشکلاتتون رو به پشتیبانی مجرب ما بسپارید.',
        image: '/assets/gifs/support.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        title: 'هر نقطه ای از کشور باشی برای ما فرقی نمیکنه!',
        short_explanation: 'ارسال ایمن مرسوله به سراسر کشور.',
        image: '/assets/gifs/delivery-truck.gif',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_advertiseCards', null, {});
  }
};
