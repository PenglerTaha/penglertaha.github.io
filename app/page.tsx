'use client';

import React from 'react';
import { motion } from 'framer-motion';
import StarsBackground from "./components/StarsBackground";
import {Github, Linkedin, Mail, Download, Home, Code,
  BookOpen, Briefcase, Brain, Database, Wrench, Layers, Cpu
} from 'lucide-react';

interface SkillCardProps { icon: React.ReactNode; title: string; skills: string }
interface ProjectCardProps { title: string; problem: string; desc: string; tech: string; github?: string }
interface ExperienceCardProps { title: string; company: string; domain: string; desc: string; tech: string; website?: string }
interface EducationCardProps { degree: string; institution: string; specialization?: string; year?: string; projects?: string[] }


export default function Portfolio() {
  return (
    <div className="flex min-h-screen font-sans bg-[#0b1120] text-white">
      <nav className="fixed flex flex-row top-4 left-1/2 transform -translate-x-1/2 bg-[#020617] p-4 rounded-lg shadow-lg gap-6 items-center z-50">
        <a href="#home" className="hover:text-cyan-400"><Home size={24} /></a>
        <a href="#about" className="hover:text-cyan-400"><Brain size={24} /></a>
        <a href="#skills" className="hover:text-cyan-400"><Code size={24} /></a>
        <a href="#projects" className="hover:text-cyan-400"><Layers size={24} /></a>
        <a href="#experience" className="hover:text-cyan-400"><Briefcase size={24} /></a>
        <a href="#education" className="hover:text-cyan-400"><BookOpen size={24} /></a>
        <a href="#contact" className="hover:text-cyan-400"><Mail size={24} /></a>
        <a href="https://github.com/Essouiriaya" className="hover:text-cyan-400"><Github size={24} /></a>
        <a href="https://linkedin.com/in/aya-essouiri-935938282" className="hover:text-cyan-400"><Linkedin size={24} /></a>
      </nav>
      <main className="flex-1 ml-0 md:ml-0 overflow-y-auto w-full">
        <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
          <StarsBackground />
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-3xl" />
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight z-10">
            Essouiri Aya 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-xl md:text-1xl text-slate-300 max-w-3xl z-10">
            Digital Transformation & AI Engineering Student | Full-Stack Developer | 
            Interested in Intelligent Systems, IoT, and Data-Driven Applications
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex gap-4 mt-10 z-10">
            <a href="/Essouiri Aya CV.pdf" download className="flex items-center gap-2 px-7 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-110 hover:shadow-xl transition-transform duration-300">
              <Download size={18}/> Download CV
            </a>
            <a href="#contact" className="flex items-center gap-2 px-7 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-110 hover:shadow-xl transition-transform duration-300">
              <Mail size={18}/>Contact Me
            </a>
          </motion.div>
        </section>
        <section id="about" className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto mb-6">
            I am an Engineering student specializing in <strong className="text-cyan-400">Digital Transformation & AI</strong> at ENSA Al Hoceima, 
            with a strong foundation in software engineering, full-stack development, IoT systems, and data-driven applications. 
            I have experience in designing and implementing scalable solutions, integrating real-time IoT devices, and developing intelligent 
            systems to solve complex problems.
          </p>
          <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto mb-6">
            My technical expertise spans front-end frameworks Angular, back-end technologies including Spring Boot, Flask, and RESTful APIs, 
            as well as database management with MySQL and MongoDB. I also have hands-on experience in AI and machine learning projects, 
            including predictive modeling, data analysis, and automation.
          </p>
          <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto mb-6">
            In addition to technical skills, I excel in <strong className="text-cyan-400">problem-solving</strong>, 
            <strong className="text-cyan-400">team collaboration</strong>, <strong className="text-cyan-400">autonomy</strong>, 
            <strong className="text-cyan-400">curiosity</strong>, and <strong className="text-cyan-400">professional communication</strong>. 
            I am passionate about applying technology 
            to real-world challenges and creating innovative solutions that drive digital transformation.
          </p>
          <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto">
            My career goal is to contribute to cutting-edge projects involving AI, IoT, and full-stack development, 
            while continuously learning and advancing in the field of intelligent systems and digital innovation.
          </p>
        </section>
        <section id="skills" className="bg-[#020617] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>

            <div className="grid md:grid-cols-3 gap-6">

              <SkillCard 
                icon={<Code />} 
                title="Programming" 
                skills="Java, Python, PHP, C, SQL" 
              />

              <SkillCard 
                icon={<Layers />} 
                title="Frontend Development" 
                skills="HTML, CSS, JavaScript, Angular, Tailwind CSS, Bootstrap" 
              />

              <SkillCard 
                icon={<Briefcase />} 
                title="Backend Development" 
                skills="Spring Boot, Flask, FastAPI, Laravel, REST APIs, Java Servlets" 
              />

              <SkillCard 
                icon={<Brain />} 
                title="Artificial Intelligence" 
                skills="Machine Learning, Deep Learning, NLP, Pandas, Scikit-learn" 
              />

              <SkillCard 
                icon={<Database />} 
                title="Data Engineering & Big Data" 
                skills="Data Warehousing, Data Lakes, Apache Airflow, Data Ingestion, ETL Pipelines" 
              />

              <SkillCard 
                icon={<Cpu />} 
                title="Cloud, IoT & Cybersecurity" 
                skills="Cloud Computing, Internet of Things (IoT), Cybersecurity Fundamentals, Secure Web Applications, Linux Systems" 
              />

              <SkillCard 
                icon={<Wrench />} 
                title="DevOps & Tools" 
                skills="Git, Docker, Linux, Postman, Maven, Agile/Scrum" 
              />

              <SkillCard 
                icon={<Brain />} 
                title="Entrepreneurship, Languages & Soft Skills" 
                skills="Startup mindset, Business Model Canvas, Innovation Management, French, English, Analytical thinking, Problem solving, Teamwork, Communication, Time management" 
              />
            </div>
          </div>
        </section>
        <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Selected Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard title="Smart Home IoT Dashboard" problem="Lack of real-time IoT monitoring and control" desc="Cloud-based IoT system with real-time sensor simulation, data streaming, and bidirectional control." tech="Python, Flask, MQTT, Angular" github="https://github.com/Essouiriaya/SmartHome-IoT.git" />
            <ProjectCard title="Digitalization of Final Year Project Management (Odoo 16)" problem="Manual and scattered management of final year projects" desc="Complete Odoo 16 module that centralizes PFE data (students, supervisors, projects, companies) and automates the main steps of the PFE lifecycle." tech="Odoo 16, Python, XML, PostgreSQL" github="https://github.com/Essouiriaya/GestionPFE.git" />
            <ProjectCard title="HomeLyo – Home Services Platform" problem="Manual and inefficient management of home services" desc="Full-stack platform for booking and managing home services with secure REST APIs and admin dashboard." tech="Spring Boot, Angular, MySQL"/>
            <ProjectCard title="TASKLY – Project Management Tool" problem="Poor collaboration and project tracking" desc="Collaborative web tool for task and team management using MVC architecture." tech="Laravel,  PHP, Bootstrap, HTML, CSS, JavaScript" github="https://github.com/Essouiriaya/TasklyApp.git" />
            <ProjectCard title="PomoNote" problem="Need for efficient daily task management and focus optimization" desc="All-in-one productivity app with note-taking, intelligent to-do list, and Pomodoro timer." tech="Python (PySide6 GUI), Python backend, MySQL, SQLAlchemy, PyMySQL, XAMPP" github="https://github.com/Essouiriaya/PomoNoteApp.git" />
            <ProjectCard title="HealthMate – Digital Health Platform" problem="Limited access to digital healthcare services" desc="Healthcare platform including appointments, teleconsultation, and a medical chatbot." tech="Flask, JavaScript, HTML, CSS"/>
          </div>
        </section>
        <section id="experience" className="bg-[#020617] py-24">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            <ExperienceCard
              title="Web Developer Intern"
              company="ENAF GROUP"
              domain="Digitalization Systems"
              desc="Developed web applications to digitalize client requests including repair, maintenance, and product management. Built admin dashboard and streamlined client workflows."
              tech="Flask, Python, MySQL, Bootstrap, HTML, CSS, JavaScript"
              website="https://www.enaf.ma/"
            />
            <ExperienceCard
              title="Full Stack Developer Intern"
              company="OSM S.A.R.L (Rabat)"
              domain="Home Services Application"
              desc="Worked on the full development of a home services application, including designing the 
              front-end interfaces with Angular and Bootstrap, implementing the back-end using Java Spring Boot, 
              and integrating secure RESTful APIs for seamless client-server communication. 
              Collaborated with the team to ensure efficient workflow, high performance, 
              and a user-friendly experience."
              tech="Java, Spring Boot, Angular, Bootstrap, MySQL, Postman"
            />

          </div>
        </section>
        <section id="education" className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <EducationCard
            degree="Engineering Degree"
            institution="ENSA Al Hoceima"
            specialization="Digital Transformation & AI"
            year="2022-Present"
          />
          <EducationCard
            degree="Preparatory Year – MIP (Mathematics, Computer Science, and Physics)"
            institution="FST Al Hoceima, Morocco"
            year="2021-2022"
          />
          <EducationCard
            degree="Scientific Baccalaureate – Physical Sciences"
            institution="Othman Ben Affan High School, Nador, Morocco"
            year="2020-2021"
          />
        </section>
        <section id="contact" className="bg-[#020617] py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>
            <p className="text-slate-400 mb-10 text-center">
              Open to internships, PFA opportunities, PFE opportunities, and collaborations.
            </p>
            <div className="flex justify-center gap-8 mt-10">
              <a href="mailto:essouiriaya96@gmail.com" className="hover:text-cyan-400"><Mail size={24} /></a>
              <a href="https://github.com/Essouiriaya" className="hover:text-cyan-400"><Github size={24} /></a>
              <a href="https://linkedin.com/in/aya-essouiri-935938282" className="hover:text-cyan-400"><Linkedin size={24} /></a>
            </div>
          </div>
        </section>


        <footer className="text-center text-slate-500 py-6 text-sm">© {new Date().getFullYear()} Aya Essouiri — My engineering portfolio</footer>

      </main>
    </div>
  );
}
function SkillCard({ icon, title, skills }: SkillCardProps) {
  return (
    <motion.div whileHover={{ scale:1.05 }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <div className="text-cyan-400 mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{skills}</p>
    </motion.div>
  );
}

function ProjectCard({ title, problem, desc, tech, github }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y:-6 }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-slate-400"><strong>Problem:</strong> {problem}</p>
      <p className="text-slate-300 mt-3">{desc}</p>
      <p className="text-sm text-cyan-400 mt-4">Tech: {tech}</p>
      {github !== undefined && <a href={github} className="text-cyan-400 hover:underline mt-2 block">GitHub →</a>}
    </motion.div>
  );
}

function ExperienceCard({ title, company, domain, desc, tech, website }: ExperienceCardProps) {
  return (
    <motion.div whileHover={{ y:-4 }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-6 flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{title} – {company}</h3>
      <p className="text-slate-400">Domain: {domain}</p>
      <p className="text-slate-300 mt-2">{desc}</p>
      <p className="text-sm text-cyan-400 mt-2">Tech: {tech}</p>
      {website && <a href={website} className="text-cyan-400 hover:underline mt-2 block">Website →</a>}
    </motion.div>
  );
}

function EducationCard({ degree, institution, specialization, year, projects }: EducationCardProps) {
  return (
    <motion.div whileHover={{ y:-4 }} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-6">
      <h3 className="text-xl font-semibold">{degree} – {institution}</h3>
      {specialization && <p className="text-slate-400">Specialization: {specialization}</p>}
      {year && <p className="text-slate-400">Year: {year}</p>}
      {projects && <ul className="text-slate-400 mt-2 list-disc list-inside">{projects.map(p=><li key={p}>{p}</li>)}</ul>}
    </motion.div>
  );
}
