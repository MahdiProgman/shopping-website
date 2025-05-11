const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_websiteData', [
      {
        id: uuidV4(),
        name: 'brand_slogan',
        value: 'بهترین فروشگاه فروش انواع محصولات بصورت عمده',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'footer_text',
        value: 'ما با هدف ارائه تجربه‌ای سریع، آسان و امن از خرید اینترنتی، فعالیت خود را آغاز کردیم. در اینجا می‌توانید محصولات متنوعی را با تضمین اصالت و کیفیت خریداری کنید. ارسال سریع، پشتیبانی پاسخگو و احترام به حقوق مشتریان، اصول اساسی ماست. ما همیشه در تلاشیم بهترین خدمات و کالاها را به شما ارائه دهیم و از اینکه ما را برای خرید انتخاب می‌کنید، بی‌نهایت سپاسگزاریم.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidV4(),
        name: 'phone_number',
        value: '0134262xxxx',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_websiteData', {
      name: ['brand_slogan', 'footer_text', 'phone_number']
    });
  }
};
