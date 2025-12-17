'use client';

import { useState } from 'react';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';
import { FaTimes } from 'react-icons/fa';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{ id: number; category: string; title: string } | null>(null);

  const galleryItems = [
    { id: 1, category: 'memories', title: 'لحظة غالية 1' },
    { id: 2, category: 'memories', title: 'لحظة غالية 2' },
    { id: 3, category: 'events', title: 'فعالية 1' },
    { id: 4, category: 'events', title: 'فعالية 2' },
    { id: 5, category: 'community', title: 'المجتمع 1' },
    { id: 6, category: 'community', title: 'المجتمع 2' },
    { id: 7, category: 'memories', title: 'لحظة غالية 3' },
    { id: 8, category: 'events', title: 'فعالية 3' },
    { id: 9, category: 'community', title: 'المجتمع 3' },
    { id: 10, category: 'memories', title: 'لحظة غالية 4' },
    { id: 11, category: 'events', title: 'فعالية 4' },
    { id: 12, category: 'community', title: 'المجتمع 4' },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="معرض الصور"
            subtitle="رحلة بصرية عبر الذكريات الغالية"
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            title="استكشف الذكريات"
            subtitle="انقر على أي صورة لعرض الحجم الكامل"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <Card
                key={item.id}
                className="overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${(index % 6) * 0.05}s` }}
                onClick={() => setSelectedImage(item)}
                hover={true}
              >
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300 overflow-hidden relative">
                  🖼️
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-amber-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    {item.category === 'memories' && 'ذكريات'}
                    {item.category === 'events' && 'فعاليات'}
                    {item.category === 'community' && 'المجتمع'}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for Full Image View */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <div className="bg-gradient-to-br from-amber-100 to-rose-100 aspect-square flex items-center justify-center text-9xl rounded-xl">
              🖼️
            </div>

            <div className="text-white text-center mt-4">
              <h2 className="text-2xl font-bold mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-amber-200 capitalize">
                {selectedImage.category}
              </p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:bg-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 bg-black bg-opacity-50 hover:bg-opacity-100"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}


    </main>
  );
}