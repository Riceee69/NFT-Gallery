interface NftType {
    image: { cachedUrl: string };
    name: string;
    tokenId: string;
    contract: { address: string };
    description: string;
}


export const NFTCard = ({ nft }: { nft: NftType}) => {

    const shortenAddress = (address: string) => {
        return `${address.slice(0, 5)}...${address.slice(-3)}`;
    };    

    const copyContractAddress = (address: string) => {
        navigator.clipboard.writeText(address)
    }

    return (
        <>
        { 
        nft.image.cachedUrl !== null && 
            <div className="w-1/4 flex flex-col ">
                <div className="rounded-md h-65 w-full overflow=hidden"> 
                    <img className="object-cover h-full w-full" src={nft.image.cachedUrl} alt={nft.name} />
                </div>
                <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-52 overflow-auto"> {/* Set fixed height and scrollable overflow */}
                    <div>
                        <h2 className="text-xl text-gray-800">{nft.name}</h2>
                        <p className="text-gray-600">Id: {nft.tokenId}</p>
                        <div className="flex item-center">
                            <p className="text-gray-600">{shortenAddress(nft.contract.address)}</p>
                            <button
                            onClick={() => copyContractAddress(nft.contract.address)}
                            > 
                                📋
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-grow mt-2 overflow-auto"> {/* Make this section scrollable */}
                        <p className="text-gray-600">{nft.description}</p>
                    </div>
                </div>
            </div>
        }
        </>
    )
}