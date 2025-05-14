const { v4: uuidV4 } = require("uuid");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [category] = await queryInterface.sequelize.query(`
      SELECT id FROM tbl_categories WHERE name = "cooking_tools"
    `);

    const cookingToolsCategoryId = category[0].id;

    await queryInterface.bulkInsert(
      "tbl_products",
      [
        {
          id: uuidV4(),
          product_code: "swp-1",
          title: "سرویس کفگیر و ملاقه 12 پارچه کیچن ست مدل UNT45",
          image: "/assets/images/products/cooking_tools/swp-1/main.webp",
          images: JSON.stringify([
            "/assets/images/products/cooking_tools/swp-1/1.jpg",
          ]),
          specifications: JSON.stringify([
            {
              name: "جنس",
              value: "سیلیکون و چوب",
            },
            {
              name: "قابلیت شستشو",
              value: "دستی و ماشین ظرفشویی",
            },
            {
              name: "تعداد پارچه",
              value: "۱۲ قطعه",
            },
          ]),
          description:
            "سرویس کیچن ست مدل UNT45 شامل ۱۲ ابزار متنوع آشپزی است که از جنس سیلیکونی با روکش گرانیتی و دسته چوبی ساخته شده است. این مجموعه شامل کفگیر، ملاقه، همزن و سایر ابزارهای ضروری آشپزی می باشد و قابل شستشوی دستی و ماشینی است. ابزارهای مجموعه با طراحی ارگونومیک و رنگ ملایم، شیک و کاربردی هستند.",
          category_id: cookingToolsCategoryId,
          price: 650000,
          price_fa: "۶۵۰,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV4(),
          product_code: "swp-2",
          title: "تابه کاج تفلون مدل GHT سایز 30",
          image: "/assets/images/products/cooking_tools/swp-2/main.jpg",
          images: JSON.stringify([]),
          specifications: JSON.stringify([
            {
              name: "ابعاد",
              value: "۴۹ × ۳۰ × ۷ سانتی‌متر",
            },
            {
              name: "وزن",
              value: "۱۲۰۰ گرم",
            },
            {
              name: "جنس بدنه",
              value: "آلومینیوم",
            },
            {
              name: "جنس روکش",
              value: "گرانیت بدون مواد شیمیایی",
            },
            {
              name: "تعداد دسته",
              value: "یک عدد",
            },
            {
              name: "کشور مبدا برند",
              value: "ایران",
            },
          ]),
          description:
            "تابه تفلون کاج مدل GHT با سایز ۳۰ سانتی‌متر دارای بدنه‌ای از آلومینیوم سبک و روکش گرانیتی نچسب است که تا دمای ۳۵۰ درجه مقاوم است. این تابه برای استفاده‌های عمومی آشپزخانه مناسب است و به علت روکش گرانیتی خود، نیاز به استفاده از روغن کم دارد و شستشوی آسانی نیز دارد. با گارانتی ۱۲ ماهه کاج تفلون ارائه می‌شود.",
          category_id: cookingToolsCategoryId,
          price: 990000,
          price_fa: "۹۹۰,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV4(),
          product_code: "swp-3",
          title: "کارد و تخته برش آشپزخانه استیل مدل X",
          image: "/assets/images/products/cooking_tools/swp-3/main.avif",
          images: JSON.stringify([]),
          specifications: JSON.stringify([
            { name: "جنس تیغه", value: "فولاد ضدزنگ" },
            { name: "نوع تیغه", value: "حاد و مقاوم" },
            { name: "جنس تخته", value: "پلی‌اتیلن بهداشتی" },
          ]),
          description:
            "کارد استیل مدل X از فولاد ضدزنگ ضدزنگ ساخته شده و تیغه‌ای تیز و مقاوم دارد. همراه با این کارد، یک تخته برش از جنس پلی‌اتیلن بهداشتی ارائه می‌شود که برای برش انواع سبزیجات و گوشت مناسب است.",
          category_id: cookingToolsCategoryId,
          price: 120000,
          price_fa: "۱۲۰,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV4(),
          product_code: "swp-4",
          title: "کفگیر سیلیکونی آشپزخانه جورج مدل Z",
          image: "/assets/images/products/cooking_tools/swp-4/main.webp",
          images: JSON.stringify([
            "/assets/images/products/cooking_tools/swp-4/1.webp",
            "/assets/images/products/cooking_tools/swp-4/2.webp",
            "/assets/images/products/cooking_tools/swp-4/3.webp",
          ]),
          specifications: JSON.stringify([
            { name: "جنس", value: "سیلیکون حرارت‌دیده" },
            { name: "طول", value: "30 سانتی‌متر" },
          ]),
          description:
            "کفگیر مدل Z از سیلیکون با کیفیت ساخته شده که تا حرارت ۲۳۰ درجه را تحمل می‌کند. برای هم زدن و برداشتن مواد در آشپزی روزمره مناسب است.",
          category_id: cookingToolsCategoryId,
          price: 70000,
          price_fa: "۷۰,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV4(),
          product_code: "swp-5",
          title: "انبر آشپزی استنلس استیل مدل S",
          image: "/assets/images/products/cooking_tools/swp-5/main.avif",
          images: JSON.stringify([
            "/assets/images/products/cooking_tools/swp-5/1.avif",
            "/assets/images/products/cooking_tools/swp-5/2.jpg",
          ]),
          specifications: JSON.stringify([
            { name: "جنس", value: "استیل ضدزنگ" },
            { name: "طول", value: "25 سانتی‌متر" },
          ]),
          description:
            "انبر آشپزی مدل S از استیل ضدزنگ ساخته شده و برای غذاخوری یا کباب‌کردن مناسب است. دسته عایق حرارتی دارد و در برابر زنگ‌زدگی مقاوم است.",
          category_id: cookingToolsCategoryId,
          price: 55000,
          price_fa: "۵۵,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV4(),
          product_code: "swp-6",
          title: "سرویس اشپزخانه 5 پارچه برند نیو استار",
          image: "/assets/images/products/cooking_tools/swp-6/main.avif",
          images: JSON.stringify([]),
          specifications: JSON.stringify([
            { name: "شامل", value: "کفگیر، ملاقه، قاشق، انبر" },
            { name: "جنس", value: "سیلیکونی" },
            { name: "رنگ", value: "مشکی" },
          ]),
          description:
            "این سرویس ۵ پارچه شامل ابزارهای پرکاربرد آشپزخانه است و به دلیل جنس سیلیکونی، مناسب استفاده روی ظروف نچسب است. دارای گارانتی یک ساله می‌باشد.",
          category_id: cookingToolsCategoryId,
          price: 200000,
          price_fa: "۲۰۰,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidV4(),
          product_code: "swp-7",
          title: "سبد خشک‌کن میوه سبز مدل Garden",
          image: "/assets/images/products/cooking_tools/swp-7/main.avif",
          images: JSON.stringify([
            "/assets/images/products/cooking_tools/swp-7/1.avif",
            "/assets/images/products/cooking_tools/swp-7/2.avif",
          ]),
          specifications: JSON.stringify([
            { name: "جنس", value: "فلز آبکاری‌شده" },
            { name: "ابعاد", value: "20x20x15 سانتی‌متر" },
          ]),
          description:
            "این سبد آبچکان از فلز مقاوم ساخته شده و برای خشک کردن میوه‌ها و سبزیجات کاربرد دارد. پایه ضدلغزش دارد و به طور کامل پوشش داده شده است.",
          category_id: cookingToolsCategoryId,
          price: 150000,
          price_fa: "۱۵۰,۰۰۰",
          inventory: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    const [category] = await queryInterface.sequelize.query(
      'SELECT id FROM tbl_categories WHERE name = "cooking_tools"'
    );

    await queryInterface.bulkDelete("tbl_products", {
      category_id: category[0].id,
    });
  },
};
