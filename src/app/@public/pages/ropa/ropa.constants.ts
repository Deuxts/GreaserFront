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
        platformsIds: ['3'],
        topPrice: -1,
        stock: -1
    },
    'category/pantalones': {
        title: 'Pantalones',
        description: ``,
        categoryIds: ['4'],
        topPrice: -1,
        stock: -1
    },
    'category/conjuntos': {
        title: 'Conjuntos',
        description: ``,
        categoryIds: ['5'],
        topPrice: -1,
        stock: 30
    },
    'promotion/ofertas': {
        title: 'En liquidación',
        description: `Aqui encontraras ropa por menos de $99`,
        categoryIds: [],
        topPrice: 45,
        stock: 40
    },
};

export enum TYPE_OPERATION {
    CATEGORY = 'category',
    PROMOTION = 'promotion'
}
