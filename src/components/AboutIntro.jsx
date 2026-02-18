import { markdownify } from "@utils/textConverter";
import React from 'react';

const AboutIntro = ({ about }) => {
  const image = (about.images && about.images[0]) || "/images/about/yarvolk_about.webp";
  const whatsappLink =
    "https://wa.me/380932404066?text=Hello%2C%20Yaroslav.%20How%20are%20you%20doing%3F";

  return (
    <div className="container">
      <div className="row justify-center items-center">
        <div
          className="lg:col-4 md:col-6 col-10 mb-8 md:mb-10 lg:mb-0"
          data-aos="fade-up-sm"
        >
          <div className="relative mx-8 z-10">
            <img
              src={image}
              alt="About"
              width={500}
              height={607}
              className="rounded-lg bg-light/10 w-full h-auto"
            />
          </div>
        </div>

        <div className="lg:col-5 md:col-10 text-center lg:text-left">
          <div className="pl-0 lg:pl-8">
            <div className="mb-10 mt-2 md:mt-4 lg:mt-0">
              <p className="text-2xl leading-snug mb-4 text-balance" data-aos="fade-up-sm" data-aos-delay="50">{about.title}</p>
              <div className="text-black/75 text-balance" data-aos="fade-up-sm" data-aos-delay="100" dangerouslySetInnerHTML={{ __html: markdownify(about.description) }}></div>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3" data-aos="fade-up-sm" data-aos-delay="150">
              <a className="button button-dark h-[47px]" href="/contact">
                <span className="inline-flex items-center h-full leading-none">Contact</span>
              </a>
              <a
                className="button button-whatsapp h-[47px]"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
              >
                <span className="inline-flex items-center h-full gap-2 leading-none">
                  <img src="/images/whatsapp.svg" alt="" width="18" height="18" className="block" aria-hidden="true" />
                  Whatsapp
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutIntro;
