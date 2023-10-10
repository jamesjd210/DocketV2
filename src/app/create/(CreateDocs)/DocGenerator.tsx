import  DownloadDoc  from '@/create/(CreateDocs)/DownloadDoc'
import { useDocketObject } from '@/create/DocketDataProvider';

export default function DocGenerator() {
    const { docketObject , handleUpdateDocketObject } = useDocketObject();
    const currentApiForm = docketObject.currApiForm;
    const currentApiRequest = docketObject.currApiRequest;
    
    function generateGeneralInfo() : string {
        const generalInfo = 
`# ${currentApiForm.apiName} Documentation and Sandbox
Method: ${currentApiRequest.httpMethod}
Automated with **Ducks**
# Introduction
Welcome to the ${currentApiForm.apiName} documentation made by ${currentApiForm.companyName}. This API i sdesigned to provide ${currentApiForm.apiOneLiner}. This documentation will guide you through the usage
of the Api, including a functional sandbox, header descriptions, curl commands and other code translations.\n
**Developer  Name:** ${currentApiForm.developerName}\n
**Developer Email:** ${currentApiForm.developerEmail}\n
**API Name:** ${currentApiForm.apiName}\n
**API Use Case:** ${currentApiForm.apiOneLiner}\n
**Additional Relevant Info:** ${currentApiForm.developerEmail}\n
        `
        return generalInfo
    }

    function generateHeadersSpec() {
        var specBuilder = ``;
        Object.keys(currentApiRequest.headers).forEach(key  => {
            specBuilder += `>\`\`\`${key}\`\`\`: `;
            specBuilder += `Input Example : ${currentApiRequest.headers[key]} \n\n`;
        });
        var headerSpec = 
`
## Attributes:

`
        headerSpec += specBuilder;
        return headerSpec;
    }

    function generateDataBox() {

    }

    function generateCode() {
        var codeStringBuilder = 
`
## Calling the API:
\`\`\`>${currentApiForm.apiCurl}\`\`\`\n\n
<details><summary>Python</summary><br><pre><code>{python_script}</code></pre></details>
<details><summary>TypeScript</summary><br><pre><code>{type_script}</code></pre></details>
<details><summary>C#</summary><br><pre><code>{cSharp_script}</code></pre></details>\n
## Output:
\`\`\`TODO\`\`\`
`
        return codeStringBuilder;
    }

    return (
        <>
        <DownloadDoc documentContent = {generateGeneralInfo() + generateHeadersSpec() + generateCode()}/>
        </>
    );
};