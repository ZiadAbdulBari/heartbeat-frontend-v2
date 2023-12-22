import axios from "axios";
export const registration = async (name:string,email:string,password:string,role:string)=>{
    try{
        const data = {name,email,password,role}
        const response = await axios.post('https://heartbeat-backend-v2.vercel.app/api/user/registration',data);
        return response.data;
    }
    catch(error:any){
        return error.response
    }
}
export const login = async (email:string,password:string)=>{
    try{
        const data = {email,password}
        const response = await axios.post('https://heartbeat-backend-v2.vercel.app/api/user/login',data);
        return response.data;
    }
    catch(error:any){
        return error
    }
}
export const getProfileData = async (token:string)=>{
    try{
        const response = await axios.get('https://heartbeat-backend-v2.vercel.app/api/user/profile/profile-data',{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.data
    }
}
export const editProfileData = async (data:any,token:string)=>{
    try{
        const response = await axios.post('https://heartbeat-backend-v2.vercel.app/api/user/profile/edit-profile',data,{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.data
    }
}
export const getHomePageDoctor = async ()=>{
    try{
        const response = await axios.get('https://heartbeat-backend-v2.vercel.app/api/user/profile/doctor');
        return response.data;
    }
    catch(error:any){
        return error.data
    }
}
export const checkDate = async (id:string,date:string)=>{
    const data ={
        date:date,
        id:id
    }
    try{
        const response = await axios.post(`https://heartbeat-backend-v2.vercel.app/api/doctor/appointment/schedule-check`,data);
        return response.data;
    }
    catch(error:any){
        return error.response.data
    }
}
export const createAppointment = async (data:any,token:string)=>{
    try{
        const response = await axios.post(`https://heartbeat-backend-v2.vercel.app/api/doctor/appointment/make-appointment`,data,{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.response.data
    }
}
export const appointmentList = async (date:string,token:string)=>{
    try{
        const response = await axios.get(`https://heartbeat-backend-v2.vercel.app/api/doctor/appointment/get-appointment-list?date=${date}`,{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.response.data
    }
}
export const patientHistory = async (date:string,token:string)=>{
    try{
        const response = await axios.get(`https://heartbeat-backend-v2.vercel.app/api/doctor/appointment/patient-history?date=${date}`,{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.response.data
    }
}
export const doctorHistory = async (date:string,token:string)=>{
    try{
        const response = await axios.get(`https://heartbeat-backend-v2.vercel.app/api/doctor/appointment/doctor-history?date=${date}`,{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.response.data
    }
}
export const editStateus = async (status:string,id:string, token:string)=>{
    const data = {
        id:id,
        status:status
    }
    try{
        const response = await axios.post(`https://heartbeat-backend-v2.vercel.app/api/doctor/appointment/edit-status`,data,{headers:{Authorization:token}});
        return response.data;
    }
    catch(error:any){
        return error.response.data
    }
}
