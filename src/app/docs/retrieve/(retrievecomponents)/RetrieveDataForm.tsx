import React, { useState, SyntheticEvent } from 'react';
import { DocketObject } from '@/models/DocketObject.model';
import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import { useDocketObject } from '@/docs/DocketDataProvider';

export default function RetriveDataForm () {

    const [companyName, setCompanyName] = useState<string>("");
    const [apiKey, setApiKey] = useState<string>("");
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);

    const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
    const { docketObject , handleUpdateDocketObject, handleUpdateNewDocketObject } = useDocketObject();

    function handleInputChange(e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;

        if (name === 'companyNameBox') {
            setCompanyName(value);
        } else if (name === 'apiKeyBox') {
            setApiKey(value);
        }
    }

    async function getDocketObjects() : Promise<DocketObject[]> {
        const apiUrl = process.env.NEXT_PUBLIC_DOCKET_API!;
        const requestOptions = {
            method : "GET",
            headers : {'api-key': apiKey, 'company-name' : companyName},
        }
        try {
            const response = await fetch (apiUrl, requestOptions);
            if(!response.ok) {
                if(response.status == 401) {
                    console.log(response.body)
                } else {
                    throw new Error("Error connecting to API");
                }
            }

            const data : DocketObject[] = await response.json();
            return data
        } catch (error : any) {
            throw new Error('Error fetching data from API: ' + error.message);
        } 
    }

    async function handleClick(){
        setSubmitClicked(true);
        try {
            const docketObjectsFromDb = await getDocketObjects();
            handleUpdateUserDocsData(userDocsData.currEndpoint, true, docketObjectsFromDb);
            if(docketObjectsFromDb.length > 0) {
                handleUpdateNewDocketObject(docketObjectsFromDb[0]);
            }

        } catch (error : any) {
            throw new Error('Error getting the data ' + error.message);
        }  
    }

    return (
        <div className = "flex flex-col items-center max-w-lg mx-auto mt-20">
            <div>
                <label className="text-sm font-bold mb-2 w-full mr-5">
                    Enter in Company Name:
                </label>
                <input
                type="text"
                name="companyNameBox"
                placeholder=""
                onChange={handleInputChange}
                className="block text-black w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />

            </div>
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
            <div>
                <button
                    type="submit"
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer mx-auto mt-2"
                    form="user-form"
                    onClick={handleClick}
                    >
                    Fetch Data
                </button>
            </div>
        </div>
    );
}