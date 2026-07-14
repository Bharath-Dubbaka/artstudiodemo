import MultiLayerParallax from "@/components/MultiLayerParallax";
import GalleryRoom from "@/components/GalleryRoom";
import RevealFrame from "@/components/RevealFrame";
import ParallaxSlider from "@/components/ParalaxSlider";
import ZoomGallery from "@/components/ZoomGallery";
import RevealSection from "@/components/RevealSection";
import GsapScroll from "@/components/gsapScroll/GsapScroll";
import CardHolder from "@/components/CardHolder";

export default function Home() {
  return (
    <main className="bg-wall">
      <MultiLayerParallax />
      <ParallaxSlider />
      <RevealFrame eyebrow="Featured" title="BRINGING ART TO LIFE">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/new_f.png"
          alt="Featured artwork"
          className="h-full w-full object-cover"
        />
      </RevealFrame>
      {/* <div className="mx-auto max-w-xl space-y-6 px-6 py-12 md:py-20 lg:py-32 font-body text-stone">
        <p>
          Every room loops back to the door you came through — that&apos;s the
          whole idea behind DBK. Replace this with your real about / artist
          statement copy.
        </p>
      </div> */}

      <ZoomGallery />
      <CardHolder />
      <ParallaxSlider />

      <RevealSection />
      <GsapScroll />
      <GalleryRoom />
    </main>
  );
}
