"use client"
import { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";
interface IconProps {
  Icon: IconType;
}

import { FaInstagram} from "react-icons/fa";



import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowRight, Code, Globe, Smartphone, Sun, Moon, MessageCircle, Menu, X } from "lucide-react"
import { Bar, Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [accentColor, setAccentColor] = useState("red") // Default blue
  const { scrollYProgress } = useScroll()

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleMenu = () => setMenuOpen(!menuOpen)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty("--accent-color", accentColor)
  }, [accentColor])

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div
        className={`bg-gradient-to-br from-background to-background-light dark:from-background-dark dark:to-background-darker text-foreground dark:text-foreground-dark transition-colors duration-300`}
      >
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} menuOpen={menuOpen} toggleMenu={toggleMenu} />

        <main className="container mx-auto px-4 py-12">
          <HeroSection darkMode={darkMode} scrollYProgress={scrollYProgress} />
          <ServicesSection darkMode={darkMode} />
          <PortfolioSection darkMode={darkMode} />
          <ProcessSection darkMode={darkMode} />
          {/* <TeamSection darkMode={darkMode} /> */}
          {/* <TestimonialsSection darkMode={darkMode} />
          <StatsSection darkMode={darkMode} />*/}
          <ContactSection darkMode={darkMode} /> 
        </main>

        <Footer darkMode={darkMode} />

        {/* <AnimatePresence>
          {chatOpen && <ChatBot darkMode={darkMode} onClose={() => setChatOpen(false)} />}
        </AnimatePresence> */}

        <motion.div className="fixed bottom-4 right-4 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <a target="_blank" href="https://wa.me/message/ALF2AQCFGOS5G1">
          <Button
            size="lg"
            className="rounded-full bg-accent hover:bg-accent-hover text-accent-foreground"
            onClick={() => setChatOpen(true)}
          >
            <MessageCircle className="mr-2" /> Chat with us
          </Button>
            </a>
        </motion.div>

        {/* <ThemeCustomizer accentColor={accentColor} setAccentColor={setAccentColor} /> */}
      </div>
    </div>
  )
}

