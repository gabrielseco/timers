import React from 'react';
import { render } from 'react-dom';

import { App } from './containers';

require('./index.scss');

render(<App />, document.getElementById('root'));
