'use client';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "At MAKEWAYS, we take our work too seriously without taking ourselves seriously.",
      name: "NIRVANA CHAUDHARY",
      position: "MD - CHAUDHARY GROUP"
    },
    {
      id: 2,
      quote: "At MAKEWAYS, we take our work too seriously without taking ourselves seriously.",
      name: "BIDHAN RAJBHANDARI",
      position: "FOUNDER - MAKEWAYS"
    }
  ];

  return (
    <>
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">SAYS</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className="testimonial-card"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <div className="testimonial-content">
                  <div className="quote-mark">&quot;</div>
                  <p className="quote-text">{testimonial.quote}</p>
                  <div className="testimonial-author">
                    <div className="author-image">
                      <div className="image-placeholder"></div>
                    </div>
                    <div className="author-info">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-position">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .testimonials-section {
          background: var(--light);
          padding: 100px 20px;
          position: relative;
        }

        .section-title {
          font-size: 64px;
          color: var(--orange);
          text-align: center;
          margin-bottom: 70px;
          letter-spacing: 4px;
          font-weight: bold;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 50px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .testimonial-card {
          background: white;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          position: relative;
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(255,140,0,0.2);
        }

        .testimonial-content {
          position: relative;
        }

        .quote-mark {
          font-size: 120px;
          color: var(--orange);
          opacity: 0.2;
          position: absolute;
          top: -40px;
          left: -20px;
          line-height: 1;
          font-family: Georgia, serif;
        }

        .quote-text {
          font-size: 20px;
          line-height: 1.7;
          color: var(--dark);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 30px;
          border-top: 2px solid var(--orange);
        }

        .author-image {
          flex-shrink: 0;
        }

        .image-placeholder {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--orange) 0%, #FFA500 100%);
          border-radius: 50%;
          box-shadow: 0 5px 15px rgba(255,140,0,0.3);
        }

        .author-info {
          flex-grow: 1;
        }

        .author-name {
          font-size: 20px;
          color: var(--dark);
          font-weight: bold;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .author-position {
          font-size: 14px;
          color: var(--gray);
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 48px;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
          
          .testimonial-card {
            padding: 30px;
          }
          
          .quote-text {
            font-size: 18px;
          }
        }
      `}</style>
    </>
  );
}