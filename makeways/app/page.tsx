// app/page.tsx
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange text-black py-4 text-center font-bold text-2xl">
        HEADER
      </header>

      {/* Slider Section */}
      <section className="bg-orange text-black py-8 px-4">
        <h2 className="text-xl font-bold mb-4">SLIDER - IMAGES</h2>
        <ul className="list-disc pl-6">
          <li>Welcome 1</li>
          <li>Awards 2</li>
          <li>Murals 1</li>
          <li>Clients Logo Collage -1</li>
          <li>Ads-3</li>
          <li>Marketing Statements -2</li>
        </ul>
        {/* For a real slider, you can integrate a library like swiper.js, but keeping it simple */}
      </section>

      {/* About Makeways */}
      <section className="py-8 px-4">
        <h2 className="text-lg font-bold mb-2">About Makeways</h2>
        {/* Add content here */}
      </section>

      {/* Core Values */}
      <section className="py-8 px-4 text-center">
        <h2 className="text-lg font-bold mb-4">CORE VALUES</h2>
        <div className="flex justify-center space-x-4">
          <div className="w-4 h-4 bg-orange rounded-full"></div>
          <div className="w-4 h-4 bg-orange rounded-full"></div>
          <div className="w-4 h-4 bg-orange rounded-full"></div>
          <div className="w-4 h-4 bg-orange rounded-full"></div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">SERVICES</h2>
        {/* Add services content */}
      </section>

      {/* Info for Website */}
      <section className="py-8 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">INFO FOR WEBSITE</h2>
        <p className="mb-2">COLORS</p>
        <div className="flex justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-orange rounded-full"></div>
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <div className="w-6 h-6 bg-white border border-black rounded-full"></div>
        </div>
        <p>FONT FAMILY: EUROSTILE</p>
      </section>

      {/* Founder Quotes */}
      <section className="bg-gray py-8 px-4">
        {/* Nirvana Chaudhary */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="relative w-48 h-48 mb-4 md:mb-0 md:mr-4">
            <Image
              src="/placeholder-nirvana.jpg" // User will add photo
              alt="Nirvana Chaudhary"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">NIRVANA CHAUDHARY</h3>
            <p className="text-sm">MD - Chaudhary Group</p>
            <h2 className="text-4xl font-bold text-orange">SAYS</h2>
            <p>&quot;About MAKEWAYS, we take our work too seriously without taking ourselves seriously.&quot;</p>
          </div>
        </div>

        {/* Bidhan Rajbhandari */}
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative w-48 h-48 mb-4 md:mb-0 md:mr-4">
            <Image
              src="/placeholder-bidhan.jpg" // User will add photo
              alt="Bidhan Rajbhandari"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold text-orange">FOUNDER</h2>
            <h3 className="text-lg font-bold">BIDHAN RAJBHANDARI</h3>
            <p>&quot;At MAKEWAYS, we take our work too seriously without taking ourselves seriously.&quot;</p>
          </div>
        </div>
      </section>

      {/* Clientele */}
      <section className="py-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">CLIENTELE</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-black h-24"></div>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-orange py-8 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">PORTFOLIO</h2>
        <div className="flex justify-center space-x-4 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-12 h-12 bg-black rounded-full"></div>
          ))}
        </div>
        <div className="flex justify-center space-x-8 text-black font-bold">
          <span>TVC</span>
          <span>PRINT</span>
          <span>DIGITAL</span>
          <span>EVENT</span>
          <span>JINGLE</span>
        </div>
        <p className="text-red-600 text-sm mt-4">NEW PAGES NEED TO BE ADDED: LinkedIn / Youtube</p>
      </section>

      {/* Socials */}
      <section className="py-8 px-4 flex items-center justify-center space-x-4">
        <h2 className="text-2xl font-bold mr-4">SOCIALS</h2>
        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">FB</span>
        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">IG</span>
        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">YT</span>
        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">LI</span>
        <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">TT</span>
      </section>

      {/* Footer */}
      <footer className="bg-white py-4 px-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-2xl font-bold mb-2 md:mb-0">MAKEWAYS</h2>
        <p className="text-sm mb-2 md:mb-0">CONTACT DETAIL</p>
        <div className="w-24 h-24 bg-black"></div>
      </footer>
    </main>
  );
}