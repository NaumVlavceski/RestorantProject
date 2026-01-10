import {MapPin, Phone, Mail, Clock} from 'lucide-react';

const Location = ({t}) => {

    return (
        <section id="location" className="py-20 ">
            <div className="text-center py-10 ">
            <div className="text-5xl font-bold">{t.location}</div>
            <div
                className="w-20 h-2 flex mx-auto my-3 bg-linear-to-r from-yellow-500 to-orange-500 rounded-full"></div>
        </div>
            <div className="flex justify-center">

                <iframe
                    title="restaurant-location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d376.2946124479879!2d20.810167244766525!3d41.01746071116742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350c7cac64cb3af%3A0x52c1df6aea46e3b1!2z0JzQsNGA0LrQtdGCINCi0LjQvS3QndCw0LTQsA!5e0!3m2!1sen!2smk!4v1764346750340!5m2!1sen!2smk"
                    width="80%"
                    className="h-120"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    );
};

export default Location;