function NavBar({ darkMode, toggleDarkMode, menuOpen, toggleMenu }:{ darkMode: any, toggleDarkMode: any, menuOpen : any, toggleMenu : any}) {
  const navItems = ["Services", , "Process",  "Contact"]

  return (
    <motion.header
      className="sticky top-0 z-50 bg-background/80 dark:bg-background-dark/80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/">
          <div className="flex items-center content-center gap-2">
          <img src="./title.jpg" alt="." className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Debdevify</h1>
          </div>
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <a href={`#${item.toLowerCase()}`} className=" transition-shadow">
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
          {/* <Switch checked={darkMode} onCheckedChange={toggleDarkMode} className="ml-4" /> */}
          <img className="w-16 h- ml-2" src="./aa.png" /> 
        </nav>
        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background dark:bg-background-dark"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <motion.li key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="block py-2 hover:text-accent transition-colors"
                      onClick={toggleMenu}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
              {/* <div className="flex items-center justify-between mt-4 pt-4 border-t border-border dark:border-border-dark"> */}
                {/* <span>Dark Mode</span> */}
                {/* <Switch checked={darkMode} onCheckedChange={toggleDarkMode} /> */}
              {/* </div> */}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function HeroSection({ darkMode, scrollYProgress }:{ darkMode:any, scrollYProgress:any }) {
  const y = useTransform(scrollYProgress, [0, 0.5], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.section className="relative h-screen flex items-center justify-center text-center" style={{ y, opacity }}>
      <div className="z-10">
        <motion.h2
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🚀 Looking for expert developers to bring your ideas to life? Welcome to Debdevify!
        </motion.h2>
        <motion.p
          className="text-sm md:text-2xl mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          We specialize in Next.js, React, MERN Stack, and DevOps, delivering high-performance websites, apps & bots.
<br />
✅ Fast Delivery | ✅ Top-Quality Work | ✅ Affordable Pricing
<br />

        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <a target="_blank" href="https://wa.me/message/ALF2AQCFGOS5G1">
          <Button size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
          
          Talk to us<ArrowRight className="ml-2" />
          </Button>
          </a>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-10 dark:opacity-20" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 dark:opacity-20" />
      </div>
    </motion.section>
  )
}

function ServicesSection({ darkMode }:{darkMode:any}) {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Responsive and dynamic websites built with Node.js React or Nextjs",
    },
    { icon: Smartphone, title: "Mobile Apps", description: "Cross-platform mobile applications using React Native" },
    { icon: Code, title: "DevOps Solutions", description: `✅ 24/7 Server Monitoring , ✅ AWS, Azure, GCP Cloud Solutions, ✅ CI/CD Pipeline Setup
     ✅ Auto Scaling and Server Management` },
  ]

  return (
    <section id="services" className="py-20">
      <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Services</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-background/50 dark:bg-background-dark/50 border border-border dark:border-border-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
          >
            <service.icon className="w-12 h-12 mb-4 text-accent " stroke="white" />
            <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
            <p className="text-slate-400 dark:text-muted-dark">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
import { Projects } from "@/comp/proj"
function PortfolioSection({ darkMode }:{darkMode:any}) {
  return (
        <Projects/>
    // <section id="portfolio" className="py-20">
    //   <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Work</h3>
    //   <Tabs defaultValue="web" className="w-full">

    //     {/* <TabsList className=" w-full grid-cols-3 mb-8 flex items-center content-center">
    //       <TabsTrigger value="web">Bots</TabsTrigger>
    //       <TabsTrigger value="mobile">Mobile</TabsTrigger> 
    //       <TabsTrigger value="fullstack">Full-Stack</TabsTrigger>
    //     </TabsList> */}
    //     {/* <TabsContent value="web" className="grid md:grid-cols-2 gap-6">
    //       <ProjectCard
    //         title="E-commerce Platform"
    //         description="A modern e-commerce website built with React and Node.js"
    //         image="/placeholder.svg?height=300&width=400"
    //         darkMode={darkMode}
    //       />
    //       <ProjectCard
    //         title="Portfolio Site"
    //         description="A sleek portfolio website for a photography studio"
    //         image="/placeholder.svg?height=300&width=400"
    //         darkMode={darkMode}
    //       />
    //     </TabsContent> */}
    //     {/* <TabsContent value="mobile" className="grid md:grid-cols-2 gap-6">
    //       <ProjectCard
    //         title="Fitness Tracker"
    //         description="A React Native app for tracking workouts and nutrition"
    //         image="/placeholder.svg?height=300&width=400"
    //         darkMode={darkMode}
    //       />
    //       <ProjectCard
    //         title="Social Media App"
    //         description="A cross-platform social media app built with React Native"
    //         image="/placeholder.svg?height=300&width=400"
    //         darkMode={darkMode}
    //       />
    //     </TabsContent>
    //     <TabsContent value="fullstack" className="grid md:grid-cols-2 gap-6">
    //       <ProjectCard
    //         title="Task Management System"
    //         description="A full-stack MERN application for project management"
    //         image="/placeholder.svg?height=300&width=400"
    //         darkMode={darkMode}
    //       />
    //       <ProjectCard
    //         title="Learning Management System"
    //         description="An educational platform built with the MERN stack"
    //         image="/placeholder.svg?height=300&width=400"
    //         darkMode={darkMode}
    //       /> */}
    //     {/* </TabsContent> */}
    //   </Tabs>
    // </section>
  )
}

function ProcessSection({ darkMode }:{ darkMode :any}) {
  const steps = [
    { title: "Discovery", description: "We dive deep into your business needs and goals" },
    { title: "Planning", description: "Creating a detailed roadmap for your project" },
    { title: "Design", description: "Crafting beautiful and intuitive user interfaces" },
    { title: "Development", description: "Building robust and scalable solutions" },
    { title: "Testing", description: "Ensuring quality and performance" },
    { title: "Deployment", description: "Launching your project to the world" },
  ]

  return (
    <section id="process" className="py-20">
      <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Process</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-lg shadow-lg bg-background dark:bg-background-dark border border-border dark:border-border-dark"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`text-2xl font-bold mb-2`}>{index + 1}</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className=" dark:text-muted-dark">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// function TeamSection({ darkMode }:{ darkMode :any}) {
//   const team = [
//     { name: "Jane Doe", role: "Lead Designer", image: "/placeholder.svg?height=200&width=200" },
//     { name: "John Smith", role: "Senior Developer", image: "/placeholder.svg?height=200&width=200" },
//     { name: "Alice Johnson", role: "Project Manager", image: "/placeholder.svg?height=200&width=200" },
//     { name: "Bob Williams", role: "Full-Stack Developer", image: "/placeholder.svg?height=200&width=200" },
//   ]

//   return (
//     <section id="team" className="py-20">
//       <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Team</h3>
//       <div className="grid md:grid-cols-4 gap-8">
//         {team.map((member, index) => (
//           <motion.div
//             key={index}
//             className="p-6 rounded-lg shadow-lg bg-background dark:bg-background-dark border border-border dark:border-border-dark text-center"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             whileHover={{ scale: 1.05 }}
//           >
//             <img
//               src={member.image || "/placeholder.svg"}
//               alt={member.name}
//               className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
//             />
//             <h4 className="text-xl font-semibold mb-2">{member.name}</h4>
//             <p className="text-muted dark:text-muted-dark">{member.role}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   )
// }

// function TestimonialsSection({ darkMode }:{ darkMode :any}) {
//   const testimonials = [
//     {
//       name: "Sarah L.",
//       company: "Tech Innovators",
//       text: "TechCraft Studios delivered an outstanding web application that exceeded our expectations. Their attention to detail and technical expertise are unmatched.",
//     },
//     {
//       name: "Michael R.",
//       company: "StartUp Co",
//       text: "Working with TechCraft Studios was a game-changer for our startup. Their mobile app development skills helped us launch a product that our users love.",
//     },
//     {
//       name: "Emily W.",
//       company: "E-commerce Giants",
//       text: "The full-stack solution provided by TechCraft Studios revolutionized our e-commerce platform. We've seen a significant increase in sales and user engagement.",
//     },
//   ]

//   return (
//     <section className="py-20">
//       <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">What Our Clients Say</h3>
//       <div className="grid md:grid-cols-3 gap-8">
//         {testimonials.map((testimonial, index) => (
//           <motion.div
//             key={index}
//             className="p-6 rounded-lg shadow-lg bg-background dark:bg-background-dark border border-border dark:border-border-dark"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <p className="text-lg mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
//             <div className="font-semibold">{testimonial.name}</div>
//             <div className="text-muted dark:text-muted-dark">{testimonial.company}</div>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   )
// }

// function StatsSection({ darkMode }:{ darkMode :any}) {
//   const chartData = {
//     labels: ["Projects Completed", "Happy Clients", "Team Members", "Awards Won"],
//     datasets: [
//       {
//         data: [150, 200, 20, 15],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.8)",
//           "rgba(54, 162, 235, 0.8)",
//           "rgba(255, 206, 86, 0.8)",
//           "rgba(75, 192, 192, 0.8)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   }

//   const chartOptions = {
//     plugins: {
//       legend: {
//         display: true,
//         position: "bottom" as const,
//         labels: {
//           color: darkMode ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
//         },
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//   }

//   return (
//     <section className="py-20">
//       <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Achievements</h3>
//       <div className="grid md:grid-cols-2 gap-8 items-center">
//         <div className="h-80">
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//         <div className="h-80">
//           <Doughnut data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </section>
//   )
// }

function ContactSection({ darkMode }:{ darkMode :any}) {
  return (
    <section id="contact" className="py-20">
      <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h3>
      <div className="max-w-md mx-auto">
        {/* <form className=""> */}
        <div className="space-y-4">

          <Input disabled
            type="text"
            placeholder="Your Name"
            className="bg-background dark:bg-background-dark border-border dark:border-border-dark"
            />
          <Input
          disabled
            type="email"
            placeholder="Your Email"
            className="bg-background dark:bg-background-dark border-border dark:border-border-dark"
            />
          <textarea 
            disabled
            placeholder="Your Message"
            rows={4}
            className="w-full p-3 rounded-md focus:ring-2 focus:ring-accent focus:border-transparent bg-background dark:bg-background-dark border border-border dark:border-border-dark"
            ></textarea>
          <Button disabled type="submit" className="w-full bg-accent hover:bg-accent-hover text-accent-foreground">
            Send Message
          </Button>
            </div>
        {/* </form> */}
      </div>
    </section>
  )
}

// function ProjectCard({ title, description, image, darkMode }:{ title:any, description:any, image:any, darkMode:any }) {
//   return (
//     <motion.div
//       className="rounded-lg overflow-hidden shadow-lg bg-background dark:bg-background-dark border border-border dark:border-border-dark"
//       whileHover={{ scale: 1.05 }}
//       transition={{ duration: 0.3 }}
//     >
//       <img src={image || "/placeholder.svg"} alt={title} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h4 className="text-xl font-semibold mb-2">{title}</h4>
//         <p className="text-muted dark:text-muted-dark">{description}</p>
//       </div>
//     </motion.div>
//   )
// }

// function ChatBot({ darkMode, onClose }:{ darkMode:any, onClose:any }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 50 }}
//       className="fixed bottom-20 right-4 w-80 bg-background dark:bg-background-dark rounded-lg shadow-lg overflow-hidden border border-border dark:border-border-dark z-50"
//     >
//       <div className="p-4 bg-muted dark:bg-muted-dark flex justify-between items-center">
//         <h4 className="font-semibold">Chat with us</h4>
//         <Button variant="ghost" size="sm" >
//           &times;
//         </Button>
//       </div>
//       <div className="p-4 h-64 overflow-y-auto">{/* Chat messages would go here */}</div>
//       <div className="p-4 border-t border-border dark:border-border-dark">
//         <Input
//           type="text"
//           placeholder="Type your message..."
//           className="bg-background dark:bg-background-dark border-border dark:border-border-dark"
//         />
//       </div>
//     </motion.div>
//   )
// }
function Footer({ darkMode }:{darkMode:any}) {
  return (
    <footer className="bg-background-light dark:bg-background-darker py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <p className="text-muted dark:text-muted-dark">
              Debdevify is a leading software development company specializing in MERN stack and React Native
              & DevOps solutions.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Services",  "Process",  "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-muted dark:text-muted-dark hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <address className="text-muted dark:text-muted-dark not-italic">
              {/* <p>123 Tech Street</p> */}
              {/* <p>San Francisco, CA 94107</p> */}
              <p>Email: debdevify@gmail.com</p>
              <p>Phone: 7415662161</p>
            </address>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-2">
            <a target="_blank" href="https://www.instagram.com/debdevify?igsh=MWE2OWRuNHhyOWxtbA==">
            <FaInstagram size={32} color="black" className=" cursor-pointer hover:pointer " />
            </a>

            <a  target="_blank" href="https://wa.me/message/ALF2AQCFGOS5G1">
            <FaWhatsapp size={32} color="black" className=" cursor-pointer hover:pointer " />
            </a>
            </div>
            <div className="flex space-x-4">{/* Add social media icons here */}</div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border dark:border-border-dark text-center text-muted dark:text-muted-dark">
          <p>&copy; 2025 Debdevify Studios. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
//
function ThemeCustomizer({ accentColor , setAccentColor } : {accentColor:any , setAccentColor:any}   ) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-20 right-4 z-50">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Customize Theme</h4>
            <p className="text-sm text-muted-foreground">Adjust the accent color to your liking.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 gap-2">
              {["#3B82F6", "#10B981", "#F59E0B"].map((color) => (
                <div
                  key={color}
                  style={{ backgroundColor: color }}
                  className="h-8 w-full rounded-md cursor-pointer"
                  onClick={() => setAccentColor(color)}
                />
              ))}
            </div>
            <div>
              <label htmlFor="custom-color" className="text-sm font-medium leading-none">
                Custom Color
              </label>
              <input
                id="custom-color"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full h-10 mt-1"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

