const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_questions', [
      {
        id: uuidV4(),
        question: ' چطور می‌تونم سفارشم رو ثبت کنم؟',
        answer: 'بعد از انتخاب محصول، روی گزینه "افزودن به سبد خرید" کلیک کنید و در مرحله بعد با زدن دکمه "ثبت سفارش"، خرید خودتون رو نهایی کنید.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        question: 'آیا مرسوله به هر جایی ارسال میشه؟',
        answer: 'شما کافیه فقط تو ایران باشید ما براتون به راحتی مرسوله رو ارسال میکنیم.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        question: 'میتونم به فروشگاه شما اعتماد کنم؟',
        answer: 'ما همواره تلاش کردیم اعتماد شما رو داشته باشیم و اعتبار داشته باشیم پس بله با خیال راحت خرید کنید.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        question: 'آیا میتونم محصولی رو به علاقه مندی هام اضافه کنم؟',
        answer: 'بله میتونید به محصول مورد نظر مراجعه کنید و دکمه "افزودن به علاقه مندی ها" رو بزنید.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_questions', null, {});
  }
};
