'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaPlay, FaPause, FaSpinner, FaChevronLeft, FaChevronRight, FaBook, FaHeadphones, FaArrowLeft } from 'react-icons/fa';

interface Ayah {
    text: string;
    numberInSurah: number;
    audio: string;
}

interface Surah {
    number: number;
    name: string;
    englishName: string;
    numberOfAyahs: number;
    revelationType: string;
    ayahs: Ayah[];
}

export default function SurahDetailPage({ params }: { params: { id: string } }) {
    const surahNumber = params.id;
    const [surah, setSurah] = useState<Surah | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [viewMode, setViewMode] = useState('read');
    const [audioQueue, setAudioQueue] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        const fetchSurah = async () => {
            try {
                const response = await fetch(
                    `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.asad`
                );
                const data = await response.json();
                setSurah(data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching surah:', error);
                setLoading(false);
            }
        };

        fetchSurah();
    }, [surahNumber]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [surahNumber]);

    const fetchAllAudioUrls = async () => {
        try {
            const recitationResponse = await fetch(
                `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
            );
            const recitationData = await recitationResponse.json();

            if (recitationData.data.ayahs) {
                const urls = recitationData.data.ayahs.map((ayah: { audio: string }) => ayah.audio);
                setAudioQueue(urls);
                return urls;
            }
        } catch (error) {
            console.error('Error fetching audio:', error);
        }
        return [];
    };

    const playNextAudio = (urls: string[], index: number) => {
        if (index >= urls.length) {
            setIsPlaying(false);
            setCurrentAudioIndex(0);
            return;
        }

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audio = new Audio(urls[index]);
        audioRef.current = audio;

        audio.play().catch(err => {
            console.error('Error playing audio:', err);
            playNextAudio(urls, index + 1);
        });

        audio.onended = () => {
            setCurrentAudioIndex(index + 1);
            playNextAudio(urls, index + 1);
        };
    };

    const togglePlay = async () => {
        if (!isPlaying) {
            let urls = audioQueue;
            if (urls.length === 0) {
                urls = await fetchAllAudioUrls();
            }

            if (urls && urls.length > 0) {
                setIsPlaying(true);
                playNextAudio(urls, currentAudioIndex);
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
            }
            setIsPlaying(false);
        }
    };

    const nextPage = () => {
        if (surah && currentPage < surah.ayahs.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <FaSpinner className="text-4xl text-amber-600 animate-spin" />
            </main>
        );
    }

    if (!surah) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="text-center">
                    <p className="text-xl text-amber-900 mb-4 font-bold">لم يتم العثور على السورة</p>
                    <Link href="/quran" className="text-amber-700 font-semibold hover:text-amber-900 text-lg flex items-center justify-center">
                        <FaArrowLeft className="mr-2" /> العودة إلى القرآن
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Header */}
            <section className="px-4 md:px-6 py-6">
                <div className="max-w-7xl mx-auto">
                    <Link href="/quran" className="flex items-center gap-2 mb-4 w-fit hover:opacity-80 transition-all">
                        <FaArrowRight className="text-lg text-amber-700" />
                        <span className="text-lg font-semibold text-amber-700">العودة</span>
                    </Link>
                    <div className="text-center">
                        <div className="inline-block mb-3">
                            <h1 className="text-2xl md:text-5xl font-bold text-amber-900 mb-1">{surah.name}</h1>
                            <p className="text-amber-700 text-1xl md:text-3xl  font-semibold">{surah.englishName}</p>
                        </div>
                        <p className="text-amber-900 text-m font-medium">
                            <span className="bg-amber-100 px-3 py-1 rounded-full mx-2   border border-amber-300">{surah.numberOfAyahs} آية</span>
                            <span className="bg-amber-100 px-3 py-1 rounded-full mx-2    border border-amber-300">{surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية'}</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* View Mode Toggle */}
            <section className="px-4 md:px-6 py-4">
                <div className="max-w-5xl mx-auto flex justify-center gap-3">
                    <button
                        onClick={() => {
                            setViewMode('read');
                            setCurrentPage(0);
                        }}
                        className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center gap-2 cursor-pointer border ${viewMode === 'read'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-white border-amber-300 text-amber-900 hover:bg-amber-50'
                            }`}
                    >
                        <FaBook className="text-s" /> قراءة
                    </button>
                    <button
                        onClick={() => {
                            setViewMode('listen');
                            setCurrentPage(0);
                        }}
                        className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center gap-2 cursor-pointer border ${viewMode === 'listen'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'
                            : 'bg-white border-green-300 text-green-900 hover:bg-green-50'
                            }`}
                    >
                        <FaHeadphones className="text-s" /> استماع
                    </button>
                </div>
            </section>

            {/* Read Mode */}
            {viewMode === 'read' && surah.ayahs && surah.ayahs.length > 0 && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-4xl mx-auto w-full">
                        {/* Main Page */}
                        <div className="relative bg-white rounded-xl shadow-lg p-6 md:p-8 border border-amber-200 min-h-[60vh] flex flex-col justify-center">
                            {/* Content */}
                            <div className="relative text-center">
                                {/* Ayah Number */}
                                <div className="mb-8">
                                    <div className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full shadow-lg border border-amber-400">
                                        <span className="text-2xl font-bold tracking-wide">
                                            ﴿ بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ ﴾
                                        </span>
                                    </div>

                                </div>

                                {/* Ayah Text */}
                                <div className="my-13 px-4">
                                    <p className="text-xl md:text-3xl font-bold text-amber-900 leading-loose" style={{
                                        fontFamily: '  Arabic, Amiri, Arial',
                                        lineHeight: '2.2'
                                    }}>
                                        {surah.ayahs[currentPage]?.text}
                                    </p>
                                </div>

                                {/* End of Ayah Symbol */}
                                <div className="mt-6 flex items-center justify-center">
                                    <div className="bg-gradient-to-br from-amber-600 to-orange-600 text-white 
                  w-16 h-16 rounded-full flex items-center justify-center 
                  shadow-lg border border-amber-400">
                                        <span className="text-2xl font-bold">
                                            ﴿ {surah.ayahs[currentPage]?.numberInSurah} ﴾
                                        </span>
                                    </div>
                                </div>


                                {/* Page Info */}
                                <div className="mt-8 text-lg font-bold text-amber-700">
                                    <span className="bg-amber-100 px-4 py-2 rounded-full">
                                        الآية {currentPage + 1} من {surah.ayahs.length}
                                    </span>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 0}
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-amber-400"
                            >
                                <FaChevronRight className="text-xl" />
                            </button>
                            <button
                                onClick={nextPage}
                                disabled={currentPage === surah.ayahs.length - 1}
                                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-amber-400"
                            >
                                <FaChevronLeft className="text-xl" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                            <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden border border-amber-300">
                                <div
                                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-300"
                                    style={{
                                        width: `${((currentPage + 1) / surah.ayahs.length) * 100}%`
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Listen Mode */}
            {viewMode === 'listen' && (
                <section className="px-4 md:px-6 py-8">
                    <div className="max-w-4xl mx-auto w-full">
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-green-200">
                            <div className="text-center">
                                <FaHeadphones className="text-4xl text-green-600 mx-auto mb-4" />
                                <h2 className="text-xl md:text-2xl font-bold text-green-900 mb-4">استماع للسورة كاملة</h2>
                                <p className="text-lg text-green-700 mb-6 font-semibold">
                                    {isPlaying ? (
                                        <span className="bg-green-100 px-4 py-2 rounded-full inline-block">
                                            جاري تشغيل الآية {currentAudioIndex + 1} من {surah.ayahs.length}
                                        </span>
                                    ) : (
                                        <span className="bg-green-100 px-4 py-2 rounded-full inline-block">
                                            استماع إلى {surah.numberOfAyahs} آية
                                        </span>
                                    )}
                                </p>

                                <button
                                    onClick={togglePlay}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white rounded-lg font-semibold hover:shadow-md transition-all duration-300 hover:scale-105 text-base flex items-center gap-3 mx-auto border border-green-400 cursor-pointer"
                                >
                                    {isPlaying ? (
                                        <>
                                            <FaPause className="text-lg" />
                                            <span>إيقاف التشغيل</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaPlay className="text-lg" />
                                            <span>تشغيل التلاوة</span>
                                        </>
                                    )}
                                </button>

                                {isPlaying && (
                                    <div className="mt-6">
                                        <div className="w-full bg-green-100 rounded-full h-2 overflow-hidden border border-green-300">
                                            <div
                                                className="bg-gradient-to-r from-green-500 to-emerald-600 h-full transition-all duration-300 rounded-full"
                                                style={{
                                                    width: `${((currentAudioIndex + 1) / surah.ayahs.length) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-green-700 mt-2 font-semibold">
                                            التقدم: {Math.round(((currentAudioIndex + 1) / surah.ayahs.length) * 100)}%
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Current Ayah Display */}
                        {isPlaying && surah.ayahs[currentAudioIndex] && (
                            <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-green-200">
                                <div className="text-center mb-4">
                                    <span className="text-base font-bold text-green-700 bg-green-100 px-4 py-2 rounded-full border border-green-300">
                                        الآية {surah.ayahs[currentAudioIndex].numberInSurah}
                                    </span>
                                </div>
                                <p className="text-lg md:text-xl font-bold text-green-900 leading-loose text-center" style={{
                                    fontFamily: 'Traditional Arabic, Amiri, Arial',
                                    lineHeight: '2'
                                }}>
                                    {surah.ayahs[currentAudioIndex].text} ﴿{surah.ayahs[currentAudioIndex].numberInSurah}﴾
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Navigation */}
            <section className="px-4 md:px-6 py-8">
                <div className="max-w-4xl mx-auto flex justify-between gap-4">
                    {surah.number > 1 && (
                        <Link
                            href={`/quran/${surah.number - 1}`}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-lg hover:shadow-md transition-all duration-300 text-sm font-semibold hover:scale-105 cursor-pointer border border-amber-400"
                        >
                            <FaArrowRight className="text-sm" /> السورة السابقة
                        </Link>
                    )}
                    {surah.number < 114 && (
                        <Link
                            href={`/quran/${surah.number + 1}`}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-lg hover:shadow-md transition-all duration-300 text-sm font-semibold hover:scale-105 cursor-pointer border border-amber-400"
                        >
                            السورة التالية <FaArrowLeft className="text-sm" />
                        </Link>
                    )}
                </div>
            </section>
        </main>
    );
}