// API service for fetching Quranic data
// Using Quran API (https://api.alquran.cloud/v1)

export const getQuranData = async () => {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/ar.asad');
        const data = await response.json();
        return data.data.surahs.slice(0, 114);
    } catch (error) {
        return [];
    }
};

export const getSurahDetail = async (surahNumber) => {
    try {
        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.asad`
        );
        const data = await response.json();
        return data.data;
    } catch (error) {

        return null;
    }
};

export const getSurahRecitation = async (surahNumber) => {
    try {
        const response = await fetch(
            `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        return null;
    }
};

export const getRandomVerses = async () => {
    try {
        const response = await fetch('https://api.alquran.cloud/v1/quran/ar.asad');
        const data = await response.json();
        const surahs = data.data.surahs;

        // Get random verses
        const randomVerses = [];
        for (let i = 0; i < 5; i++) {
            const randomSurah = surahs[Math.floor(Math.random() * surahs.length)];
            const randomAyah = randomSurah.ayahs[Math.floor(Math.random() * randomSurah.ayahs.length)];
            randomVerses.push({
                text: randomAyah.text,
                surah: randomSurah.englishName,
                ayah: randomAyah.numberInSurah,
            });
        }
        return randomVerses;
    } catch (error) {
        return [];
    }
};
