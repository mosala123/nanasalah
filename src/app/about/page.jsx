'use client';

import { useState } from 'react';
import HeroBanner from '../../components/HeroBanner';
import Link from 'next/link';

export default function AboutPage() {
  const [imageError, setImageError] = useState({});

  const handleImageError = (id) => {
    setImageError(prev => ({ ...prev, [id]: true }));
  };

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80', alt: 'ذكريات عائلية' },
    { id: 2, src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80', alt: 'لحظات خاصة' },
    { id: 3, src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', alt: 'أوقات جميلة' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-rose-50" dir="rtl">
      {/* Hero Banner */}
     <section className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroBanner
            title="عنها"
            subtitle="حياة مليئة بالحب والعطف"
          />
        </div>
      </section>

      {/* Portrait & Bio Section */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Portrait Frame */}
            <div className="order-1 md:order-2">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80"
                  alt="حنين - صورة شخصية"
                  className="w-full h-full object-cover"
                  onError={() => handleImageError('portrait')}
                />
                <div className="absolute inset-0 border-8 border-white/20 rounded-2xl pointer-events-none"></div>
              </div>
            </div>

            {/* Biography Section */}
            <div className="order-2 md:order-1 text-right">
              <h2 className="text-4xl font-bold text-amber-900 mb-2">
                   قَد مَاتَ شَهِيدًا مَن مَاتَ فِدَاءً لِلْمَحْبُوبِ
              </h2>
              <p className="text-2xl text-rose-600 font-semibold mb-6">
                توفيت في 29 أكتوبر 2021
              </p>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  كانت نوراً مضيئاً في حياة كل من عرفها. بقلب مليء بالطيبة وروح مكرسة للخدمة،
                  لمست حياة الآلاف برحمتها وسخاء نفسها.
                </p>

                <p className="text-lg">
                  تميزت بإيمانها القوي وتعلقها بالعبادات، حيث كانت حريصة على الصلاة والصيام وقيام الليل، مما جعلها مثالاً يحتذى به في التقوى والورع.
                </p>

                <p className="text-lg">
                  إرثها هو صدقة جارية تذكرنا بأن الثروة الحقيقية تكمن في الخير الذي نتركه خلفنا.
                  من خلال أفعالها وتفانيها، علمتنا معنى التضحية والحب والرعاية بلا شروط.
                </p>

                <p className="text-lg">
                  واجهت تحديات الحياة بصبر نادر وثبات، محتفظة بابتسامتها وروحها الطيبة حتى في أصعب الأوقات. تركت إرثاً من الذكريات الجميلة والعبر المؤثرة.
                </p>
              </div>

              {/* Tribute Button */}
               <div className="mt-8 flex flex-col md:flex-row gap-4"> 
                <Link href="/supplications" className="inline-block mt-8 bg-gradient-to-r from-rose-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                تكريمها بالدعاء
              </Link>
              <Link href="/adhkar" className="inline-block mt-8 bg-gradient-to-r from-rose-600 to-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                تكريمها  بالأذكار 
              </Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Challenges & Strengths */}
      <section className="px-4 md:px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              التحديات والمواقف التي واجهتها
            </h2>
            <p className="text-xl text-gray-600">صمود وإيمان في رحلتها</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'الصبر على المرض',
                description: 'تحملت آلام المرض بصبر وإيمان، لم تشتكِ بل زادت من عبادتها وذِكرها لله',
                image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80'
              },
              {
                title: 'العطاء في الضيق',
                description: 'رغم ظروفها الصحية، استمرت في مساعدة الآخرين والعناية بمن حولها',
                image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80'
              },
              {
                title: 'الثبات على المبدأ',
                description: 'حافظت على قيمها ومبادئها في كل الظروف، وكانت قدوة في الالتزام',
                image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80'
              },
            ].map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={() => handleImageError(`challenge-${index}`)}
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-bold text-amber-900 mb-2">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qualities Section */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-rose-600 mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              صفاتها التي لا تُنسى
            </h2>
            <p className="text-xl text-gray-600">ما ميّز شخصيتها وطباعها</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quality: 'قلبها الطيب',
                description: 'تعاملت بكل لطف وإنسانية مع الجميع'
              },
              {
                quality: 'إيمانها العميق',
                description: 'ملازمة المساجد والعبادات بخشوع'
              },
              {
                quality: 'صبرها النادر',
                description: 'تحملت ما لا يتحمله الكثيرون'
              },
              {
                quality: 'عطاؤها الدائم',
                description: 'تكفلت بمساعدة المحتاجين باستمرار'
              },
              {
                quality: 'تواضعها الجم',
                description: 'رغم مكانتها كانت متواضعة جداً'
              },
              {
                quality: 'ابتسامتها الدائمة',
                description: 'لم تفارقها الابتسامة حتى في الألم'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl p-6 text-right shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="mb-3">
                  <div className="w-12 h-1 bg-rose-500 mb-2"></div>
                  <h3 className="text-xl font-bold text-amber-900">
                    {item.quality}
                  </h3>
                </div>
                <p className="text-gray-700 text-right">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Memories Gallery */}
      <section className="px-4 md:px-6 py-16 bg-gradient-to-b from-amber-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              ذكريات حقيقية
            </h2>
            <p className="text-xl text-gray-600">لحظات عاشتها مع العائلة والأحباب</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="aspect-square flex items-center justify-center cursor-pointer overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={() => handleImageError(`gallery-${image.id}`)}
                  />
                </div>
                <div className="p-4 text-right bg-gradient-to-r from-amber-50 to-rose-50">
                  <p className="text-gray-800 font-semibold">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="inline-block bg-gradient-to-r from-amber-600 to-rose-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
              عرض المزيد من الذكريات
            </button>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="px-4 md:px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-20 h-1 bg-amber-600 mx-auto mb-4"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              إرثها الذي تركته
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              لقد تركت لنا دروساً في الصبر والإيمان والحب، وستظل ذكراها نبراساً يضيء طريقنا
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12">
            <div className="relative h-64 md:h-80">
              <img
                src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?w=1200&q=80"
                alt="إرث حنين"
                className="w-full h-full object-cover"
                onError={() => handleImageError('legacy')}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-rose-900/70"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-6">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    "في ذكراها نجد العزاء وفي إرثها نجد الأمل"
                  </h3>
                  <p className="text-lg opacity-90">
                    ستظل nana  حية في قلوبنا وذكرياتنا
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="text-right p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-amber-900 mb-4 border-b-2 border-amber-600 pb-2">
                الدروس المستفادة
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 ml-2">•</span>
                  <span>قوة الإيمان في مواجهة المحن</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 ml-2">•</span>
                  <span>أهمية العطاء رغم الظروف</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 ml-2">•</span>
                  <span>قيمة الصبر والرضا بالقضاء</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 ml-2">•</span>
                  <span>تأثير القلب الطيب على الآخرين</span>
                </li>
              </ul>
            </div>

            <div className="text-right p-8 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl shadow-lg">
              <h4 className="text-xl font-bold text-rose-900 mb-4 border-b-2 border-rose-600 pb-2">
                الذكرى الخالدة
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-rose-600 ml-2">•</span>
                  <span>صوتها الهادئ في الدعاء</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 ml-2">•</span>
                  <span>يديها الممدودة للمساعدة</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 ml-2">•</span>
                  <span>ابتسامتها التي تنشر الأمل</span>
                </li>
                <li className="flex items-start">
                  <span className="text-rose-600 ml-2">•</span>
                  <span>حضورها الروحاني في المجالس</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}