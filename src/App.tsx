import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Play, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

// --- 鳩のSVGコンポーネント ---
const Dove = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.731 8.025c-1.988-1.525-4.663-1.887-6.963-.95-1.562.638-2.912 1.763-3.887 3.188-.662.975-1.162 2.063-1.462 3.213l-3.625-2.225c-1.287-.788-2.875-.95-4.287-.438L.42 11.25c-.588.212-1.025.75-1.112 1.375-.088.625.188 1.25.712 1.6l4.287 2.862c1.238.825 2.763 1.05 4.188.613l5.087-1.562c1.262-.388 2.412-1.075 3.363-2.013l3.862-3.825c1.025-1.013 1.513-2.463 1.338-3.888-.063-.588-.363-1.112-.838-1.425z"/>
  </svg>
);

// --- 希望を表す光の筋（サンビーム） ---
const Sunbeams = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50 mix-blend-overlay">
    <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[150vh] bg-gradient-to-b from-white/60 to-transparent rotate-[35deg] transform origin-top-left blur-3xl"></div>
    <div className="absolute top-[-10%] left-[30%] w-[40vw] h-[150vh] bg-gradient-to-b from-white/40 to-transparent rotate-[40deg] transform origin-top-left blur-2xl"></div>
  </div>
);

// --- スクロール連動：鳩のアニメーション ---
const ScrollDoves = () => {
  const { scrollY } = useScroll();
  
  // よりゆっくり、高く飛んでいくように調整（希望・名残惜しさ）
  const d1x = useTransform(scrollY, [0, 3000], ['0vw', '-45vw']);
  const d1y = useTransform(scrollY, [0, 3000], ['0vh', '-70vh']);
  const d1scale = useTransform(scrollY, [0, 3000], [1, 0.6]);
  
  const d2x = useTransform(scrollY, [0, 3500], ['0vw', '-55vw']);
  const d2y = useTransform(scrollY, [0, 3500], ['0vh', '-50vh']);
  const d2scale = useTransform(scrollY, [0, 3500], [1, 0.5]);

  const d3x = useTransform(scrollY, [0, 2500], ['0vw', '-35vw']);
  const d3y = useTransform(scrollY, [0, 2500], ['0vh', '-60vh']);
  const d3scale = useTransform(scrollY, [0, 2500], [1, 0.7]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <motion.div style={{ x: d1x, y: d1y, scale: d1scale }} className="absolute top-[35%] right-[25%]">
        <Dove className="w-16 h-16 text-white opacity-90 drop-shadow-lg" />
      </motion.div>
      <motion.div style={{ x: d2x, y: d2y, scale: d2scale }} className="absolute top-[45%] right-[10%]">
        <Dove className="w-12 h-12 text-white opacity-80 drop-shadow-lg" />
      </motion.div>
      <motion.div style={{ x: d3x, y: d3y, scale: d3scale }} className="absolute top-[55%] right-[35%]">
        <Dove className="w-10 h-10 text-white opacity-70 drop-shadow-lg" />
      </motion.div>
    </div>
  );
};

