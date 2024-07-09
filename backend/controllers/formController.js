
const form = require("../model/form");
const Form = require("../model/form");

exports.createForm = async (req, res)=>{
    try{
        const form = new Form(req.body);
        await form.save();
        res.status(200).json(form);
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

exports.updateForm = async (req, res)=>{
    try{
        const form = await Form.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json(form);
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

exports.getForms = async (req, res)=>{
    try{
        const forms = await Form.find();
        res.status(200).json(forms);
    }catch(err){
        res.status(400).json({error: err.message});
    }
};

exports.deleteForm = async (req, res)=>{
    try{
        const form = await Form.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Deleted."});
    }catch(err){
        res.status(400).json({error: err.message});
    }
};