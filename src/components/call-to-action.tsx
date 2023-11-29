import Link from "next/link";
import { Button } from "@/components/ui/button";
import { bricolage } from "@/styles/fonts";
// import Email from "./email";

export default function CallToAction() {
  return (
    <div>
      <div className="mx-auto max-w-7xl py-24 sm:py-32 ">
        <div
          className={`${bricolage.className} pb-[30px] pt-[20px] text-[28px] font-bold leading-[1.12] md:pb-[40px] md:pt-[30px]`}
        >
          Stay in the Loop
        </div>
        <div className="relative isolate overflow-hidden border px-4 py-24 text-center sm:rounded-3xl ">
          <h5
            className={`${bricolage.className} mx-auto mb-5 max-w-lg text-center text-[24px] font-bold leading-[1.5] md:mb-[30px] md:py-6 md:text-[36px] md:leading-[1] lg:py-8`}
          >
            Sign up for the latest news directly to your inbox
          </h5>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 ">
            {/* Thank you for using Variant Vault. I hope you enjoy it. */}
          </p>
          <Email />
          <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-400 via-white to-white"></div>
          {/* <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#E935C1" />
                <stop offset={1} stopColor="#f43f5e" />
              </radialGradient>
            </defs>
          </svg> */}
        </div>
      </div>
    </div>
  );
}
const Email = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center gap-y-4 md:flex-row md:gap-x-2">
      <input
        className="block h-12 w-full rounded-lg border-2 border-slate-800 border-transparent bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-zinc-500 focus:bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#f59e0b,#e11d48)] focus:outline-none"
        placeholder="Name"
      />
      <input
        className="block h-12 w-full rounded-lg border-2 border-slate-800 border-transparent bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#334454,#334454)]	bg-origin-border px-3 py-2 text-slate-200 transition-all duration-500 [background-clip:padding-box,_border-box] placeholder:text-zinc-500 focus:bg-[linear-gradient(#fff,#fff),linear-gradient(to_right,#f59e0b,#e11d48)] focus:outline-none"
        placeholder="Email"
      />
      <div className="flex h-12 items-center justify-center gap-x-6">
        <Link href="#">
          <Button>Submit</Button>
        </Link>
      </div>
    </div>
  );
};
