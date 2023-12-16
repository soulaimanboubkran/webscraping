import { getProduct } from '@/lib/actions'
import { formatNumber } from '@/lib/utils';


import Image from "next/image";
import Link from "next/link";
type Props = {
    params: { id: string }
  }
const ProductDetails =async ({params:{id}}:Props) => {

    const product = await getProduct(id); 
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image 
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
    <div className="flex-1 flex flex-col">
    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
      <div className="flex flex-col gap-3">
        <p className="text-[28px] text-secondary font-semibold">
          {product.title}
        </p>

        <Link
          href={product.url}
          target="_blank"
          className="text-base flex font-bold text-black opacity-50"
        >
            

            
          Visit Product
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 font-bold mt-1 text-black h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
</svg>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="product-hearts">
          <Image 
            src="/assets/icons/red-heart.svg"
            alt="heart"
            width={20}
            height={20}
          />

          <p className="text-base font-semibold text-[#D46F77]">
            {product.reviewsCount}
          </p>
        </div>

        <div className="p-2 bg-white-200 rounded-10">
          <Image 
            src="/assets/icons/bookmark.svg"
            alt="bookmark"
            width={20}
            height={20}
          />
        </div>

        <div className="p-2 bg-white-200 rounded-10">
          <Image 
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
    <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency} {formatNumber(product.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image 
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product.stars || '25'}
                  </p>
                </div>

                <div className="product-reviews">
                  <Image 
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount} Reviews
                  </p>
                </div>
              </div>

              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93% </span> of
                buyers have recommeded this.
              </p>
            </div>
          </div>

</div>
</div>
</div>
  )
}

export default ProductDetails
