

import { useState, useEffect } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import upload from '../artifacts/contracts/Upload.sol/upload.json';
import ReportUpload from '../components/ReportUpload';
import Display from '../components/Display';
import Modal from '../components/Modal';
import { FolderPlus, Share2, Wallet, FileText, Loader, Shield, ExternalLink } from 'lucide-react';

export const Reports = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const connectWallet = async () => {
      try {
        if (window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          
          await provider.send("eth_requestAccounts", []);
          
          window.ethereum.on('accountsChanged', function (accounts) {
            window.location.reload();
          });
          
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
          
          const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          const contract = new Contract(contractAddress, upload.abi, signer);
          
          setContract(contract);
          setProvider(provider);
        } else {
          setConnectionError("MetaMask is not installed. Please install MetaMask to continue.");
        }
      } catch (error) {
        console.error("Connection error:", error);
        setConnectionError("Failed to connect to wallet. Please check your MetaMask.");
      } finally {
        setLoading(false);
      }
    };
    
    connectWallet();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 text-foreground">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-medguard-500 flex items-center justify-center">
              <Shield className="text-white" size={16} />
            </div>
            <h1 className="text-xl font-bold">MedGuard Reports</h1>
          </div>
          
          {account && (
            <div className="flex items-center gap-2 bg-muted/30 p-2 px-4 rounded-full border border-border text-sm animate-fade-in">
              <Wallet size={16} className="text-medguard-400" />
              <span className="hidden md:inline text-muted-foreground">Wallet:</span>
              <span className="font-mono">{account.slice(0, 6)}...{account.slice(-4)}</span>
            </div>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-80">
            <div className="relative">
              <Loader className="animate-spin text-medguard-500 mb-4" size={40} />
              <div className="absolute inset-0 bg-medguard-500/20 rounded-full animate-pulse-slow"></div>
            </div>
            <p className="text-muted-foreground">Connecting to your wallet...</p>
          </div>
        ) : connectionError ? (
          <div className="flex flex-col items-center justify-center h-80 max-w-md mx-auto text-center">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-4">
              <p className="text-destructive">{connectionError}</p>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="bg-medguard-500 hover:bg-medguard-600 px-4 py-2 rounded-lg transition-colors"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Panel - Upload Files */}
            <div className="md:col-span-1">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm h-min mb-6 animate-fade-in">
                <div className="flex items-center gap-2 mb-6">
                  <FolderPlus className="text-medguard-500" size={20} />
                  <h2 className="text-xl font-semibold">Upload Reports</h2>
                </div>
                
                <div className="mb-6">
                  <ReportUpload account={account} contract={contract} />
                </div>
                
                <button 
                  className="w-full bg-medguard-500 hover:bg-medguard-600 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-colors"
                  onClick={() => setModalOpen(true)}
                >
                  <Share2 size={18} />
                  Share Reports
                </button>
              </div>
              
              {/* Blockchain Info Card */}
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm animate-fade-in">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Blockchain Security</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-medguard-100 mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
                    <span>Your medical reports are securely stored on the blockchain</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-medguard-100 mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
                    <span>End-to-end encryption ensures only you control access</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded-full bg-medguard-100 mt-0.5 flex items-center justify-center text-medguard-500 text-xs font-bold">✓</div>
                    <span>Share records with healthcare providers temporarily</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <a href="#" className="text-medguard-500 hover:text-medguard-600 text-sm flex items-center gap-1">
                    <span>Learn more about blockchain security</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Display Files */}
            <div className="md:col-span-2 bg-card p-6 rounded-xl border border-border shadow-sm animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Your Medical Records</h2>
                <div className="bg-medguard-50 text-medguard-700 text-xs px-3 py-1 rounded-full font-medium">
                  Blockchain Secured
                </div>
              </div>
              <Display contract={contract} account={account} />
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6 bg-muted/10">
        <div className="container mx-auto px-4 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-medguard-500/20 flex items-center justify-center">
              <Shield className="text-medguard-500" size={12} />
            </div>
            <span>MedGuard - Secure Medical Records on Blockchain</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-medguard-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-medguard-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-medguard-500 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
      
      {/* Share Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-card border border-border rounded-xl max-w-md w-full shadow-lg">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Share2 className="text-medguard-500" size={18} />
                <h3 className="text-lg font-semibold">Share Medical Reports</h3>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-foreground rounded-full h-6 w-6 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <Modal setModalOpen={setModalOpen} contract={contract} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;