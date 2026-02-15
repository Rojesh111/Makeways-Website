'use client';

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/images/logo.jpg" alt="MAKEWAYS Logo" width={150} />
            </div>
            <nav className="nav">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Portfolio</a>
              <a href="#clientele">Clientele</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: var(--white);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          z-index: 1000;
          padding: 20px 0;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h1 {
          font-size: 28px;
          font-weight: bold;
          color: var(--orange);
          letter-spacing: 2px;
        }

        .nav {
          display: flex;
          gap: 40px;
        }

        .nav a {
          font-size: 16px;
          font-weight: 500;
          color: var(--dark);
          transition: color 0.3s ease;
          position: relative;
        }

        .nav a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--orange);
          transition: width 0.3s ease;
        }

        .nav a:hover {
          color: var(--orange);
        }

        .nav a:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav {
            display: none;
          }
          
          .logo h1 {
            font-size: 22px;
          }
        }
      `}</style>
    </>
  );
}