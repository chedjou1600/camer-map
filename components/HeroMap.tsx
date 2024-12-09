"use client";

export default function HeroMap() {
  return (
    <section id="HeroMap">
      <div className=" bg-[url('/img/font.png')] bg-cover bg-center min-h-screen flex flex-col ">
        <div className="mx-24 mt-24 text-black rounded-lg">
          <div className="bg-[#ffffff16] text-black rounded-lg flex gap-2">
            <div className="text-white-50 flex-1 basis-4/5 bg-[#ffffff16]  rounded-md p-4">
              <div className="w-full h-[500px]">carte img1</div>
            </div>
            <div className="text-white-50 flex-1 basis-1/5 bg-[#dedb329a]  rounded-md p-4">
              Statistiques resultats
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
