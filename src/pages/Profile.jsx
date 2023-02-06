import React, { useState, useEffect } from 'react'
import { useStateContext } from "../context"
import { DisplayJobs } from '../components';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState([])

  const { address, contract, getEmployerJobs } = useStateContext();

  const fetchJobs = async () => {
    setIsLoading(true)
    const data = await getEmployerJobs();
    setJobs(data);
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract) fetchJobs();
  }, [address, contract]);

  return (
    <DisplayJobs title="All Jobs" isLoading={isLoading} jobs={jobs} />
  )
}

export default Profile