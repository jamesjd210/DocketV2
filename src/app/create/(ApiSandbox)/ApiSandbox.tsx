import React, { useState, SyntheticEvent, useEffect } from 'react';
import CodeProvider from './Code-Provider';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useDocketObject } from '@/create/DocketDataProvider';
import DocGenerator from '@/create/(CreateDocs)/DocGenerator';


export default function ApiSandbox() {
    
    const { docketObject , handleUpdateDocketObject } = useDocketObject();

    const currRequest = docketObject.currApiRequest;
    const [newHeaders, setNewHeaders] = useState<Record<string, string>>();
    const [newData, setNewData] = useState<Record<string, string>>();
    const [apiResponseJson, setApiResponse] = useState<string | null>(null); // Store the API response
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    function handleButtonClick() {
        var requestOptions = {}
        // If the http method is GET, HEAD, or OPTIONS, don't include body
        if (HTTP_METHODS.slice(0,3).includes(currRequest.httpMethod)) {
            requestOptions = {
                method : currRequest.httpMethod,
                headers : newHeaders,
            }
        // Else if the http method is POST, PUT, DELETE, PATCH include the body
        } else {
            requestOptions = {
                method : currRequest.httpMethod,
                headers : newHeaders,
                body : JSON.stringify(newData),
            }
        }
        fetch(currRequest.url, requestOptions)
            .then((response : Response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .then((response : Response) => {
                // Handle the successful response data
                const contentType = response.headers.get('Content-Type');
                if (contentType?.includes('application/json')) {
                    return response.json();
                } else {
                    return response.text();
                }
            })
            .then((responseString : string) => {
                setApiResponse(responseString);
                docketObject.response = responseString;
            })
            .catch((error) => {
                // Handle errors
                console.error('Error making API call:', error);
            })
            .finally(() => {
                // Set the buttonClicked state regardless of success or error
                setButtonClicked(true);
            });
    }

    function handleChange(inputKey : string, newValue : string, flag : number) {
        if (flag === 0) {
            setNewHeaders((previousHeaders) => ({
                ...previousHeaders,
                [inputKey] : newValue,
            }));
        } else if (flag === 1) {
            setNewData((previousData) => ({
                ...previousData,
                [inputKey] : newValue,
            }));
        }
        setButtonClicked(false);
        setApiResponse(null);
    };

    // Function to generate labels for the boxes
    function generateTitleLabels(input : string) : string {
        // Use a regular expression to split the string by uppercase letters
        const words = input.split(/(?=[A-Z])/);

        // Capitalize the first letter of each word and join them with spaces
        const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
        return titleCase + ":";
    }

    var dynamicPlaceholder;

    // Generate the number of input boxes equal to headers
    const inputHeaderBoxes = Object.keys(currRequest.headers).map((headerKey : string) => {
        dynamicPlaceholder = "Ex: " + currRequest.headers[headerKey]
        return (
            <div key={headerKey} className = "flex mb-4">
                <label className="block text-sm font-bold mb-2 mr-2 w-20">
                    { generateTitleLabels(headerKey) }
                </label>
                <input
                    type="text"
                    placeholder={dynamicPlaceholder}
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => handleChange(headerKey, event.target.value, 0)}
                    className="text-black w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
        );
    });

    const inputDataBoxes = Object.keys(currRequest.data).map((dataKey : string) => {
        dynamicPlaceholder = "Ex: " + currRequest.data[dataKey]
        return (
            <div key={dataKey} className = "flex mb-4">
                <label className="block text-sm font-bold mb-2 mr-2 w-20">
                    { generateTitleLabels(dataKey) }
                </label>
                <input
                    type="text"
                    placeholder={dynamicPlaceholder}
                    onChange={(event : React.ChangeEvent<HTMLInputElement>) => handleChange(dataKey, event.target.value, 1)}
                    className="text-black w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
        );
    });

    return (
        <div className="flex flex-col items-center mt-40">
            {/* Input boxes for users to put in headers*/}
            <div className="mb-10">
                <p className="text-xl font-semibold">Curl Command:</p> 
                <div className="text-gray-300">
                    {docketObject.currApiForm.apiCurl}
                </div>
            </div>
            {inputHeaderBoxes}
            {/* Input boxes for users to put in data if the curl has data*/}
            {inputDataBoxes.length != 0 ? (
                <>
                    <div className='mb-2'>
                        Data
                    </div>
                    {inputDataBoxes}
                </>
            ) : (<></>
            )}
        
            {/* Execute button */}
            <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded hover-bg-gray-700 cursor-pointer mt-4"
                onClick={handleButtonClick}
            >
                Execute
            </button>
        
            {/* API response */}
            <div className="mt-4">
                {apiResponseJson !== null ? (
                    <>
                        <div className="mb-8">
                            <pre className="text-black bg-gray-100 p-5 rounded shadow">{JSON.stringify(apiResponseJson, null, 4)}</pre>
                        </div>
                        <div>
                            <CodeProvider/>  
                        </div>  
                        <DocGenerator/>
                    </>
                ) : buttonClicked ? (
                    <p>Error Making Api Call</p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
