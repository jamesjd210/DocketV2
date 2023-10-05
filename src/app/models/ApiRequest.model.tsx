import { HttpMethod } from '@/models/HttpMethod.model'
export interface ApiRequest {
    httpMethod : HttpMethod;
    url : string;
    headers : Record<string, string>;
    body : Record<string, string>;
}