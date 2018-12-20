import * as chalk from 'chalk'

import { build, common } from './app'

common.spinner.info(chalk.default.bgBlue('Static mode'))

void (async () => {
  await build(true /* build in static mode */)
  common.spinner.succeed('Finished building')
})()
