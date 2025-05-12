const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_websiteData',
      [
        {
          id: uuidV4(),
          name: 'support-text',
          value: 'پشتیبانی ما با هدف پاسخ‌گویی سریع، دقیق و مؤثر به نیازها و سوالات کاربران طراحی شده است. در این بخش، تلاش کرده‌ایم تا تمامی پرسش‌های رایج، مشکلات احتمالی و راهنمایی‌های لازم را در اختیار شما قرار دهیم تا تجربه‌ای روان و بدون دغدغه از استفاده از خدمات ما داشته باشید. رضایت شما اولویت ماست و همواره آماده‌ایم تا در کوتاه‌ترین زمان ممکن پاسخ‌گوی درخواست‌ها، نظرات و گزارش‌های شما باشیم.',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_websiteData', {
      name: 'support-text'
    });
  }
};
