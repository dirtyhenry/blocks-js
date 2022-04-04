import assert from "assert";
import { IncomingHttpHeaders } from "http";
import { get } from "https";

type CURLResponse = {
  headers: IncomingHttpHeaders,
  statusCode: number,
  body: string
}

const curl = (url: string | URL): Promise<CURLResponse> => {
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

export { curl };
