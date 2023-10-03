import React, { useState, SyntheticEvent } from 'react';
import { ApiForm } from '@/models/ApiForm.model'
import { ApiRequest } from '@/models/ApiRequest.model';
import  DownloadDoc  from '@/create/(CreateDocs)/DownloadDoc'

interface DocGeneratorProps {
    apiForm : ApiForm;
    apiRequest : ApiRequest;
}

export default function DocGenerator(props : DocGeneratorProps) {
    const currentApiForm = props.apiForm;
    const currentApiRequest = props.apiRequest;
    
    function generateGeneralInfo() : string {
        const generalInfo = 
`# ${currentApiForm.apiName} Documentation and Sandbox
Method: ${currentApiRequest.httpMethod}
Automated with **Ducks**
# Introduction
Welcome to the ${currentApiForm.apiName} documentation made by ${currentApiForm.companyName}. This API i sdesigned to provide ${currentApiForm.apiOneLiner}. This documentation will guide you through the usage
of the Api, including a functional sandbox, header descriptions, curl commands and other code translations.
**Developer  Name:** ${currentApiForm.developerName}
**Developer Email:** ${currentApiForm.developerEmail}
**API Name:** ${currentApiForm.apiName}
**API Use Case:** ${currentApiForm.apiOneLiner}
**Additional Relevant Info:** ${currentApiForm.developerEmail}
        `
        return generalInfo
    }

    function generateHeaders() {

    }

    function generateDataBox() {

    }

    function generateCode() {

    }

    return (
        <>
        <DownloadDoc documentContent = {generateGeneralInfo()}/>
        </>
    );
};