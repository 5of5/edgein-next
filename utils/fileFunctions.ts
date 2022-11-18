var axios = require('axios');

export const uploadFile = async (files: any) => {
    const s3url = await fetch(`/api/uploadS3Image/?file=${files.name}`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fileType: files.type })
    }).then(res => res.json());

    //upload to s3
    var options = {
        headers: {
          'Content-Type': files.type,
          'Access-Control-Allow-Origin': "*",
        }
    };
    const response = await axios.put(s3url.url, files, options)
    return s3url

}

export const deleteFile = async (file: any) => {
    const response = await fetch(`/api/deleteS3Image/?file=${file.filename}`, {
        method: "GET"
    }).then(res => res.json());
}