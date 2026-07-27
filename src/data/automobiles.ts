// Static inventory data for the gallery. There is no backend or database —
// to add, remove, or edit a car, edit this file directly. Image paths point
// into /public/images/automobiles/<slug>/ — see that folder's README for the
// exact files to replace with real photography.

export type BodyType = "sedan" | "suv" | "coupe";

export const bodyTypeLabels: Record<BodyType, { fa: string; en: string }> = {
  sedan: { fa: "سدان", en: "Sedan" },
  suv: { fa: "شاسی‌بلند", en: "SUV" },
  coupe: { fa: "کوپه", en: "Coupe" },
};

export interface LocalizedText {
  fa: string;
  en: string;
}

export interface Automobile {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  bodyType: BodyType;
  price: number; // Toman
  mileageKm: number;
  transmission: LocalizedText;
  fuelType: LocalizedText;
  engine: string; // technical spec, same in both locales
  drivetrain: string; // e.g. "AWD" / "RWD" / "FWD" / "4WD" — same in both locales
  color: LocalizedText;
  seats: number;
  highlights: { fa: string[]; en: string[] };
  description: LocalizedText;
  featured: boolean;
  /** Relative paths inside /public */
  images: string[];
}

export const automobiles: Automobile[] = [
  {
    id: "1",
    slug: "mercedes-benz-c300",
    brand: "Mercedes-Benz",
    model: "C300",
    year: 2023,
    bodyType: "sedan",
    price: 4_850_000_000,
    mileageKm: 12_000,
    transmission: { fa: "اتوماتیک", en: "Automatic" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "2.0L Turbo I4",
    drivetrain: "AWD",
    color: { fa: "سفید یاقوتی", en: "Diamond White" },
    seats: 5,
    highlights: {
      fa: ["کارکرد کم", "رنگ اورجینال", "گارانتی معتبر"],
      en: ["Low mileage", "Original paint", "Valid warranty"],
    },
    description: {
      fa: "این C300 مدل ۲۰۲۳ با کارکرد کم و رنگ کاملاً اورجینال، یکی از تازه‌ترین خودروهای گالری است. تعلیق نرم و کابین آرام آن، رانندگی روزمره در شهر و سفرهای برون‌شهری را یکسان راحت می‌کند.",
      en: "This 2023 C300 has covered very few kilometres and wears its factory paint from bumper to bumper. The soft suspension and hushed cabin make it equally at home in city traffic and on long highway stretches.",
    },
    featured: true,
    images: [
      "/images/automobiles/mercedes-benz-c300/1.jpg",
      "/images/automobiles/mercedes-benz-c300/2.jpg",
      "/images/automobiles/mercedes-benz-c300/3.jpg",
    ],
  },
  {
    id: "2",
    slug: "bmw-530i",
    brand: "BMW",
    model: "530i",
    year: 2022,
    bodyType: "sedan",
    price: 3_950_000_000,
    mileageKm: 28_000,
    transmission: { fa: "اتوماتیک", en: "Automatic" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "2.0L Turbo I4",
    drivetrain: "RWD",
    color: { fa: "مشکی", en: "Black Sapphire" },
    seats: 5,
    highlights: {
      fa: ["تک‌مالک", "بیمه کامل", "سرویس منظم"],
      en: ["Single owner", "Full insurance", "Regular service"],
    },
    description: {
      fa: "۵۳۰i با موتور ۲ لیتری توربو، تعادل خوبی بین مصرف سوخت و شتاب دارد. صندلی‌های اسپرت و فرمان مستقیم آن مشخصاً برای کسی طراحی شده که رانندگی برایش فقط جابه‌جایی نیست.",
      en: "The 530i's two-litre turbo engine strikes a fair balance between fuel economy and pace. Sport seats and direct steering make it clear this 5 Series was built for someone who enjoys the drive, not just the destination.",
    },
    featured: true,
    images: [
      "/images/automobiles/bmw-530i/1.jpg",
      "/images/automobiles/bmw-530i/2.jpg",
      "/images/automobiles/bmw-530i/3.jpg",
    ],
  },
  {
    id: "3",
    slug: "range-rover-sport",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    bodyType: "suv",
    price: 7_200_000_000,
    mileageKm: 8_500,
    transmission: { fa: "اتوماتیک", en: "Automatic" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "3.0L Turbo I6 MHEV",
    drivetrain: "AWD",
    color: { fa: "قرمز", en: "Red" },
    seats: 5,
    highlights: {
      fa: ["کارکرد بسیار کم", "تعلیق هوا", "بدون تصادف"],
      en: ["Very low mileage", "Air suspension", "Accident-free"],
    },
    description: {
      fa: "رنج‌روور اسپرت با کارکرد بسیار پایین، هم برای مسیرهای آسفالته و هم برای جاده‌های ناهموار مناسب است. سیستم تعلیق هوا و ارتفاع قابل تنظیم، سواری آن را در هر شرایطی نرم نگه می‌دارد.",
      en: "With very low mileage, this Range Rover Sport is built for smooth tarmac and rough tracks alike. Air suspension with adjustable ride height keeps the cabin composed no matter the surface underneath.",
    },
    featured: true,
    images: [
      "/images/automobiles/range-rover-sport/1.jpg",
      "/images/automobiles/range-rover-sport/2.jpg",
      "/images/automobiles/range-rover-sport/3.jpg",
      "/images/automobiles/range-rover-sport/4.jpg",
    ],
  },
  {
    id: "4",
    slug: "porsche-911-carrera",
    brand: "Porsche",
    model: "911 Carrera",
    year: 2021,
    bodyType: "coupe",
    price: 9_800_000_000,
    mileageKm: 15_200,
    transmission: { fa: "اتوماتیک (PDK)", en: "Automatic (PDK)" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "3.0L Twin-Turbo Flat-6",
    drivetrain: "RWD",
    color: { fa: "قرمز گورمان", en: "Guards Red" },
    seats: 4,
    highlights: {
      fa: ["گیربکس PDK", "بدون رنگ", "کارکرد پایین"],
      en: ["PDK gearbox", "No bodywork", "Low mileage"],
    },
    description: {
      fa: "۹۱۱ کررا با گیربکس PDK، شتابی فوری و بدون وقفه ارائه می‌دهد. این یک خودروی روزمره نیست؛ یک تجربه رانندگی خالص است که کارکرد پایینش نشان می‌دهد صاحب قبلی هم همین را می‌دانسته.",
      en: "The Carrera's PDK gearbox delivers instant, uninterrupted acceleration. This isn't a daily commuter — it's a pure driving experience, and its low mileage suggests the previous owner treated it exactly that way.",
    },
    featured: true,
    images: [
      "/images/automobiles/porsche-911-carrera/1.jpg",
      "/images/automobiles/porsche-911-carrera/2.jpg",
      "/images/automobiles/porsche-911-carrera/3.jpg",
      "/images/automobiles/porsche-911-carrera/4.jpg",
    ],
  },
  {
    id: "5",
    slug: "toyota-land-cruiser-gxr",
    brand: "Toyota",
    model: "Land Cruiser GXR",
    year: 2022,
    bodyType: "suv",
    price: 5_600_000_000,
    mileageKm: 32_000,
    transmission: { fa: "اتوماتیک", en: "Automatic" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "4.0L V6",
    drivetrain: "4WD",
    color: { fa: "سفید", en: "White" },
    seats: 7,
    highlights: {
      fa: ["۴ چرخ محرک", "دفترچه کامل", "آماده سفر"],
      en: ["4WD", "Full service book", "Road-trip ready"],
    },
    description: {
      fa: "لندکروزر GXR با موتور V6 و سیستم چهار چرخ محرک، انتخابی مطمئن برای جاده‌های طولانی و شرایط سخت است. این مدل به‌خاطر دوام بالا و هزینه نگهداری معقول شناخته شده.",
      en: "The GXR's V6 engine and four-wheel-drive system make it a dependable choice for long trips and rough conditions. This generation of Land Cruiser is known for its durability and reasonable running costs.",
    },
    featured: false,
    images: [
      "/images/automobiles/toyota-land-cruiser-gxr/1.jpg",
      "/images/automobiles/toyota-land-cruiser-gxr/2.jpg",
      "/images/automobiles/toyota-land-cruiser-gxr/3.jpg",
      "/images/automobiles/toyota-land-cruiser-gxr/4.jpg",
    ],
  },
  {
    id: "6",
    slug: "audi-a6-55-tfsi",
    brand: "Audi",
    model: "A6 55 TFSI",
    year: 2023,
    bodyType: "sedan",
    price: 4_450_000_000,
    mileageKm: 6_200,
    transmission: { fa: "اتوماتیک", en: "Automatic" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "3.0L Turbo V6",
    drivetrain: "AWD (quattro)",
    color: { fa: "آبی نیمه‌فلزی", en: "Navarra Blue" },
    seats: 5,
    highlights: {
      fa: ["سیستم کواترو", "کارکرد کم", "بدون رنگ"],
      en: ["Quattro AWD", "Low mileage", "No bodywork"],
    },
    description: {
      fa: "آئودی A6 با گیربکس کواترو، کشش مطمئنی روی جاده‌های خیس و برفی می‌دهد. کابین آن با متریال باکیفیت و صفحه‌های دیجیتال، حس یک سدان اجرایی امروزی را منتقل می‌کند.",
      en: "Quattro all-wheel drive gives this A6 sure-footed grip on wet or snowy roads. Inside, quality materials and digital displays give it the feel of a properly modern executive sedan.",
    },
    featured: false,
    images: [
      "/images/automobiles/audi-a6-55-tfsi/1.jpg",
      "/images/automobiles/audi-a6-55-tfsi/2.jpg",
      "/images/automobiles/audi-a6-55-tfsi/3.jpg",
    ],
  },
  {
    id: "7",
    slug: "lexus-es-350",
    brand: "Lexus",
    model: "ES 350",
    year: 2022,
    bodyType: "sedan",
    price: 3_650_000_000,
    mileageKm: 21_000,
    transmission: { fa: "اتوماتیک", en: "Automatic" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "3.5L V6",
    drivetrain: "FWD",
    color: { fa: "سفید مرواریدی", en: "Pearl White" },
    seats: 5,
    highlights: {
      fa: ["مصرف بهینه", "بیمه کامل", "کابین بی‌صدا"],
      en: ["Efficient", "Full insurance", "Quiet cabin"],
    },
    description: {
      fa: "ES 350 با تمرکز روی آرامش و سکوت کابین ساخته شده. اگر دنبال یک سدان راحت برای مسیرهای طولانی هستید که خیلی کم به تعمیرگاه سر می‌زند، این گزینه مناسبی است.",
      en: "The ES 350 is built around cabin quiet and ride comfort. If you want a relaxed sedan for long trips that rarely sees the inside of a workshop, this is a strong option.",
    },
    featured: false,
    images: [
      "/images/automobiles/lexus-es-350/1.jpg",
      "/images/automobiles/lexus-es-350/2.jpg",
      "/images/automobiles/lexus-es-350/3.jpg",
      "/images/automobiles/lexus-es-350/4.jpg",
    ],
  },
  {
    id: "8",
    slug: "ford-mustang-gt",
    brand: "Ford",
    model: "Mustang GT",
    year: 2021,
    bodyType: "coupe",
    price: 3_200_000_000,
    mileageKm: 18_000,
    transmission: { fa: "دنده‌ای", en: "Manual" },
    fuelType: { fa: "بنزینی", en: "Gasoline" },
    engine: "5.0L V8",
    drivetrain: "RWD",
    color: { fa: "زرد", en: "Grabber Yellow" },
    seats: 4,
    highlights: {
      fa: ["گیربکس دستی", "موتور V8", "کارکرد پایین"],
      en: ["Manual gearbox", "V8 engine", "Low mileage"],
    },
    description: {
      fa: "موستانگ GT با موتور V8 و گیربکس دنده‌ای، برای کسانی ساخته شده که هنوز رانندگی دستی را دوست دارند. صدای اگزوز آن به‌تنهایی دلیلی برای یک دور زدن در بزرگراه است.",
      en: "The Mustang GT's V8 and manual gearbox are built for drivers who still enjoy shifting for themselves. The exhaust note alone is reason enough for a run down the highway.",
    },
    featured: false,
    images: [
      "/images/automobiles/ford-mustang-gt/1.jpg",
      "/images/automobiles/ford-mustang-gt/2.jpg",
      "/images/automobiles/ford-mustang-gt/3.jpg",
      "/images/automobiles/ford-mustang-gt/4.jpg",
    ],
  },
];

export function getAllAutomobiles(): Automobile[] {
  return automobiles;
}

export function getFeaturedAutomobiles(): Automobile[] {
  return automobiles.filter((car) => car.featured);
}

export function getAutomobileBySlug(slug: string): Automobile | undefined {
  return automobiles.find((car) => car.slug === slug);
}

export function getRelatedAutomobiles(
  current: Automobile,
  limit = 3,
): Automobile[] {
  return automobiles
    .filter((car) => car.id !== current.id && car.bodyType === current.bodyType)
    .slice(0, limit);
}
