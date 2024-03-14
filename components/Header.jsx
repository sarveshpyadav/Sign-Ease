"use client"
export default function Footer({isBtn}){
    return (
      <header className="bg-white h-[70px] flex items-center justify-between pr-[18px] pl-[18px] border border-t-0 border-l-0 border-r-0 mb-6">
        <h2 className="text-xl font-semibold text-black">Sign<span className="text-blue-700">Ease</span></h2>
        <button onClick={() => window.location.reload()} className="bg-blue-700 p-3 text-white text-sm pl-4 pr-4 transition-transform outline-none border-none hover:scale-95">Create New</button>
      </header>
    );
  };
