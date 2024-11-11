import { NFTCard } from "./NFTCard"

export const NFTCardArea = ({ nfts }: { nfts: any[]}) => {
    return(
        <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
           nfts.map((nft, index) => {
            return (
              <NFTCard nft={nft} key={index}/>
            )
          })
        }
      </div>
    )
}