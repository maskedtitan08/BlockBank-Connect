import { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import dBank from "../artifacts/contracts/dBank.sol/dBank.json"
import Token from "../artifacts/contracts/Token.sol/Token.json"
import bankImage from "./assets/bankImage.png"

import './App.css'

function App() {

  const [bankContract, setBankContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState({});
  const [amount, setAmount] = useState(0);
  const [TokenBalance,setTokenBalance] = useState(0);

  useEffect(() => {
    loadWeb3();
  }, []);


  const loadWeb3 = async () => {
    let signer = null;
    if (window.ethereum == null) {
      console.log("No Metamask detected");
      const provider = ethers.getDefaultProvider();
      setProvider(provider);
    }
    else {
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log(provider);
      setProvider(provider);
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });

      const chainId = 1442;
      const network = await provider.getNetwork();
      if (network.chainId == chainId) {
        signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);

        const bankcontractAddress = "";
        const tokencontractAddress = "";
        const bankcontract = new ethers.Contract(bankcontractAddress, dBank.abi, signer);
        const tokencontract = new ethers.Contract(tokencontractAddress, Token.abi, signer);

        setBankContract(bankcontract);
        setTokenContract(tokencontract)
        // console.log(contract);
      }
      else {
        alert('Please connect to zkevm Testnet');
      }
    }
  };

  // const handleDeposit = async (e) => {
  //   e.preventDefault();

  //   const amountInWei = ethers.parseEther(amount.toString());
  //   const tx = await bankContract.connect(account).deposit({value: amountInWei,});
  //   await tx.wait();
  // };

  // const handleWithdraw = async() => {
  //   const tx =  await bankContract.withdraw();
  //   await tx.wait();
  // }
  const handleDeposit = async (bankContract,account) => {
    e.preventDefault();

    const amountInWei = ethers.parseEther(amount.toString());
    const tx = await bankContract.connect(account).deposit({value: amountInWei,});
    // await tx.wait();
  };

  const handleWithdraw = async(bankContract) => {
    const tx =  await bankContract.withdraw();
    // await tx.wait();
  }

  const handleBalance = async(tokenContract,account) => {
    const bal = await tokenContract.balanceOf(account);
      setTokenBalance(balance);
  }


  return (
    <>
      <div className='text-monospace'>
        {/* these type of className are functional when we use bootstrap fro styling */}
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={bankImage} className="App-logo" alt="logo" height="32" />
            <b>d₿ank</b>
          </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
          <br></br>
          {/* <p>Token address : "".
            Use this token address to add asset token in your account and check its balance.
          </p> */}
          <h1>Welcome to d₿ank</h1>
          <h2>{account}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  {/* <Tab eventKey="deposit" title="Deposit">
                    <div>
                      <br></br>
                      How much do you want to deposit?
                      <br></br>
                      (min. amount is 0.01 ETH)
                      <br></br>
                      (1 deposit is possible at the time)
                      <br></br>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        let amount = this.depositAmount.value
                        amount = amount * 10 ** 18 //convert to wei
                        this.deposit(amount)
                      }}>
                        <div className='form-group mr-sm-2'>
                          <br></br>
                          <input
                            id='depositAmount'
                            step="0.01"
                            type='number'
                            ref={(input) => { this.depositAmount = input }}
                            className="form-control form-control-md"
                            placeholder='amount...'
                            required />
                        </div>
                        <button type='submit' className='btn btn-primary'>DEPOSIT</button>
                      </form>

                    </div>
                  </Tab> */}

                  <Tab eventKey="deposit" title="Deposit">
                    <div>
                      <br />
                      How much do you want to deposit?
                      <br />
                      (min. amount is 0.01 ETH)
                      <br />
                      (1 deposit is possible at the time)
                      <br />
                      <form onSubmit={handleDeposit}>
                        <div className="form-group mr-sm-2">
                          <br />
                          <input
                            id="depositAmount"
                            step="0.01"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control form-control-md"
                            placeholder="amount..."
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          DEPOSIT
                        </button>
                      </form>
                    </div>
                  </Tab>





                  {/* <Tab eventKey="withdraw" title="Withdraw">
                    <br></br>
                    Do you want to withdraw + take interest?
                    <br></br>
                    <br></br>
                    <div>
                      <button type='submit' className='btn btn-primary' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
                    </div>
                  </Tab> */}

                  <Tab eventKey="withdraw" title="Withdraw">
                    <br />
                    Do you want to withdraw + take interest?
                    <br />
                    <br />
                    <div>
                      <button type='submit' className='btn btn-primary' onClick={handleWithdraw}>WITHDRAW</button>
                    </div>
                  </Tab>

                  <Tab eventKey="tokenBalance" title="tokenBalance">
                    <br />
                      Check your total interest token balance.
                    <br />
                    <br />
                    <div>
                      <button type='submit' className='btn btn-primary' onClick={handleBalance}>Token Balance</button>
                    </div>
                    <h2> {ethers.formatEther(TokenBalance.toString(), 'ether')} ETH</h2>
                  </Tab>
                

                 

                  {/* <Tab eventKey="borrow" title="Borrow">
                    <div>
                      <br />
                      Do you want to borrow tokens?
                      <br />
                      (You'll get 50% of collateral, in Tokens)
                      <br />
                      Type collateral amount (in ETH)
                      <br />
                      <br />
                      <form onSubmit={handleBorrow}>
                        <div className="form-group mr-sm-2">
                          <input
                            id="borrowAmount"
                            step="0.01"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="form-control form-control-md"
                            placeholder="amount..."
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          BORROW
                        </button>
                      </form>
                    </div>
                  </Tab> */}






                 

                  {/* <Tab eventKey="payOff" title="Payoff">
                    <div>
                      <br />
                      Do you want to payoff the loan?
                      <br />
                      (You'll receive your collateral - fee)
                      <br />
                      <br />
                      <button type="submit" className="btn btn-primary" onClick={handlePayOff}>
                        PAYOFF
                      </button>
                    </div>
                  </Tab> */}



                  



                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
