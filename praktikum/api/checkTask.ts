import fetch from "node-fetch";

import { FileObject } from "../utils/collectFiles";
import { BASE_URL, TASK_ID, YANDEX_HEADERS } from "./constants";

export interface CheckTaskResponse {
  test_result: TestResult;
  run_result: null;
}

export interface TestResult {
  message: string;
  status: string;
  solved: boolean;
}

const CHECK_TASK_URI = `/backend/check_task/${TASK_ID}/`

export async function checkTask(server_id: string, panes: FileObject[]): Promise<CheckTaskResponse> {
  if (!TASK_ID) {
    throw new Error('No task id provided');
  }

  const response = await fetch(`${BASE_URL}${CHECK_TASK_URI}`, {
    method: 'POST',
    headers: YANDEX_HEADERS,
    body: JSON.stringify({
      server_id,
      panes
    }),
  });

  return await response.json() as CheckTaskResponse;
}
