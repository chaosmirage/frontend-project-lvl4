import React from 'react';
import type { FC } from 'react';
import { render } from 'react-dom';
import Nav from './Nav';

const App: FC = () => (
  <div className="d-flex flex-column h-100">
    <Nav />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 mt-3 mt-mb-0">Form</div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default () => {
  render(<App />, document.getElementById('root'));
};
