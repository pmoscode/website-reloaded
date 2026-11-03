// Einstiegspunkt – wird von Hugo (js.Build / esbuild) gebündelt, kein Node nötig.
import { initTheme } from './modules/theme.js';
import { initMenu } from './modules/menu.js';
import { initSearch } from './modules/search.js';
import { initConsent } from './modules/consent.js';
import { initCode } from './modules/code.js';
import { initToc } from './modules/toc.js';
import { initStage } from './modules/stage.js';

initTheme();
initMenu();
initSearch();
initConsent();
initCode();
initToc();
initStage();
