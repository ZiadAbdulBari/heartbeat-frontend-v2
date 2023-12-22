import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
const Alert = () => {
    Swal.fire({
        title: 'Custom animation with Animate.css',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
    return(
        <></>
    );
};

export default Alert;