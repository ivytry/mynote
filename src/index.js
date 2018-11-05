import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style';
import './statics/iconfont/iconfont';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

let APP = <LocaleProvider locale={zh_CN}><App /></LocaleProvider>

ReactDOM.render(APP, document.getElementById('root'));
