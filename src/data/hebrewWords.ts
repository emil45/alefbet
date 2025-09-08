export interface HebrewWord {
  word: string;
  letters: string[];
  meaning: string;
  audioFile: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const HEBREW_WORDS: HebrewWord[] = [
  // Easy 2-letter words
  { word: 'אל', letters: ['א', 'ל'], meaning: 'אל', audioFile: '/audio/words/he/el.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'גן', letters: ['ג', 'ן'], meaning: 'גן', audioFile: '/audio/words/he/gan.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'דג', letters: ['ד', 'ג'], meaning: 'דג', audioFile: '/audio/words/he/dag.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'זב', letters: ['ז', 'ב'], meaning: 'זב', audioFile: '/audio/words/he/zav.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'חם', letters: ['ח', 'ם'], meaning: 'חם', audioFile: '/audio/words/he/cham.mp3', category: 'weather', difficulty: 'easy' },
  { word: 'ים', letters: ['י', 'ם'], meaning: 'ים', audioFile: '/audio/words/he/yam.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'לב', letters: ['ל', 'ב'], meaning: 'לב', audioFile: '/audio/words/he/lev.mp3', category: 'body', difficulty: 'easy' },
  { word: 'מה', letters: ['מ', 'ה'], meaning: 'מה', audioFile: '/audio/words/he/ma.mp3', category: 'questions', difficulty: 'easy' },
  { word: 'נר', letters: ['נ', 'ר'], meaning: 'נר', audioFile: '/audio/words/he/ner.mp3', category: 'objects', difficulty: 'easy' },
  { word: 'עם', letters: ['ע', 'ם'], meaning: 'עם', audioFile: '/audio/words/he/am.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'פה', letters: ['פ', 'ה'], meaning: 'פה', audioFile: '/audio/words/he/pe.mp3', category: 'locations', difficulty: 'easy' },
  { word: 'רק', letters: ['ר', 'ק'], meaning: 'רק', audioFile: '/audio/words/he/rak.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'שם', letters: ['ש', 'ם'], meaning: 'שם', audioFile: '/audio/words/he/sham.mp3', category: 'locations', difficulty: 'easy' },
  { word: 'תן', letters: ['ת', 'ן'], meaning: 'תן', audioFile: '/audio/words/he/ten.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'כן', letters: ['כ', 'ן'], meaning: 'כן', audioFile: '/audio/words/he/ken.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'לא', letters: ['ל', 'א'], meaning: 'לא', audioFile: '/audio/words/he/lo.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'בא', letters: ['ב', 'א'], meaning: 'בא', audioFile: '/audio/words/he/ba.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'עץ', letters: ['ע', 'ץ'], meaning: 'עץ', audioFile: '/audio/words/he/etz.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'אף', letters: ['א', 'ף'], meaning: 'אף', audioFile: '/audio/words/he/af.mp3', category: 'body', difficulty: 'easy' },
  { word: 'יד', letters: ['י', 'ד'], meaning: 'יד', audioFile: '/audio/words/he/yad.mp3', category: 'body', difficulty: 'easy' },
  { word: 'רץ', letters: ['ר', 'ץ'], meaning: 'רץ', audioFile: '/audio/words/he/ratz.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'שר', letters: ['ש', 'ר'], meaning: 'שר', audioFile: '/audio/words/he/shar.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'קר', letters: ['ק', 'ר'], meaning: 'קר', audioFile: '/audio/words/he/kar.mp3', category: 'weather', difficulty: 'easy' },
  { word: 'רע', letters: ['ר', 'ע'], meaning: 'רע', audioFile: '/audio/words/he/ra.mp3', category: 'adjectives', difficulty: 'easy' },
  { word: 'זה', letters: ['ז', 'ה'], meaning: 'זה', audioFile: '/audio/words/he/ze.mp3', category: 'basic', difficulty: 'easy' },

  // Easy 3-letter words - Family & Basic
  { word: 'אבא', letters: ['א', 'ב', 'א'], meaning: 'אבא', audioFile: '/audio/words/he/abba.mp3', category: 'family', difficulty: 'easy' },
  { word: 'אמא', letters: ['א', 'מ', 'א'], meaning: 'אמא', audioFile: '/audio/words/he/ima.mp3', category: 'family', difficulty: 'easy' },
  { word: 'בן', letters: ['ב', 'ן'], meaning: 'בן', audioFile: '/audio/words/he/ben.mp3', category: 'family', difficulty: 'easy' },
  { word: 'בת', letters: ['ב', 'ת'], meaning: 'בת', audioFile: '/audio/words/he/bat.mp3', category: 'family', difficulty: 'easy' },
  { word: 'ראש', letters: ['ר', 'א', 'ש'], meaning: 'ראש', audioFile: '/audio/words/he/rosh.mp3', category: 'body', difficulty: 'easy' },
  { word: 'עין', letters: ['ע', 'י', 'ן'], meaning: 'עין', audioFile: '/audio/words/he/ayin.mp3', category: 'body', difficulty: 'easy' },
  { word: 'רגל', letters: ['ר', 'ג', 'ל'], meaning: 'רגל', audioFile: '/audio/words/he/regel.mp3', category: 'body', difficulty: 'easy' },
  { word: 'טוב', letters: ['ט', 'ו', 'ב'], meaning: 'טוב', audioFile: '/audio/words/he/tov.mp3', category: 'adjectives', difficulty: 'easy' },
  { word: 'גמל', letters: ['ג', 'מ', 'ל'], meaning: 'גמל', audioFile: '/audio/words/he/gamal.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'חום', letters: ['ח', 'ו', 'ם'], meaning: 'חום', audioFile: '/audio/words/he/chum.mp3', category: 'weather', difficulty: 'easy' },
  { word: 'שמש', letters: ['ש', 'מ', 'ש'], meaning: 'שמש', audioFile: '/audio/words/he/shemesh.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'ירח', letters: ['י', 'ר', 'ח'], meaning: 'ירח', audioFile: '/audio/words/he/yareach.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'רוח', letters: ['ר', 'ו', 'ח'], meaning: 'רוח', audioFile: '/audio/words/he/ruach.mp3', category: 'weather', difficulty: 'easy' },
  { word: 'גשם', letters: ['ג', 'ש', 'ם'], meaning: 'גשם', audioFile: '/audio/words/he/geshem.mp3', category: 'weather', difficulty: 'easy' },
  { word: 'פרח', letters: ['פ', 'ר', 'ח'], meaning: 'פרח', audioFile: '/audio/words/he/perach.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'דשא', letters: ['ד', 'ש', 'א'], meaning: 'דשא', audioFile: '/audio/words/he/deshe.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'רקד', letters: ['ר', 'ק', 'ד'], meaning: 'רקד', audioFile: '/audio/words/he/rakad.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'צחק', letters: ['צ', 'ח', 'ק'], meaning: 'צחק', audioFile: '/audio/words/he/tzachak.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'לחם', letters: ['ל', 'ח', 'ם'], meaning: 'לחם', audioFile: '/audio/words/he/lechem.mp3', category: 'food', difficulty: 'easy' },
  { word: 'מים', letters: ['מ', 'י', 'ם'], meaning: 'מים', audioFile: '/audio/words/he/mayim.mp3', category: 'food', difficulty: 'easy' },
  { word: 'חלב', letters: ['ח', 'ל', 'ב'], meaning: 'חלב', audioFile: '/audio/words/he/chalav.mp3', category: 'food', difficulty: 'easy' },
  { word: 'בשר', letters: ['ב', 'ש', 'ר'], meaning: 'בשר', audioFile: '/audio/words/he/basar.mp3', category: 'food', difficulty: 'easy' },
  { word: 'לבן', letters: ['ל', 'ב', 'ן'], meaning: 'לבן', audioFile: '/audio/words/he/lavan.mp3', category: 'colors', difficulty: 'easy' },
  { word: 'אחד', letters: ['א', 'ח', 'ד'], meaning: 'אחד', audioFile: '/audio/words/he/echad.mp3', category: 'numbers', difficulty: 'easy' },
  { word: 'כלב', letters: ['כ', 'ל', 'ב'], meaning: 'כלב', audioFile: '/audio/words/he/kelev.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'פרה', letters: ['פ', 'ר', 'ה'], meaning: 'פרה', audioFile: '/audio/words/he/para.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'סוס', letters: ['ס', 'ו', 'ס'], meaning: 'סוס', audioFile: '/audio/words/he/sus.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'ספר', letters: ['ס', 'פ', 'ר'], meaning: 'ספר', audioFile: '/audio/words/he/sefer.mp3', category: 'objects', difficulty: 'easy' },
  { word: 'חדש', letters: ['ח', 'ד', 'ש'], meaning: 'חדש', audioFile: '/audio/words/he/chadash.mp3', category: 'adjectives', difficulty: 'easy' },
  { word: 'ישן', letters: ['י', 'ש', 'ן'], meaning: 'ישן', audioFile: '/audio/words/he/yashan.mp3', category: 'adjectives', difficulty: 'easy' },
  { word: 'נחש', letters: ['נ', 'ח', 'ש'], meaning: 'נחש', audioFile: '/audio/words/he/nachash.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'דלת', letters: ['ד', 'ל', 'ת'], meaning: 'דלת', audioFile: '/audio/words/he/delet.mp3', category: 'objects', difficulty: 'easy' },
  { word: 'חמש', letters: ['ח', 'מ', 'ש'], meaning: 'חמש', audioFile: '/audio/words/he/chamesh.mp3', category: 'numbers', difficulty: 'easy' },
  { word: 'שם', letters: ['ש', 'ם'], meaning: 'שם', audioFile: '/audio/words/he/shem.mp3', category: 'basic', difficulty: 'easy' },
  { word: 'פה', letters: ['פ', 'ה'], meaning: 'פה', audioFile: '/audio/words/he/po.mp3', category: 'locations', difficulty: 'easy' },
  { word: 'איך', letters: ['א', 'י', 'ך'], meaning: 'איך', audioFile: '/audio/words/he/eich.mp3', category: 'questions', difficulty: 'easy' },
  { word: 'מתי', letters: ['מ', 'ת', 'י'], meaning: 'מתי', audioFile: '/audio/words/he/matai.mp3', category: 'questions', difficulty: 'easy' },

  // Medium 4-letter words
  { word: 'בוקר', letters: ['ב', 'ו', 'ק', 'ר'], meaning: 'בוקר', audioFile: '/audio/words/he/boker.mp3', category: 'time', difficulty: 'medium' },
  { word: 'לילה', letters: ['ל', 'י', 'ל', 'ה'], meaning: 'לילה', audioFile: '/audio/words/he/layla.mp3', category: 'time', difficulty: 'medium' },
  { word: 'גדול', letters: ['ג', 'ד', 'ו', 'ל'], meaning: 'גדול', audioFile: '/audio/words/he/gadol.mp3', category: 'adjectives', difficulty: 'medium' },
  { word: 'קטן', letters: ['ק', 'ט', 'ן'], meaning: 'קטן', audioFile: '/audio/words/he/katan.mp3', category: 'adjectives', difficulty: 'medium' },
  { word: 'קפץ', letters: ['ק', 'פ', 'ץ'], meaning: 'קפץ', audioFile: '/audio/words/he/kafatz.mp3', category: 'actions', difficulty: 'medium' },
  { word: 'הלך', letters: ['ה', 'ל', 'ך'], meaning: 'הלך', audioFile: '/audio/words/he/halach.mp3', category: 'actions', difficulty: 'medium' },
  { word: 'בוא', letters: ['ב', 'ו', 'א'], meaning: 'בוא', audioFile: '/audio/words/he/bo.mp3', category: 'actions', difficulty: 'medium' },
  { word: 'ביצה', letters: ['ב', 'י', 'צ', 'ה'], meaning: 'ביצה', audioFile: '/audio/words/he/beitza.mp3', category: 'food', difficulty: 'medium' },
  { word: 'אדום', letters: ['א', 'ד', 'ו', 'ם'], meaning: 'אדום', audioFile: '/audio/words/he/adom.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'ירוק', letters: ['י', 'ר', 'ו', 'ק'], meaning: 'ירוק', audioFile: '/audio/words/he/yarok.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'כחול', letters: ['כ', 'ח', 'ו', 'ל'], meaning: 'כחול', audioFile: '/audio/words/he/kachol.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'צהוב', letters: ['צ', 'ה', 'ו', 'ב'], meaning: 'צהוב', audioFile: '/audio/words/he/tzahov.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'שחור', letters: ['ש', 'ח', 'ו', 'ר'], meaning: 'שחור', audioFile: '/audio/words/he/shachor.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'שתיים', letters: ['ש', 'ת', 'י', 'ם'], meaning: 'שתיים', audioFile: '/audio/words/he/shtayim.mp3', category: 'numbers', difficulty: 'medium' },
  { word: 'שלוש', letters: ['ש', 'ל', 'ו', 'ש'], meaning: 'שלוש', audioFile: '/audio/words/he/shalosh.mp3', category: 'numbers', difficulty: 'medium' },
  { word: 'ארבע', letters: ['א', 'ר', 'ב', 'ע'], meaning: 'ארבע', audioFile: '/audio/words/he/arba.mp3', category: 'numbers', difficulty: 'medium' },
  { word: 'חתול', letters: ['ח', 'ת', 'ו', 'ל'], meaning: 'חתול', audioFile: '/audio/words/he/chatul.mp3', category: 'animals', difficulty: 'medium' },
  { word: 'כדור', letters: ['כ', 'ד', 'ו', 'ר'], meaning: 'כדור', audioFile: '/audio/words/he/kadur.mp3', category: 'toys', difficulty: 'medium' },
  { word: 'בובה', letters: ['ב', 'ו', 'ב', 'ה'], meaning: 'בובה', audioFile: '/audio/words/he/buba.mp3', category: 'toys', difficulty: 'medium' },
  { word: 'תודה', letters: ['ת', 'ו', 'ד', 'ה'], meaning: 'תודה', audioFile: '/audio/words/he/toda.mp3', category: 'manners', difficulty: 'medium' },
  { word: 'שלום', letters: ['ש', 'ל', 'ו', 'ם'], meaning: 'שלום', audioFile: '/audio/words/he/shalom.mp3', category: 'greetings', difficulty: 'medium' },
  { word: 'חלון', letters: ['ח', 'ל', 'ו', 'ן'], meaning: 'חלון', audioFile: '/audio/words/he/chalon.mp3', category: 'objects', difficulty: 'medium' },
  { word: 'כיסא', letters: ['כ', 'י', 'ס', 'א'], meaning: 'כיסא', audioFile: '/audio/words/he/kise.mp3', category: 'objects', difficulty: 'medium' },
  { word: 'איפה', letters: ['א', 'י', 'פ', 'ה'], meaning: 'איפה', audioFile: '/audio/words/he/eifo.mp3', category: 'questions', difficulty: 'medium' },
  
  // More Medium words
  { word: 'רופא', letters: ['ר', 'ו', 'פ', 'א'], meaning: 'רופא', audioFile: '/audio/words/he/rofe.mp3', category: 'professions', difficulty: 'medium' },
  { word: 'מורה', letters: ['מ', 'ו', 'ר', 'ה'], meaning: 'מורה', audioFile: '/audio/words/he/mora.mp3', category: 'professions', difficulty: 'medium' },
  { word: 'דודה', letters: ['ד', 'ו', 'ד', 'ה'], meaning: 'דודה', audioFile: '/audio/words/he/doda.mp3', category: 'family', difficulty: 'medium' },
  { word: 'דוד', letters: ['ד', 'ו', 'ד'], meaning: 'דוד', audioFile: '/audio/words/he/dod.mp3', category: 'family', difficulty: 'medium' },
  { word: 'אח', letters: ['א', 'ח'], meaning: 'אח', audioFile: '/audio/words/he/ach.mp3', category: 'family', difficulty: 'medium' },
  { word: 'אחות', letters: ['א', 'ח', 'ו', 'ת'], meaning: 'אחות', audioFile: '/audio/words/he/achot.mp3', category: 'family', difficulty: 'medium' },
  { word: 'זקן', letters: ['ז', 'ק', 'ן'], meaning: 'זקן', audioFile: '/audio/words/he/zaken.mp3', category: 'family', difficulty: 'medium' },
  { word: 'זקנה', letters: ['ז', 'ק', 'נ', 'ה'], meaning: 'זקנה', audioFile: '/audio/words/he/zkena.mp3', category: 'family', difficulty: 'medium' },
  { word: 'ילד', letters: ['י', 'ל', 'ד'], meaning: 'ילד', audioFile: '/audio/words/he/yeled.mp3', category: 'family', difficulty: 'medium' },
  { word: 'ילדה', letters: ['י', 'ל', 'ד', 'ה'], meaning: 'ילדה', audioFile: '/audio/words/he/yalda.mp3', category: 'family', difficulty: 'medium' },
  { word: 'חבר', letters: ['ח', 'ב', 'ר'], meaning: 'חבר', audioFile: '/audio/words/he/chaver.mp3', category: 'social', difficulty: 'medium' },
  { word: 'חברה', letters: ['ח', 'ב', 'ר', 'ה'], meaning: 'חברה', audioFile: '/audio/words/he/chavera.mp3', category: 'social', difficulty: 'medium' },

  // Hard 5+ letter words
  { word: 'ציפור', letters: ['צ', 'י', 'פ', 'ו', 'ר'], meaning: 'ציפור', audioFile: '/audio/words/he/tzipor.mp3', category: 'animals', difficulty: 'hard' },
  { word: 'משחק', letters: ['מ', 'ש', 'ח', 'ק'], meaning: 'משחק', audioFile: '/audio/words/he/misChak.mp3', category: 'toys', difficulty: 'hard' },
  { word: 'בבקשה', letters: ['ב', 'ב', 'ק', 'ש', 'ה'], meaning: 'בבקשה', audioFile: '/audio/words/he/bevakasha.mp3', category: 'manners', difficulty: 'hard' },
  { word: 'שולחן', letters: ['ש', 'ו', 'ל', 'ח', 'ן'], meaning: 'שולחן', audioFile: '/audio/words/he/shulchan.mp3', category: 'objects', difficulty: 'hard' },
  { word: 'להתראות', letters: ['ל', 'ה', 'ת', 'ר', 'א', 'ו', 'ת'], meaning: 'להתראות', audioFile: '/audio/words/he/lehitraot.mp3', category: 'greetings', difficulty: 'hard' },
  
  // More Hard words
  { word: 'חגיגה', letters: ['ח', 'ג', 'י', 'ג', 'ה'], meaning: 'חגיגה', audioFile: '/audio/words/he/chagiga.mp3', category: 'celebration', difficulty: 'hard' },
  { word: 'יום הולדת', letters: ['י', 'ו', 'ם', ' ', 'ה', 'ו', 'ל', 'ד', 'ת'], meaning: 'יום הולדת', audioFile: '/audio/words/he/yom-huledet.mp3', category: 'celebration', difficulty: 'hard' },
  { word: 'חתונה', letters: ['ח', 'ת', 'ו', 'נ', 'ה'], meaning: 'חתונה', audioFile: '/audio/words/he/chatuna.mp3', category: 'celebration', difficulty: 'hard' },
  { word: 'ספרייה', letters: ['ס', 'פ', 'ר', 'י', 'ה'], meaning: 'ספרייה', audioFile: '/audio/words/he/sifriya.mp3', category: 'places', difficulty: 'hard' },
  { word: 'חנות', letters: ['ח', 'נ', 'ו', 'ת'], meaning: 'חנות', audioFile: '/audio/words/he/chanut.mp3', category: 'places', difficulty: 'hard' },
  { word: 'בית ספר', letters: ['ב', 'י', 'ת', ' ', 'ס', 'פ', 'ר'], meaning: 'בית ספר', audioFile: '/audio/words/he/beit-sefer.mp3', category: 'places', difficulty: 'hard' },
  { word: 'מחשב', letters: ['מ', 'ח', 'ש', 'ב'], meaning: 'מחשב', audioFile: '/audio/words/he/machshev.mp3', category: 'technology', difficulty: 'hard' },
  { word: 'טלפון', letters: ['ט', 'ל', 'פ', 'ו', 'ן'], meaning: 'טלפון', audioFile: '/audio/words/he/telefon.mp3', category: 'technology', difficulty: 'hard' },
  { word: 'מקרר', letters: ['מ', 'ק', 'ר', 'ר'], meaning: 'מקרר', audioFile: '/audio/words/he/mekarer.mp3', category: 'appliances', difficulty: 'hard' },
  { word: 'טלוויזיה', letters: ['ט', 'ל', 'ו', 'ו', 'י', 'ז', 'י', 'ה'], meaning: 'טלוויזיה', audioFile: '/audio/words/he/televizya.mp3', category: 'technology', difficulty: 'hard' },

  // NEW ADDITIONS - More Variety!
  
  // More Easy Nature Words
  { word: 'אבן', letters: ['א', 'ב', 'ן'], meaning: 'אבן', audioFile: '/audio/words/he/even.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'חול', letters: ['ח', 'ו', 'ל'], meaning: 'חול', audioFile: '/audio/words/he/chol.mp3', category: 'nature', difficulty: 'easy' },
  { word: 'כוכב', letters: ['כ', 'ו', 'כ', 'ב'], meaning: 'כוכב', audioFile: '/audio/words/he/kochav.mp3', category: 'nature', difficulty: 'medium' },
  { word: 'ענן', letters: ['ע', 'נ', 'ן'], meaning: 'ענן', audioFile: '/audio/words/he/anan.mp3', category: 'weather', difficulty: 'easy' },
  { word: 'שלג', letters: ['ש', 'ל', 'ג'], meaning: 'שלג', audioFile: '/audio/words/he/sheleg.mp3', category: 'weather', difficulty: 'easy' },
  
  // More Food Words
  { word: 'דבש', letters: ['ד', 'ב', 'ש'], meaning: 'דבש', audioFile: '/audio/words/he/dvash.mp3', category: 'food', difficulty: 'easy' },
  { word: 'גבינה', letters: ['ג', 'ב', 'י', 'נ', 'ה'], meaning: 'גבינה', audioFile: '/audio/words/he/gvina.mp3', category: 'food', difficulty: 'medium' },
  { word: 'פרי', letters: ['פ', 'ר', 'י'], meaning: 'פרי', audioFile: '/audio/words/he/pri.mp3', category: 'food', difficulty: 'easy' },
  { word: 'עוגה', letters: ['ע', 'ו', 'ג', 'ה'], meaning: 'עוגה', audioFile: '/audio/words/he/uga.mp3', category: 'food', difficulty: 'medium' },
  { word: 'סוכר', letters: ['ס', 'ו', 'כ', 'ר'], meaning: 'סוכר', audioFile: '/audio/words/he/sukar.mp3', category: 'food', difficulty: 'medium' },
  { word: 'מלח', letters: ['מ', 'ל', 'ח'], meaning: 'מלח', audioFile: '/audio/words/he/melach.mp3', category: 'food', difficulty: 'easy' },
  
  // More Animals
  { word: 'אריה', letters: ['א', 'ר', 'י', 'ה'], meaning: 'אריה', audioFile: '/audio/words/he/arie.mp3', category: 'animals', difficulty: 'medium' },
  { word: 'פיל', letters: ['פ', 'י', 'ל'], meaning: 'פיל', audioFile: '/audio/words/he/pil.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'קוף', letters: ['ק', 'ו', 'ף'], meaning: 'קוף', audioFile: '/audio/words/he/kof.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'ברווז', letters: ['ב', 'ר', 'ו', 'ז'], meaning: 'ברווז', audioFile: '/audio/words/he/barvaz.mp3', category: 'animals', difficulty: 'medium' },
  { word: 'זאב', letters: ['ז', 'א', 'ב'], meaning: 'זאב', audioFile: '/audio/words/he/zeev.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'שועל', letters: ['ש', 'ו', 'ע', 'ל'], meaning: 'שועל', audioFile: '/audio/words/he/shual.mp3', category: 'animals', difficulty: 'medium' },
  { word: 'נמר', letters: ['נ', 'מ', 'ר'], meaning: 'נמר', audioFile: '/audio/words/he/namer.mp3', category: 'animals', difficulty: 'easy' },
  { word: 'זברה', letters: ['ז', 'ב', 'ר', 'ה'], meaning: 'זברה', audioFile: '/audio/words/he/zebra.mp3', category: 'animals', difficulty: 'medium' },
  { word: 'צפרדע', letters: ['צ', 'פ', 'ר', 'ד', 'ע'], meaning: 'צפרדע', audioFile: '/audio/words/he/tzfardea.mp3', category: 'animals', difficulty: 'hard' },
  
  // More Actions/Verbs
  { word: 'כתב', letters: ['כ', 'ת', 'ב'], meaning: 'כתב', audioFile: '/audio/words/he/katav.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'קרא', letters: ['ק', 'ר', 'א'], meaning: 'קרא', audioFile: '/audio/words/he/kara.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'שחה', letters: ['ש', 'ח', 'ה'], meaning: 'שחה', audioFile: '/audio/words/he/sacha.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'טיפס', letters: ['ט', 'י', 'פ', 'ס'], meaning: 'טיפס', audioFile: '/audio/words/he/tipes.mp3', category: 'actions', difficulty: 'medium' },
  { word: 'נפל', letters: ['נ', 'פ', 'ל'], meaning: 'נפל', audioFile: '/audio/words/he/nafal.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'קם', letters: ['ק', 'ם'], meaning: 'קם', audioFile: '/audio/words/he/kam.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'ישב', letters: ['י', 'ש', 'ב'], meaning: 'ישב', audioFile: '/audio/words/he/yashav.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'שכב', letters: ['ש', 'כ', 'ב'], meaning: 'שכב', audioFile: '/audio/words/he/shachav.mp3', category: 'actions', difficulty: 'easy' },
  { word: 'בכה', letters: ['ב', 'כ', 'ה'], meaning: 'בכה', audioFile: '/audio/words/he/bacha.mp3', category: 'emotions', difficulty: 'easy' },
  { word: 'שמח', letters: ['ש', 'מ', 'ח'], meaning: 'שמח', audioFile: '/audio/words/he/sameach.mp3', category: 'emotions', difficulty: 'easy' },
  
  // Days of the Week
  { word: 'ראשון', letters: ['ר', 'א', 'ש', 'ו', 'ן'], meaning: 'ראשון', audioFile: '/audio/words/he/rishon.mp3', category: 'time', difficulty: 'hard' },
  { word: 'שני', letters: ['ש', 'נ', 'י'], meaning: 'שני', audioFile: '/audio/words/he/sheni.mp3', category: 'time', difficulty: 'easy' },
  { word: 'שלישי', letters: ['ש', 'ל', 'י', 'ש', 'י'], meaning: 'שלישי', audioFile: '/audio/words/he/shlishi.mp3', category: 'time', difficulty: 'hard' },
  { word: 'רביעי', letters: ['ר', 'ב', 'י', 'ע', 'י'], meaning: 'רביעי', audioFile: '/audio/words/he/revii.mp3', category: 'time', difficulty: 'hard' },
  { word: 'חמישי', letters: ['ח', 'מ', 'י', 'ש', 'י'], meaning: 'חמישי', audioFile: '/audio/words/he/chamishi.mp3', category: 'time', difficulty: 'hard' },
  { word: 'שישי', letters: ['ש', 'י', 'ש', 'י'], meaning: 'שישי', audioFile: '/audio/words/he/shishi.mp3', category: 'time', difficulty: 'medium' },
  { word: 'שבת', letters: ['ש', 'ב', 'ת'], meaning: 'שבת', audioFile: '/audio/words/he/shabbat.mp3', category: 'time', difficulty: 'easy' },
  
  // More Objects/Things
  { word: 'מיטה', letters: ['מ', 'י', 'ט', 'ה'], meaning: 'מיטה', audioFile: '/audio/words/he/mita.mp3', category: 'objects', difficulty: 'medium' },
  { word: 'כרית', letters: ['כ', 'ר', 'י', 'ת'], meaning: 'כרית', audioFile: '/audio/words/he/karit.mp3', category: 'objects', difficulty: 'medium' },
  { word: 'שמיכה', letters: ['ש', 'מ', 'י', 'כ', 'ה'], meaning: 'שמיכה', audioFile: '/audio/words/he/smecha.mp3', category: 'objects', difficulty: 'hard' },
  { word: 'כוס', letters: ['כ', 'ו', 'ס'], meaning: 'כוס', audioFile: '/audio/words/he/kos.mp3', category: 'objects', difficulty: 'easy' },
  { word: 'צלחת', letters: ['צ', 'ל', 'ח', 'ת'], meaning: 'צלחת', audioFile: '/audio/words/he/tzalachat.mp3', category: 'objects', difficulty: 'medium' },
  { word: 'כף', letters: ['כ', 'ף'], meaning: 'כף', audioFile: '/audio/words/he/kaf.mp3', category: 'objects', difficulty: 'easy' },
  { word: 'מזלג', letters: ['מ', 'ז', 'ל', 'ג'], meaning: 'מזלג', audioFile: '/audio/words/he/mazleg.mp3', category: 'objects', difficulty: 'medium' },
  { word: 'סכין', letters: ['ס', 'כ', 'י', 'ן'], meaning: 'סכין', audioFile: '/audio/words/he/sakin.mp3', category: 'objects', difficulty: 'medium' },
  
  // More Numbers (6-10)
  { word: 'שש', letters: ['ש', 'ש'], meaning: 'שש', audioFile: '/audio/words/he/shesh.mp3', category: 'numbers', difficulty: 'easy' },
  { word: 'שבע', letters: ['ש', 'ב', 'ע'], meaning: 'שבע', audioFile: '/audio/words/he/sheva.mp3', category: 'numbers', difficulty: 'easy' },
  { word: 'שמונה', letters: ['ש', 'מ', 'ו', 'נ', 'ה'], meaning: 'שמונה', audioFile: '/audio/words/he/shmona.mp3', category: 'numbers', difficulty: 'hard' },
  { word: 'תשע', letters: ['ת', 'ש', 'ע'], meaning: 'תשע', audioFile: '/audio/words/he/tesha.mp3', category: 'numbers', difficulty: 'easy' },
  { word: 'עשר', letters: ['ע', 'ש', 'ר'], meaning: 'עשר', audioFile: '/audio/words/he/eser.mp3', category: 'numbers', difficulty: 'easy' },
  
  // More Colors  
  { word: 'ורוד', letters: ['ו', 'ר', 'ו', 'ד'], meaning: 'ורוד', audioFile: '/audio/words/he/varod.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'סגול', letters: ['ס', 'ג', 'ו', 'ל'], meaning: 'סגול', audioFile: '/audio/words/he/sagol.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'אפור', letters: ['א', 'פ', 'ו', 'ר'], meaning: 'אפור', audioFile: '/audio/words/he/afor.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'כתום', letters: ['כ', 'ת', 'ו', 'ם'], meaning: 'כתום', audioFile: '/audio/words/he/katom.mp3', category: 'colors', difficulty: 'medium' },
  { word: 'חום', letters: ['ח', 'ו', 'ם'], meaning: 'חום', audioFile: '/audio/words/he/chum.mp3', category: 'colors', difficulty: 'easy' },
];

// Helper functions for filtering words
export const getWordsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): HebrewWord[] => {
  return HEBREW_WORDS.filter(word => word.difficulty === difficulty);
};

export const getWordsByCategory = (category: string): HebrewWord[] => {
  return HEBREW_WORDS.filter(word => word.category === category);
};

export const getRandomWords = (count: number, difficulty?: 'easy' | 'medium' | 'hard'): HebrewWord[] => {
  const wordsPool = difficulty ? getWordsByDifficulty(difficulty) : HEBREW_WORDS;
  const shuffled = [...wordsPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getAllCategories = (): string[] => {
  return [...new Set(HEBREW_WORDS.map(word => word.category))];
};