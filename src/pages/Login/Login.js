import React, { useEffect, useState } from 'react'
import AuthComponent from '../../components/Auth/AuthComponent'
import './Login.css'

import Loading from '../../components/All/Loading/Loading'

const Login = () => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <>
     { !loading &&
      <div id="login" >
          <AuthComponent type={"login"} />
      </div>
     }
     {loading && <Loading />}

    </>
  )
}

export default Login