'use client'
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { DocketObject } from '@/models/DocketObject.model';
export default function Page() {
    const [companyName, setCompanyName] = useState<string>("");
    const [submitClicked, setSubmitClicked] = useState<boolean>(false);
    const [docketObjects, setDocketObjects] = useState<DocketObject[]>();

    function handleInputChange(e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;
        setCompanyName(value);
    }

    async function getDocketObjects() : Promise<DocketObject[]> {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY!
        console.log(apiKey);
        const requestOptions = {
            method : "GET",
            headers : {'api-key': apiKey},
        }
        try {
            const response = await fetch ("http://localhost:8081/docket", requestOptions);
            if(!response.ok) {
                throw new Error('Network response was not ok');
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
            const docketObjects = await getDocketObjects();
        } catch (error) {
            throw new Error('Error getting the data');
        }
        setDocketObjects(docketObjects);  
    }
    if(!submitClicked) {
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
    } else {
        return (
            <>h9i</>
        );
    }
}