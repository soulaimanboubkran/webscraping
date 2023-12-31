import { NextResponse } from "next/server";

import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export const maxDuration = 300; // This function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(){
    try {
        connectToDB();

        const products = await Product.find({});
        if(!products) throw new Error("No products found");

        // scrape latest products details and update db
        const updatedProducts = await Promise.all(
            products.map(async (currentProduct)=>{


                const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
                if(!scrapedProduct) throw new Error("No product found")

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    {
                      price: scrapedProduct.currentPrice,
                    },
                  ];

                const product = {
                    ...scrapedProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
                  };
                  const updatedProduct = await Product.findOneAndUpdate(
                    {
                      url: product.url,
                    },
                    product
                  );
            })
        )

    } catch (error) {
        throw new Error(`Error in GET: ${error}`)
    }
} 