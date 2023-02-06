import React, { useState, useEffect } from 'react'
import { useStateContext } from "../context"
import { DisplayJobs } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState([])

  const { address, contract, getJobs } = useStateContext();

  const fetchJobs = async () => {
    setIsLoading(true)
    const data = await getJobs();
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

export default Home