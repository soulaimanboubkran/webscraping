"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeMazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function  scrapeAndStoreProduct(productUrl:string) {
    if(!productUrl) return;

    try {
        connectToDB();
        const scrapedProduct= await scrapeMazonProduct(productUrl);
        if(!scrapedProduct) return;

        let product = scrapedProduct;
        const existingProdcust= await Product.findOne({url:scrapedProduct.url});
        if(existingProdcust){
            const updatedPriceHstory:any=[
                ...existingProdcust.priceHistory,
                {price:scrapedProduct.currentPrice}
            ]
            product= {
                ...scrapedProduct,
                priceHistory:updatedPriceHstory,
                lowestPrice:getLowestPrice(updatedPriceHstory),
                highestPrice:getHighestPrice(updatedPriceHstory),
                averagePrice:getAveragePrice(updatedPriceHstory)
            }
        }

        const newProduct= await Product.findOneAndUpdate(
            {url:scrapedProduct.url},
            product,
            {upsert:true,new:true}
        )
        revalidatePath(`/products/${newProduct._id}`)
    } catch (error:any) {
        throw new Error(`Failed to  create/update product:${error.message}`)
    }
}