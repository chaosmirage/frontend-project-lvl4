// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import runApp from './App.tsx';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

runApp();
