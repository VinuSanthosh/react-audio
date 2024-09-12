import React, { useEffect, useState } from 'react'
import { s3Client } from '../config/s3Config'
import { Table } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md"
import ReactAudio from './ReactAudio';

function Home() {
    const [audio, SetAudioFile] = useState(null);
    const [fileList, setFileList] = useState(null);

    useEffect(() => {
        try {
            s3Client.listFiles().then(response =>
                setFileList(response?.data?.Contents ?? [])
            )
        } catch (e) {
            console.log(`Error listing files : ${e}`);
        }
    }, [])

    const handleFile = (e) => {
        e.preventDefault();
        SetAudioFile(e.target.files[0])
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if(audio == null) {
            window.alert("Please choose a file to upload");
            return false;
        }
        s3Client.uploadFile(audio)
            .then(data => 
                s3Client.listFiles().then(response =>
                    setFileList(response?.data?.Contents ?? [])
                )
            )
            .catch(err => console.log(err))
            .finally(
                window.alert("Uploaded successfully in s3"),
                SetAudioFile()
            )
    }

    const deleteHandler = async(fileName) => {
        try {
            if (window.confirm("Are you sure you want to delete?") === false) return;

            await s3Client.deleteFile(fileName);
            
            const updatedList = fileList.filter(file => file.Key !== fileName);
            setFileList(updatedList);

        } catch (exception) {
            console.log(exception);
        }
    }

    return (
        <>
            <div className='col-md-4 text-center my-3 margin' style={{float: 'right'}}>
                <a href="/logout">Logout</a>
            </div>
            <div className='col-md-4 text-center my-3 margin'>
            <ReactAudio />
                <h3>Choose a file to Upload in S3</h3>
                <form className='my-3' id='login-form' onSubmit={handleUpload}>
                    <div className='input-group col-md-4 my-4'>
                        <div className="input-group flex-nowrap">
                            <input type="file" accept="audio/mp3" className="form-control" onChange={handleFile} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <button type="submit" className="btn btn-primary my-3">Upload</button>
                    </div>
                </form>
            </div>

            <div className='col-md-4 text-center my-3 margin'>
                <h3>Files</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileList && fileList.map((file, index) => (
                            <tr key={file.Key}>
                                <td>{(index+1)}</td>
                                <td>{file.Key}</td>
                                <td><MdDeleteForever onClick={(e) => deleteHandler(file.Key)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Home
