import React, { useState, useEffect } from "react";
import formService from "../services/formService";

function FormList({ setCurrentForm }) {
    const [forms, setForms] = useState([]);

    const fetchForms = async () => {
        try {
            const result = await formService.getForms();
            setForms(result);
        } catch (error) {
            console.error("Error fetching forms:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await formService.deleteForm(id);
            setForms(forms.filter(form => form._id !== id));
            alert("Details Deleted successfuly!");
        } catch (error) {
            console.error("Error deleting form:", error);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    return (
        <div className="form-list-container">
            <h1>Submitted Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Qualification</th>
                        <th>Hobbies</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map(form => (
                        <tr key={form._id}>
                            <td>{form.firstName}</td>
                            <td>{form.lastName}</td>
                            <td>{form.mobileNumber}</td>
                            <td>{form.email}</td>
                            <td>{form.gender}</td>
                            <td>{form.qualification}</td>
                            <td>{form.hobbies.join(", ")}</td>
                            <td className="actions">
                                <button className="edit-btn edit" onClick={() => setCurrentForm(form)}>Edit</button>
                                <button className="edit-btn delete" onClick={() => handleDelete(form._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FormList;
