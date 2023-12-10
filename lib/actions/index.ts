"use server"

import { scrapeMazonProduct } from "../scraper";

export async function  scrapeAndStoreProduct(productUrl:string) {
    if(!productUrl) return;

    try {
        const scrapeProduct= await scrapeMazonProduct(productUrl);
    } catch (error:any) {
        throw new Error(`Failed to  create/update product:${error.message}`)
    }
}