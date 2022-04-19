import { writeFileSync } from 'fs'
import { keyCodes } from './lib/keycodes.js'
import { keyCodesWithEvents } from './lib/keyCodesWithEvents.js'

// Loop over every Description and try assign to the keycode with events
Object.entries(keyCodes).forEach(([keyCode, description]) => {
  if (!keyCodesWithEvents[keyCode]) {
    keyCodesWithEvents[keyCode] = {
      description,
      keyCode,
      which: keyCode,
    }
    console.log('We dont have ', keyCode, ' making one')
  }
  keyCodesWithEvents[keyCode].description = description
})

writeFileSync('./events-dump.json', JSON.stringify(keyCodesWithEvents), 'utf8')
