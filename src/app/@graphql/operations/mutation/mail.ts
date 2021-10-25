import gql from 'graphql-tag';

export const SEND_EMAIL = gql `
    mutation enviarCorreo($mail: MailInput!){
        sendEmail(mail: $mail){
            status
            message
            mail{
                to
                subject
                html
            }
        }
    }
`;
