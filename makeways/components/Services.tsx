'use client';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export default function Services() {
  const services: Service[] = [
    {
      id: 1,
      title: "TVC",
      description: "Television commercials that captivate and convert",
      icon: "📺"
    },
    {
      id: 2,
      title: "PRINT",
      description: "Print campaigns that leave lasting impressions",
      icon: "📰"
    },
    {
      id: 3,
      title: "DIGITAL",
      description: "Digital marketing strategies that drive results",
      icon: "💻"
    },
    {
      id: 4,
      title: "EVENT",
      description: "Memorable events that engage and inspire",
      icon: "🎯"
    },
    {
      id: 5,
      title: "JINGLE",
      description: "Catchy jingles that stick in minds forever",
      icon: "🎵"
    }
  ];

  return (
    <>
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">OUR SERVICES</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="service-card"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-section {
          background: var(--gray);
          padding: 100px 20px;
          position: relative;
          overflow: hidden;
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,140,0,0.1) 0%, transparent 100%);
          pointer-events: none;
        }

        .container {
          position: relative;
          z-index: 1;
        }

        .section-title {
          font-size: 48px;
          color: white;
          text-align: center;
          margin-bottom: 70px;
          letter-spacing: 3px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .service-card {
          background: white;
          padding: 50px 30px;
          border-radius: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .service-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 20px 50px rgba(255,140,0,0.3);
        }

        .service-hover-effect {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, var(--orange), #FFA500);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-hover-effect {
          transform: scaleX(1);
        }

        .service-icon {
          font-size: 70px;
          margin-bottom: 25px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .service-title {
          font-size: 28px;
          color: var(--orange);
          margin-bottom: 15px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .service-description {
          font-size: 16px;
          color: var(--gray);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 36px;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}