import { setup } from './setup';
import Array from './arrayHelpers';
import 'bootstrap';

import 'jquery-ui'
import 'jquery-ui-dist/jquery-ui'
import 'bootstrap'

document.addEventListener('DOMContentLoaded', () => {
    setup();
});

window.Array = Array;
