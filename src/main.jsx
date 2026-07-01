import React from "react";
import { createRoot } from "react-dom/client";
import {
  Bath,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  MapPin,
  PawPrint,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  buildInfiniteSlides,
  getRealSlideIndex,
  resolveInfiniteLoopPosition,
} from "./carouselLogic.mjs";
import "./styles.css";

const services = [
  {
    icon: Bath,
    title: "基础沐浴",
    price: "¥88 起",
    description: "温和清洁、吹干梳理、耳眼护理，适合日常清爽护理。",
  },
  {
    icon: Scissors,
    title: "精致造型",
    price: "¥168 起",
    description: "按犬猫体型与毛发状态修剪，保留可爱又方便打理的线条。",
  },
  {
    icon: Sparkles,
    title: "深层养护",
    price: "¥228 起",
    description: "毛发柔顺、皮肤舒缓、爪垫护理，适合换季和敏感宠物。",
  },
];

const process = ["到店安抚", "健康检查", "温和洗护", "造型吹整", "护理反馈"];

const reviews = [
  {
    name: "可乐妈妈",
    text: "第一次洗完没有紧张，毛也蓬蓬的。店员会说明护理细节，很安心。",
  },
  {
    name: "布丁爸爸",
    text: "预约准时，环境干净。修剪后眼睛周围清爽很多，拍照特别精神。",
  },
  {
    name: "小满主人",
    text: "猫咪比较怕生，但这里节奏很温柔，回家后状态也很好。",
  },
];

const heroSlides = [
  {
    src: "/images/hero-grooming.png",
    alt: "\u660e\u4eae\u6e29\u6696\u7684\u5ba0\u7269\u6d17\u62a4\u5e97\u91cc\uff0c\u4e00\u53ea\u521a\u6d17\u62a4\u597d\u7684\u5c0f\u72d7\u5750\u5728\u62a4\u7406\u533a\u65c1",
  },
  {
    src: "/images/hero-cat.png",
    alt: "\u6e29\u6696\u5e72\u51c0\u7684\u5ba0\u7269\u6d17\u62a4\u5e97\u91cc\uff0c\u4e00\u53ea\u68b3\u7406\u597d\u7684\u6a58\u8272\u957f\u6bdb\u732b\u8db4\u5728\u67d4\u8f6f\u6bdb\u5dfe\u4e0a",
  },
  {
    src: "/images/hero-dogs.png",
    alt: "\u660e\u4eae\u5ba0\u7269\u6d17\u62a4\u7a7a\u95f4\u91cc\uff0c\u4e24\u53ea\u521a\u62a4\u7406\u597d\u7684\u5c0f\u578b\u72ac\u5b89\u9759\u5750\u5728\u4e00\u8d77",
  },
];

function App() {
  return (
    <main className="page-shell">
      <Header />
      <Hero />
      <Services />
      <Experience />
      <Reviews />
      <Booking />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="暖爪宠物洗护店首页">
        <span className="brand-mark">
          <PawPrint size={22} aria-hidden="true" />
        </span>
        <span>暖爪洗护</span>
      </a>
      <nav className="site-nav" aria-label="主要导航">
        <a href="#services">服务</a>
        <a href="#experience">环境</a>
        <a href="#booking">预约</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">社区宠物洗护 · 温柔预约制</p>
        <h1>把每一次洗护，都变成宠物安心的小假期</h1>
        <p className="hero-text">
          一对一安抚、低刺激洗护用品、透明护理反馈。为猫狗提供沐浴、修剪、深层养护和日常健康观察。
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#booking">
            <CalendarCheck size={18} aria-hidden="true" />
            立即预约
          </a>
          <a className="secondary-button" href="#services">
            查看套餐
          </a>
        </div>
        <div className="trust-row" aria-label="服务亮点">
          <span>
            <ShieldCheck size={18} aria-hidden="true" />
            独立消毒
          </span>
          <span>
            <Clock3 size={18} aria-hidden="true" />
            准时接待
          </span>
          <span>
            <Heart size={18} aria-hidden="true" />
            温和安抚
          </span>
        </div>
      </div>
      <HeroCarousel />
    </section>
  );
}

