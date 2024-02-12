import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Logout = (props: Props) => {
    const navigate = useNavigate()
    useEffect(() => {
      console.log("Navigated to Logout Page");
      // localStorage.clear();
      //   navigate('/')
    }, [])

  return (
    <div>Logout</div>
  )
}

export default Logout