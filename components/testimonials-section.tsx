"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { testimonials } from "@/lib/data"
import { useInView } from "@/hooks/use-in-view"

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
  }, [isInView])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Função para navegar para o depoimento anterior
  const prevTestimonial = () => {
    setActiveIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1))
  }

  // Função para navegar para o próximo depoimento
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <section className="py-16 bg-black" ref={sectionRef}>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#55bbad] mb-4">O Que Nossos Pacientes Dizem</h2>
          <p className="text-white max-w-2xl mx-auto">
            Confira os depoimentos de pacientes que transformaram seus sorrisos e suas vidas com nossos tratamentos.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Versão para desktop */}
          <div className="relative hidden md:block">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                      <div className="flex items-center mb-6">
                        <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                          <Image
                            src={
                              testimonial.name === "Bruna Leal"
                                ? "/images/avatar-bruna.png"
                                : testimonial.name === "Marielza Schila"
                                  ? "/images/avatar-marielza.png"
                                  : testimonial.name === "Diego Romanini"
                                    ? "/images/avatar-diego.png"
                                    : testimonial.name === "R. Jefferson"
                                      ? "/images/avatar-jefferson.png"
                                      : testimonial.name === "Maira Lima"
                                        ? "/images/avatar-maira.png"
                                        : testimonial.image || "/placeholder.svg"
                            }
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Setas de navegação para desktop */}
            <button
              className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
              onClick={prevTestimonial}
              aria-label="Depoimento anterior"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors z-10"
              onClick={nextTestimonial}
              aria-label="Próximo depoimento"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Versão para mobile - mostra apenas o depoimento atual */}
          <div className="md:hidden">
            <div className="px-4">
              <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden mr-3">
                    <Image
                      src={
                        testimonials[activeIndex].name === "Bruna Leal"
                          ? "/images/avatar-bruna.png"
                          : testimonials[activeIndex].name === "Marielza Schila"
                            ? "/images/avatar-marielza.png"
                            : testimonials[activeIndex].name === "Diego Romanini"
                              ? "/images/avatar-diego.png"
                              : testimonials[activeIndex].name === "R. Jefferson"
                                ? "/images/avatar-jefferson.png"
                                : testimonials[activeIndex].name === "Maira Lima"
                                  ? "/images/avatar-maira.png"
                                  : testimonials[activeIndex].image || "/placeholder.svg"
                      }
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{testimonials[activeIndex].name}</h3>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < testimonials[activeIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic text-sm">"{testimonials[activeIndex].text}"</p>
              </div>

              {/* Botões de navegação para mobile */}
              <div className="flex justify-center mt-6 gap-4">
                <button
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  onClick={prevTestimonial}
                  aria-label="Depoimento anterior"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                  onClick={nextTestimonial}
                  aria-label="Próximo depoimento"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Indicadores de página */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  activeIndex === index ? "bg-[#55bbad]" : "bg-gray-300"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Ver depoimento ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
