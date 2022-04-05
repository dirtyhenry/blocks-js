import assert from "assert";
import { IncomingHttpHeaders } from "http";
import { get } from "https";

type FetchResponse = {
  headers: IncomingHttpHeaders,
  statusCode: number,
  body: string
}

/**
 * Fetches the given URL as a simple `GET` request. 
 * 
 * Node should bring native support of the Fetch API so this method is scheduled to become 
 * obsolete pretty soon.
 * 
 * @param url The URL to fetch.
 * @returns The response to the request (ie headers, status code and body).
 */
const fetch = (url: string | URL): Promise<FetchResponse> => {
  return new Promise((resolve, reject) => {
      get(url, (res) => {
        const { headers, statusCode } = res;

        assert(!!statusCode);

        res.setEncoding("utf8");
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          resolve({ statusCode, headers, body });
        });
      })
      .on("error", (e) => {
        reject(e);
      });
  });
};

export { fetch };
