import React from 'react'
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import { ApplyJob } from './';


const DisplayJobs = ({title, isLoading, jobs}) => {
    const navigate = useNavigate();
    const handleNavigate = (job) => {
        navigate(`/job-details/${job.title}`, { state:job })
    }
  return (
    <div>
        <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({jobs.length})</h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
            {isLoading && (
                <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
            )}
            {!isLoading && jobs.length === 0 && (
                <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                    You have not created any jobs yet.
                </p>
            )}
            {!isLoading && jobs.length > 0 && jobs.map((job) => <ApplyJob key={job.id} {...job} handleClick={() => handleNavigate(job)} />)}
        </div>
    </div>
  )
}

export default DisplayJobs