function HeroCarousel() {
  const [trackPosition, setTrackPosition] = React.useState(heroSlides.length > 1 ? 1 : 0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = React.useState(true);
  const trackSlides = React.useMemo(() => buildInfiniteSlides(heroSlides), []);
  const activeSlide = getRealSlideIndex(trackPosition, heroSlides.length);

  React.useEffect(() => {
    if (isPaused || heroSlides.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setTrackPosition((current) => current + 1);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const showPrevious = () => {
    setIsTransitionEnabled(true);
    setTrackPosition((current) => current - 1);
  };

  const showNext = () => {
    setIsTransitionEnabled(true);
    setTrackPosition((current) => current + 1);
  };

  const showSlide = (index) => {
    setIsTransitionEnabled(true);
    setTrackPosition(index + 1);
  };

  const handleTransitionEnd = () => {
    const { nextPosition, shouldDisableTransition } = resolveInfiniteLoopPosition(
      trackPosition,
      heroSlides.length,
    );

    if (!shouldDisableTransition) {
      return;
    }

    setIsTransitionEnabled(false);
    setTrackPosition(nextPosition);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsTransitionEnabled(true));
    });
  };

  return (
    <div
      className="hero-media carousel"
      aria-roledescription="carousel"
      aria-label={"\u5ba0\u7269\u6d17\u62a4\u5e97\u73af\u5883\u7167\u7247\u8f6e\u64ad"}
      data-paused={isPaused}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div
        className={isTransitionEnabled ? "carousel-track" : "carousel-track no-transition"}
        style={{ transform: `translateX(-${trackPosition * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {trackSlides.map((slide, index) => (
          <img key={`${slide.src}-${index}`} src={slide.src} alt={slide.alt} />
        ))}
      </div>
      <button className="carousel-button carousel-button-prev" type="button" onClick={showPrevious} aria-label={"\u4e0a\u4e00\u5f20\u56fe\u7247"}>
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button className="carousel-button carousel-button-next" type="button" onClick={showNext} aria-label={"\u4e0b\u4e00\u5f20\u56fe\u7247"}>
        <ChevronRight size={22} aria-hidden="true" />
      </button>
      <div className="carousel-dots" aria-label={"\u9009\u62e9\u8f6e\u64ad\u56fe\u7247"}>
        {heroSlides.map((slide, index) => (
          <button
            key={slide.src}
            className={index === activeSlide ? "carousel-dot active" : "carousel-dot"}
            type="button"
            onClick={() => showSlide(index)}
            aria-label={`\u67e5\u770b\u7b2c ${index + 1} \u5f20\u56fe\u7247`}
            aria-current={index === activeSlide}
          />
        ))}
      </div>
    </div>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="section-heading">
        <p className="eyebrow">服务套餐</p>
        <h2>按毛发状态和性格，安排合适的护理节奏</h2>
      </div>
      <div className="service-grid">
        {services.map(({ icon: Icon, title, price, description }) => (
          <article className="service-card" key={title}>
            <div className="card-icon">
              <Icon size={24} aria-hidden="true" />
            </div>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            <strong>{price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience-band" id="experience">
      <div className="experience-copy">
        <p className="eyebrow">门店体验</p>
        <h2>干净、安静、看得见流程</h2>
        <p>
          每只宠物使用独立毛巾和工具，洗护前先观察皮肤、耳道和爪垫状态，结束后给到护理建议，方便主人回家继续照顾。
        </p>
        <ul className="check-list">
          <li>
            <Check size={18} aria-hidden="true" />
            小型犬、长毛犬、猫咪分时段预约
          </li>
          <li>
            <Check size={18} aria-hidden="true" />
            使用低香精、低刺激洗护产品
          </li>
          <li>
            <Check size={18} aria-hidden="true" />
            提供洗护前后照片和护理记录
          </li>
        </ul>
      </div>
      <div className="process-panel" aria-label="洗护流程">
        {process.map((item, index) => (
          <div className="process-step" key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews">
      <div className="section-heading">
        <p className="eyebrow">真实反馈</p>
        <h2>让主人放心，让宠物少一点紧张</h2>
      </div>
      <div className="review-grid">
        {reviews.map((review) => (
          <article className="review-card" key={review.name}>
            <div className="stars" aria-label="五星评价">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
              ))}
            </div>
            <p>{review.text}</p>
            <strong>{review.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section className="booking" id="booking">
      <div>
        <p className="eyebrow">预约到店</p>
        <h2>今天给它安排一次舒服的洗护</h2>
        <p>
          营业时间 10:00-20:00，建议提前一天预约。到店前可告知宠物年龄、体重、毛发打结情况和性格偏好。
        </p>
      </div>
      <div className="booking-card">
        <a className="primary-button" href="tel:13800000000">
          <CalendarCheck size={18} aria-hidden="true" />
          电话预约
        </a>
        <div className="contact-line">
          <MapPin size={18} aria-hidden="true" />
          上海市梧桐路 88 号 1F
        </div>
        <div className="contact-line">
          <PawPrint size={18} aria-hidden="true" />
          小型犬 / 中型犬 / 猫咪洗护
        </div>
      </div>
    </section>
  );
}

export default App;

createRoot(document.getElementById("root")).render(<App />);
