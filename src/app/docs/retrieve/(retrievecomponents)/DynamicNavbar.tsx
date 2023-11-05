import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import { useDocketObject } from '@/docs/DocketDataProvider';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';


export default function DynamicNavbar() {
  const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
  const { docketObject , handleUpdateNewDocketObject } = useDocketObject();
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  
  useEffect(() => {
    // Set the first endpoint as selected by default when the component mounts
    if (userDocsData.currDocketObjects.length > 0) {
      setSelectedEndpoint(
        userDocsData.currDocketObjects[0].currApiRequest.httpMethod + " " +
          userDocsData.currDocketObjects[0].currApiRequest.url
      );
    }
  }, [userDocsData.currDocketObjects]);

  function handleEndpointSelection(endpoint : string) {
    handleUpdateUserDocsData(endpoint, userDocsData.currSubmitStatus, userDocsData.currDocketObjects);
    const selectedDocket = userDocsData.currDocketObjects.find(docket => docket.currApiRequest.httpMethod + " " + docket.currApiRequest.url === endpoint);
    if (selectedDocket) {
      handleUpdateNewDocketObject(selectedDocket);
      setSelectedEndpoint(endpoint);
    }
    console.log(selectedDocket);
  }

  const endpointButtons = userDocsData.currDocketObjects.map((currDocketObject) => (
    <button
      key = {currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url}
      value = {currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url} 
      className={`py-2 px-4 rounded hover:bg-gray-300 cursor-pointer mt-4 ${
        selectedEndpoint === currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url
          ? "bg-gray-300"
          : ""
      }`}
      onClick={() => handleEndpointSelection(currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url)} >
        {currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url}
    </button>
  ));

  const endpointSelector = (
    <div>
        <h1 className="text-2xl font-bold mb-4">API Endpoints</h1>
        <div className='mt-4'>
            <label className="block text-sm font-medium">Select Endpoint:</label>
            <div className="flex flex-wrap">{endpointButtons}</div>
        </div>
    </div>
  );

  return (
    <>
    {endpointSelector}
    </>
  );
}