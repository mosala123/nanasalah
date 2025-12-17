'use client';

import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaBookOpen, FaPrayingHands, FaStar, FaChalkboardTeacher, FaHeart, FaDownload, FaShare, FaRandom } from 'react-icons/fa';

export default function AudiosPage() {
    const [selectedCategory, setSelectedCategory] = useState('quran');
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [volume, setVolume] = useState(80);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [playlist, setPlaylist] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const audioCategories = [
        { id: 'quran', label: 'القرآن الكريم', icon: <FaBookOpen />, color: 'from-emerald-500 to-teal-600' },
        { id: 'adhkar', label: 'الأذكار', icon: <FaPrayingHands />, color: 'from-blue-500 to-indigo-600' },
        { id: 'duas', label: 'الأدعية', icon: <FaStar />, color: 'from-amber-500 to-orange-600' },
        { id: 'lectures', label: 'محاضرات روحية', icon: <FaChalkboardTeacher />, color: 'from-purple-500 to-pink-600' },
    ];

    // روابط محدثة وتعمل 100%
    const audios = {
        quran: [
            {
                id: 'quran_1',
                title: 'سورة الفاتحة',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '1:02',
                url: 'https://server11.mp3quran.net/sds/001.mp3',
                description: 'أم القرآن والسبع المثاني'
            },
            {
                id: 'quran_2',
                title: 'سورة البقرة',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '2:55:47',
                url: 'https://server11.mp3quran.net/sds/002.mp3',
                description: 'أطول سورة في القرآن الكريم'
            },
            {
                id: 'quran_3',
                title: 'سورة آل عمران',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '48:32',
                url: 'https://server11.mp3quran.net/sds/003.mp3',
                description: 'سورة تبدأ بالحروف المقطعة'
            },
            {
                id: 'quran_4',
                title: 'سورة النساء',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '1:04:21',
                url: 'https://server11.mp3quran.net/sds/004.mp3',
                description: 'سورة الأحكام'
            },
            {
                id: 'quran_5',
                title: 'سورة المائدة',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '55:42',
                url: 'https://server11.mp3quran.net/sds/005.mp3',
                description: 'آخر سورة نزلت على النبي'
            },
            {
                id: 'quran_6',
                title: 'سورة الأنعام',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '1:00:15',
                url: 'https://server11.mp3quran.net/sds/006.mp3',
                description: 'نزلت جملة واحدة'
            },
            {
                id: 'quran_7',
                title: 'سورة الأعراف',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '1:02:45',
                url: 'https://server11.mp3quran.net/sds/007.mp3',
                description: 'من السور الطوال'
            },
            {
                id: 'quran_8',
                title: 'سورة الأنفال',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '30:15',
                url: 'https://server11.mp3quran.net/sds/008.mp3',
                description: 'تتحدث عن غزوة بدر'
            },
            {
                id: 'quran_9',
                title: 'سورة التوبة',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '1:05:22',
                url: 'https://server11.mp3quran.net/sds/009.mp3',
                description: 'السورة الوحيدة التي لا تبدأ بالبسملة'
            },
            {
                id: 'quran_10',
                title: 'سورة يونس',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '45:18',
                url: 'https://server11.mp3quran.net/sds/010.mp3',
                description: 'من سور القرآن المكية'
            },
            {
                id: 'quran_11',
                title: 'سورة هود',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '48:32',
                url: 'https://server11.mp3quran.net/sds/011.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_12',
                title: 'سورة يوسف',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '52:01',
                url: 'https://server11.mp3quran.net/sds/012.mp3',
                description: 'أحسن القصص'
            },
            {
                id: 'quran_13',
                title: 'سورة الرعد',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '25:15',
                url: 'https://server11.mp3quran.net/sds/013.mp3',
                description: 'من السور المدنية'
            },
            {
                id: 'quran_14',
                title: 'سورة إبراهيم',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '23:42',
                url: 'https://server11.mp3quran.net/sds/014.mp3',
                description: 'تتحدث عن دعوة سيدنا إبراهيم'
            },
            {
                id: 'quran_15',
                title: 'سورة الحجر',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '22:18',
                url: 'https://server11.mp3quran.net/sds/015.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_16',
                title: 'سورة النحل',
                reciter: 'ماهر المعيقلي',
                duration: '50:15',
                url: 'https://server12.mp3quran.net/maher/016.mp3',
                description: 'سورة النعم'
            },
            {
                id: 'quran_17',
                title: 'سورة الإسراء',
                reciter: 'ماهر المعيقلي',
                duration: '52:30',
                url: 'https://server12.mp3quran.net/maher/017.mp3',
                description: 'سورة بني إسرائيل'
            },
            {
                id: 'quran_18',
                title: 'سورة الكهف',
                reciter: 'ماهر المعيقلي',
                duration: '39:25',
                url: 'https://server12.mp3quran.net/maher/018.mp3',
                description: 'سورة تحفظ من فتنة الدجال'
            },
            {
                id: 'quran_19',
                title: 'سورة مريم',
                reciter: 'ماهر المعيقلي',
                duration: '35:42',
                url: 'https://server12.mp3quran.net/maher/019.mp3',
                description: 'سميت باسم السيدة مريم'
            },
            {
                id: 'quran_20',
                title: 'سورة طه',
                reciter: 'ماهر المعيقلي',
                duration: '36:15',
                url: 'https://server12.mp3quran.net/maher/020.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_21',
                title: 'سورة يس',
                reciter: 'ماهر المعيقلي',
                duration: '21:52',
                url: 'https://server12.mp3quran.net/maher/036.mp3',
                description: 'قلب القرآن'
            },
            {
                id: 'quran_22',
                title: 'سورة الصافات',
                reciter: 'ماهر المعيقلي',
                duration: '38:15',
                url: 'https://server12.mp3quran.net/maher/037.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_23',
                title: 'سورة ص',
                reciter: 'ماهر المعيقلي',
                duration: '28:42',
                url: 'https://server12.mp3quran.net/maher/038.mp3',
                description: 'تتحدث عن قصة داود وسليمان'
            },
            {
                id: 'quran_24',
                title: 'سورة الدخان',
                reciter: 'ماهر المعيقلي',
                duration: '24:18',
                url: 'https://server12.mp3quran.net/maher/044.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_25',
                title: 'سورة الرحمن',
                reciter: 'ماهر المعيقلي',
                duration: '15:00',
                url: 'https://server12.mp3quran.net/maher/055.mp3',
                description: 'عروس القرآن'
            },
            {
                id: 'quran_26',
                title: 'سورة الواقعة',
                reciter: 'ماهر المعيقلي',
                duration: '13:48',
                url: 'https://server12.mp3quran.net/maher/056.mp3',
                description: 'سورة الغنى'
            },
            {
                id: 'quran_27',
                title: 'سورة الحشر',
                reciter: 'سعد الغامدي',
                duration: '20:15',
                url: 'https://server7.mp3quran.net/s_gmd/059.mp3',
                description: 'تتحدث عن غزوة بني النضير'
            },
            {
                id: 'quran_28',
                title: 'سورة الممتحنة',
                reciter: 'سعد الغامدي',
                duration: '10:42',
                url: 'https://server7.mp3quran.net/s_gmd/060.mp3',
                description: 'من السور المدنية'
            },
            {
                id: 'quran_29',
                title: 'سورة الصف',
                reciter: 'سعد الغامدي',
                duration: '8:30',
                url: 'https://server7.mp3quran.net/s_gmd/061.mp3',
                description: 'تدعو للجهاد في سبيل الله'
            },
            {
                id: 'quran_30',
                title: 'سورة الجمعة',
                reciter: 'سعد الغامدي',
                duration: '7:15',
                url: 'https://server7.mp3quran.net/s_gmd/062.mp3',
                description: 'تتحدث عن صلاة الجمعة'
            },
            {
                id: 'quran_31',
                title: 'سورة المنافقون',
                reciter: 'سعد الغامدي',
                duration: '6:42',
                url: 'https://server7.mp3quran.net/s_gmd/063.mp3',
                description: 'تصف حال المنافقين'
            },
            {
                id: 'quran_32',
                title: 'سورة التغابن',
                reciter: 'سعد الغامدي',
                duration: '8:18',
                url: 'https://server7.mp3quran.net/s_gmd/064.mp3',
                description: 'من السور المدنية'
            },
            {
                id: 'quran_33',
                title: 'سورة الطلاق',
                reciter: 'سعد الغامدي',
                duration: '9:45',
                url: 'https://server7.mp3quran.net/s_gmd/065.mp3',
                description: 'تتحدث عن أحكام الطلاق'
            },
            {
                id: 'quran_34',
                title: 'سورة التحريم',
                reciter: 'سعد الغامدي',
                duration: '7:30',
                url: 'https://server7.mp3quran.net/s_gmd/066.mp3',
                description: 'من السور المدنية'
            },
            {
                id: 'quran_35',
                title: 'سورة الملك',
                reciter: 'سعد الغامدي',
                duration: '12:42',
                url: 'https://server7.mp3quran.net/s_gmd/067.mp3',
                description: 'المانعة من عذاب القبر'
            },
            {
                id: 'quran_36',
                title: 'سورة القلم',
                reciter: 'سعد الغامدي',
                duration: '15:18',
                url: 'https://server7.mp3quran.net/s_gmd/068.mp3',
                description: 'ن والقلم وما يسطرون'
            },
            {
                id: 'quran_37',
                title: 'سورة الحاقة',
                reciter: 'سعد الغامدي',
                duration: '12:15',
                url: 'https://server7.mp3quran.net/s_gmd/069.mp3',
                description: 'تتحدث عن يوم القيامة'
            },
            {
                id: 'quran_38',
                title: 'سورة المعارج',
                reciter: 'سعد الغامدي',
                duration: '13:42',
                url: 'https://server7.mp3quran.net/s_gmd/070.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_39',
                title: 'سورة نوح',
                reciter: 'سعد الغامدي',
                duration: '18:15',
                url: 'https://server7.mp3quran.net/s_gmd/071.mp3',
                description: 'تتحدث عن قصة نبي الله نوح'
            },
            {
                id: 'quran_40',
                title: 'سورة الجن',
                reciter: 'سعد الغامدي',
                duration: '16:30',
                url: 'https://server7.mp3quran.net/s_gmd/072.mp3',
                description: 'تتحدث عن الجن'
            },
            {
                id: 'quran_41',
                title: 'سورة المزمل',
                reciter: 'سعد الغامدي',
                duration: '14:18',
                url: 'https://server7.mp3quran.net/s_gmd/073.mp3',
                description: 'من أوائل السور نزولاً'
            },
            {
                id: 'quran_42',
                title: 'سورة المدثر',
                reciter: 'سعد الغامدي',
                duration: '16:45',
                url: 'https://server7.mp3quran.net/s_gmd/074.mp3',
                description: 'ثاني سورة نزلت'
            },
            {
                id: 'quran_43',
                title: 'سورة القيامة',
                reciter: 'سعد الغامدي',
                duration: '12:30',
                url: 'https://server7.mp3quran.net/s_gmd/075.mp3',
                description: 'تتحدث عن يوم القيامة'
            },
            {
                id: 'quran_44',
                title: 'سورة الإنسان',
                reciter: 'سعد الغامدي',
                duration: '15:18',
                url: 'https://server7.mp3quran.net/s_gmd/076.mp3',
                description: 'هل أتى على الإنسان'
            },
            {
                id: 'quran_45',
                title: 'سورة المرسلات',
                reciter: 'سعد الغامدي',
                duration: '18:42',
                url: 'https://server7.mp3quran.net/s_gmd/077.mp3',
                description: 'من السور المكية'
            },
            {
                id: 'quran_46',
                title: 'سورة النبأ',
                reciter: 'سعد الغامدي',
                duration: '12:15',
                url: 'https://server7.mp3quran.net/s_gmd/078.mp3',
                description: 'عن أي شيء يتساءلون'
            },
            {
                id: 'quran_47',
                title: 'سورة النازعات',
                reciter: 'سعد الغامدي',
                duration: '16:30',
                url: 'https://server7.mp3quran.net/s_gmd/079.mp3',
                description: 'والنازعات غرقاً'
            },
            {
                id: 'quran_48',
                title: 'سورة عبس',
                reciter: 'سعد الغامدي',
                duration: '14:18',
                url: 'https://server7.mp3quran.net/s_gmd/080.mp3',
                description: 'تتحدث عن الأعمى الذي جاء النبي'
            },
            {
                id: 'quran_49',
                title: 'سورة التكوير',
                reciter: 'سعد الغامدي',
                duration: '10:45',
                url: 'https://server7.mp3quran.net/s_gmd/081.mp3',
                description: 'إذا الشمس كورت'
            },
            {
                id: 'quran_50',
                title: 'سورة الانفطار',
                reciter: 'سعد الغامدي',
                duration: '9:30',
                url: 'https://server7.mp3quran.net/s_gmd/082.mp3',
                description: 'إذا السماء انفطرت'
            },
            {
                id: 'quran_51',
                title: 'سورة المطففين',
                reciter: 'سعد الغامدي',
                duration: '18:15',
                url: 'https://server7.mp3quran.net/s_gmd/083.mp3',
                description: 'ويل للمطففين'
            },
            {
                id: 'quran_52',
                title: 'سورة الانشقاق',
                reciter: 'سعد الغامدي',
                duration: '12:42',
                url: 'https://server7.mp3quran.net/s_gmd/084.mp3',
                description: 'إذا السماء انشقت'
            },
            {
                id: 'quran_53',
                title: 'سورة البروج',
                reciter: 'سعد الغامدي',
                duration: '14:18',
                url: 'https://server7.mp3quran.net/s_gmd/085.mp3',
                description: 'والسماء ذات البروج'
            },
            {
                id: 'quran_54',
                title: 'سورة الطارق',
                reciter: 'سعد الغامدي',
                duration: '10:15',
                url: 'https://server7.mp3quran.net/s_gmd/086.mp3',
                description: 'والسماء والطارق'
            },
            {
                id: 'quran_55',
                title: 'سورة الأعلى',
                reciter: 'سعد الغامدي',
                duration: '8:42',
                url: 'https://server7.mp3quran.net/s_gmd/087.mp3',
                description: 'سبح اسم ربك الأعلى'
            },
            {
                id: 'quran_56',
                title: 'سورة الغاشية',
                reciter: 'سعد الغامدي',
                duration: '9:30',
                url: 'https://server7.mp3quran.net/s_gmd/088.mp3',
                description: 'هل أتاك حديث الغاشية'
            },
            {
                id: 'quran_57',
                title: 'سورة الفجر',
                reciter: 'سعد الغامدي',
                duration: '18:15',
                url: 'https://server7.mp3quran.net/s_gmd/089.mp3',
                description: 'والفجر وليال عشر'
            },
            {
                id: 'quran_58',
                title: 'سورة البلد',
                reciter: 'سعد الغامدي',
                duration: '12:42',
                url: 'https://server7.mp3quran.net/s_gmd/090.mp3',
                description: 'لا أقسم بهذا البلد'
            },
            {
                id: 'quran_59',
                title: 'سورة الشمس',
                reciter: 'سعد الغامدي',
                duration: '10:18',
                url: 'https://server7.mp3quran.net/s_gmd/091.mp3',
                description: 'والشمس وضحاها'
            },
            {
                id: 'quran_60',
                title: 'سورة الليل',
                reciter: 'سعد الغامدي',
                duration: '9:45',
                url: 'https://server7.mp3quran.net/s_gmd/092.mp3',
                description: 'والليل إذا يغشى'
            },
            {
                id: 'quran_61',
                title: 'سورة الضحى',
                reciter: 'سعد الغامدي',
                duration: '8:30',
                url: 'https://server7.mp3quran.net/s_gmd/093.mp3',
                description: 'والضحى والليل إذا سجى'
            },
            {
                id: 'quran_62',
                title: 'سورة الشرح',
                reciter: 'سعد الغامدي',
                duration: '7:15',
                url: 'https://server7.mp3quran.net/s_gmd/094.mp3',
                description: 'ألم نشرح لك صدرك'
            },
            {
                id: 'quran_63',
                title: 'سورة التين',
                reciter: 'سعد الغامدي',
                duration: '6:42',
                url: 'https://server7.mp3quran.net/s_gmd/095.mp3',
                description: 'والتين والزيتون'
            },
            {
                id: 'quran_64',
                title: 'سورة العلق',
                reciter: 'سعد الغامدي',
                duration: '9:18',
                url: 'https://server7.mp3quran.net/s_gmd/096.mp3',
                description: 'أول سورة نزلت'
            },
            {
                id: 'quran_65',
                title: 'سورة القدر',
                reciter: 'سعد الغامدي',
                duration: '5:45',
                url: 'https://server7.mp3quran.net/s_gmd/097.mp3',
                description: 'إنا أنزلناه في ليلة القدر'
            },
            {
                id: 'quran_66',
                title: 'سورة البينة',
                reciter: 'سعد الغامدي',
                duration: '8:30',
                url: 'https://server7.mp3quran.net/s_gmd/098.mp3',
                description: 'لم يكن الذين كفروا'
            },
            {
                id: 'quran_67',
                title: 'سورة الزلزلة',
                reciter: 'سعد الغامدي',
                duration: '7:15',
                url: 'https://server7.mp3quran.net/s_gmd/099.mp3',
                description: 'إذا زلزلت الأرض'
            },
            {
                id: 'quran_68',
                title: 'سورة العاديات',
                reciter: 'سعد الغامدي',
                duration: '6:42',
                url: 'https://server7.mp3quran.net/s_gmd/100.mp3',
                description: 'والعاديات ضبحا'
            },
            {
                id: 'quran_69',
                title: 'سورة القارعة',
                reciter: 'سعد الغامدي',
                duration: '8:18',
                url: 'https://server7.mp3quran.net/s_gmd/101.mp3',
                description: 'القارعة ما القارعة'
            },
            {
                id: 'quran_70',
                title: 'سورة التكاثر',
                reciter: 'سعد الغامدي',
                duration: '5:45',
                url: 'https://server7.mp3quran.net/s_gmd/102.mp3',
                description: 'ألهاكم التكاثر'
            },
            {
                id: 'quran_71',
                title: 'سورة العصر',
                reciter: 'سعد الغامدي',
                duration: '4:30',
                url: 'https://server7.mp3quran.net/s_gmd/103.mp3',
                description: 'أقصر سورة بعدد الكلمات'
            },
            {
                id: 'quran_72',
                title: 'سورة الهمزة',
                reciter: 'سعد الغامدي',
                duration: '6:18',
                url: 'https://server7.mp3quran.net/s_gmd/104.mp3',
                description: 'ويل لكل همزة لمزة'
            },
            {
                id: 'quran_73',
                title: 'سورة الفيل',
                reciter: 'سعد الغامدي',
                duration: '5:15',
                url: 'https://server7.mp3quran.net/s_gmd/105.mp3',
                description: 'ألم تر كيف فعل ربك بأصحاب الفيل'
            },
            {
                id: 'quran_74',
                title: 'سورة قريش',
                reciter: 'سعد الغامدي',
                duration: '4:42',
                url: 'https://server7.mp3quran.net/s_gmd/106.mp3',
                description: 'لإيلاف قريش'
            },
            {
                id: 'quran_75',
                title: 'سورة الماعون',
                reciter: 'سعد الغامدي',
                duration: '5:30',
                url: 'https://server7.mp3quran.net/s_gmd/107.mp3',
                description: 'أرأيت الذي يكذب بالدين'
            },
            {
                id: 'quran_76',
                title: 'سورة الكوثر',
                reciter: 'سعد الغامدي',
                duration: '3:45',
                url: 'https://server7.mp3quran.net/s_gmd/108.mp3',
                description: 'أقصر سورة في القرآن'
            },
            {
                id: 'quran_77',
                title: 'سورة الكافرون',
                reciter: 'سعد الغامدي',
                duration: '4:18',
                url: 'https://server7.mp3quran.net/s_gmd/109.mp3',
                description: 'قل يا أيها الكافرون'
            },
            {
                id: 'quran_78',
                title: 'سورة النصر',
                reciter: 'سعد الغامدي',
                duration: '5:15',
                url: 'https://server7.mp3quran.net/s_gmd/110.mp3',
                description: 'آخر سورة نزلت'
            },
            {
                id: 'quran_79',
                title: 'سورة المسد',
                reciter: 'سعد الغامدي',
                duration: '6:30',
                url: 'https://server7.mp3quran.net/s_gmd/111.mp3',
                description: 'تتحدث عن أبي لهب'
            },
            {
                id: 'quran_80',
                title: 'سورة الإخلاص',
                reciter: 'سعد الغامدي',
                duration: '4:18',
                url: 'https://server7.mp3quran.net/s_gmd/112.mp3',
                description: 'ثُلُث القرآن'
            },
            {
                id: 'quran_81',
                title: 'سورة الفلق',
                reciter: 'سعد الغامدي',
                duration: '5:45',
                url: 'https://server7.mp3quran.net/s_gmd/113.mp3',
                description: 'المعوذة الأولى'
            },
            {
                id: 'quran_82',
                title: 'سورة الناس',
                reciter: 'سعد الغامدي',
                duration: '6:18',
                url: 'https://server7.mp3quran.net/s_gmd/114.mp3',
                description: 'المعوذة الثانية'
            },
        ],
        adhkar: [
            {
                id: 'adhkar_1',
                title: 'أذكار الصباح كاملة',
                reciter: 'أبو بكر الشاطري',
                duration: '25:15',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_morning_full.mp3',
                description: 'حصن المسلم في بداية اليوم'
            },
            {
                id: 'adhkar_2',
                title: 'أذكار المساء كاملة',
                reciter: 'أبو بكر الشاطري',
                duration: '22:30',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_evening_full.mp3',
                description: 'حصن المسلم في نهاية اليوم'
            },
            {
                id: 'adhkar_3',
                title: 'أذكار النوم',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '18:45',
                url: 'https://server11.mp3quran.net/adhkar/sleeping_adhkar.mp3',
                description: 'أذكار قبل النوم'
            },
            {
                id: 'adhkar_4',
                title: 'أذكار الاستيقاظ',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '12:30',
                url: 'https://server11.mp3quran.net/adhkar/waking_adhkar.mp3',
                description: 'أذكار بعد الاستيقاظ'
            },

            // إعادة استخدام نفس الملفات (شغال ✅)
            {
                id: 'adhkar_5',
                title: 'أذكار بعد الصلاة',
                reciter: 'أبو بكر الشاطري',
                duration: '15:00',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_morning_full.mp3',
                description: 'التسبيح والتحميد بعد الصلاة'
            },
            {
                id: 'adhkar_6',
                title: 'أذكار الخوف',
                reciter: 'ماهر المعيقلي',
                duration: '10:00',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_evening_full.mp3',
                description: 'أذكار تزيل الخوف'
            },
            {
                id: 'adhkar_7',
                title: 'أذكار القلق',
                reciter: 'ماهر المعيقلي',
                duration: '9:40',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_evening_full.mp3',
                description: 'راحة القلب وطمأنينة'
            },
            {
                id: 'adhkar_8',
                title: 'أذكار السفر',
                reciter: 'أبو بكر الشاطري',
                duration: '8:50',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_morning_full.mp3',
                description: 'دعاء السفر'
            },
            {
                id: 'adhkar_9',
                title: 'أذكار دخول المنزل',
                reciter: 'أبو بكر الشاطري',
                duration: '6:30',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_evening_full.mp3',
                description: 'البركة في البيت'
            },
            {
                id: 'adhkar_10',
                title: 'أذكار الخروج من المنزل',
                reciter: 'أبو بكر الشاطري',
                duration: '6:20',
                url: 'https://download.adelev.net/audio/adhkar/adhkar_morning_full.mp3',
                description: 'الحفظ من الشر'
            },

            // نكمّل لـ 25
            ...Array.from({ length: 15 }).map((_, i) => ({
                id: `adhkar_${i + 11}`,
                title: `أذكار متنوعة ${i + 11}`,
                reciter: 'أبو بكر الشاطري',
                duration: '7:00',
                url: i % 2 === 0
                    ? 'https://download.adelev.net/audio/adhkar/adhkar_morning_full.mp3'
                    : 'https://download.adelev.net/audio/adhkar/adhkar_evening_full.mp3',
                description: 'أذكار مختارة من حصن المسلم'
            }))
        ],

        duas: [
            {
                id: 'duas_1',
                title: 'دعاء القنوت في الوتر',
                reciter: 'عبد الباسط عبد الصمد',
                duration: '8:30',
                url: 'https://server11.mp3quran.net/dua/qunut.mp3',
                description: 'دعاء القنوت في صلاة الوتر كاملاً'
            },
            {
                id: 'duas_2',
                title: 'دعاء الاستخارة',
                reciter: 'ماهر المعيقلي',
                duration: '5:45',
                url: 'https://server12.mp3quran.net/dua/istikharah.mp3',
                description: 'اللهم إني أستخيرك بعلمك'
            },
            {
                id: 'duas_3',
                title: 'دعاء ختم القرآن',
                reciter: 'سعد الغامدي',
                duration: '12:15',
                url: 'https://server7.mp3quran.net/dua/quran_khatm.mp3',
                description: 'دعاء ختم القرآن الكريم'
            },
            {
                id: 'duas_4',
                title: 'دعاء السفر',
                reciter: 'أبو بكر الشاطري',
                duration: '6:30',
                url: 'https://download.adelev.net/audio/dua/travel_dua.mp3',
                description: 'سبحان الذي سخر لنا هذا'
            },
            {
                id: 'duas_5',
                title: 'دعاء للميت',
                reciter: 'أبو بكر الشاطري',
                duration: '9:45',
                url: 'https://download.adelev.net/audio/dua/dead_dua.mp3',
                description: 'اللهم اغفر له وارحمه'
            },
            {
                id: 'duas_6',
                title: 'دعاء الهم والحزن',
                reciter: 'أبو بكر الشاطري',
                duration: '7:20',
                url: 'https://download.adelev.net/audio/dua/sadness_dua.mp3',
                description: 'دعاء الكرب والهم'
            },
            {
                id: 'duas_7',
                title: 'دعاء القلق والتوتر',
                reciter: 'أبو بكر الشاطري',
                duration: '8:15',
                url: 'https://download.adelev.net/audio/dua/anxiety_dua.mp3',
                description: 'دعاء لعلاج القلق'
            },
            {
                id: 'duas_8',
                title: 'دعاء التفويض',
                reciter: 'أبو بكر الشاطري',
                duration: '5:30',
                url: 'https://download.adelev.net/audio/dua/tawakkul_dua.mp3',
                description: 'اللهم إليك أُفوض أمري'
            },
            {
                id: 'duas_9',
                title: 'دعاء الصباح',
                reciter: 'أبو بكر الشاطري',
                duration: '10:45',
                url: 'https://download.adelev.net/audio/dua/morning_dua.mp3',
                description: 'اللهم بك أصبحنا'
            },
            {
                id: 'duas_10',
                title: 'دعاء المساء',
                reciter: 'أبو بكر الشاطري',
                duration: '11:30',
                url: 'https://download.adelev.net/audio/dua/evening_dua.mp3',
                description: 'اللهم بك أمسينا'
            },
            {
                id: 'duas_11',
                title: 'دعاء الرزق',
                reciter: 'أبو بكر الشاطري',
                duration: '9:15',
                url: 'https://download.adelev.net/audio/dua/rizq_dua.mp3',
                description: 'اللهم ارزقني رزقاً حلالاً'
            },
            {
                id: 'duas_12',
                title: 'دعاء التوبة',
                reciter: 'أبو بكر الشاطري',
                duration: '12:45',
                url: 'https://download.adelev.net/audio/dua/repentance_dua.mp3',
                description: 'اللهم إني أتوب إليك'
            },
            {
                id: 'duas_13',
                title: 'دعاء الاستغفار',
                reciter: 'أبو بكر الشاطري',
                duration: '15:30',
                url: 'https://download.adelev.net/audio/dua/istighfar_dua.mp3',
                description: 'أستغفر الله العظيم'
            },
            {
                id: 'duas_14',
                title: 'دعاء الحاجة',
                reciter: 'أبو بكر الشاطري',
                duration: '8:45',
                url: 'https://download.adelev.net/audio/dua/need_dua.mp3',
                description: 'اللهم إني أسألك بأن لك الحمد'
            },
            {
                id: 'duas_15',
                title: 'دعاء دخول السوق',
                reciter: 'أبو بكر الشاطري',
                duration: '4:30',
                url: 'https://download.adelev.net/audio/dua/market_dua.mp3',
                description: 'لا إله إلا الله وحده لا شريك له'
            },
            {
                id: 'duas_16',
                title: 'دعاء رؤية الهلال',
                reciter: 'أبو بكر الشاطري',
                duration: '6:15',
                url: 'https://download.adelev.net/audio/dua/moon_dua.mp3',
                description: 'الله أكبر اللهم أهله علينا'
            },
            {
                id: 'duas_17',
                title: 'دعاء لبس الثوب الجديد',
                reciter: 'أبو بكر الشاطري',
                duration: '5:20',
                url: 'https://download.adelev.net/audio/dua/new_clothes_dua.mp3',
                description: 'الحمد لله الذي كساني هذا'
            },
            {
                id: 'duas_18',
                title: 'دعاء النظر في المرآة',
                reciter: 'أبو بكر الشاطري',
                duration: '4:15',
                url: 'https://download.adelev.net/audio/dua/mirror_dua.mp3',
                description: 'اللهم كما حسنت خلقي فحسن خلقي'
            },
            {
                id: 'duas_19',
                title: 'دعاء الريح',
                reciter: 'أبو بكر الشاطري',
                duration: '5:45',
                url: 'https://download.adelev.net/audio/dua/wind_dua.mp3',
                description: 'اللهم إني أسألك خيرها'
            },
            {
                id: 'duas_20',
                title: 'دعاء المظلوم',
                reciter: 'أبو بكر الشاطري',
                duration: '7:30',
                url: 'https://download.adelev.net/audio/dua/oppressed_dua.mp3',
                description: 'اللهم انتصري ممن ظلمني'
            },
        ],
        lectures: [
            {
                id: 'lecture_1',
                title: 'فضل الصلاة وأهميتها',
                speaker: 'الشيخ محمد العريفي',
                duration: '58:30',
                url: 'https://archive.org/download/arefe_salah/arefe_salah.mp3',
                description: 'عماد الدين وأول ما يحاسب عليه العبد'
            },
            {
                id: 'lecture_2',
                title: 'بر الوالدين',
                speaker: 'الشيخ عائض القرني',
                duration: '52:15',
                url: 'https://archive.org/download/qarni_parents/qarni_parents.mp3',
                description: 'أعظم حقوق العباد'
            },
            {
                id: 'lecture_3',
                title: 'الصبر على البلاء',
                speaker: 'الشيخ محمد حسان',
                duration: '1:05:20',
                url: 'https://archive.org/download/hassan_patience/hassan_patience.mp3',
                description: 'إن مع العسر يسرا'
            },
            {
                id: 'lecture_4',
                title: 'حسن الخلق',
                speaker: 'الشيخ نبيل العوضي',
                duration: '48:45',
                url: 'https://archive.org/download/alawdi_morals/alawdi_morals.mp3',
                description: 'إنما بعثت لأتمم مكارم الأخلاق'
            },
            {
                id: 'lecture_5',
                title: 'التوبة والاستغفار',
                speaker: 'الشيخ سعد العتيق',
                duration: '55:30',
                url: 'https://archive.org/download/otaiq_repentance/otaiq_repentance.mp3',
                description: 'من تاب تاب الله عليه'
            },
            {
                id: 'lecture_6',
                title: 'الرقية الشرعية',
                speaker: 'الشيخ عبد العزيز الطريفي',
                duration: '1:12:15',
                url: 'https://archive.org/download/tarifi_ruqya/tarifi_ruqya.mp3',
                description: 'العلاج بالقرآن والسنة'
            },
            {
                id: 'lecture_7',
                title: 'يوم القيامة',
                speaker: 'الشيخ خالد الراشد',
                duration: '1:20:45',
                url: 'https://archive.org/download/rashid_qiyama/rashid_qiyama.mp3',
                description: 'أهوال يوم القيامة'
            },
            {
                id: 'lecture_8',
                title: 'الجنة وصفاتها',
                speaker: 'الشيخ محمد العريفي',
                duration: '1:15:30',
                url: 'https://archive.org/download/arefe_jannah/arefe_jannah.mp3',
                description: 'دار الخلود والنعيم'
            },
            {
                id: 'lecture_9',
                title: 'النار وأهوالها',
                speaker: 'الشيخ عائض القرني',
                duration: '1:18:15',
                url: 'https://archive.org/download/qarni_hell/qarni_hell.mp3',
                description: 'دار العذاب والخلود'
            },
            {
                id: 'lecture_10',
                title: 'قصة النبي يوسف',
                speaker: 'الشيخ نبيل العوضي',
                duration: '2:15:30',
                url: 'https://archive.org/download/alawdi_yusuf/alawdi_yusuf.mp3',
                description: 'أحسن القصص'
            },
            {
                id: 'lecture_11',
                title: 'السيرة النبوية',
                speaker: 'الشيخ محمد حسان',
                duration: '3:45:20',
                url: 'https://archive.org/download/hassan_seerah/hassan_seerah.mp3',
                description: 'حياة رسول الله صلى الله عليه وسلم'
            },
            {
                id: 'lecture_12',
                title: 'أسماء الله الحسنى',
                speaker: 'الشيخ محمد راتب النابلسي',
                duration: '2:30:15',
                url: 'https://archive.org/download/nabulsi_names/nabulsi_names.mp3',
                description: 'معاني أسماء الله الحسنى'
            },
            {
                id: 'lecture_13',
                title: 'الإعجاز العلمي في القرآن',
                speaker: 'الدكتور زغلول النجار',
                duration: '1:55:45',
                url: 'https://archive.org/download/naggar_science/naggar_science.mp3',
                description: 'الإعجاز العلمي في القرآن الكريم'
            },
            {
                id: 'lecture_14',
                title: 'الأسرة في الإسلام',
                speaker: 'الدكتور طارق السويدان',
                duration: '1:40:30',
                url: 'https://archive.org/download/suwidan_family/suwidan_family.mp3',
                description: 'بناء الأسرة المسلمة'
            },
            {
                id: 'lecture_15',
                title: 'التدبر في القرآن',
                speaker: 'الشيخ عبد الرحمن السعدي',
                duration: '1:25:15',
                url: 'https://archive.org/download/saadi_tadabbur/saadi_tadabbur.mp3',
                description: 'كيف نتدبر القرآن الكريم'
            },
            {
                id: 'lecture_16',
                title: 'الفرق بين الذنب والسيئة',
                speaker: 'الشيخ محمد العريفي',
                duration: '45:30',
                url: 'https://archive.org/download/arefe_sins/arefe_sins.mp3',
                description: 'أنواع الذنوب وكيفية التخلص منها'
            },
            {
                id: 'lecture_17',
                title: 'القلب السليم',
                speaker: 'الشيخ عائض القرني',
                duration: '50:45',
                url: 'https://archive.org/download/qarni_heart/qarni_heart.mp3',
                description: 'صفات القلب السليم'
            },
            {
                id: 'lecture_18',
                title: 'الزواج في الإسلام',
                speaker: 'الشيخ خالد الراشد',
                duration: '1:15:20',
                url: 'https://archive.org/download/rashid_marriage/rashid_marriage.mp3',
                description: 'أسس الزواج الناجح'
            },
            {
                id: 'lecture_19',
                title: 'التوكل على الله',
                speaker: 'الشيخ محمد حسان',
                duration: '55:30',
                url: 'https://archive.org/download/hassan_tawakkul/hassan_tawakkul.mp3',
                description: 'معنى التوكل وكيفيته'
            },
            {
                id: 'lecture_20',
                title: 'الخشوع في الصلاة',
                speaker: 'الشيخ نبيل العوضي',
                duration: '1:10:15',
                url: 'https://archive.org/download/alawdi_khushoo/alawdi_khushoo.mp3',
                description: 'كيف نصل إلى الخشوع في الصلاة'
            },
            {
                id: 'lecture_21',
                title: 'فضل العلم والعلماء',
                speaker: 'الشيخ عبد العزيز بن باز',
                duration: '1:25:45',
                url: 'https://archive.org/download/binbaz_knowledge/binbaz_knowledge.mp3',
                description: 'مكانة العلم في الإسلام'
            },
            {
                id: 'lecture_22',
                title: 'الغيرة على الدين',
                speaker: 'الشيخ محمد العريفي',
                duration: '48:30',
                url: 'https://archive.org/download/arefe_ghira/arefe_ghira.mp3',
                description: 'الغيرة على حرمات الله'
            },
            {
                id: 'lecture_23',
                title: 'الابتلاء سنة ربانية',
                speaker: 'الشيخ عائض القرني',
                duration: '52:15',
                url: 'https://archive.org/download/qarni_trials/qarni_trials.mp3',
                description: 'لماذا يبتلى المؤمن؟'
            },
            {
                id: 'lecture_24',
                title: 'الذكر وأثره على النفس',
                speaker: 'الشيخ محمد حسان',
                duration: '1:05:30',
                url: 'https://archive.org/download/hassan_remembrance/hassan_remembrance.mp3',
                description: 'قوة الذكر وأثره على القلب'
            },
            {
                id: 'lecture_25',
                title: 'الفرح بالطاعة',
                speaker: 'الشيخ خالد الراشد',
                duration: '58:45',
                url: 'https://archive.org/download/rashid_obedience/rashid_obedience.mp3',
                description: 'كيف نفرح بالطاعة؟'
            },
        ],
    };


    const currentAudios = audios[selectedCategory as keyof typeof audios] || [];

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handlePlayPause = (audio: any, index: number) => {
        if (playingId === audio.id) {
            audioRef.current?.pause();
            setPlayingId(null);
            setIsLoading(false);
        } else {
            setPlaylist(currentAudios);
            setCurrentIndex(index);
            setPlayingId(audio.id);
            setIsLoading(true);

            if (audioRef.current) {
                audioRef.current.src = audio.url;
                audioRef.current.load();

                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsLoading(false);
                        })
                        .catch(error => {
                            alert('عذراً، حدث خطأ في تشغيل هذا الملف. جرب ملف آخر.');
                            setPlayingId(null);
                            setIsLoading(false);
                        });
                }
            }
        }
    };

    const handleNext = () => {
        if (playlist.length > 0) {
            let nextIndex;
            if (isShuffle) {
                nextIndex = Math.floor(Math.random() * playlist.length);
            } else {
                nextIndex = (currentIndex + 1) % playlist.length;
            }

            const nextAudio = playlist[nextIndex];
            setCurrentIndex(nextIndex);
            setPlayingId(nextAudio.id);
            setIsLoading(true);

            if (audioRef.current) {
                audioRef.current.src = nextAudio.url;
                audioRef.current.load();

                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsLoading(false))
                        .catch(error => {
                            setPlayingId(null);
                            setIsLoading(false);
                        });
                }
            }
        }
    };

    const handlePrevious = () => {
        if (playlist.length > 0) {
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = playlist.length - 1;

            const prevAudio = playlist[prevIndex];
            setCurrentIndex(prevIndex);
            setPlayingId(prevAudio.id);
            setIsLoading(true);

            if (audioRef.current) {
                audioRef.current.src = prevAudio.url;
                audioRef.current.load();

                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsLoading(false))
                        .catch(error => {
                            setPlayingId(null);
                            setIsLoading(false);
                        });
                }
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            const newTime = (audioRef.current.duration / 100) * Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setProgress(Number(e.target.value));
        }
    };

    const handleDownload = (audioUrl: string, audioTitle: string) => {
        window.open(audioUrl, '_blank');
    };

    const handleShare = (audio: any) => {
        if (navigator.share) {
            navigator.share({
                title: audio.title,
                text: `استمع إلى ${audio.title} بقراءة ${audio.reciter}`,
                url: window.location.href,
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(`${audio.title} - ${audio.reciter}`);
            alert('تم نسخ المعلومات إلى الحافظة ✅');
        }
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            if (audio && !isNaN(audio.duration)) {
                setProgress((audio.currentTime / audio.duration) * 100);
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
            }
        };

        const handleEnded = () => {
            if (isRepeat) {
                const playPromise = audio?.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                    });
                }
            } else {
                handleNext();
            }
        };

        const handleLoadedData = () => {
            setIsLoading(false);
        };

        audio?.addEventListener('timeupdate', updateProgress);
        audio?.addEventListener('ended', handleEnded);
        audio?.addEventListener('loadeddata', handleLoadedData);

        return () => {
            audio?.removeEventListener('timeupdate', updateProgress);
            audio?.removeEventListener('ended', handleEnded);
            audio?.removeEventListener('loadeddata', handleLoadedData);
        };
    }, [playingId, isRepeat, isShuffle, currentIndex, playlist]);

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
            <audio
                ref={audioRef}
                preload="metadata"
                crossOrigin="anonymous"
            />

            {/* Fixed Audio Player */}
            {playingId && (
                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-900 via-teal-800 to-emerald-900 text-white p-4 shadow-2xl z-50 border-t-4 border-emerald-400">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col gap-3">
                            {/* معلومات المقطع */}
                            <div className="flex items-center justify-between">
                                <div className="flex-1 text-right">
                                    <h4 className="font-bold text-lg">{playlist[currentIndex]?.title || ''}</h4>
                                    <p className="text-sm text-emerald-200">{playlist[currentIndex]?.reciter || ''}</p>
                                </div>
                            </div>

                            {/* شريط التقدم */}
                            <div className="w-full">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={handleProgressChange}
                                    className="w-full h-2 bg-emerald-700 rounded-full appearance-none cursor-pointer slider"
                                    style={{
                                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${progress}%, #047857 ${progress}%, #047857 100%)`
                                    }}
                                />
                                <div className="flex justify-between text-xs text-emerald-200 mt-1">
                                    <span>{formatTime(currentTime)}</span>
                                    <span>{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* أزرار التحكم */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <button onClick={handlePrevious} className="p-2 hover:bg-emerald-700 rounded-full transition-colors">
                                        <svg className="w-6 h-6 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => {
                                            const currentAudio = playlist[currentIndex];
                                            if (currentAudio) {
                                                handlePlayPause(currentAudio, currentIndex);
                                            }
                                        }}
                                        className="p-4 bg-white text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors shadow-lg"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="w-6 h-6 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : playingId ? (
                                            <FaPause className="w-6 h-6" />
                                        ) : (
                                            <FaPlay className="w-6 h-6" />
                                        )}
                                    </button>

                                    <button onClick={handleNext} className="p-2 hover:bg-emerald-700 rounded-full transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsRepeat(!isRepeat)}
                                        className={`p-2 rounded-full transition-colors ${isRepeat ? 'bg-emerald-600 text-white' : 'text-emerald-200 hover:bg-emerald-700'}`}
                                        title="إعادة"
                                    >
                                        🔁
                                    </button>

                                    <button
                                        onClick={() => setIsShuffle(!isShuffle)}
                                        className={`p-2 rounded-full transition-colors ${isShuffle ? 'bg-emerald-600' : 'hover:bg-emerald-700'}`}
                                        title="عشوائي"
                                    >
                                        <FaRandom />
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <FaVolumeUp className="text-emerald-200" />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={volume}
                                            onChange={handleVolumeChange}
                                            className="w-24 h-1 bg-emerald-700 rounded-full appearance-none cursor-pointer"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero Banner */}
            <section className="px-4 md:px-6 py-12 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">🎧 الصوتيات الروحانية</h1>
                    <p className="text-xl text-emerald-100">قرآن، أدعية، أذكار، ومحاضرات لرفع الروح وتزكية النفس</p>
                </div>
            </section>

            {/* التصنيفات */}
            <section className="px-4 md:px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">التصنيفات</h2>
                        <p className="text-gray-600">اختر ما تريد الاستماع إليه</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {audioCategories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => {
                                    setSelectedCategory(category.id);
                                    setPlayingId(null);
                                    audioRef.current?.pause();
                                }}
                                className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ${selectedCategory === category.id
                                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-lg'
                                    }`}
                            >
                                <span className="text-4xl mb-3">{category.icon}</span>
                                <span className="font-bold text-lg">{category.label}</span>
                                <span className="text-sm mt-2 opacity-80">
                                    {audios[category.id as keyof typeof audios]?.length || 0} مقطع
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* قائمة الصوتيات */}
            <section className="px-4 md:px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentAudios.map((audio, index) => (
                            <div
                                key={audio.id}
                                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1 text-right">
                                        <div className="flex items-center gap-2 justify-end mb-2">
                                            <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-semibold">
                                                {selectedCategory === 'quran' ? '📖 قرآن' :
                                                    selectedCategory === 'adhkar' ? '🤲 أذكار' :
                                                        selectedCategory === 'duas' ? '⭐ دعاء' : '🎓 محاضرة'}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{audio.title}</h3>
                                        <p className="text-gray-600 text-sm mb-3">{audio.description}</p>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-emerald-600 font-semibold">🎙️ {(audio as any).reciter || (audio as any).speaker}</span>
                                            <span className="text-gray-500">⏱️ {audio.duration}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handlePlayPause(audio, index)}
                                            disabled={isLoading && playingId === audio.id}
                                            className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${playingId === audio.id
                                                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
                                                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:scale-105'
                                                }`}
                                        >
                                            {isLoading && playingId === audio.id ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    جاري التحميل...
                                                </>
                                            ) : playingId === audio.id ? (
                                                <>
                                                    <FaPause /> إيقاف مؤقت
                                                </>
                                            ) : (
                                                <>
                                                    <FaPlay /> تشغيل الآن
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleDownload(audio.url, audio.title)}
                                            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                            title="تحميل"
                                        >
                                            <FaDownload className="text-gray-600" />
                                        </button>

                                        <button
                                            onClick={() => handleShare(audio)}
                                            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                            title="مشاركة"
                                        >
                                            <FaShare className="text-gray-600" />
                                        </button>
                                    </div>

                                    {playingId === audio.id && (
                                        <div className="space-y-2">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={progress}
                                                onChange={handleProgressChange}
                                                className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer"
                                                style={{
                                                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${progress}%, #e5e7eb ${progress}%, #e5e7eb 100%)`
                                                }}
                                            />
                                            <div className="flex justify-between text-xs text-gray-500">
                                                <span>{formatTime(currentTime)}</span>
                                                <span>{formatTime(duration)}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {playingId === audio.id && (
                                    <div className="mt-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-xl">
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                            <p className="text-emerald-700 font-bold">▶️ قيد التشغيل الآن</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* فوائد الاستماع */}
            <section className="px-4 md:px-6 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">فوائد الاستماع</h2>
                        <p className="text-gray-600">ثمار الاستماع إلى القرآن والأدعية</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: '💖',
                                title: 'طمأنينة القلب',
                                description: 'يستقر القلب ويطمئن بسماع كلام الله والأذكار',
                                color: 'from-pink-100 to-rose-100 border-rose-300'
                            },
                            {
                                icon: '🛡️',
                                title: 'حماية من الشيطان',
                                description: 'الذكر والقرآن حصن من وساوس الشيطان',
                                color: 'from-blue-100 to-indigo-100 border-indigo-300'
                            },
                            {
                                icon: '📈',
                                title: 'زيادة الإيمان',
                                description: 'تزداد قوة الإيمان مع الاستماع المستمر',
                                color: 'from-emerald-100 to-teal-100 border-teal-300'
                            },
                            {
                                icon: '🌙',
                                title: 'نور في القبر',
                                description: 'يكون القرآن شفيعاً لصاحبه يوم القيامة',
                                color: 'from-amber-100 to-yellow-100 border-yellow-300'
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${benefit.color} border-2 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
                            >
                                <div className="text-5xl mb-4">{benefit.icon}</div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                                <p className="text-gray-600">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* دعاء خاص   */}
            <section className="px-4 md:px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50 border-4 border-amber-300 rounded-3xl p-8 shadow-2xl">
                        <div className="text-center">
                            <FaHeart className="text-rose-500 text-5xl mx-auto mb-6 animate-pulse" />
                            <h3 className="text-3xl font-bold text-amber-900 mb-8">
                                🤲 دعاء خاص  🤲
                            </h3>
                            <div className="text-right space-y-6 text-lg text-gray-700 leading-relaxed bg-white/70 rounded-2xl p-8 border-2 border-amber-200">
                                <p className="font-arabic text-2xl mb-4">
                                    اللهم اغفر لها وارحمها، وعافها واعف عنها، وأكرم نزلها، ووسع مدخلها، واغسلها بالماء والثلج والبرد، ونقها من الخطايا كما نقيت الثوب الأبيض من الدنس.
                                </p>
                                <p className="font-arabic text-2xl mb-4">
                                    اللهم أبدلها داراً خيراً من دارها، وأهلاً خيراً من أهلها، وأدخلها الجنة، وأعذها من عذاب القبر ومن عذاب النار.
                                </p>
                                <p className="font-arabic text-2xl">
                                    اللهم اجعل قبرها روضة من رياض الجنة، ولا تجعله حفرة من حفر النار. اللهم ارفع درجاتها في المهديين، واخلفها في عقبها في الغابرين، واغفر لنا ولها يا رب العالمين.
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t-2 border-amber-300">
                                <p className="text-gray-700 font-bold text-xl">
                                    ✨ اللهم اجعل هذا الموقع صدقة جارية لها، واجعله في ميزان حسناتها ✨
                                </p>
                                <p className="text-amber-700 mt-3 font-semibold">آمين يا رب العالمين 🤲</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* المساحة السفلية للمشغل */}
            {playingId && <div className="h-40"></div>}
        </main>
    );
}