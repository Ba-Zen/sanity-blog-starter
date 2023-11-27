const SubmitButton = () => {
  return (
    <>
      <button className="inline-flex h-12 items-center rounded-xl border-2 border-slate-800 bg-gradient-to-r from-zinc-100 via-[#f59e0b] to-[#e11d48] bg-[length:200%_200%] bg-[0%_0%] px-6 font-medium text-black transition-all duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        Submit
      </button>
    </>
  );
};

const Email = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-y-4 md:flex-row md:gap-x-2">
      <input
        className="block h-12 w-full rounded-xl border-2 border-slate-800 border-transparent bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-zinc-500 focus:bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#f59e0b,#e11d48)] focus:outline-none"
        placeholder="Name"
      />
      <input
        className="block h-12 w-full rounded-xl border-2 border-slate-800 border-transparent bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-zinc-500 focus:bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#f59e0b,#e11d48)] focus:outline-none"
        placeholder="Email"
      />
      <SubmitButton />
    </div>
  );
};

export default Email;
