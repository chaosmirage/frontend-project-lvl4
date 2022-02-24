import { render } from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import makeApp from 'app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

(async () => {
  const vdom = await makeApp();

  render(vdom, document.getElementById('chat'));
})();
