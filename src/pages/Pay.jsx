import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton , FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useStateContext } from "../context";

const Pay = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { payTheEmployee, getEth, contract, address } = useStateContext();
  const [form , setForm] = useState({
    id: "",
    pay: ""
  });
  const [eth, setEth] = useState(0)

  const handleFormFieldChange = (fieldName,e) => {
    setForm({...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true) 
    await payTheEmployee({...form})
    setIsLoading(false);
  }

  const handleConvert = async(e) => {
    e.preventDefault();

    setIsLoading(true)
    const data = await getEth({...form})
    setEth(data);
    setIsLoading(false);

  }

  useEffect(() => {
    if(contract) setEth(0);
}, [contract, address])

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Pay the employee with the amount agreed</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField labelName="Value in ether" placeholder="ether" inputType="number" value={form.pay} handleChange={(e) => handleFormFieldChange("pay", e)} />
          <FormField labelName="ID of the job" placeholder="ID" inputType="number" value={form.id} handleChange={(e) => handleFormFieldChange("id", e)} />
        </div>
        <div className="flex justify-center items-center mt-[40px]">
            <CustomButton btnType="submit" title="Pay the employee" styles="bg-[#1dc071]" />
          </div>
      </form>
      <form onSubmit={handleConvert} className="w-full mt-[65px] flex flex-col gap-[30px]">
      <div className="flex flex-wrap gap-[40px]">
        <FormField labelName="ID of the job" placeholder="ID" inputType="number" value={form.id} handleChange={(e) => handleFormFieldChange("id", e)} />
        </div>
        <div className="flex justify-center items-center mt-[40px]">
        <CustomButton btnType="submit" title="Get the amount of eth" styles="bg-[#1dc071]" />
        </div>
        <p className="flex justify-center items-center text-white font-epilogue font-semibold">{`${eth} ETH`}</p>
        </form>  
    </div>
  )
}

export default Pay