// --- スクロール連動：桜の花びら（被写界深度を追加して名残惜しさを演出） ---
const ScrollPetal = ({ startX, startY, endX, endY, rotateStart, rotateEnd, speed, size, delay, blur, opacity }: any) => {
  const { scrollY } = useScroll();
  const scrollYOffset = useTransform(scrollY, [0, speed], [0, endY - startY]);
  const scrollXOffset = useTransform(scrollY, [0, speed], [0, endX - startX]);
  const scrollRotate = useTransform(scrollY, [0, speed], [rotateStart, rotateEnd]);

  return (
    <motion.div 
      className="absolute z-20 pointer-events-none text-sakura drop-shadow-sm"
      style={{ 
        left: startX, 
        top: startY,
        y: scrollYOffset,
        x: scrollXOffset,
        rotate: scrollRotate,
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        opacity: opacity
      }}
      animate={{
        y: [0, 30, 0],
        x: [0, 20, -20, 0],
      }}
      transition={{
        duration: 5 + Math.random() * 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    >
      <svg viewBox="0 0 30 30" fill="currentColor" className="w-full h-full">
        <path d="M15,2 C10,2 5,8 5,15 C5,22 15,28 15,28 C15,28 25,22 25,15 C25,8 20,2 15,2 Z" />
      </svg>
    </motion.div>
  );
};

const ScrollSakura = () => {
  const [petals, setPetals] = useState<any[]>([]);
  useEffect(() => {
    const newPetals = Array.from({ length: 40 }).map((_, i) => {
      // 遠近感を出すためのランダム値
      const isForeground = Math.random() > 0.8;
      const isBackground = Math.random() > 0.6 && !isForeground;
      
      return {
        id: i,
        startX: `${Math.random() * 100}vw`,
        startY: `${Math.random() * 100}vh`,
        endX: (Math.random() * 500 - 250),
        endY: (Math.random() * 1000 + 500),
        rotateStart: Math.random() * 360,
        rotateEnd: Math.random() * 360 + 360,
        speed: 1000 + Math.random() * 2500,
        size: isForeground ? 20 + Math.random() * 15 : (isBackground ? 6 + Math.random() * 4 : 10 + Math.random() * 8),
        delay: Math.random() * 3,
        blur: isForeground ? 3 + Math.random() * 2 : (isBackground ? 2 + Math.random() * 2 : 0),
        opacity: isForeground ? 0.9 : (isBackground ? 0.4 : 0.7)
      };
    });
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map(p => <ScrollPetal key={p.id} {...p} />)}
    </div>
  );
};

// --- 1. 卒業生向けの挨拶セクション ---
const GreetingSection = () => (
  <section className="w-full max-w-4xl mx-auto mt-12 relative">
    {/* 縦書きのポエム（感慨深さを強調） */}
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 2, delay: 0.5 }}
      className="hidden lg:block absolute -left-16 top-10 vertical-rl text-ink/60 tracking-[0.3em] text-sm font-light h-64"
    >
      あの日見た桜を、私たちは忘れない。
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="glass-card rounded-3xl p-6 sm:p-10 md:p-16 lg:p-20 text-center relative"
    >
      {/* カード内の淡い光（境界をぼかすために円形グラデーションに変更） */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-white/10 to-transparent pointer-events-none"></div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-8 sm:mb-10 text-ink tracking-[0.15em] leading-[1.5]">
        ご卒業<br className="md:hidden"/>おめでとうございます
      </h1>
      
      <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10 opacity-60">
        <div className="w-8 sm:w-12 h-px bg-sakura-dark"></div>
        <Sparkles className="w-4 h-4 text-sakura-dark" />
        <div className="w-8 sm:w-12 h-px bg-sakura-dark"></div>
      </div>

      <p className="text-base sm:text-lg md:text-xl leading-[2.2] sm:leading-[2.5] font-light text-ink/85 text-justify md:text-center tracking-wide">
        先輩方、ご卒業おめでとうございます。<br className="hidden md:block"/>
        <br className="hidden md:block"/>
        一緒に笑い合った部室、遅くまで残って準備した文化祭、<br className="hidden md:block"/>
        何気ない毎日のすべてが、私たちの大切な思い出です。<br/>
        <br/>
        いつも優しく、時には厳しく導いてくれたその背中を、<br className="hidden md:block"/>
        私たちはこれからもずっと目標にしていきます。<br/>
        <br/>
        これから始まる新しい日々が、<br className="hidden md:block"/>
        たくさんの笑顔と素晴らしい出会いに満ちたものになりますように。
      </p>
    </motion.div>
  </section>
);

// --- 2. 動画（Movie）セクション ---
const MovieSection = () => (
  <section className="w-full max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="glass-card rounded-3xl p-4 sm:p-6 md:p-10 relative"
    >
      {/* 動画の後ろの温かい後光 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-sunlight/40 blur-3xl rounded-full pointer-events-none"></div>

      <div className="text-center mb-8 sm:mb-10 relative z-10">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-light tracking-[0.2em] text-ink">Graduation Movie</h2>
        <p className="text-xs sm:text-sm md:text-base text-ink/60 mt-2 sm:mt-3 tracking-widest">3年間の思い出を振り返って</p>
      </div>
      
      <div 
        className="relative aspect-video group cursor-pointer"
        style={{ 
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)', 
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 95%)' 
        }}
      >
        <img 
          src="https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&w=1280&q=80" 
          alt="Movie Thumbnail" 
          className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:bg-white">
            <Play className="w-8 h-8 md:w-10 md:h-10 text-sakura-dark ml-2" fill="currentColor" />
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

// --- 3. メッセージカルーセルセクション ---
const messages = [
  { id: 1, text: "ご卒業おめでとうございます！部活の帰り道、一緒にアイスを食べながら語り合った時間が一番の思い出です。先輩のこれからの活躍を、ずっとずっと応援しています！", author: "2年 〇〇部 後輩一同" },
  { id: 2, text: "先輩たちが引退してからの日々、その存在の大きさを痛感しています。いつも私たちの相談に乗ってくれてありがとうございました。たまには部活にも顔を出してくださいね！", author: "1年 有志一同" },
  { id: 3, text: "文化祭での先輩たちのクラスの出し物、本当にかっこよかったです。私たちも先輩たちのような最高な学年になれるよう頑張ります。ご卒業、本当におめでとうございます！", author: "2年 実行委員一同" },
];

const MessageSection = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % messages.length);
  const prev = () => setIndex((prev) => (prev - 1 + messages.length) % messages.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full max-w-3xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="text-xl sm:text-2xl md:text-4xl font-light tracking-[0.2em] text-ink">Messages</h2>
        <p className="text-xs sm:text-sm md:text-base text-ink/60 mt-2 sm:mt-3 tracking-widest">後輩たちからの、贈る言葉</p>
      </motion.div>
      
      <div className="relative">
        <div className="overflow-hidden px-2 sm:px-4 py-4 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="glass-card rounded-3xl p-6 sm:p-10 md:p-16 relative"
            >
              <Quote className="absolute top-4 sm:top-8 left-4 sm:left-8 w-8 h-8 sm:w-12 sm:h-12 text-sakura/40 rotate-180" />
              <p className="text-base sm:text-lg md:text-xl leading-[2.0] sm:leading-[2.2] font-light text-ink/85 mt-6 sm:mt-8 mb-8 sm:mb-10 relative z-10 text-justify">
                {messages[index].text}
              </p>
              <div className="text-right relative z-10">
                <span className="text-xs sm:text-sm md:text-base font-medium text-ink/70 tracking-widest">
                  — {messages[index].author}
                </span>
              </div>
              <Quote className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-8 h-8 sm:w-12 sm:h-12 text-sakura/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-4 sm:gap-8 mt-2">
          <button onClick={prev} className="p-3 sm:p-4 rounded-full glass-card hover:bg-white/80 transition-all text-ink/50 hover:text-ink cursor-pointer hover:scale-105">
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex gap-2 sm:gap-3">
            {messages.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === index ? 'bg-sakura-dark scale-125' : 'bg-sakura/40 hover:bg-sakura/60'}`}
              />
            ))}
          </div>
          <button onClick={next} className="p-4 rounded-full glass-card hover:bg-white/80 transition-all text-ink/50 hover:text-ink cursor-pointer hover:scale-105">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- 4. エピローグ（希望に満ちた締めくくり） ---
const EndingSection = () => (
  <section className="w-full max-w-3xl mx-auto text-center pt-10 pb-[40vh] md:pb-[50vh] relative">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 1.5 }
        }
      }}
      className="flex flex-col items-center relative z-10"
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.8 },
          visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 2, ease: "easeOut" } }
        }}
      >
        <Dove className="w-8 h-8 sm:w-10 sm:h-10 text-sakura-dark/70 mb-6 sm:mb-8 mt-4" />
      </motion.div>
      
      <motion.p 
        variants={{
          hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
          visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 2, ease: "easeOut" } }
        }}
        className="text-xl sm:text-2xl md:text-3xl font-light tracking-[0.25em] text-ink/80 leading-loose"
      >
        先輩たちの未来が、<br className="md:hidden"/>素晴らしいものでありますように。
      </motion.p>
    </motion.div>
  </section>
);

// --- メインレイアウト ---
export default function App() {
  return (
    <div className="min-h-screen bg-watercolor relative">
      <div className="fixed inset-0 paper-texture z-50"></div>
      <Sunbeams />
      
      {/* CSSで水彩画の背景（桜の木と丘）を表現 */}
      <div className="fixed top-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-sakura/25 blur-[80px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] left-[-10%] w-[120vw] h-[60vh] bg-grass/40 blur-[60px] rounded-[50%] pointer-events-none z-0"></div>

      <ScrollDoves />
      <ScrollSakura />

      <main className="relative z-10 flex flex-col items-center pt-20 sm:pt-32 pb-10 px-4 sm:px-8 md:px-12 space-y-24 sm:space-y-32 md:space-y-40">
        <GreetingSection />
        <MovieSection />
        <MessageSection />
        <EndingSection />
      </main>
    </div>
  );
}
