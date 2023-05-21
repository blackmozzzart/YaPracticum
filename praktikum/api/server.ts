import fetch from "node-fetch";
import { v4 as uuidv4 } from 'uuid';

import { FileObject } from "../utils/collectFiles";
import { BASE_URL, YANDEX_HEADERS } from "./constants";

export interface ServerResponse {
  last_activity: string;
  running: boolean;
  id: string;
  container_hash: string;
  session_id: null;
  server_ip: string;
}

const SERVER_URI = 'servers/';

export async function createServer(files: FileObject[]): Promise<ServerResponse | undefined> {
  try {
    const id = uuidv4();
    const response = await fetch(`${BASE_URL}${SERVER_URI}`, {
      method: 'POST',
      headers: YANDEX_HEADERS,
      body: JSON.stringify({
        id,
        files,
        "image": "react-server-ng"
      }),
    });
    return await response.json() as ServerResponse;
  } catch (e) {
    throw new Error('Failed to create server!');
  }
}
