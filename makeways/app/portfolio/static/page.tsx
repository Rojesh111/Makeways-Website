'use client';

import PortfolioCategory from '@/components/PortfolioCategory';

const items = [
  {
    id     : 1,
    title  : 'Social Media Campaign',
    client : 'CLIENT NAME',
    year   : '2024',
    images : [
      '/portfolio/static/project1/img1.jpg',
      '/portfolio/static/project1/img2.jpg',
      '/portfolio/static/project1/img3.jpg',
    ],
  },
  {
    id     : 2,
    title  : 'Brand Identity',
    client : 'CLIENT NAME',
    year   : '2024',
    images : '/portfolio/static/project2/cover.jpg',
  },
  {
    id     : 3,
    title  : 'Poster Series',
    client : 'CLIENT NAME',
    year   : '2024',
    images : [
      '/portfolio/static/project3/img1.jpg',
      '/portfolio/static/project3/img2.jpg',
      '/portfolio/static/project3/img3.jpg',
      '/portfolio/static/project3/img4.jpg',
      '/portfolio/static/project3/img5.jpg',
    ],
  },
  {
    id     : 4,
    title  : 'Digital Campaign',
    client : 'CLIENT NAME',
    year   : '2023',
    images : '/portfolio/static/project4/cover.jpg',
  },
  {
    id     : 5,
    title  : 'Viral Post Series',
    client : 'CLIENT NAME',
    year   : '2024',
    images : [
      '/portfolio/static/project5/img1.jpg',
      '/portfolio/static/project5/img2.jpg',
    ],
  },
  {
    id     : 6,
    title  : 'App Launch Campaign',
    client : 'CLIENT NAME',
    year   : '2023',
    images : '/portfolio/static/project6/cover.jpg',
  },
  // Add more projects here...
];

export default function StaticPage() {
  return (
    <PortfolioCategory
      title    = "STATIC"
      subtitle = "Print & Digital"
      accent   = "#f47c20"
      items    = {items}
    />
  );
}