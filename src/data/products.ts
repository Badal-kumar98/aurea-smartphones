export type Product = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  colors: { name: string; hex: string }[];
  storage: string[];
  ram: string;
  display: string;
  camera: string;
  battery: string;
  processor: string;
  os: string;
  badge: string;
  needs: string[];
  description: string;
  isNew: boolean;
};
export const products: Product[] = [
  {
    id: "iphone-pro",
    slug: "iphone-16-pro-max",
    brand: "Apple",
    model: "iPhone 16 Pro Max",
    image: "/images/iphone-crop.webp",
    price: 134900,
    originalPrice: 144900,
    rating: 4.9,
    reviews: 248,
    colors: [
      { name: "Desert Titanium", hex: "#c2aa91" },
      { name: "Natural Titanium", hex: "#aaa69e" },
      { name: "Black Titanium", hex: "#353535" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    ram: "8GB",
    display: "6.9″ Super Retina XDR · 120Hz",
    camera: "48MP Fusion · 5x telephoto",
    battery: "4,685 mAh",
    processor: "Apple A18 Pro",
    os: "iOS",
    badge: "Bestseller",
    needs: ["flagship", "camera"],
    description:
      "A little more extraordinary. Discover a stunning titanium design, an immersive display, and a camera that makes every moment cinematic.",
    isNew: false,
  },
  {
    id: "galaxy-ultra",
    slug: "samsung-galaxy-s24-ultra",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    image: "/images/samsung.jpg",
    price: 109999,
    originalPrice: 129999,
    rating: 4.8,
    reviews: 186,
    colors: [
      { name: "Titanium Gray", hex: "#9c998f" },
      { name: "Titanium Black", hex: "#393a3d" },
      { name: "Titanium Violet", hex: "#78708c" },
    ],
    storage: ["256GB", "512GB", "1TB"],
    ram: "12GB",
    display: "6.8″ Dynamic AMOLED 2X · 120Hz",
    camera: "200MP wide · 5x optical zoom",
    battery: "5,000 mAh",
    processor: "Snapdragon 8 Gen 3",
    os: "Android",
    badge: "Special price",
    needs: ["flagship", "camera", "gaming"],
    description:
      "Make room for bigger ideas. A brilliant flat display, an exceptionally versatile camera, and the precision of the built-in S Pen.",
    isNew: false,
  },
  {
    id: "oneplus13",
    slug: "oneplus-13",
    brand: "OnePlus",
    model: "OnePlus 13",
    image: "/images/oneplus.jpg",
    price: 69999,
    originalPrice: 72999,
    rating: 4.8,
    reviews: 154,
    colors: [
      { name: "Midnight Ocean", hex: "#465c6f" },
      { name: "Black Eclipse", hex: "#272b2d" },
      { name: "Arctic Dawn", hex: "#eeede7" },
    ],
    storage: ["256GB", "512GB"],
    ram: "12GB",
    display: "6.82″ QHD+ AMOLED · 120Hz",
    camera: "50MP Hasselblad triple camera",
    battery: "6,000 mAh",
    processor: "Snapdragon 8 Elite",
    os: "Android",
    badge: "New arrival",
    needs: ["flagship", "gaming", "battery"],
    description:
      "Power, beautifully balanced. Experience effortlessly smooth performance, all-day freedom, and Hasselblad colour in every frame.",
    isNew: true,
  },
  {
    id: "pixel9pro",
    slug: "google-pixel-9-pro",
    brand: "Google",
    model: "Pixel 9 Pro",
    image: "/images/pixel.jpg",
    price: 99999,
    originalPrice: 109999,
    rating: 4.7,
    reviews: 112,
    colors: [
      { name: "Porcelain", hex: "#e0dbcd" },
      { name: "Obsidian", hex: "#323633" },
      { name: "Hazel", hex: "#889383" },
    ],
    storage: ["256GB", "512GB"],
    ram: "16GB",
    display: "6.3″ Super Actua OLED · 120Hz",
    camera: "50MP wide · 48MP telephoto",
    battery: "4,700 mAh",
    processor: "Google Tensor G4",
    os: "Android",
    badge: "Camera favourite",
    needs: ["camera", "flagship"],
    description:
      "Thoughtfully helpful, unmistakably Pixel. Beautiful photos, intuitive intelligence, and a refined design that feels right at home.",
    isNew: true,
  },
  {
    id: "nothing2a",
    slug: "nothing-phone-2a",
    brand: "Nothing",
    model: "Phone (2a)",
    image: "/images/nothing.jpg",
    price: 23999,
    originalPrice: 25999,
    rating: 4.6,
    reviews: 204,
    colors: [
      { name: "Milk", hex: "#f0efe7" },
      { name: "Black", hex: "#333" },
    ],
    storage: ["128GB", "256GB"],
    ram: "8GB",
    display: "6.7″ Flexible AMOLED · 120Hz",
    camera: "50MP dual camera",
    battery: "5,000 mAh",
    processor: "MediaTek Dimensity 7200 Pro",
    os: "Android",
    badge: "Great value",
    needs: ["value", "battery"],
    description:
      "Less ordinary. A distinctive transparent design, fluid everyday performance, and a beautifully simple software experience.",
    isNew: false,
  },
  {
    id: "vivo40",
    slug: "vivo-v40",
    brand: "Vivo",
    model: "V40",
    image: "/images/vivo.jpg",
    price: 34999,
    originalPrice: 39999,
    rating: 4.7,
    reviews: 93,
    colors: [
      { name: "Ganges Blue", hex: "#859cab" },
      { name: "Lotus Purple", hex: "#aa9ead" },
    ],
    storage: ["128GB", "256GB"],
    ram: "8GB",
    display: "6.78″ Curved AMOLED · 120Hz",
    camera: "50MP ZEISS portrait camera",
    battery: "5,500 mAh",
    processor: "Snapdragon 7 Gen 3",
    os: "Android",
    badge: "Portrait perfect",
    needs: ["camera", "battery"],
    description:
      "Portraits with personality. A remarkably slim design meets ZEISS optics and long-lasting power for your everyday stories.",
    isNew: true,
  },
  {
    id: "galaxya55",
    slug: "samsung-galaxy-a55",
    brand: "Samsung",
    model: "Galaxy A55 5G",
    image: "/images/samsung-a55.jpg",
    price: 27999,
    originalPrice: 39999,
    rating: 4.6,
    reviews: 176,
    colors: [
      { name: "Awesome Iceblue", hex: "#c2d4e0" },
      { name: "Awesome Navy", hex: "#343b50" },
    ],
    storage: ["128GB", "256GB"],
    ram: "8GB",
    display: "6.6″ Super AMOLED · 120Hz",
    camera: "50MP wide with OIS",
    battery: "5,000 mAh",
    processor: "Exynos 1480",
    os: "Android",
    badge: "Under ₹30,000",
    needs: ["value", "battery"],
    description:
      "Awesome, every day. Capture crisp moments, stream in vivid colour, and stay connected with a dependable all-rounder.",
    isNew: false,
  },
  {
    id: "iphone16",
    slug: "iphone-16",
    brand: "Apple",
    model: "iPhone 16",
    image: "/images/iphone16.jpg",
    price: 69900,
    originalPrice: 79900,
    rating: 4.8,
    reviews: 231,
    colors: [
      { name: "Ultramarine", hex: "#687ac0" },
      { name: "Teal", hex: "#86b9b3" },
      { name: "Black", hex: "#333" },
    ],
    storage: ["128GB", "256GB", "512GB"],
    ram: "8GB",
    display: "6.1″ Super Retina XDR",
    camera: "48MP Fusion · Camera Control",
    battery: "3,561 mAh",
    processor: "Apple A18",
    os: "iOS",
    badge: "Everyday favourite",
    needs: ["camera", "flagship"],
    description:
      "A fresh perspective on your everyday. Expressive colour, intuitive Camera Control, and plenty of power to do what you love.",
    isNew: true,
  },
];
export const brands = [
  "Apple",
  "Samsung",
  "OnePlus",
  "Google",
  "Nothing",
  "Vivo",
];
export const money = (value: number) => "₹" + value.toLocaleString("en-IN");
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const variantPrice = (p: Product, storage: string) =>
  p.price + Math.max(0, p.storage.indexOf(storage)) * 10000;
