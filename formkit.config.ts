import { generateClasses } from '@formkit/themes'
// import { createAutoAnimatePlugin } from '@formkit/addons'

import { formTheme } from './form.theme.js'

export default {
  //   plugins: [createAutoAnimatePlugin()],
  config: {
    classes: generateClasses(formTheme),
  },
}
