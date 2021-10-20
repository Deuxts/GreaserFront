import gql from 'graphql-tag';

export const SHOP_PRODUCT_FRAGMENT = gql`
    fragment ShopProductObject on shopProduct {
        id
        price
        stock
        size
        product {
            name
            img
        }
        category @include(if: $showCategory){
            id
            name
            slug
        }
        relationalProducts @include(if: $showRelational){
                    id
                    category{
                        name
                    }
                    size
                }
    }
`;
