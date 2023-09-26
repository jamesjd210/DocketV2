'use client'
import React, { useState, SyntheticEvent } from 'react';
import { ApiForm } from '@/models/ApiForm.model'
import { ApiRequest } from '@/models/ApiRequest.model';
import { HttpMethod } from '@/models/HttpMethod.model'

export default function Page() {
    //Tracking the state of the form data from user
    const [formData, setFormData] = useState<ApiForm>({
        textInput: '',
        apiInput: '',
    });
    //Tracking if the form was submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [ApiRequest, setApiRequest] = useState<ApiRequest> ({
        apiForm : formData,
        httpMethod : HttpMethod.GET,
        url : "",
        headers : {"" : ""},
        body : {"" : ""},
    });
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

        //Read form data
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        console.log(ApiRequest)
        setIsSubmitted(true);

    }

    function getHttpMethod() : HttpMethod {
        const httpMethodRegex : RegExp = /curl -X (\w+)/;
        const match : RegExpMatchArray | null = formData.apiInput.match(httpMethodRegex);
        
        if(match) {
            const methodString = match[1].toUpperCase();
            if(Object.values(HttpMethod).includes(methodString as HttpMethod)) {
                return methodString as HttpMethod
            }
        } 
        return HttpMethod.GET;
    }

    function getUrl() : string {
        const url_pattern : RegExp = /http(s)?:\/\/([^ ]+)/;
        const match: RegExpMatchArray | null = formData.apiInput.match(url_pattern);
        if (match) {
            const url: string = match[0];
            console.log(url);
            return url;
          } else {
            console.error('URL not found in the curl command.');
            return "error";
          }
    }
    
    return (
    <main className="flex min-h-screen text-white flex-col items-center justify-center">
        {isSubmitted ? (
            <div>
                Time to test!
            </div>
        ) : (
        <form method="post" onSubmit={handleSubmit} className = "text-center">
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
                Input your Text:
            </label>
            <input
                name="textInput"
                className="border rounded-lg px-3 py-2 w-64"
                style={{ color: 'black' }}
                value={formData.textInput}
                onChange={handleInputChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
                Input your API Calls:
            </label>
            <textarea
                name="apiInput"
                className="border rounded-lg px-3 py-2 w-64 h-20 align-top"
                style={{ color: 'black' }}
                value={formData.apiInput}
                onChange={handleInputChange}
            ></textarea>
            </div>

            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer"
            >
            Create Sandbox
            </button>
        </form>
        )}
    </main>
    );
}