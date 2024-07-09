import React, { useEffect, useState } from "react";
import formService from '../services/formService';
import { useNavigate } from "react-router-dom";

function Form({ fetchForms, currentForm, setCurrentForm }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        gender: '',
        qualification: '',
        hobbies: []
    });

    useEffect(() => {
        if (currentForm) {
            setFormData({
                firstName: currentForm.firstName,
                lastName: currentForm.lastName,
                mobileNumber: currentForm.mobileNumber,
                email: currentForm.email,
                gender: currentForm.gender,
                qualification: currentForm.qualification,
                hobbies: currentForm.hobbies
            })
        }
    }, [currentForm]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (checked) {
                setFormData((prevState) => ({
                    ...prevState,
                    hobbies: [...prevState.hobbies, value]
                }));
            } else {
                setFormData((prevState) => ({
                    ...prevState,
                    hobbies: prevState.hobbies.filter((hobby) => hobby !== value)
                }));
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentForm) {
                await formService.updateForm(currentForm._id, formData);
                alert("Details updated successfuly!");
                setCurrentForm(false);
                navigate("/");
                window.location.reload();
            } else {
                await formService.createForm(formData);
                alert("Details submitted successfuly!");
                navigate("/");
                window.location.reload();
            }
            setFormData({
                firstName: '',
                lastName: '',
                mobileNumber: '',
                email: '',
                gender: '',
                qualification: '',
                hobbies: []
            });
            fetchForms();
            console.log("Successful", formData);
        } catch (err) {
            console.log(err);
            alert("Error while submiting or updating details.");
        }
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:4000/api/file/upload', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            alert("File uploaded.");
            fetchForms();
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                <label htmlFor="mobileNumber">Mobile number</label>
                <input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile number" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <div className="gender-group flex-container">
                    <label>Gender</label>
                    <input type="radio" id="male" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /><label htmlFor="male">Male</label>
                    <input type="radio" id="female" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /><label htmlFor="female">Female</label>
                </div>
                <div className="qualification-group">
                    <label htmlFor="qualification">Qualification details</label>
                    <select id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required>
                        <option>Select</option>
                        <option value="BE">BE</option>
                        <option value="MBA">MBA</option>
                        <option value="BA">BA</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="hobbies-group flex-container">
                    <label>Hobbies</label>
                    <input type="checkbox" id="play" name="hobbies" value="Play" checked={formData.hobbies.includes('Play')} onChange={handleChange} /><label htmlFor="play">Play</label>
                    <input type="checkbox" id="sing" name="hobbies" value="Sing" checked={formData.hobbies.includes('Sing')} onChange={handleChange} /><label htmlFor="sing">Sing</label>
                    <input type="checkbox" id="read" name="hobbies" value="Read" checked={formData.hobbies.includes('Read')} onChange={handleChange} /><label htmlFor="read">Read</label>
                    <input type="checkbox" id="walk" name="hobbies" value="Walk" checked={formData.hobbies.includes('Walk')} onChange={handleChange} /><label htmlFor="walk">Walk</label>
                </div>
                <button type="submit">{currentForm ? 'Update' : 'Submit'}</button>
            </form>

            <form className="file-upload-form">
                <label htmlFor="file">Upload a File</label>
                <input type="file" id="file" onChange={handleFileUpload} accept=".txt" />
            </form>
        </div>
    );
}

export default Form;
