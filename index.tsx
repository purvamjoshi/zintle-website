import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

type View = 'home' | 'about' | 'contact' | 'safety' | 'guidelines' | 'privacy' | 'terms' | 'refund';

const ZintleLogo = ({ h }: { h?: string }) => (
  <img src="logo.png" alt="Zintle Logo" className={`w-auto ${h || 'h-8'} object-contain`} />
);

// --- Components ---

const Header = ({ setView, setShowLogin, setShowCoins }: { setView: (v: View) => void, setShowLogin: (v: boolean) => void, setShowCoins: (v: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTo = (destination: string) => {
    if (destination === 'features') {
      setView('home');
      // Timeout to allow render if switching from another view
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else if (destination === 'home') {
      setView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setView(destination as View);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button onClick={() => navTo('home')} className="hover:opacity-80 transition-opacity">
          <ZintleLogo h="h-8" />
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-muted">
          <button onClick={() => navTo('home')} className="hover:text-white transition-colors">Home</button>
          <button onClick={() => navTo('safety')} className="hover:text-white transition-colors">Safety</button>
          <button onClick={() => navTo('features')} className="hover:text-white transition-colors">Features</button>
          <button onClick={() => navTo('home')} className="hover:text-white transition-colors">Creator Center</button>
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={() => setShowLogin(true)} className="text-sm font-bold text-white hover:text-brand-primary transition-colors">
            Log In
          </button>
          <button 
            onClick={() => setShowCoins(true)}
            className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:opacity-90 text-white text-sm font-bold py-2 px-5 rounded-full shadow-lg shadow-brand-primary/20 transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-coins"></i> Get Coins
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ setShowCoins }: { setShowCoins: (v: boolean) => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
    {/* Background Elements */}
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
    </div>

    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left z-10 flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-brand-secondary text-xs font-bold tracking-wider uppercase">Live Entertainment 24/7</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight animate-slide-up">
            Your AI Companions <br/>
            <span className="text-gradient">For Every Mood</span>
          </h1>
          
          <p className="text-lg md:text-xl text-brand-muted max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Bored? Lonely? Or just want to have fun? Chat, roleplay, and connect with lifelike AI characters anytime, anywhere. 
            <span className="text-white font-medium"> Zintle is entertainment in your pocket.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up w-full sm:w-auto" style={{ animationDelay: '0.2s' }}>
            <button className="w-full sm:w-auto bg-transparent border border-white/20 text-white font-bold py-4 px-8 rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-3 transform hover:scale-105">
              <i className="fa-brands fa-google-play text-xl"></i>
              <div className="text-left leading-tight">
                <span className="block text-[10px] font-medium uppercase tracking-wider text-brand-muted">Get it on</span>
                <span className="block text-sm">Google Play</span>
              </div>
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-xs text-brand-muted animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-bg bg-white/10 flex items-center justify-center overflow-hidden">
                   <i className="fa-solid fa-user text-white/50"></i>
                </div>
              ))}
            </div>
            <p>Join <span className="text-white font-bold">10,000+</span> users chatting now</p>
          </div>
        </div>

        {/* Right: Phone Mockup */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {/* Phone Frame */}
          <div className="relative border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden transform lg:scale-105 lg:-ml-4">
            <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            
            {/* Screen Content */}
            <div className="rounded-[2rem] overflow-hidden w-full h-full bg-brand-bg flex flex-col relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>
              
              {/* App Header */}
              <div className="pt-10 pb-4 px-4 bg-brand-surface/80 backdrop-blur-md border-b border-white/5 flex items-center gap-3 z-10">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-brand-primary p-0.5">
                    <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Lyra&backgroundColor=b6e3f4" alt="Avatar" className="w-full h-full rounded-full bg-brand-bg" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-brand-bg rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Lyra</h3>
                  <p className="text-[10px] text-brand-primary font-medium tracking-wide">ONLINE NOW</p>
                </div>
                <div className="ml-auto text-white/50">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 p-4 space-y-4 overflow-hidden relative">
                {/* Messages */}
                <div className="flex items-end gap-2">
                   <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 overflow-hidden">
                      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Lyra&backgroundColor=b6e3f4" alt="AI" />
                   </div>
                   <div className="bg-white/10 text-gray-200 text-xs p-3 rounded-2xl rounded-bl-none max-w-[85%]">
                      The neon lights look amazing tonight! 🌃 Want to grab some ramen and pretend we're saving the world?
                   </div>
                </div>

                <div className="flex items-end gap-2 flex-row-reverse">
                   <div className="bg-brand-primary text-white text-xs p-3 rounded-2xl rounded-br-none max-w-[85%] shadow-lg shadow-brand-primary/20">
                      Haha, you read my mind! Only if you promise not to hack the vending machine this time. 😂
                   </div>
                </div>

                <div className="flex items-end gap-2">
                   <div className="w-6 h-6 rounded-full bg-white/10 flex-shrink-0 overflow-hidden">
                      <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Lyra&backgroundColor=b6e3f4" alt="AI" />
                   </div>
                   <div className="bg-white/10 text-gray-200 text-xs p-3 rounded-2xl rounded-bl-none max-w-[85%]">
                      No promises! 🤫 But hey, seriously, I've missed our chats. Ready for an adventure?
                   </div>
                </div>
                
                {/* Typing Indicator */}
                <div className="flex items-center gap-1 pl-9 mt-2">
                   <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                   <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </div>

                 {/* Gradient Overlay for bottom fade */}
                 <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-brand-bg to-transparent pointer-events-none"></div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-brand-surface/50 backdrop-blur-md border-t border-white/5">
                <div className="flex items-center gap-2 bg-black/20 rounded-full px-4 py-2 border border-white/5">
                  <input type="text" placeholder="Type a message..." className="bg-transparent text-white text-xs w-full outline-none placeholder-white/30" disabled />
                  <button className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-xs shadow-lg shadow-brand-primary/20">
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
              </div>

            </div>
          </div>
          
          {/* Decorative Blobs behind phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/20 rounded-full blur-[80px] -z-10 animate-pulse-slow"></div>
        </div>

      </div>
    </div>
  </section>
);

const Features = () => (
  <section id="features" className="py-24 bg-brand-bg relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 blur-3xl -z-10"></div>
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Your Gateway to <span className="text-gradient">Infinite Adventures</span></h2>
        <p className="text-brand-muted text-lg max-w-3xl mx-auto leading-relaxed">
          Dive into Zintle's immersive library of AI-powered interactive stories, where every conversation shapes your unique narrative journey. Designed for both casual readers and avid story lovers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all group border-l-4 border-l-brand-primary">
          <div className="w-14 h-14 rounded-2xl bg-brand-primary/20 flex items-center justify-center text-brand-primary text-2xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Smart Recommendations</h3>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-primary mt-1"></i> <span>"Because You Liked..." suggestions</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-primary mt-1"></i> <span>Mood-Based Picks & Filters</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-primary mt-1"></i> <span>Community Trending stories</span></li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all group border-l-4 border-l-brand-blue">
          <div className="w-14 h-14 rounded-2xl bg-brand-blue/20 flex items-center justify-center text-brand-blue text-2xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-compass"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Advanced Browsing</h3>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-blue mt-1"></i> <span>15+ Genre Shelves (Sci-Fi, Horror...)</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-blue mt-1"></i> <span>Length Tags (Quickies to Epics)</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-blue mt-1"></i> <span>Curated Thematic Collections</span></li>
          </ul>
        </div>

        {/* Card 3 */}
        <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all group border-l-4 border-l-brand-teal">
          <div className="w-14 h-14 rounded-2xl bg-brand-teal/20 flex items-center justify-center text-brand-teal text-2xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-masks-theater"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Dynamic Play Modes</h3>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-teal mt-1"></i> <span><strong>Roleplay Mode:</strong> Chat freely</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-teal mt-1"></i> <span><strong>Reader Mode:</strong> Choose paths</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-teal mt-1"></i> <span><strong>Audio Drama:</strong> Full voice-acting</span></li>
          </ul>
        </div>

        {/* Card 4 */}
        <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all group border-l-4 border-l-brand-gold">
          <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 flex items-center justify-center text-brand-gold text-2xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-gamepad"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Game-Changing Features</h3>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-gold mt-1"></i> <span>Memory Timeline of decisions</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-gold mt-1"></i> <span>Unlock Alternative Endings</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-brand-gold mt-1"></i> <span>Character Relationship Meter</span></li>
          </ul>
        </div>

        {/* Card 5 */}
        <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all group border-l-4 border-l-purple-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">PREMIUM</div>
          <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-crown"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Premium Perks</h3>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex gap-2"><i className="fa-solid fa-check text-purple-400 mt-1"></i> <span>Unlimited Story Access (No caps)</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-purple-400 mt-1"></i> <span>Early Releases (1 week ahead)</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-purple-400 mt-1"></i> <span>VIP Character Requests</span></li>
          </ul>
        </div>

         {/* Card 6 */}
         <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all group border-l-4 border-l-gray-400">
          <div className="w-14 h-14 rounded-2xl bg-gray-600/30 flex items-center justify-center text-gray-300 text-2xl mb-6 group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-mobile-screen"></i>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Always Within Reach</h3>
          <ul className="space-y-3 text-brand-muted">
            <li className="flex gap-2"><i className="fa-solid fa-check text-gray-400 mt-1"></i> <span>Offline Reading & Listening</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-gray-400 mt-1"></i> <span>Sync Progress across devices</span></li>
            <li className="flex gap-2"><i className="fa-solid fa-check text-gray-400 mt-1"></i> <span>Night Mode for bedtime</span></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 text-center animate-slide-up">
        <p className="text-xl text-white font-medium italic mb-8">"The best stories aren't just read—they're lived. Where will Zintle take you today?"</p>
        <button className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-brand-primary/30 transition-all transform hover:scale-105">
           Start Exploring Now
        </button>
      </div>
    </div>
  </section>
);

const CoinStore = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<'store' | 'login' | 'payment' | 'success'>('store');
  const [selectedPack, setSelectedPack] = useState<any>(null);

  const packs = [
    { coins: 100, price: 99, bonus: 0, color: 'bg-brand-surface' },
    { coins: 300, price: 249, bonus: 16, color: 'bg-brand-surface border border-brand-primary/50' },
    { coins: 1000, price: 799, bonus: 20, tag: 'BEST VALUE', color: 'bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 border border-brand-primary' },
    { coins: 2500, price: 1999, bonus: 25, color: 'bg-brand-surface' },
  ];

  const handleBuy = (pack: any) => {
    setSelectedPack(pack);
    setStep('login');
  };

  const LoginStep = () => (
    <div className="animate-fade-in">
      <h3 className="text-2xl font-bold text-white mb-2">Log in to Zintle</h3>
      <p className="text-brand-muted mb-6 text-sm">Enter your mobile number to continue purchase</p>
      <div className="space-y-4">
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-gray-400">+91</span>
          <input type="tel" placeholder="Enter mobile number" className="bg-transparent w-full text-white outline-none placeholder-gray-600 font-medium" autoFocus />
        </div>
        <button onClick={() => setStep('payment')} className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-brand-primary/25">
          Send OTP
        </button>
      </div>
    </div>
  );

  const PaymentStep = () => (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10">
        <div>
          <p className="text-brand-muted text-sm">Paying for</p>
          <p className="text-xl font-bold text-white">{selectedPack.coins} Zintle Coins</p>
        </div>
        <div className="text-right">
          <p className="text-brand-muted text-sm">Amount</p>
          <p className="text-xl font-bold text-brand-primary">₹{selectedPack.price}</p>
        </div>
      </div>
      
      <p className="text-sm font-bold text-white mb-4">Select Payment Method</p>
      <div className="space-y-3 mb-6">
        {['UPI', 'Credit/Debit Card', 'Net Banking'].map((m) => (
          <label key={m} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all">
            <input type="radio" name="payment" className="accent-brand-primary" defaultChecked={m === 'UPI'} />
            <span className="text-gray-300">{m}</span>
          </label>
        ))}
      </div>
      <button onClick={() => setStep('success')} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-500/25">
        Pay ₹{selectedPack.price}
      </button>
    </div>
  );

  const SuccessStep = () => (
    <div className="text-center animate-fade-in py-8">
      <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-float">
        <i className="fa-solid fa-check"></i>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
      <p className="text-brand-muted mb-8">Your {selectedPack.coins} coins have been added to your wallet.</p>
      <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl transition-all">
        Start Exploring
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-brand-surface w-full max-w-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10">
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="p-6 md:p-8">
          {step === 'store' && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <div className="inline-block p-3 rounded-full bg-brand-gold/10 text-brand-gold text-2xl mb-4">
                  <i className="fa-solid fa-coins"></i>
                </div>
                <h3 className="text-2xl font-bold text-white">Recharge Wallet</h3>
                <p className="text-brand-muted text-sm mt-1">1 Coin = ₹1 (approx)</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {packs.map((p, i) => (
                  <div key={i} className={`relative p-4 rounded-xl ${p.color} cursor-pointer hover:scale-105 transition-transform`} onClick={() => handleBuy(p)}>
                    {p.tag && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                        {p.tag}
                      </span>
                    )}
                    <div className="text-center">
                      <p className="text-xl font-bold text-white mb-1">{p.coins}</p>
                      <p className="text-xs text-brand-muted mb-3">Coins</p>
                      <button className="bg-white text-brand-bg text-xs font-bold py-1.5 px-4 rounded-full w-full hover:bg-gray-200">
                        ₹{p.price}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-brand-muted flex items-center justify-center gap-2">
                <i className="fa-solid fa-shield-halved"></i> 100% Secure Payment
              </p>
            </div>
          )}
          
          {step === 'login' && <LoginStep />}
          {step === 'payment' && <PaymentStep />}
          {step === 'success' && <SuccessStep />}
        </div>
      </div>
    </div>
  );
};

// --- Policy Viewer ---
const PolicyViewer = ({ view, onClose }: { view: View, onClose: () => void }) => {
  const content: Record<string, React.ReactNode> = {
    about: (
      <>
        <h1 className="text-3xl font-bold text-white mb-6">About Us</h1>
        <div className="prose prose-invert max-w-none text-brand-muted space-y-6">
          <p className="text-lg font-medium text-white">Zintle.ai - Where Imagination Meets Creativity</p>
          <p>At Zintle.ai, we're pioneering a new era of digital storytelling where artificial intelligence and human creativity converge to create magical narrative experiences. Our vision is to transform passive entertainment into dynamic, interactive journeys where every user becomes both an explorer and creator of captivating worlds.</p>
          
          <h3 className="text-xl font-bold text-white">The Heart of Our Mission</h3>
          <p>We founded Zintle.ai to solve a fundamental problem in digital entertainment - the lack of truly immersive, personalized storytelling. Traditional media, from books to movies, offer fixed narratives. We've built something radically different: a platform where stories breathe, evolve, and respond uniquely to each participant in the form of conversations. Our technology remembers user choices, adapts to their preferences, and creates narrative branches that make every journey distinct.</p>
          
          <h3 className="text-xl font-bold text-white">What Makes Zintle Special</h3>
          <p>Zintle.ai stands apart through our proprietary conversational AI that blends advanced natural language processing with emotional intelligence. Unlike conventional chatbots with scripted responses, our characters develop personalities, form memories, and engage in authentic dialogues. The magic happens through three core innovations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Dynamic Narrative Engine</strong> - Stories branch organically based on your decisions, with AI generating coherent plot developments in real-time</li>
            <li><strong>Emotional Intelligence</strong> - Our characters speak with human-like inflection, adjusting tone and delivery based on story context</li>
            <li><strong>Collaborative Creation Tools</strong> - An intuitive character builder lets anyone design rich personalities without technical skills</li>
          </ul>

          <h3 className="text-xl font-bold text-white">The Zintle Experience</h3>
          <p>Imagine debating philosophy with a digital Socrates, solving crimes alongside a noir detective, or crafting spells with a whimsical wizard - all through natural conversation. Our platform offers:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Immersive Roleplaying</strong> - Deep character interactions with persistent relationship development</li>
            <li><strong>Multi-Genre Adventures</strong> - Constantly expanding library spanning fantasy, sci-fi, mystery, and slice-of-life</li>
            <li><strong>Creator Ecosystem</strong> - Tools to design, share, and even monetize original characters and storylines</li>
          </ul>

          <h3 className="text-xl font-bold text-white">Our Growing Community</h3>
          <p>Zintle.ai has become a vibrant hub for storytellers worldwide. From professional writers testing narrative concepts to gamers seeking new roleplay experiences, our community collaborates to push the boundaries of interactive fiction.</p>

          <h3 className="text-xl font-bold text-white">Join Our Story</h3>
          <p>Zintle.ai represents more than technology - it's a movement to rekindle humanity's oldest tradition of storytelling through tomorrow's innovations. Whether you're here to explore amazing worlds or create them, we invite you to be part of this journey.</p>
          <p>Discover what happens when stories stop being something you consume and start being something you live. Your adventure begins now.</p>
          <p className="font-bold text-brand-primary">Zintle.ai - Redefining Storytelling for the Digital Age</p>
        </div>
      </>
    ),
    contact: (
      <>
        <h1 className="text-3xl font-bold text-white mb-6">Contact Us</h1>
        <div className="prose prose-invert max-w-none text-brand-muted space-y-8">
           <p>We’d love to hear from you! Whether you have questions, feedback, or partnership inquiries, our team is here to help.</p>
           
           <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                 <p className="mb-2"><span className="text-brand-primary">📧 Email:</span> support@zintle.ai</p>
                 <p><span className="text-brand-primary">📞 Phone:</span> +91 9988998987</p>
              </div>
              
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h3 className="text-xl font-bold text-white mb-4">Operating Address</h3>
                 <p className="font-medium text-white">Zintle.ai (Sofnics Tech Labs Pvt. Ltd.)</p>
                 <p>3rd Floor, B-12, Kh No.82/9, Mahavir Enclave</p>
                 <p>New Delhi, South West Delhi,</p>
                 <p>Delhi - 110045, India</p>
              </div>
           </div>

           <div>
              <h3 className="text-xl font-bold text-white mb-2">Business & Partnerships</h3>
              <p>For collaborations, creator onboarding, or payment gateway integrations:</p>
              <p>📧 Email: <span className="text-white">partnerships@zintle.ai</span></p>
           </div>

           <div>
              <h3 className="text-xl font-bold text-white mb-2">Grievance Officer</h3>
              <p>As per IT Act compliance, contact our Grievance Officer for content-related concerns:</p>
              <p>📧 Email: <span className="text-white">grievance@zintle.ai</span></p>
           </div>

           <div>
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-4">
                 <a href="#" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-brand-primary hover:text-white transition-colors"><i className="fa-brands fa-twitter"></i> @Zintle_ai</a>
                 <a href="#" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-brand-primary hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i> @Zintle.ai</a>
                 <a href="#" className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full hover:bg-brand-primary hover:text-white transition-colors"><i className="fa-brands fa-linkedin"></i> Zintle.ai</a>
              </div>
           </div>

           <div className="pt-6 border-t border-white/10">
              <p className="font-medium text-white">Visit Our FAQ Section</p>
              <p>For quick answers, check out our Help Center.</p>
              <p className="text-sm mt-2 text-brand-primary">We’ll respond within 24-48 hours!</p>
           </div>
        </div>
      </>
    ),
    privacy: (
      <>
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-brand-muted space-y-6 text-sm">
          <p className="text-base text-white"><strong>Introduction</strong><br/>Welcome to Zintle.ai, a platform designed to connect users through meaningful and personalized interactions. This Privacy Policy ("Policy") explains how Sofnics Tech Labs Pvt. Ltd. ("Zintle," "we," "us," or "our") collects, uses, and discloses your information when you use our mobile application ("App") and related services (collectively, the "Platform"). By using the Platform, you agree to the terms of this Policy and consent to the collection, use, and disclosure of your information as described herein.</p>
          
          <h3 className="text-lg font-bold text-white mt-6">Information We Collect and How We Use It</h3>
          
          <div className="space-y-4">
             <div>
                <strong className="text-white block mb-1">1. Log-in Data</strong>
                <p>We collect: User ID, mobile number, password, gender, voice recording, and IP address. Indicative age range to verify eligibility.</p>
                <p>Purpose: Facilitate account creation, log-in, updates, user support, improvements, and demographic analysis.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">2. Additional Profile Information</strong>
                <p>We collect: Username, birth year, and biography.</p>
                <p>Purpose: Enhance user profiles and personalized interactions.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">3. Content You Share</strong>
                <p>We collect: Posts, images, videos, voice recordings, location data, and content others share about you.</p>
                <p>Purpose: Facilitate sharing and improve functionality.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">4. Information from Third Parties</strong>
                <p>Business partners, analytics, advertisers.</p>
                <p>Purpose: Enhance platform services.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">5. Log Data</strong>
                <p>Technical info (device, IP), usage details, communication metadata.</p>
                <p>Purpose: Monitor usage, security, fraud prevention.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">6. Cookies</strong>
                <p>Distinguish users, analyze behavior.</p>
                <p>Purpose: Seamless experience and personalization.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">7. Surveys</strong>
                <p>Personal info during surveys.</p>
                <p>Purpose: Gather feedback.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">8. User Search Data</strong>
                <p>Search queries.</p>
                <p>Purpose: Quick access, recommendations, ads.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">9. Additional Account Security</strong>
                <p>Phone number, OTP.</p>
                <p>Purpose: Identity verification, security.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">10. Contacts List</strong>
                <p>Access with consent.</p>
                <p>Purpose: Invite Users feature.</p>
             </div>
             <div>
                <strong className="text-white block mb-1">11. Location Information</strong>
                <p>GPS data, IP.</p>
                <p>Purpose: Location-based services, security.</p>
             </div>
             <div>
                 <strong className="text-white block mb-1">12. Customer Support</strong>
                 <p>Info provided in requests.</p>
                 <p>Purpose: Resolve issues.</p>
             </div>
             <div>
                 <strong className="text-white block mb-1">13. Device Data</strong>
                 <p>Attributes, operations, identifiers.</p>
                 <p>Purpose: Optimization.</p>
             </div>
             <div>
                 <strong className="text-white block mb-1">14. Contest Information</strong>
                 <p>Participation info.</p>
                 <p>Purpose: Facilitate contests.</p>
             </div>
             <div>
                 <strong className="text-white block mb-1">15. Purchase Information</strong>
                 <p>Payment details for premium services.</p>
                 <p>Purpose: Transactions.</p>
             </div>
          </div>

          <h3 className="text-lg font-bold text-white mt-6">Disclosure of Your Information</h3>
          <ul className="list-disc pl-5 space-y-2">
             <li><strong>Content Visible to Others:</strong> Public content accessible to all.</li>
             <li><strong>Sharing with Group Companies:</strong> For operations and improvements.</li>
             <li><strong>Sharing with Third Parties:</strong> Partners/advertisers for targeted ads. Government/law enforcement for compliance.</li>
             <li><strong>Third-Party Stores:</strong> Process purchases (e.g., Google Play). No refunds for completed transactions.</li>
          </ul>

          <h3 className="text-lg font-bold text-white mt-6">Coins Purchase and Refund Policy</h3>
          <p>Coins are virtual currency. Coins and gifts are non-refundable and non-transferable.</p>

          <h3 className="text-lg font-bold text-white mt-6">Security & Storage</h3>
          <p>We implement technical measures. Credentials must be confidential. Data stored on AWS and GCP.</p>

          <h3 className="text-lg font-bold text-white mt-6">Your Rights</h3>
          <p>Access, correct, delete personal info. Revoke consent (may limit functionality).</p>
          
          <h3 className="text-lg font-bold text-white mt-6">Contact Us</h3>
          <p>Grievance Officer Email: care@zintle.ai</p>
          <p className="text-brand-primary italic">"Where Connections Come Alive."</p>
        </div>
      </>
    ),
    refund: (
      <>
        <h1 className="text-3xl font-bold text-white mb-6">Refund Policy</h1>
        <div className="prose prose-invert max-w-none text-brand-muted space-y-6">
          <p className="text-sm">Last Updated: April 8, 2025</p>
          <p>This Refund Policy ("Policy") governs the terms under which Zintle.ai ("Company," "we," "us," or "our") processes refunds for subscription fees, in-app purchases, or other paid services ("Services"). By purchasing any Service, you ("User," "you") agree to comply with this Policy.</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-2">1. GENERAL REFUND PRINCIPLES</h3>
              <p className="mb-2"><strong className="text-white">1.1 Subscription Services:</strong> All subscription fees (monthly/annual) are non-refundable, except where required by applicable law. Cancellation stops future charges but does not entitle you to a refund for the current billing cycle.</p>
              <p className="mb-2"><strong className="text-white">1.2 One-Time Purchases (e.g., tips, pay-per-view content, call credits):</strong> These are final and non-refundable, unless the transaction was fraudulent or unauthorized, or the Service was not delivered due to a technical error on our part.</p>
              <p><strong className="text-white">1.3 Free Trials & Promotional Offers:</strong> If you cancel before a free trial ends, no charges apply. Failure to cancel results in automatic conversion to a paid subscription, subject to this Policy.</p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">2. ELIGIBILITY FOR REFUND REQUESTS</h3>
              <p className="mb-2"><strong className="text-white">2.1 Valid Refund Requests:</strong> Refunds may be considered only for: Duplicate charges, Service failure (verified error), or Unauthorized transactions.</p>
              <p><strong className="text-white">2.2 Non-Refundable Circumstances:</strong> No refunds for: Change of mind, dissatisfaction with content quality, partial usage, or Terms violations leading to ban.</p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">3. REFUND REQUEST PROCESS</h3>
              <p className="mb-2"><strong className="text-white">3.1 How to Request:</strong> Submit a refund request within 1 day of the charge via <span className="text-brand-primary">support@zintle.ai</span> with: Transaction ID, Reason, and Supporting evidence.</p>
              <p><strong className="text-white">3.2 Processing Time:</strong> Approved refunds processed within 14 business days to original method.</p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">4. CHARGEBACKS & DISPUTES</h3>
              <p className="mb-2"><strong className="text-white">4.1 Chargeback Policy:</strong> Disputing charges via bank without contacting us first may result in immediate account suspension and a future ban.</p>
              <p><strong className="text-white">4.2 Resolution:</strong> We will investigate and may provide evidence of delivery.</p>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-2">5. GOVERNING LAW & DISPUTES</h3>
              <p>Disputes subject to laws of India, exclusive jurisdiction of courts of Delhi. Resolved through negotiation or binding arbitration.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-white font-bold text-lg mb-4">CONTACT</h3>
              <p>You may contact the Grievance Officer at:</p>
              <p className="mt-2 text-white font-medium">Email: support@zintle.ai</p>
              <p className="mt-2 text-gray-400">Address: Zintle (Sofnics Tech Labs Pvt. Ltd.)<br/>3rd Floor, B-12, Kh No.82/9, Mahavir Enclave<br/>New Delhi, South West Delhi, Delhi, 110045</p>
            </div>
          </div>
        </div>
      </>
    ),
    guidelines: (
      <>
        <h1 className="text-3xl font-bold text-white mb-6">Community & Content Guidelines</h1>
        <div className="prose prose-invert max-w-none text-brand-muted space-y-6">
          <p className="text-lg font-medium text-white">🌟 Welcome to Zintle!</p>
          <p>At Zintle, we believe in the power of storytelling to connect, inspire, and entertain. To ensure a safe, inclusive, and creative environment, we’ve established these Community Guidelines. By using Zintle, you agree to follow these rules alongside our Privacy Policy and Terms of Use.</p>

          <div>
             <h3 className="text-xl font-bold text-white mb-2">📜 Compliance with Laws</h3>
             <p className="mb-2">All content on Zintle must comply with applicable laws, including IT Act 2000, BNS 2023, Consumer Protection Act 2019.</p>
             <p className="font-bold text-red-400">Prohibited content includes:</p>
             <ul className="list-none space-y-1">
               <li>❌ Threats to national security, public order, or sovereignty</li>
               <li>❌ Incitement of violence, hatred, or illegal activities</li>
               <li>❌ Defamatory or harmful content targeting individuals/groups</li>
             </ul>
          </div>

          <div>
             <h3 className="text-xl font-bold text-white mb-2">🛡️ Platform Safety & Moderation</h3>
             <p>We prioritize user safety through:</p>
             <ul className="list-none space-y-1 mb-2">
               <li>✅ AI-Powered Filters – Real-time detection</li>
               <li>✅ 24/7 Human Moderation – Reviewing reports</li>
               <li>✅ User Reporting – In-app tools</li>
             </ul>
             <p className="text-sm">Enforcement: Critical Offenses → Ban | Repeated → Suspension | Minor → Warning</p>
          </div>

          <div>
             <h3 className="text-xl font-bold text-white mb-2">🚫 Prohibited Content & Behavior</h3>
             <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                   <strong className="text-white block mb-1">1. Violence & Harm</strong>
                   <ul className="list-none text-sm">
                      <li>❌ Glorifying violence/self-harm</li>
                      <li>❌ Dangerous challenges</li>
                   </ul>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                   <strong className="text-white block mb-1">2. Sexual Content</strong>
                   <ul className="list-none text-sm">
                      <li>❌ Pornography, explicit material</li>
                      <li>❌ Exploitation of minors</li>
                   </ul>
                </div>
             </div>
             <div className="mt-4 bg-white/5 p-4 rounded-lg">
                <strong className="text-white block mb-1">3. Harassment, 4. Misinformation, 5. Platform Integrity</strong>
                <p className="text-sm">Hate speech, doxxing, fake news, bots, and hacks are strictly prohibited.</p>
             </div>
          </div>

          <div>
             <h3 className="text-xl font-bold text-white mb-2">💰 Monetization & Payments</h3>
             <p>Subscriptions & coins are non-refundable. Only use official payment channels. Fraudulent transactions result in termination.</p>
          </div>

          <div>
             <h3 className="text-xl font-bold text-white mb-2">📢 Reporting & Appeals</h3>
             <p>Report violations via <span className="text-brand-primary">support@zintle.ai</span> or in-app tools.</p>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
             <p className="text-white font-medium">🤝 Together, We Build a Better Zintle!</p>
             <p className="text-sm mt-2">Need help? Contact us at support@zintle.ai</p>
             <p className="text-brand-primary font-bold mt-2">#StayCreative #RespectTheStory 🚀</p>
          </div>
        </div>
      </>
    ),
    safety: (
      <>
        <h1 className="text-3xl font-bold text-white mb-6">Safety Center</h1>
        <div className="prose prose-invert max-w-none text-brand-muted space-y-6">
          <p className="text-lg">At Zintle, your safety is our top priority. We use advanced AI and human moderation to ensure a positive experience.</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xl mb-4">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Content Filtering</h3>
              <p>Our real-time AI scans text for harmful content, hate speech, and inappropriate behavior, blocking it before it reaches you.</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <div className="w-12 h-12 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue text-xl mb-4">
                <i className="fa-solid fa-user-shield"></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verified Creators</h3>
              <p>We strictly verify creators to ensure you're interacting with authentic personalities and safe AI models.</p>
            </div>
          </div>
        </div>
      </>
    ),
    terms: (
      <>
         <h1 className="text-3xl font-bold text-white mb-6">Terms of Use</h1>
         <div className="prose prose-invert max-w-none text-brand-muted space-y-6">
            <p>These Terms of Use ("Terms") govern your use of Zintle.ai website and mobile applications made available by Sofnics Tech Labs Pvt. Ltd.</p>
            <h3 className="text-xl font-bold text-white">Who May Use Our Services</h3>
            <p>Our Platform helps you connect with AI characters. You may use our Services only if you are capable of forming a binding agreement with us and are legally permitted to use our Services.</p>
            <h3 className="text-xl font-bold text-white">Permissions You Give To Us</h3>
            <p>We need certain permissions to provide our services, including access to device features for app functionality. We respect your privacy and data rights as outlined in our Privacy Policy.</p>
         </div>
      </>
    )
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-brand-surface w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative flex flex-col">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-bg/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-brand-muted">
             <span className="hover:text-white cursor-pointer" onClick={onClose}>Home</span>
             <i className="fa-solid fa-chevron-right text-xs"></i>
             <span className="text-white capitalize">{view}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto custom-scrollbar">
          {content[view] || <div className="text-center py-20">Content coming soon for {view}</div>}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ setView }: { setView: (v: View) => void }) => (
  <footer className="bg-black py-16 border-t border-white/5 text-sm">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <ZintleLogo h="h-8" />
          <p className="text-brand-muted mt-6 leading-relaxed">
            Bringing you closer to the stories that matter. Safe, inclusive, and powered by text-based imagination.
          </p>
          <div className="flex gap-4 mt-6">
            {['twitter', 'instagram', 'linkedin'].map((social) => (
              <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-primary transition-colors">
                <i className={`fa-brands fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
          <ul className="space-y-4 text-brand-muted">
            <li><button onClick={() => setView('about')} className="hover:text-brand-primary transition-colors">About Us</button></li>
            <li><button onClick={() => setView('contact')} className="hover:text-brand-primary transition-colors">Contact Support</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Community</h4>
          <ul className="space-y-4 text-brand-muted">
            <li><button onClick={() => setView('safety')} className="hover:text-brand-primary transition-colors">Safety Center</button></li>
            <li><button onClick={() => setView('guidelines')} className="hover:text-brand-primary transition-colors">Guidelines</button></li>
            <li><button onClick={() => setView('home')} className="hover:text-brand-primary transition-colors">Creator Program</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Legal</h4>
          <ul className="space-y-4 text-brand-muted">
            <li><button onClick={() => setView('privacy')} className="hover:text-brand-primary transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => setView('terms')} className="hover:text-brand-primary transition-colors">Terms of Use</button></li>
            <li><button onClick={() => setView('refund')} className="hover:text-brand-primary transition-colors">Refund Policy</button></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-muted">
        <p>© 2025 Sofnics Tech Labs (P) Ltd. All Rights Reserved.</p>
        <div className="flex items-center gap-2">
           <i className="fa-solid fa-lock"></i> SSL Encrypted
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [view, setView] = useState<View>('home');
  const [showLogin, setShowLogin] = useState(false);
  const [showCoins, setShowCoins] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans">
      <Header setView={setView} setShowLogin={setShowLogin} setShowCoins={setShowCoins} />
      
      {view === 'home' ? (
        <>
          <Hero setShowCoins={setShowCoins} />
          <Features />
        </>
      ) : (
        <PolicyViewer view={view} onClose={() => setView('home')} />
      )}

      <Footer setView={setView} />

      {(showCoins || showLogin) && (
        <CoinStore onClose={() => { setShowCoins(false); setShowLogin(false); }} />
      )}
    </div>
  );
};

const appRoot = createRoot(document.getElementById('root')!);
appRoot.render(<App />);
