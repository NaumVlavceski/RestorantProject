import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = ({t}) => {
    const contactInfo = [
        {
            icon: MapPin,
            title: t.address,
            details: '123 Italian Street, Downtown',
        },
        {
            icon: Phone,
            title: t.phone,
            details: '+1 (555) 123-4567',
        },
        {
            icon: Mail,
            title: t.email,
            details: 'info@bellacucina.com',
        },
    ];
    // const {t,toggleLanguage} = useLanguage()
    return (
        <section id="contact" className="py-24 px-6 bg-slate-900 text-white">


            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-center mb-6">
                    {t.contact}
                </h2>
                <div
                    className="w-20 h-2 flex mx-auto my-3 mb-8 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full"></div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ">
                    {contactInfo.map((info) => (
                        <div className="text-center">
                            <div className="inline-flex p-4 bg-amber-600 rounded-full mb-4">
                                <info.icon size={32} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                            <p className="text-gray-300 ">{info.details}</p>
                        </div>
                    ))}
                </div>

                {/*<div className="bg-slate-800 p-8 rounded-lg max-w-2xl mx-auto">*/}
                {/*    <h3 className="text-2xl font-semibold mb-6 text-center">Make a Reservation</h3>*/}
                    {/*<form className="space-y-4">*/}
                    {/*    <div className="grid md:grid-cols-2 gap-4">*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            placeholder="Name"*/}
                    {/*            className="px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-white placeholder-gray-400"*/}
                    {/*        />*/}
                    {/*        <input*/}
                    {/*            type="email"*/}
                    {/*            placeholder="Email"*/}
                    {/*            className="px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-white placeholder-gray-400"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="grid md:grid-cols-2 gap-4">*/}
                    {/*        <input*/}
                    {/*            type="date"*/}
                    {/*            className="px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-white"*/}
                    {/*        />*/}
                    {/*        <input*/}
                    {/*            type="time"*/}
                    {/*            className="px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-white"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <textarea*/}
                    {/*        placeholder="Special requests"*/}
                    {/*        rows={4}*/}
                    {/*        className="w-full px-4 py-3 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 text-white placeholder-gray-400"*/}
                    {/*    ></textarea>*/}
                    {/*    <button*/}
                    {/*        type="submit"*/}
                    {/*        className="w-full py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"*/}
                    {/*    >*/}
                    {/*        Reserve Table*/}
                    {/*    </button>*/}
                    {/*</form>*/}
            {/*    </div>*/}
            </div>
        </section>
    );
};

export default Contact;
