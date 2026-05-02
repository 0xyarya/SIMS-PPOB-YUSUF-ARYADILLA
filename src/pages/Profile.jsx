import { useDispatch, useSelector } from "react-redux";

import profile_user from "../assets/img/default_user.png"
import { AiOutlineEdit, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import AuthService from "../services/authService";
import { getToken } from "../authorization/getToken";
import { useNavigate } from "react-router-dom";
import { profileSlice } from "../redux/slices/profile";
import Swal from "sweetalert2";
import isLogin from "../authorization/cek-login";

const Profile = () => {
    isLogin()
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userToken = getToken()

    const profile = useSelector((state) => state.profile.profile);

    const [onFocus, setOnFocus] = useState(false)
    function handleFocus(e) {
        setOnFocus(e.target.name)
    }
    
    const [data, setData] = useState({email : profile.email, first_name: profile.first_name, last_name: profile.last_name})
    
    useEffect(() => {
        dispatch(profileSlice(userToken))
        setData(profile)
        setLoading(false)
    }, [])


    function handleInput(e) {
        setData({...data, [e.target.name]: e.target.value} ) 
    }

    const [isEdit, setIsEdit] = useState(false);
    
    function editProfile() {
        setIsEdit(true)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const result =  await AuthService.editProfile(userToken, data)
        
        if(result.status = 'success') {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'success',
                title: "Data berhasil diubah"
            })
            
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }

    const [showFile, setShowFile] = useState();
    function showUpdateFoto(showFile) {
        setShowFile(showFile)
    }
    
    const [file, setFile] = useState(null);

    const onFileChange = (event) => {
        setFile({ file: (event).target.files[0] });
    };

    const onFileUpload = async () => {
 
        const formData = new FormData();
        formData?.append("file",file.file);

        const result = await AuthService.editFotoProfile(userToken, formData)
        if(result.status == 'success') {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            
            Toast.fire({
                icon: 'success',
                title: result.response.message
            })
            setShowFile(false)
        }
    };

    function logoutButton() {
        sessionStorage.removeItem('userToken')
        window.location.reload();
    }


    return (
        <>
        {
            loading ? ("")
            : (
                <>
                    <div className="h-auto bg-transparent">
                        <div className="flex justify-center">
                            <div className="w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-10 flex justify-center ">
                                <div className="grid gap-1 ">
                                    <div className="mt-3">
                                        <img src={profile.profile_image != 'https://minio.nutech-integrasi.app/take-home-test/null' ? profile.profile_image : profile_user} className="block mx-auto h-24" />

                                        <AiOutlineEdit className="icon_edit_user cursor-pointer" onClick={() => showUpdateFoto(!showFile)} /> 
                                    </div>
                                    <h2 className="text-2xl font-bold font-sans my-0">{profile.first_name+ ' '+ profile.last_name}</h2>
                                </div>
                            </div>
                        </div>
                        {showFile && 
                            <div className="flex justify-center">
                                <div className="mt-3">
                                    <input type="file" onChange={(e) => onFileChange(e)} />
                                    <button onClick={() => onFileUpload()} className="bg-red-500 text-white px-3 py-1 rounded-md">
                                        Upload
                                    </button>
                                </div>
                            </div>
                        }
                        <form onSubmit={handleSubmit}>

                            <div className="flex justify-center">
                                <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 mt-5">
                                    <AiOutlineMail className={onFocus == 'email' ? 'icon_input text-black' : 'icon_input text-gray-500 '}/>
                                    <input
                                        value={data?.email}
                                        onChange={(e) => handleInput(e)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        disabled="disabled"
                                        autoComplete="email"
                                        className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 mt-5">
                                    <AiOutlineUser className={onFocus == 'first_name' ? 'icon_input text-black' : 'icon_input text-gray-500 '}/>
                                    <input
                                        value={data?.first_name}
                                        onChange={(e) => handleInput(e)}
                                        onFocus={(e) => handleFocus(e)}
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        disabled={ !isEdit && "disabled"}
                                        autoComplete="off"
                                        className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 mt-5">
                                    <AiOutlineUser className={onFocus == 'last_name' ? 'icon_input text-black' : 'icon_input text-gray-500 '}/>
                                    <input
                                        value={data?.last_name}
                                        onChange={(e) => handleInput(e)}
                                        onFocus={(e) => handleFocus(e)}
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        disabled={ !isEdit && "disabled"}
                                        autoComplete="off"
                                        className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                                    />
                                </div>
                            </div>
                            
                            {
                                isEdit ? 
                                <div className="flex justify-center">
                                    <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 mt-5">
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Simpan
                                        </button>
                                    </div>
                                </div>
                                :
                                <>
                                <div className="flex justify-center">
                                    <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 mt-5">
                                        <button
                                            type="button"
                                            className="flex w-full justify-center rounded bg-white px-3 py-2 text-sm font-semibold leading-6 text-red-500 border-2 border-red-500 shadow-sm hover:bg-red-100"
                                            onClick={() => editProfile()}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <div className="w-full lg:w-5/12 md:w-5/12 sm:w-5/12 mt-5">
                                        <button
                                            type="button"
                                            onClick={() => logoutButton()}
                                            className="flex w-full justify-center rounded bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                                </>
                            }
                        </form>
                    </div>
                </>
            )
        }
        </>
    )
}

export default Profile   
