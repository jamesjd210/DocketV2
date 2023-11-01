
import { useDocketObject } from '@/docs/DocketDataProvider';
import React, { useState } from 'react';
import { CodeLanguages } from '@/models/CodeLanguages.model';

export default function CodeProvider() {
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const { docketObject } = useDocketObject();
    const currRequest = docketObject.currApiRequest;
    function handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const language = event.target.value;
        setSelectedLanguage(language);
    }

    function getJavascript(): string {
        var inputHeaders = "";

        for (var i in currRequest.headers) {
            inputHeaders += `'${i}' : '${currRequest.headers[i]}',\n\t\t\t\t`;
        }
        const javascriptCode = `
  import fetch from 'node-fetch';

    const url = '${currRequest.url}';
    
    const headers = ${inputHeaders};
    
    fetch(url, {
        method: '${currRequest.httpMethod},
        headers,
    })
        .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.text();
        })
        .then((data) => {
            console.log(data); // This will log the response data to the console
        })
        .catch((error) => {
            console.error('Fetch error:', error);
        });
                
`;

    return javascriptCode;
}

    function getPython(): string {
        var inputHeaders = "";
        for (var i in currRequest.headers) {
            inputHeaders += `"${i}" : "${currRequest.headers[i]}",\n\t\t\t\t`;
        }

        const pythonCode = `
import requests 

def make_http_request():
    url = "${currRequest.url}"
    headers = {
        ${inputHeaders}}   
    response = requests.get(url, headers=headers)
    
    response_content = response.text
    status_code = response.status_code
    
    print("Response Content:")
    print(response_content)
make_http_request()
\n`;
        return pythonCode;
    }

    function getJava(): string {
        var inputHeaders = "";
        for (var i in currRequest.headers) {
            inputHeaders += `connection.setRequestProperty("${i}" : "${currRequest.headers[i]}");\n\t\t\t\t`;
        }

        const javaCode = `
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpClientExample {
    public static void main(String[] args) {
        try {
            // Define the URL
            URL url = new URL("${currRequest.url}");

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Set the request method to ${currRequest.httpMethod}
            connection.setRequestMethod("${currRequest.httpMethod}");

            // Set custom headers
            ${inputHeaders}

            // Get the response code
            int responseCode = connection.getResponseCode();
            System.out.println("Response Code: " + responseCode);

            // Read the response content
            BufferedReader reader = new BufferedReader
                (new InputStreamReader(connection.getInputStream()));
            String line;
            StringBuffer response = new StringBuffer();
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
            reader.close();

            // Print the response content
            System.out.println("Response Content:");
            System.out.println(response.toString());

            // Close the connection
            connection.disconnect();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
\n`;
        return javaCode;
    }

    const codeSelector = (
        <div>
            <h1 className="text-2xl font-bold mb-4">Code Selector Example</h1>
            <div className='mt-4'>
                <label className="block text-sm font-medium">Select Language:</label>
                <select
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="border p-2 rounded-md bg-white text-black shadow-md focus:outline-none w-36"
                >
                    <option value="javascript" className="py-2">
                        JavaScript
                    </option>
                    <option value="python" className="py-2">
                        Python
                    </option>
                    <option value="java" className="py-2">
                        Java
                    </option>
                </select>
            </div>
        </div>
    );

    let codeExample = null;
    const javaScriptCode = getJavascript();
    const pythonCode = getPython();
    const javaCode = getJava();

    docketObject.codeTranslations[CodeLanguages.JAVASCRIPT] = javaScriptCode;
    docketObject.codeTranslations[CodeLanguages.PYTHON] = pythonCode;
    docketObject.codeTranslations[CodeLanguages.JAVA] = javaCode;

    switch(selectedLanguage) {
        case 'javascript':
            codeExample = <p className = "whitespace-pre">{ javaScriptCode }</p>;
            break;
        case 'python':
            codeExample = <p className = "whitespace-pre">{ pythonCode }</p>;
            break;
        case 'java':
            codeExample = <p className = "whitespace-pre">{ javaCode } </p>;
    }
    return (
        <pre className = "text-black bg-gray-100 p-5 rounded shadow">
            {codeSelector}
            {codeExample === null  ? <>Select an option</> : codeExample}
        </pre>
    );
}
