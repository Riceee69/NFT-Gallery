import React from 'react';
import { NFTCardArea } from './NFTCardArea';

interface AppState{
  wallet: string;
  collectionAddress: string;
  ownedNFTs: any[];
  fetchForCollection: boolean;
  isFetching: boolean;
}

export default class Dapp extends React.Component<{}, AppState>{

  constructor(props: any){
    super(props);

    this.state = {
      wallet: '',
      collectionAddress: '',
      ownedNFTs: [],
      fetchForCollection: false,
      isFetching: false
    }

    // Bind methods if not using arrow functions
    // this.handleWalletChange = this.handleWalletChange.bind(this);
    // this.handleCollectionChange = this.handleCollectionChange.bind(this);
  }

  handleWalletChange = (event: any) => {
    this.setState({wallet: event.target.value})
  }

  handleCollectionChange = (event: any) => {
    this.setState({collectionAddress: event.target.value})
  }

  fetchNFTsforWallet = async() => {
    this.setState({isFetching: true})
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    const apiUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    if(!this.state.wallet.length){
      window.alert("Pls enter a wallet address")
      this.setState({isFetching: false})
      return;
    }

    if(!this.state.collectionAddress.length){
      try {
        const response = await fetch(`${apiUrl}/${apiKey}/getNFTsForOwner?owner=${this.state.wallet}&withMetadata=true`, options)
        const data = await response.json();
        this.setState({ownedNFTs: data.ownedNfts})
        console.log(data)       
      } catch (error) {
        console.log(error)
      }finally{
        this.setState({isFetching: false})
      }
    }else{
      try {
        const response = await fetch(`${apiUrl}/${apiKey}/getNFTsForOwner?owner=${this.state.wallet}&contractAddresses[]=${this.state.collectionAddress}&withMetadata=true`, options)
        const data = await response.json()
        this.setState({ownedNFTs: data.ownedNfts})
        //console.log(data)   
      } catch (error) {
        console.log(error)
      }finally{
        this.setState({isFetching: false})
      }
    }
  }

  fetchNFTsforCollection = async() => {
    this.setState({isFetching: true})
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    const apiUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    if(!this.state.collectionAddress.length){
      window.alert("Collection Address is empty")
      this.setState({isFetching: false})
    }else{
      try {  
        const response = await fetch(`${apiUrl}/${apiKey}/getNFTsForContract?contractAddress=${this.state.collectionAddress}&withMetadata=true&limit=10000`, options)
        const data = await response.json()
        this.setState({ownedNFTs: data.nfts})
        //console.log(data)   
      } catch (error) {
        console.log(error)
      }finally{
        this.setState({isFetching: false})
      }
    }
  }


  render(){

    return(
      <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input 
          type={"text"} placeholder="Add your wallet address" onChange={this.handleWalletChange} 
          style={{ color: 'black' }}
        />
        <input 
          type={"text"} placeholder="Add the collection address" onChange={this.handleCollectionChange}
          style={{color: 'black'}}
        />
        <label className="text-gray-600">
          <input 
            type={"checkbox"} 
            className="mr-2"
            onClick={(event: any) => {this.setState({fetchForCollection: event.target.checked})}}
          />
          Fetch for collection
        </label>
        <button 
          className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/1"}
          onClick={() => {
            if(this.state.fetchForCollection){
              this.fetchNFTsforCollection()
            }else{
              this.fetchNFTsforWallet()
            }
          }}
        >
          Let's go! 
        </button>
      </div >
      {
        this.state.isFetching && <h1>Fetching Data....Pls Wait :)</h1>
      }
      {
         this.state.ownedNFTs.length > 0 && 
         <NFTCardArea nfts={this.state.ownedNFTs} />
      }
    </div>
    )
  }
}