import React, { useState, SyntheticEvent } from 'react';
import { ApiRequest } from '@/models/ApiRequest.model';
import CodeProvider from './Code-Provider';
import { DocketObject } from '@/models/DocketObject.model';

interface ApiSandboxProps {
    docketObject : DocketObject;
}
export default function ApiSandbox( props : ApiSandboxProps) {

    const currRequest = props.docketObject.currApiRequest;

    const [newHeaders, setNewHeaders] = useState<Record<string, string>>(Object.fromEntries ( Object.keys(currRequest.headers).map((key) => [key, ''])));
    const [newData, setNewData] = useState<Record<string, string>>(Object.fromEntries ( Object.keys(currRequest.data).map((key) => [key, ''])));
    const [apiResponse, setApiResponse] = useState<string | null>(null); // Store the API response
    const [buttonClicked, setButtonClicked] = useState<boolean>(false);

    async function handleButtonClick() {
        try {
            // Make an API call
            const response = await fetch(currRequest.url, {
                method : currRequest.httpMethod, 
                headers : newHeaders,
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApiResponse(data);
          } catch (error) {
            console.error('Error making API call:', error);
          }
          setButtonClicked(true);
    }

    function handleChange(inputKey : string, newValue : string, flag : number) {
        if(flag === 0) {
            setNewHeaders((previousHeaders) => ({
                ...previousHeaders,
                [inputKey] : newValue,
            }));
        } else if(flag === 1) {
            setNewData((previousData) => ({
                ...previousData,
                [inputKey] : newValue,
            }));
        }
        setButtonClicked(false);
    };

    //Function to generate labels for the boxes
    function generateTitleLabels(input : string) : string {
        // Use a regular expression to split the string by uppercase letters
      const words = input.split(/(?=[A-Z])/);

      // Capitalize the first letter of each word and join them with spaces
      const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
      return titleCase + ":";
  }


    var dynamicPlaceholder;

    //Generate number of input boxes equal to headers
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
                <CodeProvider apiRequest = { currRequest }/>
            </div>
            ) : !apiResponse && buttonClicked ? (
                <p>Error Making Api Call</p>
            ) : (
                <></>
            )}
        </div>
    </div>
    );
}