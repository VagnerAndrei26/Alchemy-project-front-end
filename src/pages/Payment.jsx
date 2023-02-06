import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton , FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from "../context";

const Payment = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setPayCheck } = useStateContext();
  const [form , setForm] = useState({
    payment: "",
    id: ""
  });

  const handleFormFieldChange = (fieldName,e) => {
    setForm({...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true) 
    await setPayCheck({...form})
    setIsLoading(false);
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Set payment</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Value in dolars" placeholder="dolars" inputType="number" value={form.payment} handleChange={(e) => handleFormFieldChange("payment", e)} />
          <FormField labelName="ID of the job" placeholder="ID" inputType="number" value={form.id} handleChange={(e) => handleFormFieldChange("id", e)} />
        </div>
        <div className="flex justify-center items-center mt-[40px]">
            <CustomButton btnType="submit" title="Set payment" styles="bg-[#1dc071]" />
          </div>
      </form>  
    </div>
  )
}

export default Payment