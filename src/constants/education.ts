export interface educationItem {
  year: string;
  cert: string;
  major: string;
  place: string;
  status?: string;
}

const education: educationItem[] = [
  {
    year: "۱۴۰۴ - اکنون (2025 - Present)",
    cert: "کارشناسی ارشد (Master's Degree)",
    major: "مهندسی کامپیوتر - نرم‌افزار",
    place: "دانشگاه آزاد اسلامی واحد رشت",
    status: "در حال تحصیل",
  },
  {
    year: "۱۴۰۲ - ۱۴۰۴ (2023 - 2025)",
    cert: "کارشناسی (Bachelor's Degree)",
    major: "مهندسی حرفه‌ای کامپیوتر و نرم‌افزار",
    place: "دانشگاه آزاد اسلامی واحد رشت",
    status: "فارغ‌التحصیل",
  },
  {
    year: "۱۴۰۰ - ۱۴۰۲ (2021 - 2023)",
    cert: "کاردانی (Associate Degree)",
    major: "نرم‌افزار کامپیوتر",
    place: "دانشکده فنی و حرفه‌ای شهید چمران رشت",
    status: "فارغ‌التحصیل",
  },
  {
    year: "۱۳۹۶ - ۱۳۹۹ (2017 - 2020)",
    cert: "دیپلم فنی و حرفه‌ای",
    major: "شبکه و نرم‌افزار رایانه",
    place: "هنرستان فنی شهید بهشتی رشت",
    status: "فارغ‌التحصیل",
  },
];

export default education;
