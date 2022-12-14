import ProfileBanner from 'components/profile/ProfileBanner';
import Layout from 'layouts/Layout';
import { NavLink, Outlet } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { AiOutlineRight } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from 'redux/auth/authSlice';
import { useEffect, useState } from 'react';
import Loader from 'components/common/Loader';
import { instance } from 'index';


import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import nftABI from 'config/nft.json';
import stakingABI from 'config/staking.json';

const nftAddr = '0xA0F2056Fd69A9BE2C4671D5853545a16E030d68F';
const stakingAddr = '0xb61DfeCE4418E0cb2D08ad9c939Ec911975dA503';

let nftContract, stakingContract;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
        rpc: {
            137: "https://polygon-rpc.com/",            
        },
        bridge: 'https://bridge.walletconnect.org/',
        qrcode: true
    }
  }
};

const initWeb3 = (provider) => {
  const web3 = new Web3(provider);
  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });
  web3.eth.handleRevert = true;
  return web3;
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});

let web3;


const ProfileLayout = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');  
  
  const walletStringHelper = (address) => {return address.substring(0, 4) + "..." + address.substring(address.length - 6, address.length);};

  const subscribeProvider = async (provider) => {
    provider.on('close', () => onDisconnect());

    provider.on('accountsChanged', async (accounts) => {
      setWalletAddress(accounts[0]);      
    });

    provider.on('chainChanged', async (chainId) => {      
      onCheckNetwork();
    });    
  };  

  const onCheckNetwork = async () => {
    const networkId = await web3?.eth?.net?.getId(); 
    if (networkId && networkId !== 137) {
      await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }], // chainId must be in hexadecimal numbers
      });      
    }
  }

  const onConnect = async () => {    
    const provider = await web3Modal.connect();
    await web3Modal.toggleModal();
    await subscribeProvider(provider);
    const web3Init = initWeb3(provider);

    const accounts = await web3Init.eth.getAccounts();
    const account = accounts[0];
    const networkId = await web3Init.eth.net.getId();
    
    nftContract = new web3Init.eth.Contract(nftABI, nftAddr);
    stakingContract = new web3Init.eth.Contract(stakingABI, stakingAddr);
    // console.log("wallet" + account);
    web3 = web3Init;
    setConnected(true);
    setWalletAddress(account);    
    onCheckNetwork();
  };

  const onDisconnect = async () => {    
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await web3Modal.clearCachedProvider();
    nftContract = null;
    stakingContract = null;    
    web3 = null;
    setConnected(false);
    setWalletAddress('');
  };

  const connectAsync = async () => {
    if (web3Modal.cachedProvider) {
      try{
        await onConnect();
      } catch (err){     
      };
    };    
  }

  useEffect( () => {
    connectAsync();
  }, []);

  useEffect(() => {
    if (auth?.user?.token) dispatch(getUserProfile(auth?.user?.token));
  }, []);

  const handleWallet = async (address) => {
    try {
      await instance.post(
        'api/NFT/wallet',
        { walletAddress: address },
        {
          headers: {
            Authorization: `Bearer ${auth?.user?.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (walletAddress !== ''){
      handleWallet(walletAddress);
    }
  }, [walletAddress]);

  return (
    <div className='profileLayout DBlock'>
      {auth?.isLoading ? (
        <Loader />
      ) : (
        <>
          <ProfileBanner
            user={auth?.user}
            userProfile={auth?.userProfile}
            walletInfo={auth?.walletInfo}
            web3Instance = {{web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper}}
          />
          <div className='profileLayoutBody DBlock'>
            <Container>
              <Row>
                <Col sm={12} md={4}>
                  <div className='profileSideBar DBlock'>
                    <ul className='sideBarLinkList DBlock'>
                      <li>
                        <NavLink to='/profile/nft-staking'>
                          NFT staking <AiOutlineRight />
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to='/profile/token-staking'>
                          Token staking <AiOutlineRight />
                        </NavLink>
                      </li>
                      {/* <li>
                    <NavLink to='/profile/history'>
                      History <AiOutlineRight />
                    </NavLink>
                  </li> */}
                    </ul>
                    <div className='coingImg DFlex justify-content-center'>
                      <img
                        src='/assets/images/manWithLaptop.png'
                        alt='Support Wallet'
                      />
                    </div>
                  </div>
                </Col>
                <Col sm={12} md={8}>
                  <div className='profileLayoutContent DBlock'>
                    <Outlet context = {{web3, walletAddress, nftContract, stakingContract, onConnect, onDisconnect, walletStringHelper, onCheckNetwork}}/>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout(ProfileLayout);
