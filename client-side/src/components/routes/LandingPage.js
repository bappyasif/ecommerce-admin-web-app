import React, { useContext, useEffect, useState } from 'react'
import { FaArrowUp } from "react-icons/fa"
import { AppContext } from '../../App'
import { readTokenProtectedDataFromServer } from '../fetchRequests'

function LandingPage() {
  let [allUsers, setAllUsers] = useState([])

  const appCtx = useContext(AppContext);

  const handleAllUsers = (datasets) => setAllUsers(datasets)

  const getAllRegisteredUsers = () => {
    const url = `${appCtx.baseUrl}/all-customers`
    readTokenProtectedDataFromServer(url, handleAllUsers, appCtx.user.accessToken)
  }

  // proof of concept that Protected Data is only been delivered when there is a Valid Token exists
  useEffect(() => {
    appCtx.user.accessToken && getAllRegisteredUsers()
  }, [appCtx.user.accessToken])

  console.log(allUsers, "ALL USERS!!")

  return (
    <div>LandingPage!! <FaArrowUp /> </div>
  )
}

export default LandingPage