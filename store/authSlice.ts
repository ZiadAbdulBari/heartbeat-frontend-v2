import { createSlice } from '@reduxjs/toolkit'
export const authSlice = createSlice({
    name:'auth',
    initialState:{
        isLoggedin:false,
        token:'',
        role:'',
        user_id:'',
    },
    reducers:{
        getLoggedinStatus:(state)=>{
            const loggedin:string|null = window.localStorage.getItem('isLoggedin');
            if(loggedin == null || loggedin == undefined){
                window.localStorage.setItem('isLoggedin',JSON.stringify(false));
                state.isLoggedin = false;
                state.token='';
                state.role='';
                state.user_id='';
            }
            else{
                const status:boolean = JSON.parse(window.localStorage.getItem('isLoggedin'));
                const token:string = JSON.parse(window.localStorage.getItem('token'));
                const role:string = JSON.parse(window.localStorage.getItem('role'));
                const user_id:string = JSON.parse(window.localStorage.getItem('user_id'));
                state.isLoggedin = status;
                state.token=token;
                state.role=role;
                state.user_id=user_id;

            }
        },
    }
})
export const {getLoggedinStatus} = authSlice.actions;
export default authSlice.reducer;