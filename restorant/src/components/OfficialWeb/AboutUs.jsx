import {Award, Heart, Users} from "lucide-react";

const AboutUs = ({t}) => {
    const features = [
        {
            icon: Heart,
            title: t.passion_for_food,
            description: t.passion_desc,
        },
        {
            icon: Award,
            title: t.award_winning,
            description: t.award_desc,
        },
        {
            icon: Users,
            title: t.family_tradition,
            description: t.family_desc,
        },
    ]
    return (
        <section id='about'>
            <div >
                <div className="text-center py-10 ">
                    <div className="text-5xl font-bold">{t.about_us}</div>
                    <div
                        className="w-20 h-2 flex mx-auto my-3 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
                <div className="text-center text-xl max-w-6xl mx-auto">
                    {t.about_us_desc}
                </div>
            </div>
            <div className={"py-20"}>
                <div className="grid md:grid-cols-3 gap-3    ">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                        >
                            <div
                                className="inline-flex p-4 bg-amber-100 rounded-full mb-6 group-hover:bg-amber-600 transition-colors">
                                <feature.icon size={40}
                                              className="text-amber-600 group-hover:text-white transition-colors"/>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4 text-slate-900">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutUs