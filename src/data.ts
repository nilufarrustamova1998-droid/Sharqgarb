/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizLevel, Story, DidYouKnowFact, Badge } from './types';

export const BADGES: Badge[] = [
  {
    id: 'soroban_master',
    title: 'Soroban Ustasi',
    description: 'Abakusda 5 xildan ortiq sonlarni to\'g\'ri hisobladingiz!',
    icon: 'Calculator',
    category: 'math',
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'young_scientist',
    title: 'Yosh Kimyogar / Fizik',
    description: 'STEM laboratoriyasidagi barcha tajribalarni muvaffaqiyatli yakunladingiz.',
    icon: 'FlaskConical',
    category: 'explorer',
    color: 'from-blue-400 to-indigo-600',
  },
  {
    id: 'philosopher_kid',
    title: 'Zakovatli Bola',
    description: 'Sharqona va G\'arbona hikoyalar sabog\'ini tushunib, savollarga javob berdingiz.',
    icon: 'BookOpen',
    category: 'wisdom',
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'east_west_ambassador',
    title: 'Madaniyatlar Elchisi',
    description: 'Sintezlangan oliy darajadagi ta\'lim testidan 100% natija ko\'rsatdingiz.',
    icon: 'Globe2',
    category: 'all',
    color: 'from-violet-400 to-pink-600',
  },
  {
    id: 'first_step',
    title: 'Ilk Qadam',
    description: 'Platformada birinchi kashfiyotingizni amalga oshirdingiz!',
    icon: 'Award',
    category: 'all',
    color: 'from-rose-400 to-orange-400',
  }
];

export const DID_YOU_KNOW_FACTS: DidYouKnowFact[] = [
  {
    id: 'fact_1',
    title: 'Algoritm so\'zining kelib chiqishi',
    badge: 'Sharq',
    description: 'Bugun siz foydalanayotgan barcha telefon va kompyuter dasturlari "algoritm" asosida ishlaydi.',
    detail: 'Bu so\'z buyuk o\'zbek olimi Al-Xorazmiy (780-850 yillar) nomidan olingan. U o\'zining kitobida birinchi bo\'lib qadam-baqadam hisoblash usullarini ko\'rsatgan va u dunyoga "Algoritm" nomi bilan tarqalgan.',
    iconName: 'Cpu',
    eastInsight: 'Sharq: Matematik amallarni qat\'iy tartibli qadamlar bilan yechishga va zehniy matematikaga urg\'u beradi.',
    westInsight: 'G\'arb: Bu tartibni kompyuterlar tizimiga aylantirib, global texnologik inqilob yaratishga imkon berdi.'
  },
  {
    id: 'fact_2',
    title: 'Nol (0) sonining kashf qilinishi',
    badge: 'Sharq',
    description: 'Tasavvur qila olasizmi, qadimgi dunyoda "Nol" degan son bo\'lmagan!',
    detail: '"Nol" tushunchasi Hindistonda kashf qilingan va keyinchalik Arab dunyosida Al-Xorazmiy tomonidan takomillashtirilgan. Shundan so\'ng u Evropaga kirib borib, hozirgi zamonaviy hisob-kitoblarga asos bo\'lgan.',
    iconName: 'Binary',
    eastInsight: 'Sharq: Nolni bo\'shliq deb emas, balki boshqa sonlarni o\'ta kuchaytiruvchi muhim omil sifatida ko\'rgan.',
    westInsight: 'G\'arb: Nol va Bir sonlari asosida "Ikkilik kodlar" (0 va 1) tuzib, raqamli dunyosini kashf qildi.'
  },
  {
    id: 'fact_3',
    title: 'Kompasning sayohati',
    badge: 'Kashfiyot',
    description: 'Kompas tufayli buyuk dengizchilar qit\'alarni kashf etganlar.',
    detail: "Kompas dastlab qadimgi Xitoyda kashf etilgan bo'lsa-da, u ipak yo'li orqali islom dunyosiga va keyinchalik G'arbga yetib borgan. G'arb kemasozlari esa uni dengiz uskunalariga qo'shib, butun dunyo bo'ylab sayohat qilishgan.",
    iconName: 'Compass',
    eastInsight: 'Sharq: Geomantika va tabiat muvozanatini aniqlash uchun yerning magnit maydonidan foydalangan.',
    westInsight: 'G\'arb: Navigatsiyani rivojlantirib, geografik kashfiyotlar davrini boshlab bergan.'
  },
  {
    id: 'fact_4',
    title: 'Qog\'oz siri',
    badge: 'Kashfiyot',
    description: 'Kitob va maktab darsliklari qog\'ozsiz qanday bo\'lar edi?',
    detail: 'Qog\'oz tayyorlash usuli Xitoyda kashf qilingan. Ammo 751-yilda Samarqandda dunyodagi eng sifatli xushbo\'y va asrlarga chidaydigan ipak qog\'oz ishlab chiqarila boshlandi. Keyinroq G\'arblik ixtirochi Iogan Gutenberg bosma mashinani yaratib, qog\'oz kitoblarni millionlab nusxada chop qila boshladi.',
    iconName: 'FileText',
    eastInsight: 'Sharq: Har bir qog\'oz varag\'ini ipak tolalaridan san\'at darajasida, qo\'lda tayyorlagan.',
    westInsight: 'G\'arb: Bosmaxona sanoatini rivojlantirish orqali bilimlarni ommaviy va bepul tarqatdi.'
  }
];

