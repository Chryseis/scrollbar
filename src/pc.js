/**
 * Created by Administrator on 2017/12/10.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Web from './layouts/web/web';


let div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<Web />, div);