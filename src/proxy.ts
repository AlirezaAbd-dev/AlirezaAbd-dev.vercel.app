import { NextRequest, NextResponse } from "next/server";

const PORTFOLIO_DOMAIN = "https://portfolio.alireza-abedi.ir";
const APEX_DOMAIN = "https://alireza-abedi.ir";

function getMarkdownForPath(pathname: string): string {
  switch (pathname) {
    case "/":
    case "":
      return `# علیرضا عابدی (Alireza Abedi) | لید تیم فرانت‌اند و توسعه‌دهنده فول‌استک
> وب‌سایت رسمی و نمونه‌کارهای مهندسی نرم‌افزار علیرضا عابدی

## خلاصه بیوگرافی و هویت حرفه‌ای
- **نام**: علیرضا عابدی (Alireza Abedi)
- **سمت**: Frontend Team Lead & Full-Stack Developer
- **سابقه کاری**: ۳.۵ سال (۱ سال شرکتی + ۲.۵ سال فریلنس)
- **تحصیلات**: کارشناسی ارشد مهندسی کامپیوتر - نرم‌افزار (دانشگاه آزاد اسلامی واحد رشت)
- **موقعیت مکانی**: رشت، گیلان، ایران (همکاری حضوری و ریموت)
- **دامنه پورتفولیو**: ${PORTFOLIO_DOMAIN}
- **دامنه رسمی**: ${APEX_DOMAIN}
- **ایمیل**: alireza.abedi9310@gmail.com
- **تلگرام**: https://t.me/AlirezaAbd_Dev
- **گیت‌هاب**: https://github.com/AlirezaAbd-dev
- **لینکدین**: https://www.linkedin.com/in/alireza-abedi-714280235

## استک فنی و مهارت‌های کلیدی
- **فرانت‌اند**: Next.js 16 (App Router, SSR, Turbopack), React 19, Angular, TypeScript, Tailwind CSS v4, Glassmorphism, Web Audio API
- **بک‌اند**: NestJS, Node.js, C# / ASP.NET Core, RESTful APIs, tRPC, WebSocket, WebRTC, Prisma ORM, Entity Framework Core
- **دیتابیس**: PostgreSQL, SQL Server, MongoDB, Redis
- **معماری**: Clean Architecture, Domain-Driven Design (DDD), Event-Driven Microservices, Docker

## صفحات و بخش‌های پورتفولیو
- [درباره من (${PORTFOLIO_DOMAIN}/about)](${PORTFOLIO_DOMAIN}/about): بیوگرافی کامل، جزئیات تحصیلی و نمودار مهارت‌ها
- [نمونه‌کارها (${PORTFOLIO_DOMAIN}/myProjects)](${PORTFOLIO_DOMAIN}/myProjects): بیش از ۱۰ پروژه شاخص سازمانی و متن‌باز
- [اتاق بازی (${PORTFOLIO_DOMAIN}/games)](${PORTFOLIO_DOMAIN}/games): ۴ مینی‌گیم فکری تعاملی با سنتز صدای وب‌آدیو
- [ارتباط با من (${PORTFOLIO_DOMAIN}/contactUs)](${PORTFOLIO_DOMAIN}/contactUs): فرم تماس آنلاین و راه‌های ارتباطی
- [حریم خصوصی (${PORTFOLIO_DOMAIN}/privacy)](${PORTFOLIO_DOMAIN}/privacy): تعهدات امنیتی، عدم رهگیری و شفافیت اطلاعات
- [راهنمای مدل‌های زبانی (${PORTFOLIO_DOMAIN}/llms.txt)](${PORTFOLIO_DOMAIN}/llms.txt): مستندات ماشین‌خوان جهت پردازش عامل‌های هوشمند
`;

    case "/about":
      return `# درباره من | علیرضا عابدی (Alireza Abedi)
> بیوگرافی جامع، مدارک تحصیلی و تخصص‌های فنی

## مشخصات فردی
- **نام و نام خانوادگی**: علیرضا عابدی
- **جایگاه فعلی**: Frontend Team Lead / Full-Stack Engineer
- **تاریخ تولد**: ۱۳۸۲/۰۳/۲۰ (۲۰ خرداد ۱۳۸۲ / 10 June 2003)
- **محل سکونت**: رشت، استان گیلان، ایران
- **ایمیل رسمی**: alireza.abedi9310@gmail.com
- **پورتفولیو**: ${PORTFOLIO_DOMAIN}

## سوابق تحصیلی
1. **کارشناسی ارشد مهندسی کامپیوتر - نرم‌افزار**: دانشگاه آزاد اسلامی رشت (۱۴۰۴ - اکنون)
2. **کارشناسی مهندسی کامپیوتر**: دانشگاه آزاد اسلامی رشت (۱۴۰۲ - ۱۴۰۴)
3. **کاردانی نرم‌افزار**: دانشکده فنی و حرفه‌ای شهید چمران رشت (۱۴۰۰ - ۱۴۰۲)
4. **دیپلم فنی شبکه و نرم‌افزار**: هنرستان فنی شهید بهشتی رشت (۱۳۹۶ - ۱۳۹۹)

## سطح تسلط فنی
- **Next.js & React (App Router / SSR)**: 95%
- **TypeScript & Modern JavaScript**: 96%
- **NestJS & Node.js Backend**: 90%
- **C# & .NET Core / ASP.NET**: 88%
- **Clean Architecture & DDD**: 89%
- **Tailwind CSS & Responsive UI**: 94%
- **PostgreSQL, MongoDB & Prisma**: 87%
- **Git, Docker & CI/CD**: 91%
`;

    case "/myProjects":
      return `# نمونه‌کارها و پروژه‌ها | علیرضا عابدی (Alireza Abedi)
> فهرست پروژه‌های شاخص سازمانی و متن‌باز — ${PORTFOLIO_DOMAIN}/myProjects

1. **معماری میکروسرویس سازمانی دات‌نت (Dotnet Microservices)**
   - **تکنولوژی‌ها**: C#, .NET Core, Microservices, Docker, RabbitMQ, SQL Server
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/Dotnet-Microservices
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#dotnet-microservices
   - **توضیحات**: معماری میکروسرویس مبتنی بر رویداد (Event-Driven)، پیام‌رسانی با RabbitMQ و کانتینرسازی داکر.

2. **پلتفرم جامع املاک NestJS Realtor API**
   - **تکنولوژی‌ها**: NestJS, TypeScript, PostgreSQL, Prisma ORM, JWT Auth, Clean Architecture
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/Nest-Realtor-Api
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#nest-realtor
   - **توضیحات**: توسعه RESTful API مقیاس‌پذیر برای مدیریت معاملات املاک و احراز هویت نقش‌محور.

3. **شبکه اجتماعی بلبلر (Bolboler Social App)**
   - **تکنولوژی‌ها**: Next.js, React, TypeScript, Tailwind CSS, REST API
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/Bolboler
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#bolboler
   - **توضیحات**: شبکه اجتماعی تعاملی با فید اختصاصی، ارسال پست، لایک، ریتوییت و SSR بهینه‌سازی‌شده.

4. **سامانه مدیریت و استریم رسانه با ASP.NET Core**
   - **تکنولوژی‌ها**: C#, ASP.NET Core, Entity Framework Core, SQL Server, MVC Architecture
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/Movies-ASP.NET-Core
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#movies-aspnet
   - **توضیحات**: پلتفرم مدیریت محتوا و رسانه با معماری MVC و تراکنش‌های EF Core.

5. **سامانه تماس تصویری بلادرنگ (WebRTC Video Call)**
   - **تکنولوژی‌ها**: JavaScript, WebRTC, Socket.io, Node.js, P2P Streaming
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/webRTC-VideoCall
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#webrtc-call
   - **توضیحات**: تماس ویدیویی و صوتی همتابه‌همتا (Peer-to-Peer) بدون واسطه با تاخیر بسیار کم.

6. **دستیار هوش مصنوعی و ربات چت هوشمند (Gemini AI)**
   - **تکنولوژی‌ها**: Python, Gemini API, Prompt Engineering, Async IO
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/Gemini-Chat-Bot
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#gemini-chatbot
   - **توضیحات**: چت‌بات مکالمه‌ای چندحالته با قدرت مدل Gemini 2.5 Pro و تحلیل زمینه هوشمند.

7. **معماری فول‌استک Type-Safe با tRPC & Next.js**
   - **تکنولوژی‌ها**: tRPC, Next.js, TypeScript, Prisma, Zod Validation
   - **لینک گیت‌هاب**: https://github.com/AlirezaAbd-dev/TRPC-Example
   - **لینک مستقیم**: ${PORTFOLIO_DOMAIN}/myProjects#trpc-type-safe
   - **توضیحات**: طراحی معماری کلاینت-سرور با امنیت کامل نوع داده‌ها بدون نیاز به تولید کد مجدد.
`;

    case "/games":
      return `# اتاق بازی و چالش‌های فکری تعاملی | Cyber Arcade
> ۴ مینی‌گیم فکری آنلاین در پورتفولیوی علیرضا عابدی — ${PORTFOLIO_DOMAIN}/games

1. **Cyber Tile Match (Tile Family 3D)**: تطبیق سه‌تایی کاشی‌ها با ۳ اسلات خالی و پاورآپ‌های جادویی.
2. **Quantum Liquid Sort (Water Sort)**: تفکیک مایعات رنگی در لوله‌های آزمایشگاهی کوانتومی.
3. **Cyber Block Blast (Blockudoku)**: چیدمان بلوک‌های نئونی در شبکه ۸x۸ و پاک‌سازی سطرها و ستون‌ها.
4. **Cyber 2048 (Developer Edition)**: ادغام مهارت‌های برنامه‌نویسی و رسیدن به کاشی ارشد.

ویژگی‌های فنی: پیاده‌سازی با Next.js و React 19، موتور صوتی اختصاصی Web Audio Synthesizer، پشتیبانی از شورتکات‌های کیبورد و کنترل لمسی موبایل.
`;

    case "/contactUs":
      return `# ارتباط با من | تماس و همکاری | علیرضا عابدی
> راه‌های ارتباطی جهت مشاوره فنی، توسعه پروژه‌های وب و استخدام

- **پست الکترونیک**: alireza.abedi9310@gmail.com
- **شماره تماس**: +98-990-931-0164
- **تلگرام**: @AlirezaAbd_Dev (https://t.me/AlirezaAbd_Dev)
- **لینکدین**: https://www.linkedin.com/in/alireza-abedi-714280235
- **گیت‌هاب**: https://github.com/AlirezaAbd-dev
- **موقعیت**: رشت، استان گیلان، ایران
- **فرم پیام آنلاین**: ${PORTFOLIO_DOMAIN}/contactUs
`;

    case "/privacy":
      return `# سیاست حریم خصوصی و شفافیت اطلاعات (Privacy Policy) | علیرضا عابدی
> تعهدات امنیتی، شفافیت داده‌ها و احترام به حریم خصوصی کاربران و عامل‌های هوشمند

## اصول کلیدی:
1. **عدم استفاده از کوکی‌های ردیاب**: این وب‌سایت از کوکی‌های تبلیغاتی یا اسکریپت‌های ردیابی شخص ثالث استفاده نمی‌کند.
2. **حفاظت از اطلاعات فرم تماس**: ایمیل و پیام‌های ارسالی منحصراً برای پاسخگویی به درخواست‌های کاری و استخدامی استفاده شده و افشا نمی‌شوند.
3. **ارتباطات امن**: رمزنگاری کامل داده‌ها بر بستر HTTPS و شبکه توزیع لبه ورسل (Vercel Edge Network).
4. **سازگاری با AI Agents**: دسترسی شفاف از طریق llms.txt و مذاکره محتوای متن/مارک‌داون.
5. **ارتباط با مسئول سایت**: ایمیل alireza.abedi9310@gmail.com و تلگرام @AlirezaAbd_Dev.
`;

    default:
      return `# 404 Not Found - Alireza Abedi Portfolio
> مسیر درخواستی (${pathname}) یافت نشد.

برای راهنمایی و بازیابی، از پیوندهای زیر استفاده کنید:
- راهنمای هوش مصنوعی: ${PORTFOLIO_DOMAIN}/llms.txt
- نقشه سایت: ${PORTFOLIO_DOMAIN}/sitemap.xml
- صفحه اصلی: ${PORTFOLIO_DOMAIN}/
- درباره من: ${PORTFOLIO_DOMAIN}/about
- پروژه‌ها: ${PORTFOLIO_DOMAIN}/myProjects
- تماس: ${PORTFOLIO_DOMAIN}/contactUs
- حریم خصوصی: ${PORTFOLIO_DOMAIN}/privacy
`;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static assets, icons, and internal Next.js paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const acceptHeader = request.headers.get("accept") || "";
  const wantsMarkdown =
    acceptHeader.includes("text/markdown") ||
    acceptHeader.includes("text/x-markdown");

  if (wantsMarkdown) {
    const markdownContent = getMarkdownForPath(pathname);
    const status = [
      "/",
      "/about",
      "/myProjects",
      "/games",
      "/contactUs",
      "/privacy",
    ].includes(pathname)
      ? 200
      : 404;

    return new NextResponse(markdownContent, {
      status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept, Accept-Encoding",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate",
        "X-Markdown-Negotiated": "true",
      },
    });
  }

  // For regular HTML requests, forward with Vary header including Accept
  const response = NextResponse.next();
  response.headers.append("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
