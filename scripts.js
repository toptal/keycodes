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

const spaceDescription = '(Space character)';

const body = document.querySelector('body');
const mobileInputDiv = document.querySelector('.mobile-input');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';
ctx.font = '110px sans-serif';

let theme = 'dark';
let gamepad = null;

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
  document.querySelector('#table-button').textContent = hidden ? 'Table' : '⬅';
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

/**
 * Utility function to set the HTML content of a card using stylesheet class.
 *
 * @param key of the card to update.
 * @param value to display.
 */
function updateCardItem(key, value) {
  document.querySelector(`.item-${key} .main-description`).innerHTML = value;
}

/**
 * Show cards / elements for a given type of events.
 * Hide other cards / elements.
 *
 * @param type MUST be 'keyboard' or 'gamepad'.
 */
function toggleEventCards(type) {
  const keyboard = document.querySelector('#keyboard');
  const gamepad = document.querySelector('#gamepad');

  const showCards = (type === 'keyboard') ? keyboard : gamepad;
  const hideCards = (type === 'keyboard') ? gamepad : keyboard;

  showCards.classList.add('active');
  showCards.classList.remove('hide');

  hideCards.classList.add('hide');
  hideCards.classList.remove('active');

  if (type === 'gamepad') {
    document.querySelector('.keycode-display').innerHTML = '';
    document.querySelector('.gamepad-display').classList.remove('hide');
  }

  document.querySelectorAll('.text-display').forEach(item => item.classList.add('hide'));
}

/**
 * Restore page by hiding event cards and showing texts information.
 */
function resetEventCards() {
  const keyboard = document.querySelector('#keyboard');
  const gamepad = document.querySelector('#gamepad');

  keyboard.classList.add('hide');
  keyboard.classList.remove('active');

  gamepad.classList.add('hide');
  gamepad.classList.remove('active');

  document.querySelector('.keycode-display').innerHTML = '';
  document.querySelector('.gamepad-display').classList.add('hide');
  document.querySelectorAll('.text-display').forEach(item => item.classList.remove('hide'));
}

// #endregion

// #region Keyboard / Touch Event Listeners

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
  if (gamepad) {
    return;
  }

  drawNumberToCanvas(e.keyCode);

  // Main e.keyCode display
  document.querySelector('.keycode-display').innerHTML = e.keyCode;

  toggleEventCards('keyboard');

  // Check if Key_Values is Unidentified then redirect to docs
  let newKeyText = '';
  if (e.key != null && e.key === 'Unidentified') {
    newKeyText = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values#Special_values" target="_blank" rel="noopener">Unidentified</a>';
  } else if (e.key === ' ') {
    newKeyText = `<span class="text-muted">${spaceDescription}</span>`;
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

  updateCardItem('key', newKeyText);
  updateCardItem('location', newLocationText);
  updateCardItem('which', e.which || '');
  updateCardItem('code', newCodeText);
};

body.onkeyup = function(e) {
  if(e.keyCode == '44') {
    body.onkeydown(e);
  }
}

const cardDivs = document.querySelectorAll('.card');
Array.from(cardDivs).forEach(card => {
  card.addEventListener('click', onCardClick);
});

function onCardClick() {
  const card = this;
  let description = card.querySelector('.card-main .main-description').innerHTML;
  description = description.replace(/<[^>]*>?/gm, '');
  if (description === spaceDescription) {
    description = ' ';
  }
  copyTextToClipboard(description);
}

// #endregion

// #region Gamepad Polyfill Methods



// #endregion

// #region Gamepad Event Listeners

window.addEventListener('gamepadconnected', e => {
  createNotification('Gamepad connected!');
  toggleEventCards('gamepad');

  updateCardItem('id', e.gamepad.id);
  updateCardItem('mapping', e.gamepad.mapping);
  updateCardItem('buttons', '');
  updateCardItem('axes', '');

  gamepadLoop();
});

/**
 * Start and loop at 60 FPS to listen to gamepad changes.
 * Update buttons states and axes positions accordingly.
 */
