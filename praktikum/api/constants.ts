import * as dotenv from 'dotenv';
const { TASK_URL, PRAKTIKUM_COOKIES } = dotenv.config().parsed || {}

export const BASE_URL = 'https://practicum.yandex.ru/api/';

export const YANDEX_HEADERS = {
  'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
  'Connection': 'keep-alive',
  'Cookie': PRAKTIKUM_COOKIES,
  // 'Origin': 'https://practicum.yandex.ru',
  // 'Referer': 'https://practicum.yandex.ru/trainer/react/lesson/42852021-f331-4bbb-a54b-19b529f82b3f/task/c6053e70-f33d-49c0-9cd7-ef445d6cb1ac/?hideTheory=1',
  'Sec-Fetch-Dest': 'empty',
  'Sec-Fetch-Mode': 'cors',
  'Sec-Fetch-Site': 'same-origin',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'accept': 'application/json',
  'content-type': 'application/json',
  'x-authtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjU3ODE1NCwidXNlZGVza19jbGllbnRfaWQiOm51bGwsInVzZWRlc2tfZW1haWwiOiJ1bWFyQG5hcHNoZXYucnUiLCJjb3VudHJ5IjoiUlUiLCJpYXQiOjE2ODQ2NjQ0OTksImV4cCI6MTY4NDc1MDg5OX0.9sIQ00en546inKq2hlRNAaaliMl98ofqkU9T7MUUp-I',
  'mode': 'cors',
};



export const [, TASK_ID] = TASK_URL.match(/task\/(.+)\//m) || [];
