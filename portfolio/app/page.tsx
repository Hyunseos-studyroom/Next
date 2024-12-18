import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
      <main className="w-screen h-screen relative">
          <div
              className="flex items-center w-full h-full bg-cover bg-center"
              style={{backgroundImage: "url(/main-bg.webp)"}}
          >
              <div className="pl-20 md:pl-40 pb-56 md:pb-20 flex flex-col gap-5 z-[10] max-w-[750px]">
                  <h1 className="text-[50px] text-white font-semibold">
                      모든 것이 가능합니다. <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-red-500">
              {" "}
                          개쩌는 유니콘
            </span>
                      과 함께라면
                  </h1>
                  <p className="text-gray-200 hidden md:block">
                      Next 개꿀잼이네 생각보다 <br />
                      Svelte 왜 함ㅋㅋㅋㅋㅋ
                  </p>
                  <div className="flex-col md:flex-row hidden md:flex gap-5">
                      <Link
                          href="/my-skills"
                          className="rounded-[20px] group relative bg-blue-500 hover:bg-blue-400 px-5 py-3 text-lg text-white max-w-[200px]"
                      >
                          Learn more
                      </Link>
                      <Link
                          href="/my-projects"
                          className="rounded-[20px] group relative bg-trasparent px-5 border border-white py-3 text-lg text-white max-w-[200px]"
                      >
                          <div
                              className="absolute rounded-[20px] z-[1] bg-white inset-0 opacity-0 group-hver:opacity-20"/>
                          My projects
                      </Link>
                      <Link
                          href="/contact-me"
                          className="rounded-[20px] group relative bg-trasparent border border-white px-5 py-3 text-lg text-white max-w-[200px]"
                      >
                          <div
                              className="absolute rounded-[20px] z-[1] bg-white inset-0 opacity-0 group-hver:opacity-20"/>
                          Contact me
                      </Link>
                  </div>
              </div>
          </div>

          <div className="absolute flex bottom-10 z-[20] right-5 flex-col md:hidden gap-5">
              <Link
                  href="/my-skills"
                  className="rounded-[20px] group bg-blue-500 px-5 py-3 text-lg text-white max-w-[200px]"
              >
                  Learn more
              </Link>

              <Link
                  href="/my-projects"
                  className="rounded-[20px] group bg-trasparent border border-white px-5 py-3 text-lg text-white max-w-[200px]"
              >
                  My projects
              </Link>
              <Link
                  href="/contact-me"
                  className="rounded-[20px] group bg-trasparent border border-white px-5 py-3 text-lg text-white max-w-[200px]"
              >
                  Contact me
              </Link>
          </div>

          <div className={"absolute bottom-0 right-0 z-[10]"}>
              <Image src={"/horse.png"} alt={"horce"} height={300} width={300} className={"absolute right-55 top-40"} />
              <Image src={"/cliff.webp"} alt={"cliff"} height={400} width={400} />
          </div>

          <div className={"absolute bottom-0 h-full w-screen z-[5]"}>
              <Image src={"/trees.webp"} alt={"trees"} width={2000} height={2000} className={"absolute right-55 top-40"} />
          </div>
          <Image src={"/stars.png"} alt={"stars"} height={300} width={300} className={"absolute top-10 left-0 z-[10]"} />
      </main>
  );
}
