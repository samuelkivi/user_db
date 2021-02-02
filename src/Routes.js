import React from 'react';
import { Router, hashHistory as history } from 'react-router';

import Routes from './Routes';

ReactDOM.render(
  <Router routes={routes} history={history} />,
  document.getElementById('your-app')
);