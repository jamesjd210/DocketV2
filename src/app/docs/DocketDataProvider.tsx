"use client"
import { DocketObject } from '@/models/DocketObject.model';
import { ApiForm } from '@/models/ApiForm.model'
import { ApiRequest } from '@/models/ApiRequest.model'
import { CodeLanguages } from '@/models/CodeLanguages.model';
import {  HTTP_METHODS } from 'next/dist/server/web/http';
import { createContext, useContext, useState } from 'react';

interface DocketDataContextProps {
    docketObject : DocketObject;
    handleUpdateDocketObject : (    
        currApiForm : ApiForm,
        currApiRequest : ApiRequest) => void;
}

const DocketDataContext = createContext<DocketDataContextProps | undefined>(undefined);

export function useDocketObject() {
    const context = useContext(DocketDataContext);
    if(!context) {
        throw new Error('useDocket Data must be used within a DataProvider')
    }
    return context;
}

export function DocketDataProvider({children,} : {children: React.ReactNode}) {
    const defaultApiForm : ApiForm = {
        companyName : '',
        developerName : '',
        developerEmail : '',
        apiCurl : '',
        apiName : '',
        apiOneLiner : '',
        additionalInfo : '',
    };

    const defaultCodeTranslations : Record<CodeLanguages, string> = { 
        [CodeLanguages.JAVASCRIPT] : "",
        [CodeLanguages.PYTHON] : "",
        [CodeLanguages.JAVA] : "",
        [CodeLanguages.CSHARP] : "",
        [CodeLanguages.PHP] : "",
    };

    const defaultApiRequest : ApiRequest = {
        // Initialize with default values for ApiRequest properties
        httpMethod: HTTP_METHODS[0],
        url: '',
        headers: {},
        data: {},
    };
    const [docketObject, setDocketObject] = useState<DocketObject>({
        _id : "",
        companyName : "",
        currApiForm : defaultApiForm,
        currApiRequest : defaultApiRequest,
        codeTranslations : defaultCodeTranslations,
        response : null,
    });
    
    function handleUpdateDocketObject (newApiForm : ApiForm, newApiRequest : ApiRequest) {
        setDocketObject((prevValues) => ({
            ...prevValues,
            currApiForm : newApiForm,
            currApiRequest : newApiRequest,
        }));
    }

    return (
            <DocketDataContext.Provider
            value = {{ docketObject, handleUpdateDocketObject }}>
                {children}
            </DocketDataContext.Provider>
    );
}