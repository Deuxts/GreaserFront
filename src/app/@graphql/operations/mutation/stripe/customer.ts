import { CHARGE_FRAGMENT_OBJECT } from '@graphql/operations/fragment/stripe/charge';
import gql from 'graphql-tag';

export const CREATE_CUSTOMER_STRIPE = gql `
    mutation crearCliente($name: String!, $email: String!){
        createCustomer(name: $name, email: $email){
            status
            message
            customer{
            id
            name
            email
            description
            }
        }
    }
`;

export const CREATE_PAY_ORDER = gql `
mutation pago($payment: ChargeInput!, $stockChange:[ShopProductStockInput!]!){
    chargeOrder(payment: $payment, stockChange: $stockChange){
            status
            message
            charge{
                ...ChargeObject
            }
        }
    }
    ${CHARGE_FRAGMENT_OBJECT}
`;
