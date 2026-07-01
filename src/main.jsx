import React from "react";
import { createRoot } from "react-dom/client";
import {
  Bath,
  CalendarCheck,
  Check,
  Clock3,
  Heart,
  MapPin,
  PawPrint,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
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
      <div className="hero-media" aria-label="宠物洗护店环境照片">
        <img src="/images/hero-grooming.png" alt="明亮温暖的宠物洗护店里，一只刚洗护好的小狗坐在护理区旁" />
      </div>
    </section>
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
