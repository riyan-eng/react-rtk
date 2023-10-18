import { TemplateHandler } from 'easy-template-x';

// 1. read template file

// (in this example we're loading the template by performing  
//  an AJAX call using the fetch API, another common way to  
//  get your hand on a Blob is to use an HTML File Input)

async function getTemplate() {
    const response = await fetch('/src/template/sklil.docx');
    const templateFile = await response.blob();
    return templateFile
}

function saveFile(filename, blob) {
    const blobUrl = URL.createObjectURL(blob);

    // create temp link element
    let link = document.createElement("a");
    link.download = filename;
    link.href = blobUrl;

    // use the link to invoke a download
    document.body.appendChild(link);
    link.click();

    // remove the link
    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
        link = null;
    }, 0);
}

export {getTemplate, saveFile}