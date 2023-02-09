import React, { useState, useEffect} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { ethers } from "ethers"

import { useStateContext } from "../context"
import { CustomButton, Loader, CountBox } from "../components"
import { thirdweb } from "../assets"
import { Web3Button } from "@thirdweb-dev/react";


const JobDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { apply, contract, address ,getApplicant, approveApplicant, declineApplicant } = useStateContext();

  const [isLoading, setIsLoading] = useState(false)
  const [applicant, setApplicant] = useState('')

  const fetchApplicant = async () => {
    const data = await getApplicant(state.pId);
    setApplicant(data);
  }

  useEffect(() => {
      if(contract) fetchApplicant();
  }, [contract, address])

  const handleJob = async () => {
    setIsLoading(true);
    await apply(state.pId);
    navigate("/")
    isLoading(false);
  }

  const handleApprove = async () => {
    setIsLoading(true);
    await approveApplicant(state.pId);
    navigate("/")
    setIsLoading(false);
  }

  const handleDecline = async () => {
    setIsLoading(true);
    await declineApplicant(state.pId);
    setIsLoading(false);
  }
  
  return (
    <div>
      {isLoading && <Loader />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
          </div>
        </div>
      </div>
      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Employer</h4>
            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain" />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{state.employer}</h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">Apply for the job of this employer</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Details</h4>
            <div className="mt-[20px]"> 
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
            </div>            
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Applicant</h4>
              <div className="mt-[20px] flex flex-col gap-4">
                {applicant !== "0x0000000000000000000000000000000000000000" ? (
                  <div className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{applicant}</p>
                  </div>
                ) : (<p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No applicant yet</p>)} 
              </div>            
          </div>
        </div>

        {address === state.employer ? (
          <div className="flex-1 mt-[30px]">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Applicant</h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Accept or decline applicant
            </p>
            <div className="mt-[10px]">
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">Apply to the job if it suits you</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] text-center">If you think you meet the requierments for the job, apply to it now !!!</p>
              </div>

              <CustomButton btnType="button" title="Accept applicant" styles="w-50% bg-[#8c6dfd] mr-[10px]" handleClick={handleApprove} />
              <CustomButton btnType="button" title="Decline applicant" styles="w-50% bg-[#8c6dfd] ml-[10px]" handleClick={handleDecline} />
            </div>
          </div>
        </div>
        ) : (
        <div className="flex-1 mt-[30px]">
          <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Apply</h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Apply to the job
            </p>
            <div className="mt-[30px]">
              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white text-center">Apply to the job if it suits you</h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191] text-center">If you think you meet the requierments for the job, apply to it now !!!</p>
              </div>

              <CustomButton btnType="button" title="Apply job" styles="w-full bg-[#8c6dfd]" handleClick={handleJob} />
            </div>
          </div>
        </div>
        )}
      </div>
      <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Employee</h4>
              <div className="mt-[20px] flex flex-col gap-4">
                {state.employee !== "0x0000000000000000000000000000000000000000" ? (
                  <div className="flex justify-between items-center gap-4">
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">{state.employee}</p>
                  </div>
                ) : (<p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No employee yet accepted for the job</p>)} 
              </div>            
          </div>
         <div className="flex text-[18px] mt-[10px]">
          {address === state.employer && state.employee !== "0x0000000000000000000000000000000000000000" ? (
             <Web3Button
             contractAddress="0xE0e330dB6D87ff97eF28d36cc9624E0158EE7D7E"
             action={async (contract) => {
               contract.call("dismissEmployee", state.pId)
             }}
             accentColor="#8c6dfd"
             onSubmit={() => <Loader />}
           >
             Dismiss the employee
           </Web3Button>
          ) : (<p></p>)}  
    </div>
    {state.employee !== "0x0000000000000000000000000000000000000000" && address === state.employee ? (
    <div>
       <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase mt-[20px]">Accept the monthly pay</h4>
       <div className="mt-[20px] flex flex-col gap-4">
           <div className="flex justify-between gap-4">
             <Web3Button
                 contractAddress="0xE0e330dB6D87ff97eF28d36cc9624E0158EE7D7E"
                 action={(contract) => {
                   contract.call("acceptChangeOfPayCheck", state.pId)
                 }}
                 accentColor="#8c6dfd"
               >
                 Accept Pay Check
             </Web3Button>
           </div>
           </div>
           <div className="flex md:w-[150px] w-full gap-[30px] mt-[20px]">
           <CountBox title="Pay check in dolars" value={`${state.payment}`} />
           </div>
      </div>
            ) : (<p></p>)}            
    </div>
  )
}

export default JobDetails