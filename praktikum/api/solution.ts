import fetch from "node-fetch";

import { FileObject } from "../utils/collectFiles";
import { BASE_URL, TASK_ID, YANDEX_HEADERS } from "./constants";

const SOLUTIONS_URI = `/tasks/${TASK_ID}/solutions/`;

export async function saveSolution(panes: FileObject[]): Promise<unknown> {
  if (!TASK_ID) {
    throw new Error('No task id provided');
  }

  const response = await fetch(`${BASE_URL}${SOLUTIONS_URI}`, {
    method: 'POST',
    headers: YANDEX_HEADERS,
    body: JSON.stringify({
      panes
    }),
  });
  return response.json();
}
