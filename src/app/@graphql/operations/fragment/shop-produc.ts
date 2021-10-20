import gql from 'graphql-tag';

export const SHOP_PRODUCT_FRAGMENT = gql`
    fragment ShopProductObject on shopProduct {
        id
        price
        stock
        product {
            name
            img
            rating {
                value
                count
            }
        }
        category @include(if: $showCategory){
            id
            name
            slug
        }
    }
`;
