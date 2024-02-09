import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Logout = (props: Props) => {
    const navigate = useNavigate()
    useEffect(() => {
      localStorage.clear();
        navigate('/')
    }, [])

  return (
    <div>Logout</div>
  )
}

export default Logout