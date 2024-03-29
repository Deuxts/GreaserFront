import gql from 'graphql-tag';
import { SHOP_PRODUCT_FRAGMENT } from '@graphql/operations/fragment/shop-produc';
import { RESULT_INFO_FRAGMENT } from '../fragment/result-info';

export const SHOP_LAST_UNITS_OFFERS = gql `
    query productoPorOfertaYStock(
        $page: Int
        $itemsPage: Int
        $active: ActiveFilterEnum
        $random: Boolean
        $topPrice: Float
        $lastUnits: Int
        $showInfo: Boolean = false
        $showCategory: Boolean = false
        $showRelational: Boolean = false
    ) {
        shopProductsOffersLast(
            page: $page
            itemsPage: $itemsPage
            active: $active
            topPrice: $topPrice
            lastUnits: $lastUnits
            random: $random
            ) {
            info @include(if: $showInfo) {
                ...ResultInfoObject
            }
            status
            message
            shopProducts {
                ...ShopProductObject
            }
        }
    }
    ${SHOP_PRODUCT_FRAGMENT}
    ${RESULT_INFO_FRAGMENT}
`;


export const SHOP_PRODUCT_BY_CATEGORY = gql`
    query productoPorPlataforma(
        $page: Int
        $itemsPage: Int
        $active: ActiveFilterEnum
        $random: Boolean
        $category: [ID!]!
        $showInfo: Boolean = false
        $showCategory: Boolean = false
        $showRelational: Boolean = false
    ) {
        shopProductsCategory(
        page: $page
        itemsPage: $itemsPage
        active: $active
        category: $category
        random: $random
        ) {
            info @include(if: $showInfo) {
                ...ResultInfoObject
            }
            status
            message
            shopProducts {
                ...ShopProductObject
            }
        }
    }
    ${SHOP_PRODUCT_FRAGMENT}
    ${RESULT_INFO_FRAGMENT}
`;

export const SHOP_PRODUCTS_DETAILS = gql`
    query detallesProducto (
        $id: Int!
        $showCategory: Boolean = true
        $showRelational: Boolean = true
        ){
        shopProductDetails(id: $id){
            shopProduct{
                ...ShopProductObject
            }
        }
    }
    ${SHOP_PRODUCT_FRAGMENT}
`;

export const SHOP_PRODUCT_RANDOM_ITEMS = gql`
    query itemsAleatorios(
        $showCategory: Boolean = true
        $showRelational: Boolean = false
    ){
        randomItems: shopProductsOffersLast(itemsPage: 4, random: true) {
            shopProducts {
                ...ShopProductObject
            }
        }
    }
    ${SHOP_PRODUCT_FRAGMENT}
`;
