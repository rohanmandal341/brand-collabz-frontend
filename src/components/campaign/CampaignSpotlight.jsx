import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

import useSpotlightIndex, {
  setSpotlightIndex,
} from "../../hooks/useSpotlightIndex";

import "./CampaignSpotlight.css";

const slides = [
  {
    id: 1,
    theme: "bc-theme-brand",

    title: "Grow Your Brand.",
    highlight: "Find the Right Creators.",

    description:
      "Connect with talented creators, launch campaigns and build meaningful brand partnerships that people actually trust.",

    points: [
      "Browse creators by niche and audience size",
      "Launch paid or product barter campaigns",
      "Review every application in one place",
    ],

    link: "/brand-pricing",

    image:
      "https://zodel.com/spotlight/wp-content/uploads/2024/02/Zodel-Models-Bring-Professionalism-to-Your-Brand-Campaign.jpg",

    alt: "Professional male and female brand models",
    position: "center 35%",
  },

  {
    id: 2,
    theme: "bc-theme-campaign",

    title: "10,000+ Campaigns.",
    highlight: "More Ways to Grow.",

    description:
      "Discover exciting collaborations, connect with brands and turn your creativity into real opportunities, from product gifting to paid partnerships.",

    points: [
      "Paid campaigns and product barter deals",
      "Filter by category, city and follower count",
      "Apply in a few taps, straight from the brief",
    ],

    link: "/for-creators",

    images: [
      "https://tse2.mm.bing.net/th/id/OIP.Y9pF6FShRX0fg0y-IeCpygHaJ1?r=0&w=1856&h=2464&rs=1&pid=ImgDetMain&o=7&rm=3",
      "https://mediaslide-europe.storage.googleapis.com/mc2tlv/pictures/1171/2322/large-1646911900-fd7df714b8d626dcbff824d06f99612d.jpg",
    ],
  },

  {
    id: 3,
    theme: "bc-theme-creator",

    title: "Create. Collaborate.",
    highlight: "Earn.",

    description:
      "Join Brand Collabz and partner with leading brands for exciting opportunities that fit your audience and your style.",

    points: [
      "Pick campaigns that match your content",
      "Earn money or receive products for your work",
      "Build lasting relationships with brands",
    ],

    link: "/creator-pricing",

    image:
      "https://www.womenentrepreneursreview.com/entrepreneur_images/news_images/686dddf94a56a_1.jpg",

    alt: "Female creator collaborating with a beauty brand",
    position: "center 20%",
  },
];

export default function CampaignSpotlight() {
  // One shared 5s clock: the hero slide and the campaign card images change together.
  const active = useSpotlightIndex();

  useEffect(() => {
    // Preload all slide images.
    slides.forEach((slide) => {
      const urls = slide.images || [slide.image];

      urls.forEach((url) => {
        if (!url) return;

        const img = new Image();
        img.src = url;
      });
    });
  }, []);

  return (
    <section className="bc-spotlight">
      <div
        className="bc-hero"
        aria-label="Featured Brand Collabz announcements"
      >
        {slides.map((slide, index) => {
          const isActive = active === index;

          return (
            <article
              key={slide.id}
              className={`bc-slide ${slide.theme} ${
                isActive ? "bc-active" : ""
              }`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              {/* LEFT TEXT SECTION */}
              <div className="bc-copy">
                <div className="bc-copy-inner">
                  <div className="bc-text-content">
                    <h1>
                      {slide.title}
                      <span>{slide.highlight}</span>
                    </h1>

                    <p>{slide.description}</p>

                    <ul className="bc-points">
                      {slide.points.map((point) => (
                        <li key={point}>
                          <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bc-action">
                    <Link
                      to={slide.link}
                      className="bc-button"
                      tabIndex={isActive ? 0 : -1}
                    >
                      Explore Deals
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT IMAGE SECTION */}
              <div className="bc-visual">
                {slide.images ? (
                  <div className="bc-duo">
                    {slide.images.map((src, i) => (
                      <div className="bc-duo-frame" key={src}>
                        <img
                          src={src}
                          alt={
                            i === 0
                              ? "Fashion campaign creator"
                              : "Professional fashion model"
                          }
                          className="bc-duo-image"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="bc-main-image"
                    style={{
                      objectPosition: slide.position,
                    }}
                    loading="eager"
                  />
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* DOT NAVIGATION */}
      <div className="bc-pagination">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setSpotlightIndex(index)}
            className={`bc-pagination-dot ${
              active === index ? "bc-dot-active" : ""
            }`}
            aria-label={`Show slide ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}