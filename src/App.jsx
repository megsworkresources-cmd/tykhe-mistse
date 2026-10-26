import { useState } from 'react'

const features = [
  {
    icon: '🌿',
    title: 'Спокійна перевірка',
    text: 'Діти можуть позначити, як себе почувають, без натиску на оцінку або “правильну” відповідь.',
    tone: 'peach',
    index: '01'
  },
  {
    icon: '🫧',
    title: 'Легкі вправи',
    text: 'Короткі, м’які практики для повернення до тіла, уваги та відчуття безпеки.',
    tone: 'sage',
    index: '02'
  },
  {
    icon: '✨',
    title: 'Підтримка без тиску',
    text: 'Взаємодія побудована на виборі, паузі та уважності — без обіцянок, які не можна виконати.',
    tone: 'yellow',
    index: '03'
  }
]

const steps = [
  {
    number: '01',
    heading: 'Зупинись',
    text: 'Обери свій рівень спокою або попроси паузу. Нічого не потрібно “виправляти”.'
  },
  {
    number: '02',
    heading: 'Почни маленько',
    text: 'Просте дихання, відчуття ноги на підлозі або короткий погляд на навколишній простір.'
  },
  {
    number: '03',
    heading: 'Повернись до себе',
    text: 'Можна продовжити вправу або просто відпочити і спробувати ще раз пізніше.'
  }
]

const faq = [
  {
    q: 'Чи це замінює допомогу дорослого?',
    a: 'Ні. Це інструмент підтримки, а не заміна професійної допомоги або більш глибокого контакту з дорослим.'
  },
  {
    q: 'Чи можна використовувати без реєстрації?',
    a: 'Так. Для цієї версії немає облікового запису, входу або зберігання особистих даних.'
  },
  {
    q: 'Що робити, якщо дитині важко?',
    a: 'Можна перейти до сторінки “Допомога зараз” і звернутися до дорослого або довіреної людини.'
  }
]

const worldCards = [
  {
    title: 'Будиночок, який ти носиш із собою',
    text: 'Уявний простір безпеки, який можна відновлювати в будь-який момент.',
    image: '/artwork/house-you-carry.svg'
  },
  {
    title: 'Думка, що розплутується',
    text: 'Легкі метафори для відчуття, що думки можуть змінюватись і не бути “вічними”.',
    image: '/artwork/thought-thread.svg'
  },
  {
    title: 'Сходи, що слухають',
    text: 'Ритм тіла і вміння повільно збирати увагу без надмірного навантаження.',
    image: '/artwork/listening-staircase.svg'
  },
  {
    title: 'Камінчик має що сказати',
    text: 'Тихе спостереження за навколишнім світом, щоб відчути присутність і стабільність.',
    image: '/artwork/pebble-listener.svg'
  }
]

const navItems = [
  'Головна',
  'Активності',
  'Перевірка',
  'Допомога',
  'Для дорослих',
  'Про проект'
]

const sectionMap = {
  Головна: 'home',
  Активності: 'activities',
  Перевірка: 'check-in',
  Допомога: 'help',
  'Для дорослих': 'adults',
  'Про проект': 'about'
}

