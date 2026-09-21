'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Profile, Experience, Education } from '@/lib/api';
import { soundFx } from './AudioEffects';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase,
  GraduationCap,
  Package,
  Github,
  ExternalLink,
  Code2,
  CheckCircle2,
  Terminal,
  MapPin,
  Sparkles,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DossierAboutProps {
  profile: Profile | null;
  experienceList: Experience[];
  educationList: Education[];
  onContactClick?: () => void;
}
export default function DossierAbout({
  profile,
  experienceList,
  educationList,
  onContactClick,
}: DossierAboutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        polaroidRef.current,
        { opacity: 0, y: 40, rotate: -10 },
        {
          opacity: 1,
          y: 0,
          rotate: -3,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        receiptRef.current,
        { opacity: 0, y: -40, scaleY: 0.9 },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.25,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const name = profile?.name || 'Akash Verma';
  const bio =
    profile?.bio ||
    'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services. Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), and system-level performance optimization.';

  const avatarUrl =
    profile?.avatar_url?.startsWith('http') && !profile?.avatar_url?.includes('unsplash')
      ? profile.avatar_url
      : '/akash_portrait_bw.jpg';

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Manila Paper Folder Sheet */}
      <div className="relative paper-texture rounded-b-2xl rounded-tr-2xl shadow-2xl p-6 md:p-10 border border-[#d5c39e] text-slate-800">
        {/* Header Classification Strip */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-slate-300 pb-4 mb-8 gap-3">
          <div className="flex items-center gap-3">
            <span className="ink-stamp stamp-green text-xs font-bold">
              DOSSIER FILE \\ VERIFIED
            </span>
            <span className="font-mono text-xs text-slate-500 font-semibold tracking-wider">
              REF: ARCHIVE-2026-AV
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded border border-emerald-300">
              [STATUS: SENIOR SOFTWARE ENGINEER]
            </span>
          </div>
        </div>

        {/* 2-Column Physical Stationery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10 pt-2">
          {/* LEFT COLUMN: Polaroid + Receiptify Dev Log + Education (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center gap-8">
            {/* 1. POLAROID PHOTO FRAME */}
            <div
              ref={polaroidRef}
              className="relative group rotate-[-3deg] hover:rotate-0 transition-transform duration-300"
            >
              {/* Scotch tape on top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 scotch-tape z-20" />

              <div className="polaroid-card w-72 sm:w-80">
                <div className="relative w-full h-72 bg-slate-200 overflow-hidden rounded-sm">
                  <Image
                    src={avatarUrl}
                    alt={name}
                    fill
                    className="object-cover contrast-105 transition-all duration-300"
                    unoptimized
                  />
                  {/* Subtle retro vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/15 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-hand text-xl text-slate-800 leading-none">
                    ~ {name} (2026)
                  </p>
                  <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">
                    Software Engineer | Java & Mobile Systems Developer
                  </p>
                </div>
              </div>

              {/* "this file belongs to \ akash" stitched label badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#fbf8f1] border-2 border-dashed border-[#ab955d] px-3 py-1.5 rounded shadow-md rotate-[-6deg] z-20">
                <p className="font-mono text-[10px] text-amber-900">
                  this file belongs to:
                </p>
                <p className="font-hand font-bold text-lg text-red-700 leading-none">
                  `{name.split(' ')[0].toLowerCase()}`
                </p>
              </div>
            </div>

            {/* 2. RECEIPTIFY 2026 DEVELOPER RECEIPT */}
            <div
              ref={receiptRef}
              className="w-full max-w-sm rotate-[1.5deg] hover:rotate-0 transition-transform duration-300"
            >
              <div className="receipt-perforated-top" />
              <div className="receipt-texture px-6 py-5 border-x border-slate-200 shadow-md">
                <div className="text-center border-b border-dashed border-slate-400 pb-3 mb-3">
                  <h3 className="font-mono font-black text-lg tracking-widest text-slate-900">
                    RECEIPTIFY
                  </h3>
                  <p className="font-mono text-[10px] text-slate-500 uppercase">
                    7+ YRS ARCHITECT & DEV LOG
                  </p>
                  <p className="font-mono text-[9px] text-slate-400">
                    ORDER #2026-AKASH-DEV
                  </p>
                </div>

                {/* Receipt Line Items */}
                <div className="space-y-1.5 font-mono text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>01. FLUTTER / ANDROID / MOBILE</span>
                    <span className="font-bold text-slate-900">5,800 HRS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>02. JAVA 17/21 SPRING BOOT</span>
                    <span className="font-bold text-slate-900">4,200 HRS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>03. IOT / MQTT / BLE PROTOCOLS</span>
                    <span className="font-bold text-slate-900">3,100 HRS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>04. KAFKA & REDIS TELEMETRY</span>
                    <span className="font-bold text-slate-900">2,800 HRS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>05. NODE.JS / EXPRESS / LARAVEL</span>
                    <span className="font-bold text-slate-900">2,400 HRS</span>
                  </div>
                  <div className="flex justify-between">
                    <span>06. CI/CD & CLOUD DEPLOY</span>
                    <span className="font-bold text-slate-900">2,200 HRS</span>
                  </div>
                </div>

                {/* Totals Section */}
                <div className="border-t-2 border-dashed border-slate-400 my-3 pt-2 font-mono text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>SYSTEM AVAILABILITY</span>
                    <span className="text-emerald-700">99.99%</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>FRAME RATE TARGET</span>
                    <span className="text-emerald-700">&lt;16ms (&gt;60 FPS)</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>OVERALL EXPERIENCE</span>
                    <span className="text-red-700">7+ YEARS</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-slate-300 mt-3 pt-3 text-center">
                  {/* Fake Barcode Lines */}
                  <div className="flex justify-center items-center gap-[2px] h-9 mb-1">
                    {[3, 1, 4, 1, 2, 5, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 3, 1, 5, 2, 1, 4].map(
                      (w, i) => (
                        <div
                          key={i}
                          className="bg-slate-900 h-full"
                          style={{ width: `${w * 1.5}px` }}
                        />
                      )
                    )}
                  </div>
                  <p className="font-mono text-[9px] tracking-widest text-slate-500">
                    * 2026-AKASH-PORTFOLIO *
                  </p>
                </div>
              </div>
              <div className="receipt-perforated-bottom" />
            </div>

            {/* 3. PERFORATED BINDER SHEET: EDUCATION */}
            <div className="w-full relative bg-[#e6f0fa] p-6 rounded-lg shadow-md border border-[#bcd2e8] rotate-[0.8deg]">
              {/* Binder hole punch visual */}
              <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around pointer-events-none">
                {[1, 2, 3].map((h) => (
                  <div
                    key={h}
                    className="w-3.5 h-3.5 rounded-full bg-[#ab955d] border border-slate-400 shadow-inner"
                  />
                ))}
              </div>

              <div className="pl-6">
                <div className="flex items-center gap-2 mb-3 border-b border-blue-200 pb-1.5">
                  <GraduationCap className="w-5 h-5 text-blue-800" />
                  <h4 className="font-hand font-bold text-2xl text-slate-900">
                    Education .
                  </h4>
                </div>

                <div className="space-y-4 font-sans text-xs text-slate-800">
                  {educationList && educationList.length > 0 ? (
                    educationList.map((edu, idx) => (
                      <div key={edu.id || idx} className="space-y-1">
                        <div className="flex justify-between items-center font-mono font-bold text-blue-900 text-xs">
                          <span>{edu.degree}</span>
                          <span className="bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded text-[10px]">
                            {edu.year || `${edu.start_year || 2013} – ${edu.end_year || 2017}`}
                          </span>
                        </div>
                        <p className="text-slate-800 font-bold text-sm">
                          {edu.institution}
                        </p>
                        {edu.description && (
                          <p className="text-slate-600 text-xs leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center font-mono font-bold text-blue-900 text-xs">
                        <span>B.Tech in Computer Science & Engineering</span>
                        <span className="bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded text-[10px]">
                          2013 – 2017
                        </span>
                      </div>
                      <p className="text-slate-800 font-bold text-sm">
                        Galgotias University
                      </p>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        Comprehensive study of Software Engineering, Operating Systems, Computer Networks, Database Systems, and Distributed Computing.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Manifesto & Experience Notepad (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col gap-6">
            {/* 1. LINED PAPER MANIFESTO */}
            <div className="lined-paper-texture p-6 md:p-8 rounded-lg shadow-md border border-[#d9cbb2] rotate-[0.5deg]">
              <div className="flex items-center justify-between border-b border-amber-300/60 pb-2 mb-4">
                <span className="font-serif italic text-2xl font-bold text-red-800">
                  dossier memo
                </span>
                <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-amber-100 px-2 py-0.5 rounded">
                  PROFESSIONAL SUMMARY \ 2026
                </span>
              </div>

              <div className="font-serif text-xs md:text-sm text-slate-800 leading-relaxed space-y-3 italic">
                <p>
                  &ldquo;Software Engineer with{' '}
                  <strong className="text-slate-950 not-italic font-bold bg-amber-200/80 px-1 py-0.5 rounded">
                    7+ years of overall experience
                  </strong>{' '}
                  bridging hardware and software systems, including{' '}
                  <strong className="text-slate-950 not-italic font-bold bg-amber-200/80 px-1 py-0.5 rounded">
                    3 years of dedicated Java enterprise development
                  </strong>
                  . Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services.&rdquo;
                </p>
                <p>
                  &ldquo;Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), clean architecture, real-time WebSockets, and system-level performance optimization with &lt;16ms frame render targets and 99.99% uptime.&rdquo;
                </p>
              </div>
            </div>

            {/* 2. YELLOW LEGAL PAD: CAREER TIMELINE */}
            <div className="yellow-pad-texture p-6 md:p-8 rounded-lg shadow-md border border-[#e6d895] rotate-[-0.5deg]">
              <h4 className="font-hand font-bold text-2xl text-amber-950 mb-4 border-b-2 border-amber-400 pb-1">
                Experience .
              </h4>

              <div className="space-y-5">
                {experienceList && experienceList.length > 0 ? (
                  experienceList.map((exp, idx) => (
                    <div
                      key={exp.id || idx}
                      className="border-b border-amber-300/80 pb-4 last:border-none"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-sans font-extrabold text-slate-950 text-sm md:text-base">
                          {exp.position || exp.role}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
                          {exp.duration || (exp.is_current ? `${exp.start_date?.substring(0, 4) || '2023'} – Present` : `${exp.start_date?.substring(0, 4)} – ${exp.end_date?.substring(0, 4)}`)}
                        </span>
                      </div>
                      <p className="font-mono text-xs font-bold text-amber-900 mt-0.5">
                        @ {exp.company}
                      </p>
                      <p className="font-sans text-xs text-slate-800 mt-1 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="border-b border-amber-300/80 pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-sans font-extrabold text-slate-950 text-base">
                          Senior Software Engineer
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
                          JUN 2023 – PRESENT
                        </span>
                      </div>
                      <p className="font-mono text-xs font-bold text-amber-900 mt-0.5">
                        @ SpireHub Softwares Pvt Ltd, Noida
                      </p>
                      <p className="font-sans text-xs text-slate-800 mt-1.5 leading-relaxed">
                        Lead mobile and backend engineering initiatives, overseeing Clean Architecture implementations, conducting code reviews, and mentoring cross-functional engineering teams. Architect scalable real-time integrations using WebSockets and Socket.IO while streamlining CI/CD automation pipelines for mobile and cloud deployments. Drive mobile performance optimization (&lt;16ms frame render target), cloud services integration, and payment gateway infrastructure across client products.
                      </p>
                    </div>

                    <div className="border-b border-amber-300/80 pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-sans font-extrabold text-slate-950 text-base">
                          Java Enterprise Developer
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
                          MAY 2020 – MAY 2023
                        </span>
                      </div>
                      <p className="font-mono text-xs font-bold text-amber-900 mt-0.5">
                        @ Enterprise Software Solutions, Noida
                      </p>
                      <p className="font-sans text-xs text-slate-800 mt-1.5 leading-relaxed">
                        Spent 3 years designing and deploying mission-critical Java enterprise backends using Java 17, Spring Boot, Spring Cloud microservices, and PostgreSQL. Engineered high-throughput event-streaming telemetry pipelines using Apache Kafka, managing real-time data ingestion for large-scale IoT system deployments. Implemented enterprise OAuth2/JWT security filters, Redis caching, and dynamic thread pool optimizations to sustain 99.99% system availability.
                      </p>
                    </div>

                    <div className="border-b border-amber-300/80 pb-4">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="font-sans font-extrabold text-slate-950 text-base">
                          Associate Software Engineer — Mobile & Systems
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded">
                          JUN 2017 – APR 2020
                        </span>
                      </div>
                      <p className="font-mono text-xs font-bold text-amber-900 mt-0.5">
                        @ TechSmart Mobile Systems, Noida
                      </p>
                      <p className="font-sans text-xs text-slate-800 mt-1.5 leading-relaxed">
                        Developed cross-platform mobile applications and Android native software utilizing Java, RESTful APIs, and local databases. Collaborated on hardware-software integration for IoT-enabled mobile accessories and Bluetooth Low Energy (BLE) device communication protocols.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  soundFx.playStamp();
                  onContactClick?.();
                }}
                className="ink-stamp stamp-red hover:bg-red-100 transition-colors text-xs cursor-pointer shadow-sm tracking-widest font-bold py-2.5 px-5"
              >
                INITIATE PROJECT BRIEF ↵
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
