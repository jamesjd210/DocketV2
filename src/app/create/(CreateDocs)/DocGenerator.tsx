import { useDocketObject } from '@/create/DocketDataProvider';
import DownloadDoc from '@/create/(CreateDocs)/DownloadDoc';
import ConvertEnv from '@/create/(CreateDocs)/Convert';

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
Welcome to the ${currentApiForm.apiName} documentation made by ${currentApiForm.companyName}. This API is designed to provide ${currentApiForm.apiOneLiner}. This documentation will guide you through the usage
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
        //console.log(docketObject) 
        const pythonString = docketObject.codeTranslations.Python;
        const javascriptString = docketObject.codeTranslations.Javascript;
        const javaString = docketObject.codeTranslations.Java;
        const codeStringBuilder = 
`
## Calling the API:
\`\`\`>${currentApiForm.apiCurl}\`\`\`\n\n
<details><summary>Python</summary><br><pre><code>${pythonString}</code></pre></details>\n
<details><summary>Java</summary><br><pre><code>${javaString}</code></pre></details>\n
<details><summary>Javascript</summary><br><pre><code>${javascriptString}</code></pre></details>\n
## Output:
\`\`\`
${JSON.stringify(docketObject.response, null, 4)}
\`\`\`
`
        return codeStringBuilder;
    }

    const allCode = generateGeneralInfo() + generateHeadersSpec() + generateCode();

    return (
        <div>
            <DownloadDoc documentContent={allCode}/>
            <ConvertEnv/>
        </div>
    );


};