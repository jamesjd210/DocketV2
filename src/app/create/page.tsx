'use client'
import React, { useState, SyntheticEvent, useEffect } from 'react';
import { ApiForm } from '@/models/ApiForm.model'
import { ApiRequest } from '@/models/ApiRequest.model';
import ApiSandbox from '@/create/(ApiSandbox)/ApiSandbox';
import DocGenerator from './(CreateDocs)/DocGenerator';
import { DocketObject } from '@/models/DocketObject.model';
import { HTTP_METHOD, HTTP_METHODS } from 'next/dist/server/web/http';

export default function Page() {
    //Tracking the state of the form data from user
    const [formData, setFormData] = useState<ApiForm>({
        textInput : '',
        companyName : '',
        developerName : '',
        developerEmail : '',
        apiInput : '',
        apiName : '',
        apiOneLiner : '',
        additionalInfo : '',
    });
    //Tracking the current api request that is used for execution
    const [CurrentApiRequest, setApiRequest] = useState<ApiRequest> ({
            // Initialize with default values for ApiRequest properties
            httpMethod: HTTP_METHODS[0],
            url: '',
            headers: {},
            data: {},
        }
    );

    //All data needed for docket functionality default values
    const [currDocketObject, setDocketObject] = useState<DocketObject> ({
        currApiForm : formData,
        currApiRequest : CurrentApiRequest,
        codeTranslations : null,
    });

    //Tracking if the form was submitted
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    //Automatically store the changes to the input boxes
    function handleInputChange(e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));  
    };
    
    //Track when user submits 
    function handleSubmit(event : SyntheticEvent<HTMLFormElement | HTMLTextAreaElement>) {
        //Prevent browser from reloading page
        event.preventDefault();

        setIsSubmitted(true);
        setApiRequest({
            url : getUrl(),
            httpMethod : getHttpMethod(),
            headers : getHeaders(),
            data : getData(),
        });
    }

    useEffect(() => {
        setDocketObject({
            currApiForm : formData,
            currApiRequest : CurrentApiRequest,
        } as DocketObject);
    }, [CurrentApiRequest]);

    function getHttpMethod() : HTTP_METHOD {
        const httpMethodRegex : RegExp = /curl -X (\w+)/;
        const match : RegExpMatchArray | null = formData.apiInput.match(httpMethodRegex);
        
        if(match) {
            const methodString = match[1].toUpperCase();
            if(Object.values(HTTP_METHODS).includes(methodString as HTTP_METHOD)) {
                return methodString as HTTP_METHOD
            }
        } 
        //Default to GET
        return HTTP_METHODS[0];
    }

    function getUrl() : string {
        const urlPattern : RegExp = /http(s)?:\/\/([^ ]+)/;
        const match: RegExpMatchArray | null = formData.apiInput.match(urlPattern);
        if (match) {
            const url: string = match[0];
            //console.log(url);
            return url;
          } else {
            console.error('URL not found in the curl command.');
            return "error";
          }
    }

    function getHeaders() : Record<string, string> {
        // Use regular expressions to extract header values
        const headerPattern : RegExp = /-H "(.*?)"/g;
        const headerMatches = formData.apiInput.match(headerPattern);
        
        const result : Record<string,string> = {};

        // Iterate through the header matches and extract the Header-Names and Header-Values
        //This is SCUFFED pls fix 
        if (headerMatches) {
            for (const header of headerMatches) {
                const header_parts = header.split(':');
                if (header_parts.length >= 2) {
                    const key = header_parts[0].trim().replace('-H "', '');
                    const value = header_parts[1].trim().slice(0,-1);
                    result[key] = value;
                }
            }
        }
        return result;
    }

    function getData() : Record<string, string> {
        // Use regular expressions to extract data
        const dataPattern : RegExp = /-d '(.+?)'/;
        const dataMatches = formData.apiInput.match(dataPattern);


        const result : Record<string, string> = {};
        if (dataMatches) {
            const jsonDataString = dataMatches[1];
            const jsonDataObject = JSON.parse(jsonDataString);

            //Iterate over the properties of the object
            for (const dataKey in jsonDataObject) {
                if(Object.prototype.hasOwnProperty.call(jsonDataObject, dataKey)) {
                    const dataValue = jsonDataObject[dataKey];
                    result[dataKey] = dataValue;
                }
            }
        }
        return result;
    }

    function generateTitleLabels(input : string) : string {
          // Use a regular expression to split the string by uppercase letters
        const words = input.split(/(?=[A-Z])/);
  
        // Capitalize the first letter of each word and join them with spaces
        const titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        return titleCase + ":";
    }

    const formFields = Object.keys(formData).map((fieldKey : string) => {
        return (
            <>                
                <div key={fieldKey} className = "flex mb-4">
                    <label className="block text-sm font-bold mb-2 w-full mr-5">
                        { generateTitleLabels(fieldKey) }
                    </label>
                    <input
                    type="text"
                    name={fieldKey}
                    placeholder=""
                    onChange={handleInputChange}
                    className="text-black w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
            </>
        );
    });

    
    return (
    <>
        {isSubmitted ? (
            <div className="flex flex-col mx-auto max-w-lg items-center">
                <ApiSandbox docketObject = { currDocketObject } />
                <DocGenerator docketObject = { currDocketObject }/>
            </div>
        ) : (
        <div className="flex flex-wrap max-w-lg mx-auto mt-20">
            <form id="user-form" method="post" onSubmit={handleSubmit} className = ""> { formFields } </form>
            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer mx-auto mt-10"
            form="user-form"
            >
            Create Sandbox
            </button>
        </div>
        )}
    </>
    );
}