import { ApiForm } from '@/models/ApiForm.model'
import { ApiRequest } from '@/models/ApiRequest.model'
import { CodeLanguages } from './CodeLanguages.model';
export interface DocketObject {
    currApiForm : ApiForm;
    currApiRequest : ApiRequest;
    codeTranslations : Record<CodeLanguages, string >;
    response : string | null;
}