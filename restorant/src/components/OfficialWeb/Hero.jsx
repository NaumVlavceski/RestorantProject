'use client'


export default function Hero() {
    return (
        <section id={'home'} className="relative w-full h-screen overflow-hidde">
            <video className="absolute top-0 left-0 w-full h-full object-cover"
                   src="../../../public/RestorantPromo.mp4"
                   autoPlay
                   loop
                   muted
            ></video>

            <div className="absolute top-0 left-0 w-full h-full bg-gray-900/50"></div>
            <div className="relative isolate px-6 pt-14 lg:px-8">

                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                            RESTORANT NAME
                        </h1>
                    </div>
                </div>
                <div className={`text-center py-30 lg:py-0`}>
                    <button
                        onClick={()=>document.getElementById('menu')?.scrollIntoView({behavior:'smooth'})}
                        className={`cursor-pointer rounded-full lg:py-4 lg:px-8 py-3 px-6 bg-rose-700 text-white `}>
                        View Menu
                    </button>
                </div>
            </div>
        </section>
    )
}
