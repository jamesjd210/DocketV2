import { HTTP_METHOD } from 'next/dist/server/web/http';
export interface ApiRequest {
    httpMethod : HTTP_METHOD;
    url : string;
    headers : Record<string, string>;
    data : Record<string, string>;
}