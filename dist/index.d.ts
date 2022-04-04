/// <reference types="node" />
import { IncomingHttpHeaders } from "http";
declare type CURLResponse = {
    headers: IncomingHttpHeaders;
    statusCode: number;
    body: string;
};
declare const curl: (url: string | URL) => Promise<CURLResponse>;
export { curl };
