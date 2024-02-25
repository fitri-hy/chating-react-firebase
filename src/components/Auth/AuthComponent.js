import React, {useState} from 'react'
import BeautyContent from './BeautyContent/BeautyContent'
import Form from "./FormContent/Form"
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebase";

const AuthComponent = ({type}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [error, setError] = useState("")

    const navigate = useNavigate()
    const { signup, login, resetPassword} = useAuth();

    const [emailAnimation, setEmailAnimation] = useState(false)
    const [passwordAnimation, setPasswordAnimation] = useState(false)

    const changeTargets = {
        firstName: function(e) {
            setFirstName(e.target.value)
        }, 
        lastName: function(e) {
            setLastName(e.target.value)
        },
        email: function(e) {
            setEmail(e.target.value)
        },
        password: function(e) {
            setPassword(e.target.value)
        },
        passwordConfirm: function(e) {
            setPasswordConfirm(e.target.value)
        }
    }
    
    const errorSet = (err) => {
        setError(err)
        setTimeout(() => {
            setError("")
        }, 2000)
    }
    
    const btn_click_login = async(e) => {
        e.preventDefault()
        if(email && password) {
            try {
                errorSet("")
                await login(email, password);
                navigate("/");
            } catch(err) {
                if(err.code === 'auth/wrong-password'){
                    errorSet("Kata sandi salah")
                    setPasswordAnimation(true)
                    setTimeout(() => {
                        setPasswordAnimation(false)
                    }, 1500)
                }
                if(err.code === 'auth/user-not-found'){
                    errorSet("Pengguna tidak ditemukan")
                    setEmailAnimation(true)
                    setTimeout(() => {
                        setEmailAnimation(false)
                    }, 1500)
                }
                if(err.code === "auth/too-many-requests") {
                    errorSet("Terlalu banyak upaya masuk, coba lagi nanti")
                    setEmailAnimation(true)
                    setPasswordAnimation(true)
                    setTimeout(() => {
                        setEmailAnimation(false)
                        setPasswordAnimation(false)
                    }, 1500)
                    setEmail("")
                    setPassword("")
                }
                if(err.code === "auth/invalid-email") {
                    errorSet("Email tidak valid, silakan masukkan email yang valid")
                    setEmailAnimation(true)
                    setTimeout(() => {
                        setEmailAnimation(false)
                    }, 1500)
                }
            }finally {
                
            } 
        } else {
            errorSet("Isi semua kolom di formulir")
        }
    }
    
    let email_exist;
 
     const btn_click_create = async(e) => {
         e.preventDefault()
 
      
        if(!email || !password || !firstName || !lastName) {
            setError("Isi semua kolom di formulir")
        } else if(password !== passwordConfirm) {
            setError("Sandi tidak cocok")
        }else if(password.length < 6) {
            setError("Kata sandi harus terdiri dari minimal 6 karakter")
        }else if(firstName.length < 2 && lastName.length < 2) {
            setError("Nama depan dan nama belakang minimal harus 2 karakter")
        }else {
            try {
              await signup(email, password, firstName, lastName);
              navigate("/")
            }catch(err) {
                if(err.code === "auth/too-many-requests") {
                    errorSet("Terlalu banyak upaya masuk, coba lagi nanti")
                    setEmailAnimation(true)
                    setPasswordAnimation(true)
                    setTimeout(() => {
                        setEmailAnimation(false)
                        setPasswordAnimation(false)
                    }, 1500)
                    setEmail("")
                    setPassword("")
                }
                if(err.code === "auth/invalid-email") {
                    errorSet("Email tidak valid, silakan masukkan email yang valid")
                    setEmailAnimation(true)
                    setTimeout(() => {
                        setEmailAnimation(false)
                    }, 1500)
                }
                if(err.code === "auth/email-already-in-use") {
                    errorSet("Email sudah digunakan")
                    setEmailAnimation(true)
                    setTimeout(() => {
                        setEmailAnimation(false)
                    }, 1500)
                }
            }
        }

     }


     const btn_click_forgot = async(e) => {
        e.preventDefault();
   
        try {
            await resetPassword(email)
            setError("Periksa kotak masuk Anda untuk instruksi lebih lanjut")
            setEmail("")
        } catch {
          setError("Gagal menyetel ulang sandi")
        }
    
        setTimeout(() => {
            setError("")
        }, 2000)
     }


    return (
        <div id="auth-component" >
            <BeautyContent />
            {type==="login" && 
            <Form 
              start_name_title ="Masuk ke Akun"
              firstlast={false}
              emailInput={true}
              passwordInput={true}
              email={email}
              emailAnimation={emailAnimation}
              passwordAnimation={passwordAnimation}
              changeTargets={changeTargets}
              password={password}
              password_confirm={false} 
              end_name_btn={"Masuk"}
              end_question={"sign-up"}      
              btn_click={btn_click_login}
              error_form={error}
            />}
            {type==="signup" &&
             <Form 
             start_name_title ="Daftar Akun"
             firstlast={true}
             emailInput={true}
             passwordInput={true}
             password_confirm={true} 
             emailAnimation={emailAnimation}
             passwordAnimation={passwordAnimation}
             end_name_btn={"Buat Akun"}
             end_question={"sign-in"} 
             firstName={firstName}   
             lastName={lastName}
             email={email}
             password={password}
             passwordConfirm={passwordConfirm}
             changeTargets={changeTargets}
             btn_click={btn_click_create}
             error_form={error}
           />
            }

            {type==="forgot" && 
                <Form 
                start_name_title ="Lupa Kata Sandi"
                firstlast={false}
                emailInput={true}
                password={false}
                email={email}
                changeTargets={changeTargets}
                btn_click={btn_click_forgot}
                password_confirm={false} 
                end_name_btn={"Mengirim email"}
                end_question={"sign-in"}      
                error_form={error}
                />
            }

        </div>
    )
}

export default AuthComponent
