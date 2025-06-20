import { fetch } from 'node-fetch-native/proxy';

type FetchParams = Parameters<typeof fetch>;

globalThis.fetch = async (input: FetchParams[0], init: FetchParams[1]) => {
  /* console.log('Fetching:', input, {
    method: init?.method,
    headers: init?.headers,
    body: init?.body,
  }); */
  console.log('Fetching:', input);
  const response = await fetch(input, init);
  console.log('Response:', response.status, response.statusText);
  console.log('Response body:', await response.clone().text());
  return response;
};
