import { render } from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { makeApp } from 'app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const vdom = makeApp();

render(vdom, document.getElementById('chat'));
