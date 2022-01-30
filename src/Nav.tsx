import React from 'react';
import type { FC } from 'react';
import { render } from 'react-dom';

const Nav: FC = () => (
  <div className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <a className="navbar-brand" href="/">
      Chat
    </a>
  </div>
);

export default Nav;
