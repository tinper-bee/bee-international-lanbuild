import React from 'react';
import mirror, {render, Router} from 'mirrorx';
import {App} from 'containers';

import './index.less';

mirror.defaults({
    historyMode: 'hash'
});

const root = document.getElementById('app');

if (__DEV__) {
    console.log("$i18n{index.js0}$i18n-end")
}

if (__PROD__) {
    console.log("$i18n{index.js1}$i18n-end")
}

render(
    <Router>
        <App />
    </Router>, root);
