import { render } from 'react-dom';

import makeApp from 'app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

makeApp().then((vdom) => {
  render(vdom, document.getElementById('chat'));
});
