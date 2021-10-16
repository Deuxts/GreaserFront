import { REGEX_EMAIL } from '@core/constans/regex';
import Swal from 'sweetalert2';


const swalBasic = (title: string, html: string) =>
Swal.mixin({
    title,
    html,
    focusConfirm: false,
    cancelButtonText: 'Cancelar',
    showCancelButton: true,
    showCloseButton: true,
});


export async function formBasicDialog(title: string, html: string, property: string) {
    return await swalBasic(title, html).fire({
        preConfirm: () => {
            const value = ((document.getElementById('name')) as HTMLInputElement).value;
            if (value) {
                return value;
            }
            Swal.showValidationMessage('Por favor no dejes el campo vacio');
            return;
        }
    });
}
export async function userFormBasicDialog(title: string, html: string) {
    return await swalBasic(title, html).fire({
        preConfirm: () => {
            let error = '';
            const name = (document.getElementById('name') as HTMLInputElement).value;
            if (!name) {
                error += 'Por favor no dejes el campo vacio (Nombre) <br>';
            }
            const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
            if (!lastname) {
                error += 'Por favor no dejes el campo vacio (Apellido)<br>';
            }
            const email = (document.getElementById('email') as HTMLInputElement).value;
            if (!email) {
                error += 'Por favor no dejes el campo vacio (Email) <br>';
            }
            if (!REGEX_EMAIL.test(email)) {
                error += 'Por favor use un email con formato correcto';
            }
            const role = (document.getElementById('role') as HTMLInputElement).value;
            if (error !== '') {
            Swal.showValidationMessage(
                error
            );
            return;
            }
            return {
                name,
                lastname,
                email,
                role,
                birthday: new Date().toISOString()
            };
        },
    });
}

// tslint:disable-next-line: max-line-length
export async function optionsDetails( title: string, html: string, width: number | string, confirmButtonText: string = '', cancelButtonText: string = '') {
    return await Swal.fire({
        title,
        html,
        width: `${width}px`,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#6c757d',
        cancelButtonColor: '#dc3545',
        confirmButtonText,
        cancelButtonText,
    }).then((result) => {
        console.log(result);
        if (result.value) {
        console.log('Editar');
        return true;
        } else if (result.dismiss.toString() === 'cancel') {
        console.log('Bloquear');
        return false;
        }
    });
}
