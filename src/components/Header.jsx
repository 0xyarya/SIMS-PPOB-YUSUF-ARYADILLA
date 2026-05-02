import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";

import profile_user from "../assets/img/default_user.png"
import bg_saldo from "../assets/img/bg_saldo.png"
import { getToken } from "../authorization/getToken";
import DataRedux from "../utils/data";
import isLogin from "../authorization/cek-login";

const Headers = () => {
    isLogin()
    
    DataRedux()
    const section_saldo = {
        backgroundImage: `url(${bg_saldo})`,
    }
    
    const userToken = getToken()

    const [isOpenEye, setIsOpenEye] = useState(false)
    
    function openEye(toogleEye) {
        setIsOpenEye(!toogleEye)
    }

    const profile = useSelector((state) => state.profile.profile);
    const balance = useSelector((state) => state.balance.balance);
    
    return (
        <>
            {userToken &&
            <div className="flex h-36 bg-transparent justify-center">
                <div className="grid grid-cols-2 gap-4 h-40 w-full lg:w-10/12 md:w-10/12 sm:w-10/12 mt-8">
                    <div className="bg-white">
                        <div>
                            <img src={profile.profile_image != 'https://minio.nutech-integrasi.app/take-home-test/null' ? profile.profile_image : profile_user} alt="profile" className="h-14" />
                        </div>
                        <div className="h-auto mt-3 text-xl">Selamat datang,</div>
                        <div className="h-auto mt-5 font-bold text-2xl">{profile.first_name+' '+profile.last_name}</div>
                    </div>
                    <div className="bg-center rounded-lg" style={section_saldo}>
                        <div className="mx-7 mt-5 font-sans font-semibold text-gray-100">Saldo Anda</div>
                        <div className="mx-7 my-0 font-sans font-bold text-gray-100 text-4xl">Rp 
                        {isOpenEye ?
                            <span className="text-4xl font-bold ms-3">{balance.toLocaleString('en-US')}</span>
                        :
                            <span className="text-5xl font-bold ms-3">••••••</span>
                        }
                        </div>
                        <div className="mx-7 my-3 font-sans w-auto text-gray-100 text-sm drop-shadow-md">
                            <span className="cursor-pointer" onClick={() => openEye(isOpenEye)}>
                                Lihat Saldo
                                {
                                    !isOpenEye ? 
                                    <AiOutlineEyeInvisible className="inline-block ms-2 pb-1 h-5 w-5" />
                                    :
                                    <AiOutlineEye className="inline-block ms-2 pb-1 h-5 w-5" />
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Headers