import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken } from "../authorization/getToken";
import { useEffect } from "react";
import { profileSlice } from "../redux/slices/profile";
import { serviceSlice } from "../redux/slices/service";
import { balanceSlice } from "../redux/slices/balance";
import { bannerSlice } from "../redux/slices/banner";

const DataRedux = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userToken = getToken()
    const { isLoggedIn } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(profileSlice(userToken))
            dispatch(serviceSlice(userToken))
            dispatch(balanceSlice(userToken))
            dispatch(bannerSlice(userToken))
        } else {
            navigate('/login')
        }
    }, []);
}

export default DataRedux