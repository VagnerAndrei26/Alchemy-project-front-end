import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton , FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from "../context";

const CreateJob = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createJob } = useStateContext();
  const [form , setForm] = useState({
    title: "",
    description: ''
  });

  const handleFormFieldChange = (fieldName,e) => {
    setForm({...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true) 
    await createJob({...form})
    setIsLoading(false);
    navigate("/");
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a New Job</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Your Name *" placeholder="Jhon Doe" inputType="text" value={form.name} handleChange={(e) => handleFormFieldChange("name", e)} />
          <FormField labelName="Job Title *" placeholder="Job Title" inputType="text" value={form.title} handleChange={(e) => handleFormFieldChange("title", e)} />
        </div>
        <FormField labelName="Job Description *" placeholder="Write job requirements" isTextArea value={form.description} handleChange={(e) => handleFormFieldChange("description", e)} />
        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">Get the best employees for your job</h4>
        </div>
        <div className="flex justify-center items-center mt-[40px]">
            <CustomButton btnType="submit" title="Submit new job" styles="bg-[#1dc071]" />
          </div>
      </form>  
    </div>
  )
}

export default CreateJob