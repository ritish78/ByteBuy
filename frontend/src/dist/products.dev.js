"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var products = [{
  _id: '1',
  name: 'Bluetooth Airbuds',
  image: ["/images/airpods.jpg", "/images/airpods2.jpg", "/images/airpods3.jpg"],
  description: 'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working.',
  brand: 'Apple',
  category: 'Electronics',
  price: 89.99,
  countInStock: 10,
  rating: 4.5,
  numReviews: 12
}, {
  _id: '2',
  name: 'EyePhone Ultra Mega MAX',
  image: ["/images/phone.jpg", "/images/phone2.jpg", "/images/phone3.jpg"],
  description: 'Introducing the iPhone 14 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life.',
  brand: 'Apple',
  category: 'Electronics',
  price: 599.99,
  countInStock: 7,
  rating: 4.0,
  numReviews: 8
}, {
  _id: '3',
  name: 'Cannon EOS 80D DSLR Camera',
  image: ["/images/camera.jpg"],
  description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
  brand: 'Cannon',
  category: 'Electronics',
  price: 929.99,
  countInStock: 5,
  rating: 3,
  numReviews: 12
}, {
  _id: '4',
  name: 'Sony Playstation 4 Pro White Version',
  image: ["/images/playstation.jpg"],
  description: 'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
  brand: 'Sony',
  category: 'Electronics',
  price: 399.99,
  countInStock: 11,
  rating: 5,
  numReviews: 12
}, {
  _id: '5',
  name: 'Logitech G-Series Gaming Mouse',
  image: ["/images/mouse.jpg"],
  description: 'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
  brand: 'Logitech',
  category: 'Electronics',
  price: 49.99,
  countInStock: 7,
  rating: 3.5,
  numReviews: 10
}, {
  _id: '6',
  name: 'Amazon Echo Dot 3rd Generation',
  image: ["/images/alexa.jpg"],
  description: 'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space.',
  brand: 'Amazon',
  category: 'Electronics',
  price: 29.99,
  countInStock: 0,
  rating: 4,
  numReviews: 12
}, {
  _id: '7',
  name: 'Cable Management Box',
  image: ["/images/Cable_Management_Box/cmb_1.jpg", "/images/Cable_Management_Box/cmb_2.jpg", "/images/Cable_Management_Box/cmb_3.jpg"],
  description: 'Designed with both functionality and aesthetics in mind, our Cable Management Box is the perfect accessory for any home or office. Say goodbye to the frustration of untangling knots and searching for the right cable amidst the chaos. With our box, you can effortlessly organize and conceal your cables, creating a clean and tidy environment.',
  brand: 'Poly',
  category: 'House Decor',
  price: 7.99,
  countInStock: 5,
  rating: 4,
  numReviews: 4
}, {
  _id: '8',
  name: 'Instant Pot',
  image: ["/images/Instant_Pot/ip_1.jpg", "/images/Instant_Pot/ip_2.jpg", "/images/Instant_Pot/ip_3.jpg"],
  description: 'Discover the ultimate kitchen companion - the Instant Pot! Revolutionize your cooking experience with this versatile and time-saving appliance. From delicious meals to hassle-free cooking, the Instant Pot is your ticket to culinary excellence. Get yours now and elevate your kitchen game!',
  brand: 'Philips',
  category: 'Kitchen Utilities',
  price: 249.99,
  countInStock: 3,
  rating: 4.5,
  numReviews: 14
}, {
  _id: '9',
  name: 'Kindle Scribe',
  image: ["/images/Kindle_Scribe/ks_1.jpg", "/images/Kindle_Scribe/ks_2.jpg", "/images/Kindle_Scribe/ks_3.jpg"],
  description: 'Introducing the Kindle Scribe - your gateway to a world of unlimited reading possibilities! Immerse yourself in the joy of reading with this sleek and lightweight e-reader. With its crystal-clear display and extensive library at your fingertips, the Kindle Scribe offers an unparalleled reading experience. Say goodbye to heavy books and hello to convenience and endless literary adventures. Get your Kindle Scribe today and embark on a literary journey like never before!',
  brand: 'Amazon',
  category: 'Electronics',
  price: 199.99,
  countInStock: 204,
  rating: 4.8,
  numReviews: 130
}, {
  _id: '10',
  name: 'Knife',
  image: ["/images/knife/k_1.jpg", "/images/knife/k_2.jpg", "/images/knife/k_3.jpg"],
  description: 'Introducing our exceptional knife - the pinnacle of precision and craftsmanship. Engineered with the finest materials and expertly designed, this knife is the ultimate tool for any culinary enthusiast. From effortlessly slicing through ingredients to creating culinary masterpieces, our knife is a must-have in every kitchen. Elevate your cooking skills and experience the unparalleled quality of our knife. Upgrade your culinary arsenal today and unleash your inner chef!',
  brand: 'Japanese Knives Maker',
  category: 'Kitchen Utilities',
  price: 149.99,
  countInStock: 16,
  rating: 5,
  numReviews: 8
}, {
  _id: '11',
  name: 'Light Bulb',
  image: ["/images/Light_Bulb/lb_1.jpg", "/images/Light_Bulb/lb_2.jpg", "/images/Light_Bulb/lb_3.jpg"],
  description: "Introducing our brilliant light bulb - the perfect choice for illuminating your space! Designed to provide exceptional brightness and energy efficiency, our light bulb offers a long-lasting and reliable lighting solution. With its easy installation and versatile compatibility, it's a breeze to upgrade any room with our light bulb. Say goodbye to dimly lit spaces and embrace the radiance of our high-quality light bulb. Illuminate your world with clarity and style - get yours today!",
  brand: 'Philips',
  category: 'Electronics',
  price: 4.99,
  countInStock: 9,
  rating: 4,
  numReviews: 340
}, {
  _id: '12',
  name: 'Mechanical Keyboard',
  image: ["/images/Mechanical_Keyboard/mk_1.jpg", "/images/Mechanical_Keyboard/mk_2.jpg", "/images/Mechanical_Keyboard/mk_3.jpg", "/images/Mechanical_Keyboard/mk_4.jpg"],
  description: 'Introducing our exceptional mechanical keyboard - the ultimate typing experience awaits! Designed for precision, speed, and comfort, our mechanical keyboard is a game-changer for both gamers and professionals. With its responsive switches and customizable features, you can personalize your typing style and optimize your productivity. Experience the satisfying click and tactile feedback with every keystroke. Upgrade your keyboard game and take your typing skills to new heights. Unleash your potential with our premium mechanical keyboard - your fingers will thank you!',
  brand: 'Corsair',
  category: 'Electronics',
  price: 89.99,
  countInStock: 0,
  rating: 4,
  numReviews: 22
}, {
  _id: '13',
  name: 'Monitor Light Bar',
  image: ["/images/Monitor_Light_Bar/mlb_1.jpg", "/images/Monitor_Light_Bar/mlb_2.jpg", "/images/Monitor_Light_Bar/mlb_3.jpg", "/images/Monitor_Light_Bar/mlb_4.jpg"],
  description: 'Introducing our sleek and versatile Monitor Light Bar - the perfect addition to enhance your workspace! Illuminate your monitor with adjustable lighting that reduces eye strain and provides a comfortable working environment. Our light bar seamlessly clips onto your monitor, providing soft and glare-free illumination for extended hours of work or play. With adjustable brightness and color temperature, you can customize the lighting to suit your preferences. Elevate your productivity and create an inviting ambiance with our Monitor Light Bar. Upgrade your monitor setup today and enjoy a visually enhanced experience like never before!',
  brand: 'Xioami',
  category: 'House Decor',
  price: 12.50,
  countInStock: 44,
  rating: 3.5,
  numReviews: 12
}, {
  _id: '14',
  name: 'Raspberry Pi 4B',
  image: ["/images/Raspberry_Pi_4B/rpi4b_1.jpg", "/images/Raspberry_Pi_4B/rpi4b_2.jpg", "/images/Raspberry_Pi_4B/rpi4b_3.jpg", "/images/Raspberry_Pi_4B/rpi4b_4.jpg"],
  description: "Introducing the Raspberry Pi 4B - the ultimate single-board computer for endless possibilities! Packed with power and versatility, the Raspberry Pi 4B is perfect for hobbyists, educators, and DIY enthusiasts. Experience blazing-fast performance, expandable storage options, and seamless connectivity in a compact package. Whether you're building a home media center, a retro gaming console, or exploring IoT projects, the Raspberry Pi 4B is your go-to solution. Unlock your creativity and unleash the full potential of this remarkable computing platform. Get your Raspberry Pi 4B today and embark on a journey of innovation!",
  brand: 'Raspberry',
  category: 'Electronics',
  price: 149.99,
  countInStock: 0,
  rating: 4.5,
  numReviews: 390
}, {
  _id: '15',
  name: 'Roomba',
  image: ["/images/Roomba/r_1.jpg", "/images/Roomba/r_2.jpg", "/images/Roomba/r_3.jpg", "/images/Roomba/r_4.jpg"],
  description: 'Introducing the Roomba - your intelligent cleaning companion! Experience the convenience of hands-free floor cleaning with our advanced robotic vacuum. The Roomba effortlessly navigates your home, tackling dirt, dust, and debris with precision and efficiency. With its smart sensors and innovative technology, it adapts to your environment, reaching every nook and cranny. Sit back, relax, and let the Roomba do the hard work for you. Say goodbye to mundane chores and hello to a cleaner home. Embrace the future of cleaning with the Roomba - get yours today and enjoy a hassle-free cleaning experience!',
  brand: 'Autovac',
  category: 'House Decor',
  price: 499.99,
  countInStock: 1,
  rating: 3,
  numReviews: 27
}, {
  _id: '16',
  name: 'Samsung 980 Pro SSD',
  image: ["/images/Samsung_980_Pro_ssd/s980pro_1.jpg", "/images/Samsung_980_Pro_ssd/s980pro_2.jpg", "/images/Samsung_980_Pro_ssd/s980pro_3.jpg"],
  description: 'Introducing the Samsung 980 Pro SSD - the ultimate storage solution for lightning-fast performance! Elevate your computing experience with this cutting-edge solid-state drive. With its PCIe Gen 4.0 interface and blazing-fast read/write speeds, the Samsung 980 Pro SSD delivers unrivaled responsiveness and efficiency for gaming, content creation, and everyday computing tasks. Say goodbye to long loading times and lagging systems. Upgrade to the Samsung 980 Pro SSD and unlock the full potential of your device. Experience the next level of storage speed and reliability. Upgrade your storage game today!',
  brand: 'Samsung',
  category: 'Storage Drive',
  price: 199.99,
  countInStock: 3,
  rating: 4.5,
  numReviews: 15
}, {
  _id: '17',
  name: 'Seagate Portable HDD',
  image: ["/images/Seagate_portable_HDD/sphdd_1.jpg", "/images/Seagate_portable_HDD/sphdd_2.jpg", "/images/Seagate_portable_HDD/sphdd_3.jpg"],
  description: "Introducing our portable HDD - the ideal storage companion for your on-the-go lifestyle! With its compact design and generous capacity, our portable HDD offers convenience and ample space for all your files, documents, photos, and videos. Take your data with you wherever you go and enjoy high-speed data transfers for seamless access to your content. Whether you're a student, professional, or frequent traveler, our portable HDD provides reliable and secure storage in a sleek and durable package. Don't compromise on storage - choose our portable HDD and keep your data within reach at all times!",
  brand: 'Seagate',
  category: 'Storage Drive',
  price: 139.99,
  countInStock: 15,
  rating: 4,
  numReviews: 14
}, {
  _id: '18',
  name: 'Sound Bar',
  image: ["/images/Sound_Bar/sb_1.jpg", "/images/Sound_Bar/sb_2.jpg", "/images/Sound_Bar/sb_3.jpg", "/images/Sound_Bar/sb_4.jpg"],
  description: 'Introducing our immersive Sound Bar - the perfect audio upgrade for your entertainment system! Elevate your movie nights, gaming sessions, and music experiences with rich and dynamic sound. Our Sound Bar delivers crystal-clear audio, bringing every detail to life with precision and depth. With its sleek design and easy setup, it seamlessly complements any home theater setup. Enhance your audio journey and enjoy cinema-quality sound from the comfort of your own home. Transform your entertainment experience with our exceptional Sound Bar - immerse yourself in audio excellence!',
  brand: 'Yamaha',
  category: 'Sound',
  price: 349.99,
  countInStock: 8,
  rating: 4,
  numReviews: 20
}, {
  _id: '19',
  name: 'Motion Activated Light',
  image: ["/images/Xiaomi_Motion_Activated_Light/mal_1.jpg", "/images/Xiaomi_Motion_Activated_Light/mal_2.jpg", "/images/Xiaomi_Motion_Activated_Light/mal_3.jpg", "/images/Xiaomi_Motion_Activated_Light/mal_4.jpg"],
  description: "Introducing our Motion-Activated Light - the perfect solution for hands-free illumination! Say goodbye to fumbling for light switches in the dark. Our motion-activated light instantly detects movement and provides a convenient and automatic lighting solution. With its adjustable settings, you can customize the sensitivity and duration of the light, ensuring it suits your needs. Whether it's for your hallway, closet, or any other space, our motion-activated light offers safety, convenience, and energy efficiency. Illuminate your surroundings effortlessly and experience the ease of motion-activated lighting. Upgrade your space today and enjoy a brighter, smarter environment!",
  brand: 'Xiaomi',
  category: 'House Decor',
  price: 24.99,
  countInStock: 52,
  rating: 3.5,
  numReviews: 25
}];
var _default = products;
exports["default"] = _default;