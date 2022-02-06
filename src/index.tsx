import React, { useState, ReactElement, useLayoutEffect } from 'react';
import { render } from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { App } from 'app';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

render(<App />, document.getElementById('root'));
