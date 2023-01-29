import ace from 'ace-builds';

import themeMonokaiUrl from 'ace-builds/src-noconflict/theme-monokai?url';
ace.config.setModuleUrl('ace/theme/monokai', themeMonokaiUrl);

import workerBaseUrl from 'ace-builds/src-noconflict/worker-base?url';
ace.config.setModuleUrl('ace/mode/base', workerBaseUrl);

import modeJsonUrl from 'ace-builds/src-noconflict/mode-json?url';
ace.config.setModuleUrl('ace/mode/json', modeJsonUrl);
import workerJsonUrl from 'ace-builds/src-noconflict/worker-json?url';
ace.config.setModuleUrl('ace/mode/json_worker', workerJsonUrl);
import snippetsJsonUrl from 'ace-builds/src-noconflict/snippets/json?url';
ace.config.setModuleUrl('ace/snippets/json', snippetsJsonUrl);

import modeJavascriptUrl from 'ace-builds/src-noconflict/mode-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript', modeJavascriptUrl);
import workerJavascriptUrl from 'ace-builds/src-noconflict/worker-javascript?url';
ace.config.setModuleUrl('ace/mode/javascript_worker', workerJavascriptUrl);
import snippetsJavascriptUrl from 'ace-builds/src-noconflict/snippets/javascript?url';
ace.config.setModuleUrl('ace/snippets/javascript', snippetsJavascriptUrl);

import 'ace-builds/src-noconflict/ext-language_tools';
ace.require('ace/ext/language_tools');
