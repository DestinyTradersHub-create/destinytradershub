import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// Import testimonial avatars
import jamesAvatar from "@/assets/testimonials/james.jpg";
import adaezeAvatar from "@/assets/testimonials/adaeze.jpg";
import kwameAvatar from "@/assets/testimonials/kwame.jpg";
import thaboAvatar from "@/assets/testimonials/thabo.jpg";
import graceAvatar from "@/assets/testimonials/grace.jpg";
import rajeshAvatar from "@/assets/testimonials/rajesh.jpg";
import mariaAvatar from "@/assets/testimonials/maria.jpg";

const testimonials = [
  {
    name: "James Ochieng",
    country: "Kenya",
    flag: "🇰🇪",
    feedback: "Destiny Traders Hub changed my life! The free bots are incredible and the mentorship helped me become profitable within weeks.",
    avatar: jamesAvatar,
  },
  {
    name: "Adaeze Okonkwo",
    country: "Nigeria",
    flag: "🇳🇬",
    feedback: "I was skeptical at first, but the results speak for themselves. Made my first $500 profit in the second month of trading!",
    avatar: adaezeAvatar,
  },
  {
    name: "Kwame Asante",
    country: "Ghana",
    flag: "🇬🇭",
    feedback: "The weekly tips and analysis tools are worth their weight in gold. Best decision I made was joining this community.",
    avatar: kwameAvatar,
  },
  {
    name: "Thabo Molefe",
    country: "South Africa",
    flag: "🇿🇦",
    feedback: "From complete beginner to consistent trader. The step-by-step guidance made everything so clear and achievable.",
    avatar: thaboAvatar,
  },
  {
    name: "Grace Namara",
    country: "Uganda",
    flag: "🇺🇬",
    feedback: "The support team is amazing! They respond quickly and the WhatsApp group is full of valuable insights every day.",
    avatar: graceAvatar,
  },
  {
    name: "Rajesh Sharma",
    country: "India",
    flag: "🇮🇳",
    feedback: "Trading across time zones is no problem with these bots. Profits while I sleep - that's the dream come true!",
    avatar: rajeshAvatar,
  },
  {
    name: "Maria Santos",
    country: "Philippines",
    flag: "🇵🇭",
    feedback: "Destinyfx is a true mentor. Patient, knowledgeable, and genuinely cares about our success. Highly recommended!",
    avatar: mariaAvatar,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by <span className="text-gradient-gold">Traders</span> Worldwide
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real stories from real traders who transformed their financial future
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-2 mb-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="p-3 rounded-xl bg-secondary border border-border hover:border-primary/50 disabled:opacity-30 transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="p-3 rounded-xl bg-secondary border border-border hover:border-primary/50 disabled:opacity-30 transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[340px] md:w-[380px] snap-start"
            >
              <div className="glass-card p-6 h-full flex flex-col hover:border-primary/30 transition-all">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-primary/30 mb-4" />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Feedback */}
                <p className="text-foreground mb-6 flex-grow leading-relaxed">
                  "{testimonial.feedback}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.flag} {testimonial.country}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
