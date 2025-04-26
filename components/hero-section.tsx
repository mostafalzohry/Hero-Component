"use client"

import { useState } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import EditableText from "./editable-text"
import { Button } from "@/components/ui/button"
import { headlines, subheadlines, ctaTexts, images } from "@/data/hero-content"

export default function HeroSection() {
  const [headline, setHeadline] = useState(headlines[0])
  const [subheadline, setSubheadline] = useState(subheadlines[0])
  const [ctaText, setCtaText] = useState(ctaTexts[0])
  const [currentImage, setCurrentImage] = useState(images[0])
  const [isLoading, setIsLoading] = useState(false)

  const regenerateContent = () => {
    setIsLoading(true)

    // Simulate AI processing time
    setTimeout(() => {
      // Get current indices
      const currentHeadlineIndex = headlines.indexOf(headline)
      const currentImageIndex = images.indexOf(currentImage)

      // Generate new indices that are different from current ones
      let newIndex
      do {
        newIndex = Math.floor(Math.random() * headlines.length)
      } while (newIndex === currentHeadlineIndex || newIndex === currentImageIndex)

      // Apply all changes with the same index to keep content consistent
      setHeadline(headlines[newIndex])
      setSubheadline(subheadlines[newIndex])
      setCtaText(ctaTexts[newIndex])
      setCurrentImage(images[newIndex])

      console.log("Content regenerated with index:", newIndex)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-70"></div>

      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="z-10 space-y-8">
            <div className="space-y-4">
              <EditableText
                value={headline}
                onChange={setHeadline}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
              />

              <EditableText value={subheadline} onChange={setSubheadline} className="text-xl text-gray-600 max-w-lg" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="group px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                <EditableText value={ctaText} onChange={setCtaText} className="font-medium" />
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                onClick={regenerateContent}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Regenerate with AI
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>

              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl h-[350px]">
                  <img
                    src={currentImage || "/placeholder.svg"}
                    alt="Hero illustration"
                    className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? "opacity-50" : "opacity-100"}`}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
