import { OffersInterface } from "src/app/frontier/utils/services/interfaces/products/offers-interface";

export const filterProducts = (products: OffersInterface[], categoryName: string) => {
    return products.filter((product: OffersInterface) => {
        return product.serviceType === categoryName
    })
}