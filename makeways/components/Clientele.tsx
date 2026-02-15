'use client';

interface Client {
  id: number;
  name: string;
}

export default function Clientele() {
  const clients: Client[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`
  }));

  return (
    <>
      <section className="clients-section">
        <div className="container">
          <h2 className="section-title">OUR TRUSTED CLIENTS</h2>
          <div className="clients-grid">
            {clients.map((client, index) => (
              <div 
                key={client.id} 
                className="client-logo"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="logo-placeholder">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .clients-section {
          background: var(--light);
          padding: 100px 20px;
        }

        .section-title {
          font-size: 42px;
          color: var(--dark);
          text-align: center;
          margin-bottom: 60px;
          letter-spacing: 2px;
        }

        .clients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .client-logo {
          background: white;
          padding: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .client-logo:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(255,140,0,0.15);
        }

        .logo-placeholder {
          width: 100%;
          height: 80px;
          background: linear-gradient(135deg, var(--light) 0%, #f0f0f0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          font-size: 14px;
          color: var(--gray);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 32px;
          }
          
          .clients-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
}