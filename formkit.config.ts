import {
  arrowDown,
  arrowUp,
  check,
  circle,
  close,
  down,
  fileDoc,
  spinner,
  star,
  trash,
} from '@formkit/icons'
import { generateClasses } from '@formkit/themes'
import { createAutoAnimatePlugin } from '@formkit/addons'

import formTheme from './form.theme.js'

export default {
  plugins: [createAutoAnimatePlugin()],
  config: {
    classes: generateClasses(formTheme),
  },
  icons: {
    // include supporting icons from @formkit/icons
    arrowDown,
    arrowUp,
    close,
    checkboxDecorator: check,
    fileItem: fileDoc,
    fileRemove: close,
    noFiles: fileDoc,
    radioDecorator: circle,
    select: down,
    spinner,
    star,
    trash,
  },
}
