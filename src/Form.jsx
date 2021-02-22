import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import { useImmer } from 'use-immer';

const Form = (props) => {
    const [value, setValue] = useState('');

    return (
        <form>
            <h1>Send your email</h1>
            <div className="mb-1 input-wrapper">
                <label htmlFor="from" className="mr-1">From: </label>
                <input type="text" id="from" />
            </div>
            <div className="mb-1 input-wrapper">
                <label htmlFor="to" className="mr-1">To: </label>
                <input type="text" id="to" />
            </div>
            <div className="mb-1 input-wrapper">
                <label htmlFor="subject" className="mr-1">Subject: </label>
                <input type="text" id="subject" />
            </div>
            <ReactQuill theme="snow" value={value} onChange={setValue} className="mb-1" />
            <input type="submit" className="submit-btn" value="Submit" />
        </form>
    );
};

export default Form;