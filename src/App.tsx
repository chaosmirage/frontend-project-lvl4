import React from 'react';
import type { FC } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Login from './Login';
import NotFound from './NotFound';

const App: FC = () => (
  <div className="d-flex flex-column h-100">
    <Nav />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>main</div>} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default () => {
  render(<App />, document.getElementById('root'));
};
