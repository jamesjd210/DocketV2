import { DocketObject } from "./DocketObject.model"

export interface UserDocsData {
    currEndpoint : string;
    currSubmitStatus : boolean;
    currDocketObjects : DocketObject[];
}