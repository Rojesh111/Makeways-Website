'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories: Category[] = [
    { id: 'all', name: 'ALL', icon: '📋' },
    { id: 'tvc', name: 'TVC', icon: '📺' },
    { id: 'print', name: 'PRINT', icon: '📰' },
    { id: 'digital', name: 'DIGITAL', icon: '💻' },
    { id: 'event', name: 'EVENT', icon: '🎯' },
    { id: 'jingle', name: 'JINGLE', icon: '🎵' }
  ];

  const portfolioItems: PortfolioItem[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    category: categories[(i % 5) + 1].id
  }));

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <>
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <h2 className="section-title">PORTFOLIO</h2>
          
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="filter-icon">{category.icon}</span>
                <span className="filter-name">{category.name}</span>
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="portfolio-item"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="portfolio-image">
                  <div className="image-placeholder">
                    <span>{item.title}</span>
                  </div>
                  <div className="portfolio-overlay">
                    <h4>{item.title}</h4>
                    <p>{categories.find(c => c.id === item.category)?.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .portfolio-section {
          background: white;
          padding: 100px 20px;
        }

        .section-title {
          font-size: 64px;
          color: var(--orange);
          text-align: center;
          margin-bottom: 60px;
          letter-spacing: 4px;
          font-weight: bold;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 60px;
        }

        .filter-btn {
          background: white;
          border: 2px solid var(--orange);
          color: var(--orange);
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: bold;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .filter-btn:hover {
          background: var(--orange);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255,140,0,0.3);
        }

        .filter-btn.active {
          background: var(--orange);
          color: white;
          box-shadow: 0 10px 20px rgba(255,140,0,0.3);
        }

        .filter-icon {
          font-size: 20px;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 40px;
        }

        .portfolio-item {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .portfolio-image {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          transition: all 0.4s ease;
        }

        .portfolio-image:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(255,140,0,0.3);
        }

        .image-placeholder {
          width: 100%;
          aspect-ratio: 16/10;
          background: linear-gradient(135deg, var(--light) 0%, #f0f0f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray);
          font-weight: bold;
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,140,0,0.95) 0%, rgba(255,165,0,0.95) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.4s ease;
          padding: 20px;
        }

        .portfolio-image:hover .portfolio-overlay {
          opacity: 1;
        }

        .portfolio-overlay h4 {
          font-size: 24px;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .portfolio-overlay p {
          font-size: 16px;
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 48px;
          }
          
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}