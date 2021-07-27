namespace ProductsModel {
    export interface createProduct {
        name: string,
        description: string,
        category: string,
        price: number,
        stock: number,
        images: []
    }
}