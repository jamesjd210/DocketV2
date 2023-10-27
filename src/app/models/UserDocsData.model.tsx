import { DocketObject } from "./DocketObject.model"

export interface UserDocsData {
    id : string;
    currEndpoint : string;
    currSubmitStatus : boolean;
    currDocketObjects : DocketObject[];
}