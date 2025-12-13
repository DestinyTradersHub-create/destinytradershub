import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

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
    feedback: "The educational resources at Destiny Traders Hub helped me understand market analysis better. The mentorship program provides great learning support.",
    avatar: jamesAvatar,
  },
  {
    name: "Adaeze Okonkwo",
    country: "Nigeria",
    flag: "🇳🇬",
    feedback: "I appreciate the structured approach to learning trading concepts. The community is supportive and the educational content is easy to follow.",
    avatar: adaezeAvatar,
  },
  {
    name: "Kwame Asante",
    country: "Ghana",
    flag: "🇬🇭",
    feedback: "The weekly educational sessions and analysis tools have helped me develop a better understanding of market dynamics and risk management.",
    avatar: kwameAvatar,
  },
  {
    name: "Thabo Molefe",
    country: "South Africa",
    flag: "🇿🇦",
    feedback: "As a beginner, the step-by-step learning materials made complex trading concepts much clearer. Great educational platform for newcomers.",
    avatar: thaboAvatar,
  },
  {
    name: "Grace Namara",
    country: "Uganda",
    flag: "🇺🇬",
    feedback: "The mentorship team is responsive and helpful. The community provides valuable educational discussions and learning opportunities every day.",
    avatar: graceAvatar,
  },
  {
    name: "Rajesh Sharma",
    country: "India",
    flag: "🇮🇳",
    feedback: "The platform offers comprehensive educational resources about Deriv trading. I've learned a lot about market analysis and trading strategies.",
    avatar: rajeshAvatar,
  },
  {
    name: "Maria Santos",
    country: "Philippines",
    flag: "🇵🇭",
    feedback: "Destinyfx provides patient and knowledgeable guidance. The educational approach focuses on understanding markets rather than making promises.",
    avatar: mariaAvatar,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="flex-shrink-0 w-[340px] md:w-[380px]">
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
  </div>
);

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            What Our <span className="text-gradient-gold">Students</span> Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from our community members about their learning experience
          </p>
        </motion.div>
      </div>

      {/* Infinite Scrolling Testimonials */}
      <div className="testimonials-marquee">
        <div className="testimonials-track">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
          ))}
          {/* Duplicate for seamless loop */}
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
          * These testimonials reflect individual learning experiences. Trading involves substantial risk. 
          Educational content does not constitute financial advice.
        </p>
      </div>
    </section>
  );
};

export default TestimonialsSection;