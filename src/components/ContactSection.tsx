import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Send, Video, Instagram, Youtube } from "lucide-react";

const socials = [
  {
    name: "WhatsApp Support",
    icon: MessageCircle,
    link: "https://wa.me/254748406098",
    description: "+254 748 406 098",
    color: "hover:border-emerald",
  },
  {
    name: "WhatsApp Channel",
    icon: MessageCircle,
    link: "https://whatsapp.com/channel/0029VbB35fQHrDZjhSaxOG0c",
    description: "Join Channel",
    color: "hover:border-emerald",
  },
  {
    name: "Telegram",
    icon: Send,
    link: "https://t.me/thetradinghub101",
    description: "@thetradinghub101",
    color: "hover:border-blue-400",
  },
  {
    name: "TikTok",
    icon: Video,
    link: "https://www.tiktok.com/@destinythetrader?_r=1&_t=ZM-928G80D7Uvj",
    description: "@destinythetrader",
    color: "hover:border-pink-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: "https://www.instagram.com/fredtrades247?igsh=aHFpbjF5MzZwenp3",
    description: "@fredtrades247",
    color: "hover:border-purple-400",
  },
  {
    name: "YouTube",
    icon: Youtube,
    link: "https://youtube.com/@destinythetrader?si=QLB0ghiMU-FSuZ3I",
    description: "@destinythetrader",
    color: "hover:border-red-400",
  },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Support & <span className="text-gradient-gold">Mentorship</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Connect with us for personalized support and join our trading community
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 ${social.color}`}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <social.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{social.name}</h3>
                <p className="text-sm text-muted-foreground">{social.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
