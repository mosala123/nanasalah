'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import Card from '../../components/Card';
import HeroBanner from '../../components/HeroBanner';

export default function QuranPage() {
  const [surahs, setSurahs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/ar.asad');
        const data = await response.json();
        setSurahs(data.data.surahs.slice(0, 114));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Quran data:', error);
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Banner */}
      <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="القرآن الكريم"
            subtitle="استمع إلى التلاوات الجميلة"
          />
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="ابحث عن سورة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-xl border-2 border-amber-200 focus:outline-none focus:border-amber-500 transition-colors duration-300 text-right"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Grid View */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <FaSpinner className="text-4xl text-amber-600 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredSurahs.map((surah, index) => (
                  <Link key={surah.number} href={`/quran/${surah.number}`}>
                    <Card
                      className="p-4 h-full text-center hover:shadow-xl animate-fade-in cursor-pointer transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${index * 0.02}s` }}
                    >
                      <div className="flex flex-col items-center h-full justify-between">
                        <div className="text-4xl font-bold text-amber-700 mb-2">
                          {surah.number}
                        </div>
                        <h3 className="text-2xl font-bold text-amber-900 mb-1">
                          {surah.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {surah.englishName}
                        </p>
                        <p className="text-gray-500 text-s">
                          <span>{surah.revelationType === "Meccan" ? "مكية" : "مدنية"}</span>
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredSurahs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    لم يتم العثور على سور. حاول بحثاً مختلفاً.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}