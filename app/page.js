import MultiLayerParallax from "@/components/MultiLayerParallax";
import GalleryRoom from "@/components/GalleryRoom";
import RevealFrame from "@/components/RevealFrame";
import ParallaxSlider from "@/components/ParalaxSlider";

export default function Home() {
  return (
    <main className="bg-wall">
      <MultiLayerParallax />
      <GalleryRoom />
      <RevealFrame eyebrow="Featured" title="BRINGING ART TO LIFE">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/new_f.png"
          alt="Featured artwork"
          className="h-full w-full object-cover"
        />
      </RevealFrame>
      <ParallaxSlider />
      <div className="mx-auto max-w-xl space-y-6 px-6 py-12 md:py-20 lg:py-32 font-body text-stone">
        <p>
          Every room loops back to the door you came through — that&apos;s the
          whole idea behind DBK. Replace this with your real about /
          artist statement copy.
        </p>
      </div>
    </main>
  );
}
