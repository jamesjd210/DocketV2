import React, { useState } from 'react';
import { useDocketObject } from '@/create/DocketDataProvider';
import { DocketObject } from '@/models/DocketObject.model';

export default function SaveDocket() {
    const { docketObject , handleUpdateDocketObject } = useDocketObject();
    const [saveDocketResponse, setSaveDocketResponse] = useState<string | null>(null);
    const docketObjectToSend : DocketObject= {
        companyName : docketObject.companyName,
        currApiForm : docketObject.currApiForm,
        currApiRequest : docketObject.currApiRequest,
        codeTranslations : docketObject.codeTranslations,
        response : docketObject.response,
    }

    function handleSave() {

        const apiKey = process.env.NEXT_PUBLIC_API_KEY!
        console.log(apiKey);
        const requestOptions = {
            method : "POST",
            headers : {'api-key': apiKey, "Content-Type" : "application/json"},
            body : JSON.stringify(docketObjectToSend),
        }

        fetch("http://localhost:8081/docket", requestOptions)
            .then((response : Response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then((response : Response) => {
                // Handle the successful response data
                const contentType = response.headers.get('Content-Type');
                if (contentType?.includes('json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then((responseString : string) => {
                setSaveDocketResponse(responseString);
                docketObject.response = responseString;
            })
            .catch((error) => {
                // Handle errors
                console.error('Error making API call:', error);
            })

    }
    if (saveDocketResponse) {
        return <>{saveDocketResponse}</>
    }
    return (
    <button
        type="button"
        className="bg-blue-800 text-white py-2 px-4 rounded hover-bg-gray-700 cursor-pointer mt-4"
        onClick={handleSave}
    >
        Save Sandbox
    </button>
    );
}