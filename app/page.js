import MultiLayerParallax from "@/components/MultiLayerParallax";
import GalleryRoom from "@/components/GalleryRoom";
import RevealFrame from "@/components/RevealFrame";

export default function Home() {
  return (
    <main className="bg-wall">
      <MultiLayerParallax />
      <GalleryRoom />
      <RevealFrame eyebrow="Featured" title="BRINGING ART TO LIFE">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/01.webp"
          alt="Featured artwork"
          className="h-full w-full object-cover"
        />
      </RevealFrame>

      <div className="mx-auto max-w-xl space-y-6 px-6 py-32 font-body text-stone">
        <p>
          Every room loops back to the door you came through — that&apos;s the
          whole idea behind Ouroboros. Replace this with your real about /
          artist statement copy.
        </p>
      </div>
    </main>
  );
}
