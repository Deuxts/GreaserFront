import gql from 'graphql-tag';
import { SHOP_PRODUCT_FRAGMENT } from '@graphql/operations/fragment/shop-produc';

export const HOME_PAGE = gql`
    query HomePageInfo(
        $showCategory: Boolean = false
        $showRelational: Boolean = false
    ) {
        vestidos: shopProductsCategory(
            itemsPage: 4
            category: ["4"]
            random: true
        ) {
            shopProducts {
                ...ShopProductObject
            }
        }
        conjuntos: shopProductsCategory(
            itemsPage: 4
            category: ["18"]
            random: true
        ) {
            shopProducts {
                ...ShopProductObject
            }
        }
        topPrice35: shopProductsOffersLast(
            itemsPage: 4
            topPrice: 35
            random: true
        ) {
            shopProducts {
                ...ShopProductObject
            }
        }
    }
    ${SHOP_PRODUCT_FRAGMENT}
`;
