import { DocketObject } from '@/models/DocketObject.model';
import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import { useDocketObject } from '@/docs/DocketDataProvider';
import React, { useState } from 'react';
import Link from 'next/link';


export default function DynamicNavbar() {
  const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
  const { docketObject , handleUpdateNewDocketObject } = useDocketObject();
  
  function handleEndpointSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    const endpoint = event.target.value;
    handleUpdateUserDocsData(endpoint, userDocsData.currSubmitStatus, userDocsData.currDocketObjects);
    const selectedDocket = userDocsData.currDocketObjects.find(docket => docket.currApiRequest.httpMethod + " " + docket.currApiRequest.url === endpoint);
    if (selectedDocket) {
      handleUpdateNewDocketObject(selectedDocket);
    }
    console.log(selectedDocket);
  }
  
  const endpointOptions = userDocsData.currDocketObjects.map((currDocketObject) => (
    <option value={currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url} className="py-2">
      {currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url}
    </option>
  ));

  const endpointSelector = (
    <div>
        <h1 className="text-2xl font-bold mb-4">API</h1>
        <div className='mt-4'>
            <label className="block text-sm font-medium">Select Endpoint:</label>
            <select
                value={userDocsData.currEndpoint}
                onChange={handleEndpointSelection}
                className="border p-2 rounded-md bg-white text-black shadow-md focus:outline-none w-80"
            >
            {endpointOptions}
            </select>
        </div>
    </div>
  );

  return (
    <>
    {endpointSelector}
    </>
  );
}