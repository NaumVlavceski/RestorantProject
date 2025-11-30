import {Award, Heart, Users} from "lucide-react";

const AboutUs = () => {
    const features = [
        {
            icon: Heart,
            title: 'Passion for Food',
            description: 'Every dish is prepared with love and attention to detail',
        },
        {
            icon: Award,
            title: 'Award Winning',
            description: 'Recognized for excellence in Italian cuisine',
        },
        {
            icon: Users,
            title: 'Family Tradition',
            description: 'Recipes passed down through generations',
        },
    ]
    return (
        <section id='about'>
            <div >
                <div className="text-center py-10 ">
                    <div className="text-5xl font-bold">About Us</div>
                    <div
                        className="w-20 h-2 flex mx-auto my-3 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full"></div>
                </div>
                <div className="text-center text-xl max-w-6xl mx-auto">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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