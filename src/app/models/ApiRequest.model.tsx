import { ApiForm } from '@/models/ApiForm.model'
import { HttpMethod } from '@/models/HttpMethod.model'
export interface ApiRequest {
    apiForm : ApiForm;
    httpMethod : HttpMethod;
    url : string;
    headers : Record<string, string>;
    body : Record<string, string>;
}