import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Home, Flame, Heart, Crown, Play, Lock, Star, UserRound, X, ChevronLeft } from 'lucide-react';
import './styles.css';

const tg = window.Telegram?.WebApp;

const series = [
  {
    id: 1,
    title: 'A Herdeira da Lua Escarlate',
    category: 'Romance fantasioso',
    tag: 'Novo',
    episodes: 30,
    freeEpisodes: 3,
    rating: '9.7',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=900&auto=format&fit=crop',
    synopsis: 'Uma jovem órfã descobre que seu sangue desperta lobos ancestrais e a coloca no centro de uma guerra entre reinos.',
  },
  {
    id: 2,
    title: 'Contrato com o Rei Sombrio',
    category: 'Intrigas no palácio',
    tag: 'Popular',
    episodes: 42,
    freeEpisodes: 5,
    rating: '9.5',
    cover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop',
    synopsis: 'Ela aceita um casamento falso para salvar a família, mas o rei que todos temem pode ser seu único aliado.',
  },
  {
    id: 3,
    title: 'CEO por Acidente',
    category: 'Romance moderno',
    tag: 'Dublado',
    episodes: 36,
    freeEpisodes: 4,
    rating: '9.3',
    cover: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=900&auto=format&fit=crop',
    synopsis: 'Depois de uma troca de identidade, uma atendente comum vira a noiva pública de um CEO frio e milionário.',
  },
  {
    id: 4,
    title: 'Luna Rejeitada',
    category: 'Lobisomem',
    tag: 'Em alta',
    episodes: 55,
    freeEpisodes: 6,
    rating: '9.8',
    cover: 'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=900&auto=format&fit=crop',
    synopsis: 'Banida pelo alfa, ela retorna mais poderosa, com um segredo capaz de destruir toda a alcateia.',
  },
  {
    id: 5,
    title: 'A Médica da Corte',
    category: 'Guerreiro lendário',
    tag: 'Exclusivo',
    episodes: 28,
    freeEpisodes: 3,
    rating: '9.1',
    cover: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=900&auto=format&fit=crop',
    synopsis: 'Uma curandeira perseguida entra no palácio e descobre uma conspiração que ameaça a coroa.',
  },
  {
    id: 6,
    title: 'Meu Guarda-Costas é um Príncipe',
    category: 'Família rica',
    tag: 'Top 10',
    episodes: 33,
    freeEpisodes: 4,
    rating: '9.4',
    cover: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=900&auto=format&fit=crop',
    synopsis: 'Para fugir de um casamento arranjado, uma herdeira contrata um guarda-costas que esconde a própria linhagem real.',
  },
];

const categories = ['Todos', 'Romance fantasioso', 'Romance moderno', 'Lobisomem', 'Intrigas no palácio', 'Família rica', 'Guerreiro lendário'];

function App() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('home');

  useEffect(() => {
    tg?.ready();
    tg?.expand();
    tg?.setHeaderColor?.('#100713');
    tg?.setBackgroundColor?.('#100713');
  }, []);

  const filtered = useMemo(() => {
    return series.filter((item) => {
      const byCategory = activeCategory === 'Todos' || item.category === activeCategory;
      const byQuery = item.title.toLowerCase().includes(query.toLowerCase());
      return byCategory && byQuery;
    });
  }, [activeCategory, query]);

  if (selected) {
    return <Details item={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Mini séries verticais</p>
          <h1>ShortDrama</h1>
        </div>
        <button className="profile" onClick={() => tg?.HapticFeedback?.impactOccurred?.('light')}>
          <UserRound size={20} />
        </button>
      </header>

      <section className="hero" onClick={() => setSelected(series[0])}>
        <img src={series[0].cover} alt="Capa da série em destaque" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <span className="pill"><Flame size={14} /> Em alta hoje</span>
          <h2>{series[0].title}</h2>
          <p>{series[0].synopsis}</p>
          <button className="watch-btn"><Play size={18} fill="currentColor" /> Assistir agora</button>
        </div>
      </section>

      <div className="search-box">
        <Search size={18} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar drama, romance, fantasia..." />
        {query && <button onClick={() => setQuery('')}><X size={16} /></button>}
      </div>

      <nav className="chips">
        {categories.map((cat) => (
          <button key={cat} className={activeCategory === cat ? 'active' : ''} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </nav>

      <Section title="Lançamento Novo" icon={<Flame size={18} />} items={filtered.slice(0, 6)} onSelect={setSelected} />
      <Section title="Mais Popular" icon={<Crown size={18} />} items={[...filtered].reverse()} onSelect={setSelected} />

      <footer className="bottom-nav">
        <button className={tab === 'home' ? 'active' : ''} onClick={() => setTab('home')}><Home size={20} />Início</button>
        <button className={tab === 'hot' ? 'active' : ''} onClick={() => setTab('hot')}><Flame size={20} />Em alta</button>
        <button className={tab === 'fav' ? 'active' : ''} onClick={() => setTab('fav')}><Heart size={20} />Favoritos</button>
      </footer>
    </main>
  );
}

function Section({ title, icon, items, onSelect }) {
  return (
    <section className="section">
      <h3>{icon}{title}</h3>
      <div className="grid-list">
        {items.map((item) => <Card key={item.id} item={item} onClick={() => onSelect(item)} />)}
      </div>
    </section>
  );
}

function Card({ item, onClick }) {
  return (
    <article className="card" onClick={onClick}>
      <div className="poster-wrap">
        <img src={item.cover} alt={item.title} />
        <span className="card-tag">{item.tag}</span>
      </div>
      <h4>{item.title}</h4>
      <p>{item.category}</p>
      <div className="meta"><span><Star size={13} fill="currentColor" /> {item.rating}</span><span>{item.episodes} eps</span></div>
    </article>
  );
}

function Details({ item, onBack }) {
  const episodes = Array.from({ length: item.episodes }, (_, i) => i + 1);

  useEffect(() => {
    tg?.BackButton?.show?.();
    tg?.BackButton?.onClick?.(onBack);
    return () => tg?.BackButton?.hide?.();
  }, [onBack]);

  function handleWatch(ep) {
    if (ep > item.freeEpisodes) {
      tg?.showPopup?.({
        title: 'Episódio bloqueado',
        message: 'Desbloqueie a temporada completa para continuar assistindo.',
        buttons: [{ type: 'default', text: 'Ver planos' }, { type: 'cancel' }],
      });
      return;
    }
    tg?.showAlert?.(`Reproduzindo episódio ${ep}. Aqui você conectaria seu player de vídeo.`);
  }

  return (
    <main className="details">
      <button className="back" onClick={onBack}><ChevronLeft size={18} /> Voltar</button>
      <section className="detail-hero">
        <img src={item.cover} alt={item.title} />
        <div className="detail-gradient" />
      </section>
      <section className="detail-content">
        <span className="pill">{item.category}</span>
        <h1>{item.title}</h1>
        <p>{item.synopsis}</p>
        <div className="detail-stats">
          <span><Star size={15} fill="currentColor" /> {item.rating}</span>
          <span>{item.episodes} episódios</span>
          <span>{item.freeEpisodes} grátis</span>
        </div>
        <button className="watch-btn wide" onClick={() => handleWatch(1)}><Play size={18} fill="currentColor" /> Começar episódio 1</button>
        <h3>Episódios</h3>
        <div className="episode-grid">
          {episodes.map((ep) => (
            <button key={ep} onClick={() => handleWatch(ep)} className={ep > item.freeEpisodes ? 'locked' : ''}>
              {ep > item.freeEpisodes ? <Lock size={14} /> : <Play size={13} fill="currentColor" />} Ep. {ep}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
