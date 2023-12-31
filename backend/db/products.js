const products = [
  {
    name: "Bluetooth Airbuds WF-1000XM4",
    images: [
      "/images/sony_buds_1.jpg",
      "/images/sony_buds_2.jpg",
      "/images/sony_buds_3.jpg",
    ],
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working.",
    brand: "Sony",
    category: "Electronics",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numberOfReviews: 12,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Arzopa Portable Monitor",
    images: ["/images/Arzopa_monitor/am_1.jpg", "/images/Arzopa_monitor/am_2.jpg", "/images/Arzopa_monitor/am_3.jpg"],
    description:
      "Introducing our cutting-edge portable monitor, your ultimate productivity companion on-the-go. Experience seamless multitasking and immersive visuals with its sleek design and high-resolution display, empowering you to work and play wherever life takes you.",
    brand: "Arzopa",
    category: "Electronics",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numberOfReviews: 12,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Canon Printer",
    images: ["/images/Canon_printer/cp_1.jpg", "/images/Canon_printer/cp_2.jpg", "/images/Canon_printer/cp_3.jpg"],
    description:
      "Discover the perfect printing solution for all your needs with our advanced and reliable printer. Experience exceptional print quality, fast performance, and user-friendly features that bring convenience right to your fingertips, making every printing task a breeze.",
    brand: "Canon",
    category: "Electronics",
    price: 99.99,
    countInStock: 11,
    rating: 3,
    numberOfReviews: 12,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Lexar SSD",
    images: ["/images/Lexar_SSD/ls_1.jpg", "/images/Lexar_SSD/ls_2.jpg", "/images/Lexar_SSD/ls_3.jpg"],
    description:
      "Elevate your system's performance to new heights with our lightning-fast SATA SSD. Unlock blazing data transfer speeds, uncompromising reliability, and ample storage capacity, ensuring smoother computing experiences and shorter load times for all your applications and games.",
    brand: "Lexar",
    category: "Electronics",
    price: 79.99,
    countInStock: 7,
    rating: 3.5,
    numberOfReviews: 10,
    onSale: true,
    salePercentage: 10.0,
    salePrice: 71.99
  },
  {
    name: "Meta Quest 2",
    images: ["/images/Meta_Quest_2/mq_1.jpg", "/images/Meta_Quest_2/mq_2.jpg", "/images/Meta_Quest_2/mq_3.jpg"],
    description:
      "Embark on mind-bending virtual adventures with Meta Quest 2, the pinnacle of immersive VR technology. Dive into a world of limitless possibilities, crystal-clear visuals, and seamless tracking, as you explore, create, and interact like never before, all within the comfort of your own reality.",
    brand: "Meta",
    category: "Electronics",
    price: 499.99,
    countInStock: 0,
    rating: 4,
    numberOfReviews: 12,
    onSale: true,
    salePercentage: 50.0,
    salePrice: 249.99
  },
  {
    name: "Cable Management Box",
    images: [
      "/images/Cable_Management_Box/cmb_1.jpg",
      "/images/Cable_Management_Box/cmb_2.jpg",
      "/images/Cable_Management_Box/cmb_3.jpg",
    ],
    description:
      "Designed with both functionality and aesthetics in mind, our Cable Management Box is the perfect accessory for any home or office. Say goodbye to the frustration of untangling knots and searching for the right cable amidst the chaos. With our box, you can effortlessly organize and conceal your cables, creating a clean and tidy environment.",
    brand: "Poly",
    category: "House Decor",
    price: 7.99,
    countInStock: 5,
    rating: 4,
    numberOfReviews: 4,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Instant Pot",
    images: [
      "/images/Instant_Pot/ip_1.jpg",
      "/images/Instant_Pot/ip_2.jpg",
      "/images/Instant_Pot/ip_3.jpg",
    ],
    description:
      "Discover the ultimate kitchen companion - the Instant Pot! Revolutionize your cooking experience with this versatile and time-saving appliance. From delicious meals to hassle-free cooking, the Instant Pot is your ticket to culinary excellence. Get yours now and elevate your kitchen game!",
    brand: "Philips",
    category: "Kitchen Utilities",
    price: 249.99,
    countInStock: 3,
    rating: 4.5,
    numberOfReviews: 14,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Kindle Scribe",
    images: [
      "/images/Kindle_Scribe/ks_1.jpg",
      "/images/Kindle_Scribe/ks_2.jpg",
      "/images/Kindle_Scribe/ks_3.jpg",
    ],
    description:
      "Introducing the Kindle Scribe - your gateway to a world of unlimited reading possibilities! Immerse yourself in the joy of reading with this sleek and lightweight e-reader. With its crystal-clear display and extensive library at your fingertips, the Kindle Scribe offers an unparalleled reading experience. Say goodbye to heavy books and hello to convenience and endless literary adventures. Get your Kindle Scribe today and embark on a literary journey like never before!",
    brand: "Amazon",
    category: "Electronics",
    price: 199.99,
    countInStock: 204,
    rating: 4.8,
    numberOfReviews: 130,
    onSale: true,
    salePercentage: 40.0,
    salePrice: 119.99
  },
  {
    name: "Knife",
    images: [
      "/images/knife/k_1.jpg",
      "/images/knife/k_2.jpg",
      "/images/knife/k_3.jpg",
    ],
    description:
      "Introducing our exceptional knife - the pinnacle of precision and craftsmanship. Engineered with the finest materials and expertly designed, this knife is the ultimate tool for any culinary enthusiast. From effortlessly slicing through ingredients to creating culinary masterpieces, our knife is a must-have in every kitchen. Elevate your cooking skills and experience the unparalleled quality of our knife. Upgrade your culinary arsenal today and unleash your inner chef!",
    brand: "Japanese Knives Maker",
    category: "Kitchen Utilities",
    price: 149.99,
    countInStock: 16,
    rating: 5,
    numberOfReviews: 8,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Light Bulb",
    images: [
      "/images/Light_Bulb/lb_1.jpg",
      "/images/Light_Bulb/lb_2.jpg",
      "/images/Light_Bulb/lb_3.jpg",
    ],
    description:
      "Introducing our brilliant light bulb - the perfect choice for illuminating your space! Designed to provide exceptional brightness and energy efficiency, our light bulb offers a long-lasting and reliable lighting solution. With its easy installation and versatile compatibility, it's a breeze to upgrade any room with our light bulb. Say goodbye to dimly lit spaces and embrace the radiance of our high-quality light bulb. Illuminate your world with clarity and style - get yours today!",
    brand: "Philips",
    category: "Electronics",
    price: 4.99,
    countInStock: 9,
    rating: 4,
    numberOfReviews: 340,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Mechanical Keyboard",
    images: [
      "/images/Mechanical_Keyboard/mk_1.jpg",
      "/images/Mechanical_Keyboard/mk_2.jpg",
      "/images/Mechanical_Keyboard/mk_3.jpg",
      "/images/Mechanical_Keyboard/mk_4.jpg",
    ],
    description:
      "Introducing our exceptional mechanical keyboard - the ultimate typing experience awaits! Designed for precision, speed, and comfort, our mechanical keyboard is a game-changer for both gamers and professionals. With its responsive switches and customizable features, you can personalize your typing style and optimize your productivity. Experience the satisfying click and tactile feedback with every keystroke. Upgrade your keyboard game and take your typing skills to new heights. Unleash your potential with our premium mechanical keyboard - your fingers will thank you!",
    brand: "Corsair",
    category: "Electronics",
    price: 89.99,
    countInStock: 0,
    rating: 4,
    numberOfReviews: 22,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Monitor Light Bar",
    images: [
      "/images/Monitor_Light_Bar/mlb_1.jpg",
      "/images/Monitor_Light_Bar/mlb_2.jpg",
      "/images/Monitor_Light_Bar/mlb_3.jpg",
      "/images/Monitor_Light_Bar/mlb_4.jpg",
    ],
    description:
      "Introducing our sleek and versatile Monitor Light Bar - the perfect addition to enhance your workspace! Illuminate your monitor with adjustable lighting that reduces eye strain and provides a comfortable working environment. Our light bar seamlessly clips onto your monitor, providing soft and glare-free illumination for extended hours of work or play. With adjustable brightness and color temperature, you can customize the lighting to suit your preferences. Elevate your productivity and create an inviting ambiance with our Monitor Light Bar. Upgrade your monitor setup today and enjoy a visually enhanced experience like never before!",
    brand: "Xioami",
    category: "House Decor",
    price: 12.5,
    countInStock: 44,
    rating: 3.5,
    numberOfReviews: 12,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Raspberry Pi 4B",
    images: [
      "/images/Raspberry_Pi_4B/rpi4b_1.jpg",
      "/images/Raspberry_Pi_4B/rpi4b_2.jpg",
      "/images/Raspberry_Pi_4B/rpi4b_3.jpg",
      "/images/Raspberry_Pi_4B/rpi4b_4.jpg",
    ],
    description:
      "Introducing the Raspberry Pi 4B - the ultimate single-board computer for endless possibilities! Packed with power and versatility, the Raspberry Pi 4B is perfect for hobbyists, educators, and DIY enthusiasts. Experience blazing-fast performance, expandable storage options, and seamless connectivity in a compact package. Whether you're building a home media center, a retro gaming console, or exploring IoT projects, the Raspberry Pi 4B is your go-to solution. Unlock your creativity and unleash the full potential of this remarkable computing platform. Get your Raspberry Pi 4B today and embark on a journey of innovation!",
    brand: "Raspberry",
    category: "Electronics",
    price: 149.99,
    countInStock: 0,
    rating: 4.5,
    numberOfReviews: 390,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Roomba",
    images: [
      "/images/Roomba/r_1.jpg",
      "/images/Roomba/r_2.jpg",
      "/images/Roomba/r_3.jpg",
      "/images/Roomba/r_4.jpg",
    ],
    description:
      "Introducing the Roomba - your intelligent cleaning companion! Experience the convenience of hands-free floor cleaning with our advanced robotic vacuum. The Roomba effortlessly navigates your home, tackling dirt, dust, and debris with precision and efficiency. With its smart sensors and innovative technology, it adapts to your environment, reaching every nook and cranny. Sit back, relax, and let the Roomba do the hard work for you. Say goodbye to mundane chores and hello to a cleaner home. Embrace the future of cleaning with the Roomba - get yours today and enjoy a hassle-free cleaning experience!",
    brand: "Autovac",
    category: "House Decor",
    price: 499.99,
    countInStock: 1,
    rating: 3,
    numberOfReviews: 27,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Samsung 980 Pro SSD",
    images: [
      "/images/Samsung_980_Pro_ssd/s980pro_1.jpg",
      "/images/Samsung_980_Pro_ssd/s980pro_2.jpg",
      "/images/Samsung_980_Pro_ssd/s980pro_3.jpg",
    ],
    description:
      "Introducing the Samsung 980 Pro SSD - the ultimate storage solution for lightning-fast performance! Elevate your computing experience with this cutting-edge solid-state drive. With its PCIe Gen 4.0 interface and blazing-fast read/write speeds, the Samsung 980 Pro SSD delivers unrivaled responsiveness and efficiency for gaming, content creation, and everyday computing tasks. Say goodbye to long loading times and lagging systems. Upgrade to the Samsung 980 Pro SSD and unlock the full potential of your device. Experience the next level of storage speed and reliability. Upgrade your storage game today!",
    brand: "Samsung",
    category: "Storage Drive",
    price: 199.99,
    countInStock: 3,
    rating: 4.5,
    numberOfReviews: 15,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Seagate Portable HDD",
    images: [
      "/images/Seagate_portable_HDD/sphdd_1.jpg",
      "/images/Seagate_portable_HDD/sphdd_2.jpg",
      "/images/Seagate_portable_HDD/sphdd_3.jpg",
    ],
    description:
      "Introducing our portable HDD - the ideal storage companion for your on-the-go lifestyle! With its compact design and generous capacity, our portable HDD offers convenience and ample space for all your files, documents, photos, and videos. Take your data with you wherever you go and enjoy high-speed data transfers for seamless access to your content. Whether you're a student, professional, or frequent traveler, our portable HDD provides reliable and secure storage in a sleek and durable package. Don't compromise on storage - choose our portable HDD and keep your data within reach at all times!",
    brand: "Seagate",
    category: "Storage Drive",
    price: 139.99,
    countInStock: 15,
    rating: 4,
    numberOfReviews: 14,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Sound Bar",
    images: [
      "/images/Sound_Bar/sb_1.jpg",
      "/images/Sound_Bar/sb_2.jpg",
      "/images/Sound_Bar/sb_3.jpg",
      "/images/Sound_Bar/sb_4.jpg",
    ],
    description:
      "Introducing our immersive Sound Bar - the perfect audio upgrade for your entertainment system! Elevate your movie nights, gaming sessions, and music experiences with rich and dynamic sound. Our Sound Bar delivers crystal-clear audio, bringing every detail to life with precision and depth. With its sleek design and easy setup, it seamlessly complements any home theater setup. Enhance your audio journey and enjoy cinema-quality sound from the comfort of your own home. Transform your entertainment experience with our exceptional Sound Bar - immerse yourself in audio excellence!",
    brand: "Yamaha",
    category: "Sound",
    price: 349.99,
    countInStock: 8,
    rating: 4,
    numberOfReviews: 20,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "Motion Activated Light",
    images: [
      "/images/Xiaomi_Motion_Activated_Light/mal_1.jpg",
      "/images/Xiaomi_Motion_Activated_Light/mal_2.jpg",
      "/images/Xiaomi_Motion_Activated_Light/mal_3.jpg",
      "/images/Xiaomi_Motion_Activated_Light/mal_4.jpg",
    ],
    description:
      "Introducing our Motion-Activated Light - the perfect solution for hands-free illumination! Say goodbye to fumbling for light switches in the dark. Our motion-activated light instantly detects movement and provides a convenient and automatic lighting solution. With its adjustable settings, you can customize the sensitivity and duration of the light, ensuring it suits your needs. Whether it's for your hallway, closet, or any other space, our motion-activated light offers safety, convenience, and energy efficiency. Illuminate your surroundings effortlessly and experience the ease of motion-activated lighting. Upgrade your space today and enjoy a brighter, smarter environment!",
    brand: "Xiaomi",
    category: "House Decor",
    price: 24.99,
    countInStock: 52,
    rating: 3.5,
    numberOfReviews: 25,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "TP Link Network Switch",
    images: [
      "/images/Network_Switch/ns_1.jpg",
      "/images/Network_Switch/ns_2.jpg",
      "/images/Network_Switch/ns_3.jpg"
    ],
    description:
      "Transform your network infrastructure with our high-performance network switch. Experience unrivaled speed, seamless connectivity, and robust security features that ensure seamless data flow, making it the ideal choice for optimizing your business or home network to meet the demands of today's digital world.",
    brand: "TP-Link",
    category: "Electronics",
    price: 109.99,
    countInStock: 21,
    rating: 4.25,
    numberOfReviews: 35,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "USB Hub",
    images: [
      "/images/USB_Hub/uh_1.jpg",
      "/images/USB_Hub/uh_2.jpg",
      "/images/USB_Hub/uh_3.jpg"
    ],
    description:
      "Expand your connectivity options with our versatile USB hub. Streamline your workspace by effortlessly connecting multiple devices at once, enjoying efficient data transfer, and powering up your gadgets, all in a compact and stylish design that complements your setup perfectly.",
    brand: "Selore",
    category: "Electronics",
    price: 74.99,
    countInStock: 41,
    rating: 3.75,
    numberOfReviews: 50,
    onSale: false,
    salePercentage: 0.0,
    salePrice: 0.0
  },
  {
    name: "IKEA Chair",
    images: [
      "/images/chair_1.jpg",
      "/images/chair_2.jpg",
      "/images/chair_3.jpg"
    ],
    description:
     "Experience the epitome of comfort and style with our IKEA chair. Designed with ergonomic precision and crafted from premium materials, this chair brings a touch of modern sophistication to any space, ensuring long-lasting support and relaxation for all your seated moments.",
    brand: "IKEA",
    category: "Home Decor",
    price: 24.99,
    countInStock: 210,
    rating: 4.0,
    numberOfReviews: 21,
    onSale: true,
    salePercentage: 10.0,
    salePrice: 19.99
  },
];

module.exports = products;
