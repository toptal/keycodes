// #region Declare Variables

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
  136: 'f25',
  137: 'f26',
  138: 'f27',
  139: 'f28',
  140: 'f29',
  141: 'f30',
  142: 'f31',
  143: 'f32',
  144: 'num lock',
  145: 'scroll lock',
  151: 'airplane mode',
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
  251: 'unlock trackpad (Chrome/Edge)',
  255: 'toggle touchpad',
};

const keyLocations = {
  0: 'General keys',
  1: 'Left-side modifier keys',
  2: 'Right-side modifier keys',
  3: 'Numpad',
};

const body = document.querySelector('body');
const mobileInputDiv = document.querySelector('.mobile-input');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '110px sans-serif';

// #endregion

// #region Main Methods

function createTable() {
  const tableBody = document.querySelector('.table-body');
  for (const key in keyCodes) {
    const row = document.createElement('tr');
    row.innerHTML += `<td>${key}</td>`;
    row.innerHTML += `<td>${keyCodes[key]}</td>`;
    tableBody.appendChild(row);
  }
}

function toggleTable() {
  const table = document.querySelector('.table');

  // Toggle main content and table
  document.querySelector('.wrap').classList.toggle('hide');
  document.querySelector('.keycode-display').classList.toggle('hide');
  table.classList.toggle('hide');

  // If hidden, show back arrow
  const hidden = table.classList.contains('hide');
  document.querySelector('.table-toggle-button').textContent = hidden ? 'Table' : '⬅';
}

function drawNumberToCanvas(number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillText(number, canvas.width / 2, canvas.height / 2, canvas.width);
  const data = canvas.toDataURL('image/png');

  const link = document.querySelector("link[rel*='icon']");
  link.type = 'image/x-icon';
  link.href = data;
}

function createNotification(text) {
  // eslint-disable-next-line no-undef
  new Noty({
    type: 'info',
    layout: 'topLeft',
    timeout: '1500',
    theme: 'metroui',
    progressBar: false,
    text,
  }).show();
}

function createTextarea(text) {
  const textArea = document.createElement('textarea');

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  return textArea;
}

/**
 * This function is used to copy a string to clipboard
 * @param {string} text
 */
function copyTextToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code path to prevent textarea being shown while dialog is visible.
    return window.clipboardData.setData('Text', text);
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    const textArea = createTextarea(text);
    textArea.focus();
    textArea.select();

    try {
      const status = document.execCommand('copy'); // Security exception may be thrown by some browsers.
      if (status) {
        createNotification('Copied text to clipboard');
      }
      return status;
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// #endregion

// #region Event Listeners

document.addEventListener('touchstart', e => {
  if (document.querySelector('.mobile-input input') !== null) return;
  if (e.target.tagName === 'BUTTON') return;

  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  mobileInputDiv.appendChild(input);

  // For some reason, the focus is immediately lost unless there is a delay on setting the focus
  setTimeout(() => {
    input.focus();
  }, 100);
});

body.onkeydown = function(e) {
  if (!e.metaKey) {
    e.preventDefault();
  }
  drawNumberToCanvas(e.keyCode);

  // Main e.keyCode display
  document.querySelector('.keycode-display').innerHTML = e.keyCode;

  // Show the cards with all
  const cards = document.querySelector('.cards');
  cards.classList.add('active');
  cards.classList.remove('hide');
  document.querySelector('.text-display').classList.add('hide');

  // Check if Key_Values is Unidentified then redirect to docs
  let newKeyText = '';
  if (e.key != null && e.key === 'Unidentified') {
    newKeyText = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Special_values" target="_blank" rel="noopener">Unidentified</a>';
  } else if (e.key === ' ') {
    newKeyText = `<span class="text-muted">(Space character)</span>`;
  } else {
    newKeyText = e.key || '';
  }

  // Check if location is Unidentified then redirect to docs
  let newLocationText = '';
  let newLocationFriendlyText = '';
  if (e.location == null) {
    newLocationFriendlyText = 'Unknown';
  } else if (!(e.location in keyLocations)) {
    newLocationFriendlyText = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/location" target="_blank" rel="noopener">Other</a>';
  } else {
    newLocationFriendlyText = keyLocations[e.location];
  }

  if (newLocationFriendlyText !== 'Unknown') {
    newLocationText = `${e.location} <span class="text-muted">(${newLocationFriendlyText})</span>`;
  } else {
    newLocationText = newLocationFriendlyText;
  }

  // Check if code is Unidentified then redirect to docs
  let newCodeText = '';
  if (e.code != null && e.code === 'Unidentified') {
    newCodeText = '<a href="https://w3c.github.io/uievents-code/#table-key-code-special" target="_blank" rel="noopener">Unidentified</a>';
  } else {
    newCodeText = e.code || '';
  }

  // Clear input if manually entered
  const mobileInput = document.querySelector('.mobile-input input');
  if (mobileInput !== null) {
    mobileInput.value = '';
  }

  document.querySelector('.item-key .main-description').innerHTML = newKeyText;
  document.querySelector('.item-location .main-description').innerHTML = newLocationText;
  document.querySelector('.item-which .main-description').innerHTML = e.which || '';
  document.querySelector('.item-code .main-description').innerHTML = newCodeText;
};

const cardDivs = document.querySelectorAll('.card');
Array.from(cardDivs).forEach(card => {
  card.addEventListener('click', onCardClick);
});

function onCardClick() {
  const card = this;
  let description = card.querySelector('.card-main .main-description').innerHTML;
  description = description.replace(/<[^>]*>?/gm, '');
  copyTextToClipboard(description);
}

// #endregion

// #region Init Methods

createTable();
drawNumberToCanvas('⌨️');

// #endregion
