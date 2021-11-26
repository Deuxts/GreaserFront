export const ROPA_PAGES_INFO = {
    'category/vestidos': {
        title: 'Vestidos',
        description: ``,
        categoryIds: ['1'],
        topPrice: -1,
        stock: -1
    },
    'category/camisas': {
        title: 'Camisas',
        description: ``,
        categoryIds: ['2'],
        topPrice: -1,
        stock: -1
    },
    'category/pantalones': {
        title: 'Pantalones',
        description: ``,
        categoryIds: ['3'],
        topPrice: -1,
        stock: -1
    },
    'category/conjuntos': {
        title: 'Conjuntos',
        description: ``,
        categoryIds: ['4'],
        topPrice: -1,
        stock: 30
    },
    'promotion/ofertas': {
        title: '¡¡¡¡¡ OFERTAS !!!!!',
        description: `Productos por menos de $150  MXN!!!!`,
        categoryIds: [],
        topPrice: 150,
        stock: 40
    },
};

export enum TYPE_OPERATION {
    CATEGORY = 'category',
    PROMOTION = 'promotion'
}
