import { hydrate } from 'react-dom';
import { RemixBrowser } from 'remix';
import Rythm from 'rythm.js';

const songURI: string = '/bakamitai.mp3';

const rythmInit = () => {
  rythm = new Rythm();
  rythm.setMusic(songURI);

  return rythm;
};

let counter: number = 0;
let rythm: any = rythmInit();
const audio = new Audio(songURI);

document.addEventListener('keydown', (event: any) => {
  const konamiCode: string[] = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
  ];

  if (konamiCode[counter] === event.key) {
    counter++;
  } else {
    counter = 0;
  }

  if (counter === konamiCode.length) {
    rythm.start();

    setTimeout(() => {
      rythm.stop();
      rythm = null;
      rythm = rythmInit();
    }, audio.duration * 1000);

    counter = 0;
  }
});

hydrate(<RemixBrowser />, document);
