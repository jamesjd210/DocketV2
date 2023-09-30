import React, { useState, SyntheticEvent } from 'react';
import { ApiRequest } from '@/models/ApiRequest.model';

interface ApiSandboxProps {
    apiRequest : ApiRequest;
}
export default function ApiSandbox( props : ApiSandboxProps) {
    const [values, setValues] = useState<Record<string, string>>(Object.fromEntries ( Object.keys(props.apiRequest.headers).map((key) => [key, ''])));
    const [apiResponse, setApiResponse] = useState<string | null>(null); // Store the API response
 
    async function handleButtonClick() {
        try {
            // Make an API call
            const response = await fetch(props.apiRequest.url, {
                method : props.apiRequest.httpMethod, 
                headers : props.apiRequest.headers,
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApiResponse(data);
          } catch (error) {
            console.error('Error making API call:', error);
          }
    }

    function handleChange(headerName : string, newValue : string) {
        setValues((previousValues) => ({
            ...previousValues,
            [headerName] : newValue,
        }));
    };

    var dynamicPlaceholder;

    //Generate number of input boxes equal to headers
    const inputBoxes = Object.keys(props.apiRequest.headers).map((headerValue : string, index : number) => {
        dynamicPlaceholder = "Example is " + props.apiRequest.headers[headerValue]
        return (
            <div key={index} className = "flex mb-4">
                <input
                type="text"
                placeholder={dynamicPlaceholder}
                value={values[headerValue]}
                onChange={(event : React.ChangeEvent<HTMLInputElement>) => handleChange(headerValue, event.target.value)}
                className="text-black w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            );
    });
    
    return (
    <div className="flex flex-col items-center">
        {/* Input boxes */}
        {inputBoxes}
    
        {/* Execute button */}
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 cursor-pointer mt-4"
          onClick={handleButtonClick}
        >
          Execute
        </button>
    
        {/* API response */}
        <div className="mt-4">
            {apiResponse ? (
            <div className="">
                <pre className="text-black bg-gray-100 p-5 rounded shadow">{JSON.stringify(apiResponse, null, 4)}</pre>
            </div>
            ) : (
                <p>Waiting...</p>
            )}
        </div>
    </div>
    );
}