import { DocketObject } from '@/models/DocketObject.model';
import { ApiForm } from '@/models/ApiForm.model'
import { ApiRequest } from '@/models/ApiRequest.model'
import { CodeLanguages } from '@/models/CodeLanguages.model';
import { createContext, useContext, useState } from 'react';

interface DocketDataContextProps {
    docketObject : DocketObject;
    setDocketObject : (    
        currApiForm : ApiForm,
        currApiRequest : ApiRequest,
        codeTranslations : Record<CodeLanguages,string> | null) => void;
}