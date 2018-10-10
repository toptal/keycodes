const keyCodes = {
  0: 'That key has no keycode',
  3: 'break',
  8: 'backspace / delete',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause/break',
  20: 'caps lock',
  21: 'hangul',
  25: 'hanja',
  27: 'escape',
  28: 'conversion',
  29: 'non-conversion',
  32: 'spacebar',
  33: 'page up',
  34: 'page down',
  35: 'end',
  36: 'home',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
  41: 'select',
  42: 'print',
  43: 'execute',
  44: 'Print Screen',
  45: 'insert',
  46: 'delete',
  47: 'help',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: 'semicolon (firefox), equals',
  60: '<',
  61: 'equals (firefox)',
  63: 'ß',
  64: '@ (firefox)',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'Windows Key / Left ⌘ / Chromebook Search key',
  92: 'right window key',
  93: 'Windows Menu / Right ⌘',
  95: 'sleep',
  96: 'numpad 0',
  97: 'numpad 1',
  98: 'numpad 2',
  99: 'numpad 3',
  100: 'numpad 4',
  101: 'numpad 5',
  102: 'numpad 6',
  103: 'numpad 7',
  104: 'numpad 8',
  105: 'numpad 9',
  106: 'multiply',
  107: 'add',
  108: 'numpad period (firefox)',
  109: 'subtract',
  110: 'decimal point',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  124: 'f13',
  125: 'f14',
  126: 'f15',
  127: 'f16',
  128: 'f17',
  129: 'f18',
  130: 'f19',
  131: 'f20',
  132: 'f21',
  133: 'f22',
  134: 'f23',
  135: 'f24',
  144: 'num lock',
  145: 'scroll lock',
  160: '^',
  161: '!',
  162: '؛ (arabic semicolon)',
  163: '#',
  164: '$',
  165: 'ù',
  166: 'page backward',
  167: 'page forward',
  168: 'refresh',
  169: 'closing paren (AZERTY)',
  170: '*',
  171: '~ + * key',
  172: 'home key',
  173: 'minus (firefox), mute/unmute',
  174: 'decrease volume level',
  175: 'increase volume level',
  176: 'next',
  177: 'previous',
  178: 'stop',
  179: 'play/pause',
  180: 'e-mail',
  181: 'mute/unmute (firefox)',
  182: 'decrease volume level (firefox)',
  183: 'increase volume level (firefox)',
  186: 'semi-colon / ñ',
  187: 'equal sign',
  188: 'comma',
  189: 'dash',
  190: 'period',
  191: 'forward slash / ç',
  192: 'grave accent / ñ / æ / ö',
  193: '?, / or °',
  194: 'numpad period (chrome)',
  219: 'open bracket',
  220: 'back slash',
  221: 'close bracket / å',
  222: 'single quote / ø / ä',
  223: '`',
  224: 'left or right ⌘ key (firefox)',
  225: 'altgr',
  226: '< /git >, left back slash',
  230: 'GNOME Compose Key',
  231: 'ç',
  233: 'XF86Forward',
  234: 'XF86Back',
  235: 'non-conversion',
  240: 'alphanumeric',
  242: 'hiragana/katakana',
  243: 'half-width/full-width',
  244: 'kanji',
  251: "unlock trackpad (Chrome/Edge)",
  255: 'toggle touchpad',
};

const body = document.querySelector('body');
const hiddenInput = document.getElementById('hidden_input');
const isAndroid = navigator.userAgent.match(/Android/i);

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '110px sans-serif';

function drawNumberToCanvas(number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillText(number, canvas.width / 2, canvas.height / 2, canvas.width);
  const data = canvas.toDataURL('image/png');

  const link = document.querySelector("link[rel*='icon']");
  link.type = 'image/x-icon';
  link.href = data;
}

function getLastCharFromString(str) {
  return str[str.length - 1];
}
function getLastCharCodeFromString(str) {
  return str.charCodeAt(str.length-1);
}

body.onkeyup = function(e) {
  if (!e.metaKey) {
    e.preventDefault();
  } 
  
  var charKeyCode = e.keyCode;
  var newKeyText = '';

  //for android chrome keycode fix
  if (isAndroid && e.keyCode == 229 && hiddenInput.value.length>0) {
    charKeyCode = getLastCharCodeFromString(hiddenInput.value);
    newKeyText = getLastCharFromString(hiddenInput.value);

    hiddenInput.value = '';
    hiddenInput.blur();
  } else {
    // Check if Key_Values is Unidentified then redirect to docs
    if (e.key != null && e.key === 'Unidentified') {
      newKeyText = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Special_values" target="_blank">Unidentified</a>';
    } else if (e.key == ' ') {
      newKeyText = `<span class="text-muted">(Space character)</span>`;
    } else {
      newKeyText = e.key || '';
    }
  }
  drawNumberToCanvas(charKeyCode);

  // Main e.keyCode display
  document.querySelector('.keycode-display').innerHTML = charKeyCode;

  // Show the cards with all
  var cards = document.querySelector('.cards');
  cards.classList.add('active');
  cards.classList.remove('hide');
  document.querySelector('.text-display').classList.add('hide');


  // Check if code is Unidentified then redirect to docs
  var newCodeText = '';
  if (e.code != null && e.code === 'Unidentified'){
    newCodeText = '<a href="https://w3c.github.io/uievents-code/#table-key-code-special" target="_blank">Unidentified</a>';
  } else {
    newCodeText = e.code || '';
  }

  document.querySelector('.item-key .main-description').innerHTML = newKeyText;
  document.querySelector('.item-which .main-description').innerHTML = charKeyCode || '';
  document.querySelector('.item-code .main-description').innerHTML = newCodeText;

  // document.querySelector('.text-display').innerHTML =
  //   keyCodes[e.keyCode] ||
  //   `huh? Let me know what browser and key this was. <a href="https://github.com/wesbos/keycodes/issues/new?title=Missing keycode ${e.keyCode}&body=Tell me what key it was or even better, submit a Pull request!">Submit to Github</a>`;
};

function focusHiddenInput() {

  if (isAndroid) {
    setTimeout(function () {
      hiddenInput.focus();
      hiddenInput.click();
    }, 100);
  } else {
    hiddenInput.focus();
  }
}

body.addEventListener('touchend', focusHiddenInput, true);


(function(i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-50371747-1', 'keycode.info');
ga('send', 'pageview');

drawNumberToCanvas('⌨️');