function App() {
  const [activeNav, setActiveNav] = useState('Головна')
  const [menuOpen, setMenuOpen] = useState(false)
  const [language, setLanguage] = useState('UA')

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMenuOpen(false)
  }

  const handleNavClick = (label) => {
    setActiveNav(label)
    const sectionId = sectionMap[label]
    if (sectionId) {
      scrollToSection(sectionId)
    }
  }

  const toggleLanguage = () => {
    setLanguage((current) => (current === 'UA' ? 'EN' : 'UA'))
  }

  return (
    <div id="home">
      <div className="top-note">
        <span className="sun-dot">✦</span>
        <span>Тихе місце — український дитячий простір підтримки</span>
        <div className="top-lang">
          <button type="button" aria-label="Мова" onClick={toggleLanguage}>
            <span>{language}</span>
          </button>
        </div>
      </div>

      <header className="header">
        <button type="button" className="brand" aria-label="Головна" onClick={() => handleNavClick('Головна')}>
          <span className="brand-mark">✦</span>
          <span>
            Тихе <span className="brand-light">місце</span>
            <small>з підтримкою</small>
          </span>
        </button>

        <nav className={`nav ${menuOpen ? 'open' : ''}`} aria-label="Основна навігація">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={activeNav === item ? 'nav-active' : ''}
              onClick={() => handleNavClick(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="head-actions">
          <button type="button" className="help-pill" onClick={() => scrollToSection('help')}>
            <span>🫶</span>
            Допомога зараз
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero wrap" id="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span />
              <span>М’яка підтримка для дітей</span>
            </div>

            <h1>
              Тихе <em>місце</em> для спокійного дихання, уваги й відновлення.
            </h1>

            <p className="hero-desc">
              Простір, де дитина може зупинитися, зібратись, обрати потрібну ритмічну активність
              та відчути себе в безпеці — без тиску, нав’язливих сигналів і складних правил.
            </p>

            <div className="hero-actions">
              <button type="button" className="btn btn-primary" onClick={() => scrollToSection('check-in')}>
                Почати
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => scrollToSection('activities')}>
                Подивитись активності
              </button>
            </div>

            <div className="trust-line">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L14.8 6.7L20 7.5L16.3 11.1L17.2 16.3L12 13.8L6.8 16.3L7.7 11.1L4 7.5L9.2 6.7L12 2Z" fill="currentColor"/>
              </svg>
              <span>Дружній, безпечний, український формат</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Ілюстрація світу">
            <div className="art-sun"><span>☼</span></div>
            <div className="art-cloud cloud-one" />
            <div className="art-cloud cloud-two" />
            <div className="hill hill-back" />
            <div className="hill hill-front" />
            <div className="art-flower flower-a">✿</div>
            <div className="art-flower flower-b">✦</div>
            <div className="art-stone stone-a" />
            <div className="art-leaf">❀</div>
            <div className="art-caption">Світ підтримки й спокою</div>
          </div>

          <div className="hero-spark">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 1.5L14.4 8.1L21 10.5L14.4 12.9L12 19.5L9.6 12.9L3 10.5L9.6 8.1L12 1.5Z" fill="currentColor" />
            </svg>
            <span>Можна почати з одного глибокого вдиху.</span>
          </div>
        </section>

        <div className="feeling-strip" id="check-in">
          <div className="wrap strip-inner">
            <span>Як ти себе почуваєш зараз?</span>
            <span className="feeling-word">Спокійно</span>
            <span className="feeling-word">Тривожно</span>
            <span className="feeling-word">Збуджено</span>
            <span className="feeling-word">Сумно</span>
          </div>
        </div>

        <section className="section wrap" id="activities">
          <div className="section-heading">
            <h2>Що тут є</h2>
            <p>Невеликий і чіткий набір інструментів підтримки — без складних правил і без зайвого тиску.</p>
          </div>

          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.index} className="feature-card">
                <div className={`feature-icon ${feature.tone}`}>{feature.icon}</div>
                <div className="card-index">{feature.index}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <button type="button" className="text-link" onClick={() => scrollToSection('help')}>
                  Дізнатись більше <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="quote-band">
          <div className="quote-mark">“</div>
          <p>Не все треба виправляти одразу. Достатньо лише на мить відчути себе в безпеці.</p>
          <span>— філософія Тихого місця</span>
          <div className="quote-flower">✿</div>
        </section>

        <section className="section wrap">
          <div className="section-heading">
            <h2>Як це працює</h2>
            <p>Короткі, зрозумілі кроки, які не вимагають особливих навичок чи складної підготовки.</p>
          </div>

          <div className="steps-grid">
            {steps.map((step) => (
              <div className="how-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.heading}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wrap" id="adults">
          <div className="adult-callout">
            <div>
              <h2>Для дорослих</h2>
              <p>
                Тут не про “виправлення” емоцій дитини, а про підтримку, паузу й безпечний вибір.
                Вправа працює краще, коли вона не викликає страху і не ставить дитину перед
                обов’язком не подавати правильну реакцію.
              </p>
            </div>

            <div className="adult-illustration" aria-hidden="true">
              <div className="adult-star">✦</div>
              <div className="adult-circle">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <path d="M50 12 C31 12 16 29 16 48 C16 67 31 84 50 84 C69 84 84 67 84 48 C84 29 69 12 50 12Z" fill="#f8d45d"/>
                  <circle cx="40" cy="46" r="4" fill="#3b4d3c"/>
                  <circle cx="60" cy="46" r="4" fill="#3b4d3c"/>
                  <path d="M39 58 Q50 67 61 58" stroke="#3b4d3c" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="adult-leaf">❀</div>
            </div>
          </div>
        </section>

        <section className="faq-section" id="help">
          <div className="wrap faq-wrap">
            <div>
              <div className="page-eyebrow">
                <span>Часті питання</span>
              </div>
              <h2>Питання і відповіді</h2>
            </div>

            <div className="faq-list">
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    <span>{item.q}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap final-cta">
          <div>
            <div className="page-eyebrow">
              <span>Готовність до наступного кроку</span>
            </div>
            <h2>Почніть із малого — з одного спокійного моменту.</h2>
            <p>Це чернетка, тому вона все ще потребує технічної перевірки, доступності та експертного перегляду, але вже готова до короткого практичного використання.</p>
          </div>
          <div className="final-sun">☼</div>
          <button type="button" className="btn btn-dark" onClick={() => scrollToSection('help')}>
            Знайти підтримку
          </button>
        </section>

        <section className="world-section wrap" id="about">
          <div className="section-heading">
            <h2>Ілюстрований світ</h2>
            <p>Невеликі образи, які допомагають дитині відчути різні типи спокою, підтримки й уваги.</p>
          </div>

          <div className="world-grid">
            {worldCards.map((card) => (
              <article className="world-card" key={card.title}>
                <img src={card.image} alt={card.title} />
                <div>
                  <span>ІЛЮСТРАЦІЯ</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="world-note">
            Кожна ілюстрація призначена для м’якої візуальної підтримки, а не для нав’язливого
            або драматичного контенту. Вони створені, щоб заспокоїти, а не перевантажити.
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="brand">
            <span className="brand-mark">✦</span>
            <span>
              Тихе <span className="brand-light">місце</span>
            </span>
          </div>
          <p>
            Простір підтримки для дітей, де важливі спокій, безпечність, ясність і можливість зупинитися.
          </p>
        </div>

        <div className="footer-links">
          <strong>Навігація</strong>
          <button type="button" onClick={() => handleNavClick('Головна')}>Головна</button>
          <button type="button" onClick={() => handleNavClick('Активності')}>Активності</button>
          <button type="button" onClick={() => handleNavClick('Допомога')}>Допомога</button>
          <button type="button" onClick={() => scrollToSection('help')}>Контакт</button>
        </div>

        <div className="footer-links">
          <strong>Політики</strong>
          <button type="button">Приватність</button>
          <button type="button">Доступність</button>
          <button type="button">Умови</button>
          <button type="button" onClick={() => handleNavClick('Про проект')}>Про проект</button>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Тихе місце</span>
          <span>Чернетка для оцінки</span>
        </div>
      </footer>

      <button type="button" className="floating-help" onClick={() => scrollToSection('help')}>
        <span>🫶</span> Допомога зараз
      </button>
    </div>
  )
}

export default App
