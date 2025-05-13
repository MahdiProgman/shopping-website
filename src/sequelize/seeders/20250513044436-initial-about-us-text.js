const { v4: uuidV4 } = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tbl_websiteData', [
      {
        id: uuidV4(),
        name: 'about-us-text',
        value: 'ما یک تیم جوان و پرانرژی هستیم که با هدف ایجاد تجربه‌ای متفاوت در خرید آنلاین فعالیت خود را آغاز کردیم. از همان ابتدا تلاش کردیم تا با ارائه محصولات متنوع، باکیفیت و خدماتی حرفه‌ای، رضایت کامل مشتریانمان را جلب کنیم. در فروشگاه ما، شما فقط خرید نمی‌کنید؛ بلکه وارد دنیایی از انتخاب‌های خاص، قیمت‌های منصفانه و پشتیبانی صمیمانه می‌شوید. ما به سلیقه شما احترام می‌گذاریم و هر روز در تلاشیم تا بهتر از دیروز باشیم.ممنون که به ما اعتماد دارید.❤️',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tbl_websiteData', {
      name: 'about-us-text'
    });
  }
};
