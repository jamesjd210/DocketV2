import React, { useState, SyntheticEvent } from 'react';
import { useDocketObject } from '@/docs/DocketDataProvider';
import { DocketObject } from '@/models/DocketObject.model';

export default function SaveDocket() {
    const { docketObject , handleUpdateDocketObject } = useDocketObject();
    const [saveDocketResponse, setSaveDocketResponse] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string>("");
    const docketObjectToSend : DocketObject= {
        companyName : docketObject.companyName,
        currApiForm : docketObject.currApiForm,
        currApiRequest : docketObject.currApiRequest,
        codeTranslations : docketObject.codeTranslations,
        response : docketObject.response,
    }

    function handleInputChange(e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;
        setApiKey(value);
    }

    function handleSave() {
        
        const apiUrl = process.env.NEXT_PUBLIC_DOCKET_API!;
        const requestOptions = {
            method : "POST",
            headers : {'api-key': apiKey, "Content-Type" : "application/json"},
            body : JSON.stringify(docketObjectToSend),
        }

        fetch(apiUrl, requestOptions)
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
        <>
            <div>
                <label className="text-sm font-bold mb-2 w-full mr-5">
                    Enter in Api-Key:
                </label>
                <input
                type="text"
                name="apiKeyBox"
                placeholder=""
                onChange={handleInputChange}
                className="block text-black w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                type="button"
                className="bg-blue-800 text-white py-2 px-4 rounded hover-bg-gray-700 cursor-pointer mt-4"
                onClick={handleSave}>

                Save Sandbox
            </button>
        </>

    );
}