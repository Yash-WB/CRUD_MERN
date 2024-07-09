import React, {useState, useEffect} from "react";
import Form from "./form";
import FormList from "./formList";
import formService from "../services/formService";


function Home() {
  const [currentForm, setCurrentForm] = useState(null);
  const [forms, setForms] = useState([]);

  const fetchForms = async() =>{
      const result = await formService.getForms();
      setForms(result);
  };

  useEffect(()=>{
      fetchForms();
  }, []);

  return (
    <div>
      <Form fetchForms={fetchForms} currentForm={currentForm} setCurrentForm={setCurrentForm} />
      <FormList forms={forms} setForms={setForms} setCurrentForm={setCurrentForm}/>
    </div>
  );
}

export default Home;