export const STORIES: Story[] = [
  {
    id: 'story_nasreddin',
    title: 'Nasreddin va uning qaysar eshagi',
    origin: 'Sharq',
    hero: 'Nasreddin Afandi',
    moral: 'Donolik faqat jiddiylikda emas, balki qiyinchiliklarga hazil va aql bilan qarashda namoyon bo\'ladi. Atrofdagilarning har bir gapiga amal qilaverish muvaffaqiyatsizlikka olib kelishi mumkin.',
    summary: 'Nasreddin Afandi va uning o\'g\'li eshak minish qoidalarini hamda odamlarning gap-so\'zlarini qiziqarli hazil orqali ochib berishadi.',
    illustration: 'Eshak va Chollar',
    content: [
      "Bir kuni Afandi va uning o'g'li eshagini yetaklab bozorga yo'l olishibdi. Eshak bo'sh, unga hech kim minmagan edi. Ularni ko'rgan yo'lovchilar kulib deyishibdi: \"Qarang-a, qanday aqlsiz odamlar! Chiroyli eshagi tursa ham, o'zlari yayov ketishmoqda!\"",
      "Bu gapni eshitgan Afandi o'g'lini eshakka mindirib, o'zi piyoda ketaveribdi. Biroz yurgach, bir guruh nuroniylar ularni ko'rib jahl bilan deyishibdi: \"Hozirgi yoshlarda hurmat qolmabdi! Ota bo'la turib piyoda yuribdi, yosh bola esa taltayib eshak ustida ketyapti!\"",
      "Afandi o'g'lini tushirib, o'zi mindi va o'g'li piyoda ketdi. Bu safar ayollar ularni ko'rib tanbeh berishdi: \"Uyat-ey, katta erkak o'zi eshakda dam olyapti, bechora yosh bolani quyosh ostida piyoda qiynab qo'yibdi!\"",
      "Shunda Afandi ikkalamiz birga minaylik deb o'g'lini ham ortiga o'tirgizdi. Ko'p o'tmay odamlar faryod urishdi: \"Sizlarda rahm-shafqat bormi o'zi? Kichkina bechora eshakka ikki kishi minib oldingiz, uning belini sindirmoqchimisiz?\"",
      "Nihoyat, Afandi hayron bo'lib o'g'liga dedi: \"O'g'lim, ko'rdingmi? Har kim har xil gapiradi va hammaning gapiga quloq solib yashash imkonsiz. Biz o'z aqlimiz bilan eng yaxshi qarorni chiqarishimiz kerak!\""
    ],
    quiz: {
      question: 'Ushbu hikoyaning asosiy donoligi nimada?',
      options: [
        'Eshaklarni ko\'p yuk bilan qiynamaslik kerak',
        'Har doim faqat atrofdagilar aytganidek yo\'l tutish lozim',
        'Odamlarning har bir asossiz tanbehiga emas, o\'z aqli va vijdonimizga tayanib qaror qabul qilish kerak',
        'Bozorga borishda umuman eshaklardan foydalanmaslik kerak'
      ],
      correctIndex: 2,
      explanation: 'To\'g\'ri! Atrofdagilarning hammasini bir vaqtda rozi qilish imkonsiz. Eng muhimi, oqilona va mustaqil qaror qabul qilishdir.'
    }
  },
  {
    id: 'story_aesop',
    title: 'Ezop ertagi: Quyon va Toshbaqa poygasi',
    origin: 'G\'arb',
    hero: 'Toshbaqa va Quyon',
    moral: 'Sabr va tinimsiz mehnat har qanday tug\'ma iste\'doddan ustun keladi. Takabburlik esa mag\'lubiyat kafolatidir.',
    summary: 'Tezkor quyon sekin yuradigan toshbaqaga poygada qarshi turadi va o\'z kuchiga ortiqcha baho berib uxlab qoladi.',
    illustration: 'Poygachi Toshbaqa',
    content: [
      'Qadim zamonlarda bir Quyon o\'zining tez yugurishi bilan maqtanar va Sekin Toshbaqaning ustidan tinmay kular edi. Kunlardan bir kuni Toshbaqa kutilmaganda dedi: "Keling, yaxshisi poygalashamiz, kim birinchi marraga borsa, o\'sha eng tezkor bo\'ladi!"',
      'Quyon bu taklifdan rosa kuldi va rozi bo\'ldi. Ertasi kuni hayvonlar yig\'ilishdi, poyga boshlandi. Quyon bir sakrashda toshbaqani juda ortda qoldirib, ko\'zdan g\'oyib bo\'ldi.',
      'Yarim yo\'lga yetganda, orqasiga qaragan Quyon Toshbaqani umuman ko\'rmadi. U shunday deb o\'yladi: "Bu toshbaqa oqshomgacha ham yetib kelolmaydi. Yaxshisi, daraxt soyasida biroz uxlab dam olaman. Uyg\'onib bir sakrashda marraga boraman."',
      'Quyon shirin uyquga ketdi. Shu vaqtda Toshbaqa qadam-baqadam, bir soniya ham to\'xtamasdan yurishda davom etdi. U quyosh tikkaga kelganda ham, oqshom yaqinlashganda ham to\'xtamadi.',
      'Nihoyat, Toshbaqa uxlayotgan Quyonning yonidan ohista o\'tib ketdi va marra chizig\'iga yaqinlashdi. Hayvonlarning shodiyona hayqirig\'idan Quyon uyg\'onib ketdi, u bor kuchi bilan yugurdi. Ammo kech bo\'lgan edi, Toshbaqa marraga yetib, poyga g\'olibi bo\'lgandi!'
    ],
    quiz: {
      question: 'Toshbaqa qanday qilib Quyondan o\'zib ketdi?',
      options: [
        'Sayohatda maxsus mashina ishlatgani uchun',
        'Sokinlik, to\'xtovsiz intilish, mashaqqatli mehnat va sabr-toqat tufayli',
        'Quyon adashib boshqa tomonga yugurib ketgani uchun',
        'Uxlash poygasida g\'olib bo\'lgani uchun'
      ],
      correctIndex: 1,
      explanation: 'Ajoyib! Sekin lekin to\'xtamay harakat qilish, buyuk maqsadlarga erishishning eng ishonchli usulidir.'
    }
  }
];

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    id: 'level_easy',
    name: "Boshlang'ich (Ilm Ummoni)",
    description: "Tarix, matematika va kashfiyotlar haqidagi oson va juda qiziqarli testlar.",
    badgeAwarded: 'first_step',
    questions: [
      {
        id: 'q1_1',
        question: 'Dunyoga mashhur "Algoritm" tamoyilini asoslagan mutafakkir olim kim?',
        options: ['Galileo Galiley', 'Abduqodir Giylan', 'Muhammad al-Xorazmiy', 'Iogan Kepler'],
        correctIndex: 2,
        explanation: 'Muhammad al-Xorazmiy (Algorismus) algebra sohasini yaratdi va uni o\'z ismi bilan butun dunyoga tanitdi.',
        category: 'Sharq'
      },
      {
        id: 'q1_2',
        question: 'G\'arbda kashf qilingan qaysi ommaviy bosma mashina kashfiyoti bilimlarni tez tarqalishiga yordam bergan?',
        options: ['Telegraf', 'Iogan Gutenbergning bosma dastgohi', 'Kompyuter', 'Teleskop'],
        correctIndex: 1,
        explanation: 'Gutenberg bosma mashinasi orqali kitoblarni ko\'p nusxada arzon chop etib, maktablar rivojiga ulkan hissa qo\'shgan.',
        category: 'G\'arb'
      },
      {
        id: 'q1_3',
        question: 'Sharqdagi an\'anaviy abakus (Soroban) asbobi nima uchun xizmat qiladi?',
        options: ['Yulduzlarni tomosha qilish uchun', 'Musiqa chalish uchun', 'Zehniy tezkor hisob-kitob qilish uchun', 'Suv ichish uchun'],
        correctIndex: 2,
        explanation: 'Abakus (Soroban) bolalarda tasavvur, diqqat va matematika tezligini oshiruvchi qadimiy hisoblash taxtasidir.',
        category: 'Sharq'
      }
    ]
  },
  {
    id: 'level_medium',
    name: "Bilimdon (Sintez Ziyosi)",
    description: "Sharqiy odob va intizom hamda G'arbiy ilmiy izlanishlar sintezi bilimdoni bo'ling.",
    badgeAwarded: 'philosopher_kid',
    questions: [
      {
        id: 'q2_1',
        question: 'Ipak yo\'li qutbida joylashgan va qadimdan jahonga eng sifatli qog\'oz yetkazib bergan shahar qaysi?',
        options: ['London', 'Rim', 'Samarqand', 'Pekin'],
        correctIndex: 2,
        explanation: 'Samarqand ipak qog\'ozi ming yillar davomida dunyoda eng mustahkam va silliq qog\'oz deb hisoblangan.',
        category: 'Sintez'
      },
      {
        id: 'q2_2',
        question: 'G\'arbdagi mashhur fizika olimi Isaak Nyuton daraxtdan nima tushayotganini ko\'rib Yerning tortishish qonunini o\'ylagan?',
        options: ['Barg', 'Uzum', 'Olma', 'Yong\'oq'],
        correctIndex: 2,
        explanation: 'Nyuton bog\'da o\'tirganda olma daraxtidan yerga olma tushgach, Yer barcha narsalarni o\'ziga tortishini anglab yetgan.',
        category: 'G\'arb'
      },
      {
        id: 'q2_3',
        question: 'Eski zamonlardagi "Ipak yo\'li" aslida nima vazifani bajargan?',
        options: [
          'Faqat ipak matosi sotiladigan ulkan kiyim bozori',
          'Sharq va G\'arbni bog\'lovchi savdo, madaniyat va ilm-fan almashish yo\'lagi',
          'Harbiy mashg\'ulotlar poligoni',
          'Poezdlar yuradigan temir yo\'lak'
        ],
        correctIndex: 1,
        explanation: 'Ipak yo\'li faqat tijorat emas, balki dinlar, tillar, kitoblar, astronomiya sirlari va ta\'lim almashish uchun ulkan global tarmoq bo\'lgan.',
        category: 'Sintez'
      }
    ]
  },
  {
    id: 'level_hard',
    name: "Oliy (Innovator Daho)",
    description: "Ikki taraflama fikrlash, STEAM innovatsiyalari va falsafa cho'qqisi.",
    badgeAwarded: 'east_west_ambassador',
    questions: [
      {
        id: 'q3_1',
        question: 'G\'arbning "STEM" ta\'lim tizimi qaysi sohalarni birlashtiradi?',
        options: [
          'Sport, Tikuvchilik, Ekologiya, Musiqa',
          'Siyosat, Teatr, Ertak, Matematika',
          'Fan (Science), Texnologiya, Injeneriya va Matematika',
          'Oshpazlik, Rasm chizish, Kurash, Suzish'
        ],
        correctIndex: 2,
        explanation: 'STEM (Science, Technology, Engineering, Mathematics) amaliy loyihaviy o\'qitish bo\'lib, bolalarda amaliy darslar orqali fikrlashni kuchaytiradi.',
        category: 'G\'arb'
      },
      {
        id: 'q3_2',
        question: 'Matematikada keng ommalashgan va G\'arbga sayohat orqali kiritilgan "Fibonachchi sonlari" (1,1,2,3,5,8...) aslini olganda dunyoning qaysi qismidan ilhomlanilgan?',
        options: [
          'Amerikalik olimlar laboratoriyasidan',
          'Hindiston va Islom Sharqi matematik olimlaridan olingan va Yevropaga olib borilgan',
          'Avstraliya qabilalaridan',
          'Kosmik sun\'iy yo\'ldoshlardan'
        ],
        correctIndex: 1,
        explanation: 'Leonardo Fibonachchi o\'z asarida Yaqin Sharq va Shimoliy Afrika olimlari bilan doimiy muloqot qilib, u yerdagi matematik sirlarni butun Yevropaga ommalashtirgan.',
        category: 'Sintez'
      },
      {
        id: 'q3_3',
        question: 'Innovatsion ta\'limda Sharq an\'anaviyligi (intizom, hurmat) bilan G\'arb texnologiyalarini (tajribalar, erkin ijod) qanday birlashtirish eng to\'g\'ri yo\'l?',
        options: [
          'Faqat kompyuter o\'yinlari o\'ynash orqali',
          'Darslarda faqat darsliklardan o\'qish orqali',
          'Qat\'iy intizom va mustahkam xotirani zamonaviy laboratoriya tadqiqotlari va ijodiy erkinlik bilan uyg\'unlashtirib amalda qo\'llash',
          'Uydan chiqmasdan darslarni butunlay rad etish'
        ],
        correctIndex: 2,
        explanation: 'Har ikki tamoyilning eng zo\'r jihatlarini uyg\'unlashtirish (Intizom + Innovatsiya, Xotira + Sinov) zamonaviy bolalarni komil inson qilib tarbiyalaydi.',
        category: 'Sintez'
      }
    ]
  }
];
