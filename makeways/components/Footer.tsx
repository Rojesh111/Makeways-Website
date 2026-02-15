'use client';

interface Social {
  name: string;
  icon: string;
  url: string;
}

export default function Footer() {
  const socials: Social[] = [
    { name: 'Facebook', icon: 'FB', url: '#' },
    { name: 'Instagram', icon: 'IG', url: '#' },
    { name: 'YouTube', icon: 'YT', url: '#' },
    { name: 'LinkedIn', icon: 'LI', url: '#' },
    { name: 'TikTok', icon: 'TT', url: '#' }
  ];

  return (
    <>
      <footer id="contact" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h2 className="footer-logo">MAKEWAYS</h2>
              <p className="footer-tagline">
                Taking our work too seriously without taking ourselves seriously
              </p>
            </div>

            <div className="footer-sections">
              <div className="footer-section">
                <h3>Contact</h3>
                <p>Email: info@makeways.com</p>
                <p>Phone: +977 123 456 789</p>
                <p>Address: Kathmandu, Nepal</p>
              </div>

              <div className="footer-section">
                <h3>Services</h3>
                <ul>
                  <li>TVC Production</li>
                  <li>Print Campaigns</li>
                  <li>Digital Marketing</li>
                  <li>Event Management</li>
                  <li>Jingle Creation</li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Socials</h3>
                <div className="social-links">
                  {socials.map((social) => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      className="social-icon"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 MAKEWAYS. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer {
          background: var(--dark);
          color: white;
          padding: 80px 20px 30px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 60px;
          margin-bottom: 50px;
        }

        .footer-brand {
          max-width: 400px;
        }

        .footer-logo {
          font-size: 36px;
          color: var(--orange);
          margin-bottom: 20px;
          letter-spacing: 3px;
          font-weight: bold;
        }

        .footer-tagline {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.8;
          font-style: italic;
        }

        .footer-sections {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .footer-section h3 {
          font-size: 20px;
          color: var(--orange);
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .footer-section p {
          font-size: 14px;
          line-height: 1.8;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-section li {
          font-size: 14px;
          line-height: 2;
          opacity: 0.8;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .footer-section li:hover {
          opacity: 1;
          color: var(--orange);
          padding-left: 5px;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: var(--gray);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: var(--orange);
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255,140,0,0.3);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 30px;
          text-align: center;
        }

        .footer-bottom p {
          font-size: 14px;
          opacity: 0.6;
        }

        @media (max-width: 968px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          
          .footer-sections {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </>
  );
}