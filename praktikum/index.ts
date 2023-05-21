import * as dotenv from 'dotenv';

import { createServer } from './api/server';
import { checkTask } from './api/checkTask';
import { saveSolution } from './api/solution';
import { collectFilesAndFolders } from './utils/collectFiles';
import { log } from './utils/log';

const { TASK_URL, PRAKTIKUM_COOKIES } = dotenv.config().parsed || {}

if (!PRAKTIKUM_COOKIES) {
  throw new Error('PRAKTIKUM_COOKIES не объявлен в .env файле');
}

if (!TASK_URL) {
  throw new Error('TASK_URL не объявлен в .env файле');
}

async function upload() {
  log('Collecting files...');
  const files = collectFilesAndFolders('./src');

  log('Creating server...');
  const server = await createServer(files);
  log('Server created.');

  if (!server) {
    log('Server wasn\'t created. Exiting from program.');
    return;
  }

  log('Check task...');
  await checkTask(server.id, files);

  log('Uploading solution...');
  await saveSolution(files);
  log(`Please check your solution at ${TASK_URL}`);
}

upload();