function gamepadLoop() {
  const gamepads = navigator.getGamepads();

  // Stop loop if no gamepads were found.
  if (!gamepads) {
    return;
  }

  // Deal only with the first connected gamepad.
  gamepad = gamepads[0];

  // Stop when gamepad is disconnected.
  if (!gamepad) {
    return;
  }

  // Update UI for each buttons and axes.
  gamepad.buttons.forEach((button, index) => {
    updateGamepadButtonOverlay(index, button.value);
    if (button.pressed) {
      updateCardItem('buttons', `[${index}] (${button.value.toFixed(2)})`);
    }
  });
  updateGamepadJoystickOverlay(gamepad.axes);

  // Recursive loop
  requestAnimationFrame(gamepadLoop);
}

window.addEventListener('gamepaddisconnected', e => {
  createNotification('Gamepad disconnected.');
  resetEventCards();
});

// #endregion

// #region Gamepad Drawing Methods

/**
 * Initialize inlined gamepad SVG.
 */
function prepareGamepadDisplayOverlay() {
  const gamepad = document.querySelector('.gamepad-display').contentDocument;
  const color = (theme === 'dark') ? '#5b60ff' : '#b9e9ff';

  if (!gamepad) {
    return;
  }
  // Set theme's color and hide each buttons overlay.
  gamepad.querySelector('#buttons').querySelectorAll('*').forEach(child => {
    child.style.fill = color;
    child.style.opacity = '0.0';
  });

  // (re)set each joystick to default position.
  const left = gamepad.querySelector('#axes #left');
  const leftButton = gamepad.querySelector('#buttons #_10');
  const right = gamepad.querySelector('#axes #right');
  const rightButton = gamepad.querySelector('#buttons #_11');

  moveGamepadJoystickOverlay(left, 0, 0);
  moveGamepadJoystickOverlay(leftButton, 0, 0);
  moveGamepadJoystickOverlay(right, 0, 0);
  moveGamepadJoystickOverlay(rightButton, 0, 0);
}

/**
 * Updates opacity of a button with given value.
 *
 * @param index of the button with standard mapping (see [Gamepad W3C Editor's draft]{@link https://w3c.github.io/gamepad/#remapping}).
 * @param value between 0.0 and 1.0.
 */
function updateGamepadButtonOverlay(index, value) {
  const gamepad = document.querySelector('.gamepad-display').contentDocument;

  gamepad.querySelector(`#buttons`).querySelectorAll(`#_${index}`).forEach(child => {
    child.style.opacity = value;
  });
}

/**
 * Show joystick values with new one.
 * Updates joystick position with capped range.
 *
 * @param axes array with normalized values between 0.0 and 1.0.
 */
function updateGamepadJoystickOverlay(axes) {
  const gamepad = document.querySelector('.gamepad-display').contentDocument;
  let label;

  label = `[${axes[0].toFixed(2)}, ${axes[1].toFixed(2)}]<br>`;
  label += `[${axes[2].toFixed(2)}, ${axes[3].toFixed(2)}]`;
  updateCardItem('axes', label);

  const left = gamepad.querySelector('#axes #left');
  const leftButton = gamepad.querySelector('#buttons #_10');
  const right = gamepad.querySelector('#axes #right');
  const rightButton = gamepad.querySelector('#buttons #_11');

  moveGamepadJoystickOverlay(left, axes[0], axes[1]);
  moveGamepadJoystickOverlay(leftButton, axes[0], axes[1]);
  moveGamepadJoystickOverlay(right, axes[2], axes[3]);
  moveGamepadJoystickOverlay(rightButton, axes[2], axes[3]);
}

function moveGamepadJoystickOverlay(node, x, y) {
  node.style.transform = `translate(${x * 108.396}px, ${y * 108.396}px)`;
}

// #endregion

// #region Theme Methods

function queryMediaTheme() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    theme = e.matches ? 'dark' : 'light';
    updateTheme();
  });
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  } else {
    theme = 'light';
  }
}

function toggleTheme() {
  theme = (theme === 'light') ? 'dark' : 'light';
  updateTheme();
}

function updateTheme() {
  const html = document.querySelector("html");
  const button = document.querySelector("#theme-button");

  if (theme === 'light') {
    html.classList.add('light-theme');
    html.classList.remove('dark-theme');
    button.innerHTML = 'Dark theme';
  } else {
    html.classList.add('dark-theme');
    html.classList.remove('light-theme');
    button.innerHTML = 'Light theme';
  }
  prepareGamepadDisplayOverlay();
}

// #endregion

// #region Init Methods

queryMediaTheme();
updateTheme();
createTable();
drawNumberToCanvas('⌨️');

// #endregion
