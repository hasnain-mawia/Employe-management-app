import { toast } from 'react-toastify';

export const handleSuccess = (msg) =>{
    toast.success(msg , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    })
}

export const handleError = (msg) =>{
    toast.error(msg , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    })
}
export const handleWarn = (msg) =>{
    toast.warn(msg , {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    })
}