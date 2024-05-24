const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS__CATEGORY: ':category',
    OUR_SERVICES: 'services',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',
    DETAIL_CART : 'my-cart',
    CHECKOUT: 'checkout',
    PRODUCTS: 'products',

    // Admin
    ADMIN: 'admin',
    DASHBOARD: 'thong-ke',
    MANAGE_USER: 'manage-user',
    MANAGE_ORDER: 'manage-order',
    MANAGE_PRODUCTS: 'manage_products',
    CREATE_PRODUCTS: 'create-products',

    //
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my-cart',
    HISTORY: 'buy-history',
    WISHLIST: 'wishlist'
    
}

export default path;