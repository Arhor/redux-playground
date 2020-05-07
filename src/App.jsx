import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route } from 'react-router-dom';
import Home from './views/home';

const App = () => (
  <>
    <Router>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/country">Country</RouterLink>
      <main>
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path="/"        component={Home} exact />
            <Route path="/country" component={lazy(() => import('./views/country'))} />
          </Switch>
        </Suspense>
      </main>
    </Router>
  </>
);

export default App;