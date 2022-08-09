import assert from "assert";
import { IncomingHttpHeaders } from "http";
import { get } from "https";

type FetchResponse = {
  headers: IncomingHttpHeaders;
  statusCode: number;
  body: string;
};

/**
 * Fetches the given URL as a simple `GET` request.
 *
 * Node should bring native support of the Fetch API so this method is scheduled to become
 * obsolete pretty soon.
 *
 * @param url The URL to fetch.
 * @param userAgent The content of the `User-Agent` header sent with the request.
 * @returns The response to the request (ie headers, status code and body).
 */
const fetch = (
  url: string | URL,
  userAgent: string
): Promise<FetchResponse> => {
  return new Promise((resolve, reject) => {
    get(
      url,
      {
        headers: { "User-Agent": userAgent },
      },
      (res) => {
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
      }
    ).on("error", (e) => {
      reject(e);
    });
  });
};

export { fetch };
