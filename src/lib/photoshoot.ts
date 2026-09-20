import images from '@src/data/photoshoot-images.json';
import type { SiteLocale } from './i18n';

export const galleryText = {
  en: {
    title: 'Photos from my first photoshoot',
    open: 'View photo',
    next: 'Next photo',
    previous: 'Previous photo',
    close: 'Close gallery',
    zoom: 'Zoom in',
    zoomOut: 'Fit to screen',
    of: 'of',
    hint: 'Select a photo to view it larger.',
  },
  pl: {
    title: 'Zdjęcia z mojej pierwszej sesji',
    open: 'Otwórz zdjęcie',
    next: 'Następne zdjęcie',
    previous: 'Poprzednie zdjęcie',
    close: 'Zamknij galerię',
    zoom: 'Powiększ',
    zoomOut: 'Dopasuj do ekranu',
    of: 'z',
    hint: 'Wybierz zdjęcie, aby zobaczyć je w powiększeniu.',
  },
  ua: {
    title: 'Фото з моєї першої фотосесії',
    open: 'Відкрити фото',
    next: 'Наступне фото',
    previous: 'Попереднє фото',
    close: 'Закрити галерею',
    zoom: 'Збільшити',
    zoomOut: 'Умістити на екрані',
    of: 'з',
    hint: 'Виберіть фото, щоб переглянути його у більшому розмірі.',
  },
};

const descriptions: Record<SiteLocale, string[]> = {
  en: [
    'Yaroslav Volkov standing beside a studio desk, talking on the phone.',
    'Yaroslav Volkov in a white T-shirt, seated at a desk with his hands together.',
    'Yaroslav Volkov working on a MacBook at a desk against a light studio backdrop.',
    'Yaroslav Volkov wearing a cap and typing on a MacBook at a desk.',
    'Yaroslav Volkov seated beside a pattern of window light on the studio wall.',
    'Yaroslav Volkov seated on a wooden chair in a white T-shirt and grey trousers.',
    'Yaroslav Volkov in a green overshirt, seated against a blue-lit studio backdrop.',
    'Seated portrait of Yaroslav Volkov wearing a green overshirt over a black T-shirt.',
    'Yaroslav Volkov seated on a cream sofa beside a round lamp and curtains.',
    'Close-up of Yaroslav Volkov using a MacBook on his lap.',
    'Yaroslav Volkov talking on the phone while sitting beside a studio window.',
    'Yaroslav Volkov wearing sunglasses and sitting on a stone balustrade in Wrocław.',
    'Yaroslav Volkov seated on stone steps in front of a wooden doorway.',
    'Yaroslav Volkov leaning beside a carved stone column outdoors.',
    'Yaroslav Volkov wearing sunglasses and standing beside a stone balustrade.',
  ],
  pl: [
    'Yaroslav Volkov rozmawia przez telefon, stojąc obok biurka w studiu.',
    'Yaroslav Volkov w białym T-shircie siedzi przy biurku ze złożonymi dłońmi.',
    'Yaroslav Volkov pracuje na MacBooku przy biurku na jasnym tle studyjnym.',
    'Yaroslav Volkov w czapce pisze na MacBooku przy biurku.',
    'Yaroslav Volkov siedzi obok wzoru światła z okna na ścianie studia.',
    'Yaroslav Volkov siedzi na drewnianym krześle w białym T-shircie i szarych spodniach.',
    'Yaroslav Volkov w zielonej koszuli siedzi na tle podświetlonym na niebiesko.',
    'Yaroslav Volkov pozuje w zielonej koszuli narzuconej na czarny T-shirt.',
    'Yaroslav Volkov siedzi na kremowej sofie obok okrągłej lampy i zasłon.',
    'Yaroslav Volkov pracuje na MacBooku trzymanym na kolanach; zbliżenie na dłonie.',
    'Yaroslav Volkov rozmawia przez telefon, siedząc przy oknie w studiu.',
    'Yaroslav Volkov w okularach przeciwsłonecznych siedzi na kamiennej balustradzie we Wrocławiu.',
    'Yaroslav Volkov siedzi na kamiennych schodach przed drewnianymi drzwiami.',
    'Yaroslav Volkov opiera się o rzeźbioną kamienną kolumnę na zewnątrz.',
    'Yaroslav Volkov w okularach przeciwsłonecznych stoi przy kamiennej balustradzie.',
  ],
  ua: [
    'Ярослав Волков розмовляє телефоном, стоячи біля столу в студії.',
    'Ярослав Волков у білій футболці сидить за столом, склавши долоні.',
    'Ярослав Волков працює на MacBook за столом на світлому студійному тлі.',
    'Ярослав Волков у кепці друкує на MacBook за столом.',
    'Ярослав Волков сидить поруч із візерунком світла від вікна на стіні студії.',
    'Ярослав Волков сидить на дерев’яному стільці в білій футболці та сірих штанах.',
    'Ярослав Волков у зеленій сорочці сидить на тлі з блакитним підсвічуванням.',
    'Портрет Ярослава Волкова у зеленій сорочці поверх чорної футболки.',
    'Ярослав Волков сидить на кремовому дивані поруч із круглим світильником і шторами.',
    'Крупний план рук Ярослава Волкова під час роботи на MacBook на колінах.',
    'Ярослав Волков розмовляє телефоном, сидячи біля вікна в студії.',
    'Ярослав Волков у сонцезахисних окулярах сидить на кам’яній балюстраді у Вроцлаві.',
    'Ярослав Волков сидить на кам’яних сходах перед дерев’яними дверима.',
    'Ярослав Волков спирається на різьблену кам’яну колону надворі.',
    'Ярослав Волков у сонцезахисних окулярах стоїть біля кам’яної балюстради.',
  ],
};

const blogImageDirectory = '/images/blog/my-first-professional-photoshoot';

export const getPhotoshootImages = (locale: SiteLocale) => images.map((image, index) => ({
  id: image.id,
  width: image.width,
  height: image.height,
  alt: descriptions[locale][index],
  src: `${blogImageDirectory}/${image.filename}-900w.webp`,
  srcSet: `${blogImageDirectory}/${image.filename}-480w.webp 480w, ${blogImageDirectory}/${image.filename}-900w.webp 900w`,
  large: `${blogImageDirectory}/${image.filename}.webp`,
}));

export const getAboutImages = (locale: SiteLocale, ids: string[]) => ids.map(id => {
  const index = images.findIndex(image => image.id === id);
  const image = images[index];
  if (!image?.aboutFilename) throw new Error(`Missing About photo: ${id}`);
  const source = `/images/about/${image.aboutFilename}`;
  return {
    id: image.id,
    width: image.width,
    height: image.height,
    alt: descriptions[locale][index],
    src: `${source}.webp`,
    srcSet: `${source}-480w.webp 480w, ${source}.webp 900w`,
  };
});
