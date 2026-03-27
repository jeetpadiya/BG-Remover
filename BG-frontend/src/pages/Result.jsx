import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const navigate = useNavigate()
  const { image, resultImage, isRemovingBg } = useContext(AppContext)
  const [previewSrc, setPreviewSrc] = useState(null)

  // Create & revoke preview URL to avoid memory leaks
  useEffect(() => {
    if (!image) return
    const url = URL.createObjectURL(image)
    setPreviewSrc(url)
    return () => URL.revokeObjectURL(url)
  }, [image])

  const hasAnyImage = Boolean(previewSrc || resultImage || isRemovingBg)

  if (!hasAnyImage) {
    return (
      <div className="mx-4 my-10 flex min-h-[60vh] items-center justify-center">
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-white/95 px-8 py-10 text-center shadow-xl">
          <h1 className="text-2xl font-semibold text-slate-900">
            No image to preview yet
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Upload an image first and we&apos;ll show the background removal result here.
          </p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-500 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-4 my-3 lg:mx-44 min-h-[75vh]">
      <div className="bg-white rounded-lg px-8 py-6 drop-shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Original Image */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">Original</p>
            {previewSrc && (
              <img
                src={previewSrc}
                alt="Original"
                className="rounded-md border"
              />
            )}
          </div>

          {/* Background Removed */}
          <div>
            <p className="font-semibold text-gray-600 mb-2">
              Background Removed
            </p>
            <div className="relative rounded-md border border-gray-300 bg-layer overflow-hidden h-60">
              {resultImage ? (
                <img
                  src={resultImage}
                  alt="Processed"
                  className="w-full h-full object-cover"
                />
              ) : (
                (previewSrc || isRemovingBg) && (
                  <div className="absolute inset-0 flex justify-center items-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-500">
                        Removing background...
                      </p>
                    </div>
                  </div>
                )
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Download Button */}
      {resultImage && (
        <div className="flex justify-center sm:justify-end mt-6">
          <a
            href={resultImage}
            download="background-removed.png"
            className="
              px-8 py-2.5 text-white text-sm
              bg-gradient-to-r from-blue-600 to-fuchsia-500
              rounded-full hover:scale-105 transition-all duration-700
            "
          >
            Download Image
          </a>
        </div>
      )}
    </div>
  )
}

export default Result
