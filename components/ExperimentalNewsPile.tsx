"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion";
import ScrollFadeUp from "./ui/ScrollFadeUp"

interface Article {
  id: number
  title: string
  src: string
  rotation: number
  position: { x: number; y: number }
  scale: number
  zIndex: number
}

const ARTICLE_DATA = [
  { title: "Sweeney American Eagle", src: "/articles/sweeney.png" },
  { title: "DiGiorno Pizza 'Why I Stayed' (2014)", src: "/articles/digiorno.png" },
  { title: "Peloton 'Gift That Keeps Giving'", src: "/articles/peloton.png" },
  { title: "Skittles Pride", src: "/articles/skittles.png" },
  { title: "Gap New Logo", src: "/articles/gap.png" },
  { title: "Burger King 'Women Belong in the Kitchen' (2021)", src: "/articles/bk.png" },
  { title: "Heineken 'Sometimes, Lighter is Better' (2017)", src: "/articles/heineken.png" },
  { title: "Garde-Robe Campaign (Balenciaga)", src: "/articles/balenciaga-garde.png" },
  { title: "Nivea 'White is Purity' Deodorant (2017)", src: "/articles/nivea.png" },
  { title: "New Coke", src: "/articles/newcoke.png" },
  { title: "Southwest Airlines Holiday Meltdown (2022)", src: "/articles/southwest.png" },
  { title: "Target Boycott (2016)", src: "/articles/target.png" },
  { title: "Bud Light/Dylan Mulvaney (2023)", src: "/articles/budlight.png" },
  { title: "Elf/Matt Rife Campaign (2023)", src: "/articles/elf.png" },
  { title: "Pepsi/Kendall Jenner (2017)", src: "/articles/pepsi.png" },
  { title: "Dove Racist Ad (2017)", src: "/articles/dove.png" },
  { title: "H&M Coolest Monkey", src: "/articles/hm.png" },
  { title: "Gillette 'Best a Man Can Be'", src: "/articles/gillette.png" },
]

function generateArticle(id: number, articleData: { title: string; src: string }, width: number, height: number): Article {
  const rotation = (Math.random() * 30) - 15;
  const scale = .8
  const x = Math.random() * (width - 300) // section width
  const y = Math.random() * (height - 1300) + (id * 60) // section height
  return {
    id,
    title: articleData.title,
    src: articleData.src,
    rotation,
    scale,
    position: { x, y },
    zIndex: id,
  }
}

export default function ExperimentalNewsPile() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [articles, setArticles] = useState<Article[]>([])
  const [revealedCount, setRevealedCount] = useState(0)
  const MAX_ARTICLES = 100 // or however many you want

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionTop = sectionRef.current.offsetTop
      const sectionHeight = sectionRef.current.offsetHeight
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      const revealStart = 0.15  // 25 percent into section before reveal starts
      const revealSpeed = 0.15   // twice as slow reveal

      const raw = (scrollY + windowHeight - sectionTop) / sectionHeight

      const adjusted = Math.max(0, raw - revealStart)
      const progress = Math.min(adjusted * revealSpeed, 1)

      const targetCount = Math.floor(progress * MAX_ARTICLES)
      setRevealedCount(targetCount)

      // freeze scroll until all articles appear
      if (targetCount < MAX_ARTICLES &&
        scrollY + windowHeight > sectionTop &&
        scrollY < sectionTop + sectionHeight) {
        window.scrollTo(0, scrollY)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Pre-generate all articles (once)
  useEffect(() => {
    if (!sectionRef.current) return
    const width = sectionRef.current.clientWidth
    const height = sectionRef.current.clientHeight
    const allArticles = ARTICLE_DATA.map((data, idx) => generateArticle(idx, data, width, height))
    setArticles(allArticles)
  }, [sectionRef.current?.clientWidth, sectionRef.current?.clientHeight])

  return (
    <section ref={sectionRef} className="relative h-[1200px] overflow-hidden">


      {/* Articles container */}
      <div className="absolute inset-0">
        {articles.slice(0, revealedCount).map((article) => (
          <div
            key={article.id}
            className="absolute bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 ease-out"
            style={{
              left: article.position.x,
              top: article.position.y,
              transform: `rotate(${article.rotation}deg) scale(${article.scale})`,
              zIndex: article.zIndex,
            }}
          >
            <img src={article.src} alt={article.title} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
