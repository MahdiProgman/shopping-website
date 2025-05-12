const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_featureCards', [
      {
        id: uuidV4(),
        image: '/assets/gifs/helpdesk.gif',
        title: 'پشتیبانی ۲۴ ساعته',
        description: 'اگر به مشکلی برخوردید نگران نباشید! تیم پشتیبانی ۲۴ ساعته پاسخگوی تمام مشکلات شما خواهد بود و به شما کمک خواهد کرد.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        image: '/assets/gifs/cybersecurity.gif',
        title: 'سفارش آسان و ایمن',
        description: 'شما میتوانید به راحتی محصول مورد نظر خود را سفارش دهید و نگران امنیت نباشید. ما از بهترین درگاه های پرداخت استفاده میکنیم.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        image: '/assets/gifs/delivery-truck.gif',
        title: 'ارسال مرسوله به سراسر کشور',
        description: 'نگرانی بابت محل زندگی خود نداشته باشید اگر در ایران هستید هیچ مشکلی نخواهید خورد و مرسوله شما به راحتی به دستتان میرسد.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_featureCards', null, {});
  }
};
