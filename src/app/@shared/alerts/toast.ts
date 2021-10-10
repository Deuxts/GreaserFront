import { TYPE_ALERT } from './values.config';
import Swal from 'sweetalert2';


export function basicAlert(icon = TYPE_ALERT.SUCCESS, title: string = '') {
    Swal.fire({
        title,
        icon,
        toast: true,
        timer: 1500,
        showConfirmButton: false,
    });
}
