import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";


const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x23a1335C66b1a9bD6D1742ac51BF53537B99c0A7")

    const { mutateAsync: createJob } = useContractWrite(contract, "createJob");
    
    const address = useAddress();
    const connect = useMetamask();

    const publishJob = async(form) => {

        try{ 
            const data = await createJob([
                form.title,
                form.description
            ])
            console.log("contract call succesfull", data)
        } catch(error) {
            error("contract call failure", error)
        }
    }

    const getJobs = async () => {
        const jobs = await contract.call('getJobs');
        const parsedJobs = jobs.map((job, i) => ({
            employer: job.employer,
            title:job.jobTitle,
            description:job.jobDescription,
            employee:job.employee,
            payment:job.payCheckInUsd.toNumber(),
            pId: i
        }));
        return parsedJobs;
    }

    const getEmployerJobs = async () => {
        const allJobs= await getJobs();

        const filteredJobs = allJobs.filter((job) => job.employer === address); 
        return filteredJobs;
    }

    const apply = async (pId) => {
        try {
            const data = await contract.call("applyJob" ,pId);
            return data;
            console.info("contract call successs", applicant);
        } catch(err) {
            alert("contract call failure", err);
        }
    }

    const getApplicant = async(pId) => {
        try{
            const applicant = await contract.call("getApplicant" , pId)
            return applicant;
            console.info("contract call successs", applicant);
        } catch(err){
            alert("contract call failure", err);
        }
    }

    const approveApplicant = async (pId) => {
        try {
            const candidate = getApplicant(pId);
            const data = await contract.call("approveJob", candidate, pId);
            console.log(candidate)
            return data;
            console.info("contract call successs", data);
        } catch(err){
            alert("contract call failure", err);
        }
      }

    const declineApplicant = async (pId) => {
        try{
            const candidate = getApplicant(pId);
            const data = await contract.call("declineJob", candidate, pId);
            console.log(candidate)
            return data;
            console.info("contract call successs", data);
        } catch(err) {
            alert("contract call failure", err);
        }
      }
      const { mutateAsync: setPayCheck } = useContractWrite(contract, "setPayCheck")

            const setPay = async (form) => {
            try {
            const data = await setPayCheck([ form.payment, form.id ]);
            console.info("contract call successs", data);
            } catch (err) {
            alert("contract call failure", err);
            }
        }
       
        const payTheEmployee = async (form) => {
            console.log(ethers.utils.parseEther(form.pay))
            try {
            const data = await contract.call("payEmployee", form.id, {value: ethers.utils.parseEther(form.pay)});
            console.info("contract call successs", data);
          } catch (err) {
            alert("contract call failure", err);
          }
        }
        
        const getEth = async(form) => {
          const data = await contract.call("convertEthInUsd", form.id)
          const realdata = ethers.utils.formatEther(data.toString());
          return realdata;
        }


    return (
        <StateContext.Provider value={{ address, contract, createJob: publishJob, connect, getJobs, getEmployerJobs, apply, getApplicant, approveApplicant, declineApplicant, setPayCheck: setPay, payTheEmployee, getEth }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
