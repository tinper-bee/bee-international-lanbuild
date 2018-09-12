import React from 'react';
import mirror, {render, Router} from 'mirrorx';
import {App} from 'containers';

import './index.less';

mirror.defaults({
    historyMode: 'hash'
});

const root = document.getElementById('app');

if (__DEV__) {
    console.log("noDictionnaryFlag")
}

if (__PROD__) {
    console.log("noDictionnaryFlag")
}

render(
    <Router>
        <App />
    </Router>, root);
