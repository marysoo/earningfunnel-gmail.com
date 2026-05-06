import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, CreditCard, Landmark, Globe, CheckCircle2, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { GIVING_OPTIONS, BANK_DETAILS } from '../constants';

export default function GivingHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showEuropeDetails, setShowEuropeDetails] = useState(false);
  const [showIBANQR, setShowIBANQR] = useState(false);

  return (
    <section id="giving" className="relative py-24 px-6 overflow-hidden">
      <div className="glow-bg absolute inset-0 -z-10" />
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif glow-text mb-6"
        >
          Giving & Sacrifice
        </motion.h2>
        <p className="text-zinc-400 mb-12 max-w-2xl mx-auto">
          Through your giving, we are able to reach the world with the message of illumination and excellence. Your seed is a testimony of your faith.
        </p>

        <div className="flex flex-col items-center gap-6">
          {/* Main Giving Dropdown */}
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-gold/50 transition-all group"
            >
              <span className="text-lg font-medium">
                {selectedType ? GIVING_OPTIONS.find(o => o.id === selectedType)?.label : "Select Giving Type"}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-gold' : 'text-zinc-500'}`} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
                >
                  {GIVING_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedType(option.id);
                        setIsOpen(false);
                      }}
                      className="w-full text-left p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800/50 last:border-0 flex items-center justify-between"
                    >
                      {option.label}
                      {selectedType === option.id && <CheckCircle2 className="w-4 h-4 text-gold" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Giving Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
            <button 
              onClick={() => setShowEuropeDetails(true)}
              className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800/80 transition-all flex flex-col items-center gap-3 group"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-all">
                <Landmark className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-semibold">Europe Transfer</h3>
              <p className="text-xs text-zinc-500">Instant wire via EUR/Pound</p>
            </button>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800/20 rounded-2xl flex flex-col items-center gap-3 opacity-60 relative group cursor-not-allowed">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-zinc-500" />
              </div>
              <h3 className="font-semibold">USA Transfer</h3>
              <p className="text-xs text-zinc-400 italic">Coming Soon</p>
              <div className="absolute top-2 right-2 bg-zinc-800 text-[10px] px-2 py-0.5 rounded-full text-zinc-500 border border-zinc-700">Pending</div>
            </div>

            <div className="p-6 bg-zinc-900/50 border border-zinc-800/20 rounded-2xl flex flex-col items-center gap-3 opacity-60 relative group cursor-not-allowed">
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-zinc-500" />
              </div>
              <h3 className="font-semibold">Card Payments</h3>
              <p className="text-xs text-zinc-400 italic">Coming Soon</p>
              <div className="absolute top-2 right-2 bg-zinc-800 text-[10px] px-2 py-0.5 rounded-full text-zinc-500 border border-zinc-700">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Europe Transfer Modal */}
      <AnimatePresence>
        {showEuropeDetails && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEuropeDetails(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-serif mb-6 text-gold">Europe Bank Details</h3>
              
              <div className="space-y-4 mb-8">
                <DetailRow label="Bank Name" value={BANK_DETAILS.europe.bankName} />
                <DetailRow label="Account Name" value={BANK_DETAILS.europe.accountName} />
                <DetailRow label="IBAN" value={BANK_DETAILS.europe.iban} />
                <DetailRow label="SWIFT/BIC" value={BANK_DETAILS.europe.swift} />
                <DetailRow label="Bank Address" value={BANK_DETAILS.europe.bankAddress} />
              </div>

              {/* QR Code Toggle */}
              <div className="mb-8">
                <button 
                  onClick={() => setShowIBANQR(!showIBANQR)}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-zinc-800 rounded-xl hover:border-gold hover:text-gold transition-all group"
                >
                  <QrCode size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{showIBANQR ? "Hide IBAN QR Code" : "Show IBAN QR Code"}</span>
                </button>
                
                <AnimatePresence>
                  {showIBANQR && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 flex flex-col items-center">
                        <div className="bg-white p-4 rounded-2xl shadow-xl">
                          <QRCodeSVG 
                            value={BANK_DETAILS.europe.iban} 
                            size={200}
                            level="H"
                            includeMargin={false}
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-4 uppercase tracking-[0.2em] text-center">
                          Scan this code in your mobile banking app to copy the IBAN directly
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="bg-zinc-950 aspect-video rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden mb-6 group relative">
                <div className="absolute inset-0 bg-gold/5 flex items-center justify-center group-hover:bg-transparent transition-all">
                  <p className="text-zinc-500 text-sm italic">Transfer Slip/QR Guide Image here</p>
                </div>
                {/* You can replace this src with your specific image path */}
                <img 
                  src="https://images.unsplash.com/photo-1550565118-3a14e8d0386f?q=80&w=2070&auto=format&fit=crop" 
                  alt="Bank Transfer Guide" 
                  className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-all pointer-events-none"
                  referrerPolicy="no-referrer"
                />
              </div>

              <button 
                onClick={() => setShowEuropeDetails(false)}
                className="w-full py-4 bg-zinc-100 text-zinc-950 font-bold rounded-xl hover:bg-gold hover:text-white transition-all"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DetailRow({ label, value }: { label: string, value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={handleCopy}
      className="flex justify-between items-center border-b border-zinc-800 py-4 hover:bg-zinc-800/30 px-2 rounded-lg transition-all cursor-pointer group"
    >
      <div className="flex flex-col">
        <span className="text-zinc-500 text-[10px] uppercase tracking-widest">{label}</span>
        <span className="font-mono text-zinc-200 text-sm break-all">{value}</span>
      </div>
      <div className="flex items-center gap-2">
        {copied ? (
          <span className="text-[10px] text-green-500 font-bold uppercase">Copied!</span>
        ) : (
          <span className="text-[10px] text-zinc-600 group-hover:text-gold transition-colors uppercase font-bold">Copy</span>
        )}
      </div>
    </div>
  );
}
