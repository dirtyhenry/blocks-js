/// <reference types="node" />
import { IncomingHttpHeaders } from "http";
declare type FetchResponse = {
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
declare const fetch: (url: string | URL, userAgent: string) => Promise<FetchResponse>;
export { fetch };
