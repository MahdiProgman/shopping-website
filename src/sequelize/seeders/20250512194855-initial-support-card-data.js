const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_supportCards', [
      {
        id: uuidV4(),
        image: '/assets/gifs/phone.gif',
        title: 'ارتباط تلفنی',
        description: 'شما میتوانید با شماره گیری [phone_number] با پشتیانی ارتباط بگیرید و انواع مشکلاتی مثل مشکلات فنی یا مالی را به ما اطلاع دهید.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        image: '/assets/gifs/mail.gif',
        title: 'ارسال تیکت',
        description: 'شما میتوانید با ارسال تیکت به تیم ما کمک بگیرید. در این روش شما موضوع درخواستتان و توضیحاتی درباره آن به ما ارسال میکنید و ما در اسرع وقت به شما پاسخ میدهیم.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_supportCards', null, {});
  }
};
