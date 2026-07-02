import { InteriorPageShell } from '@/components/layout/interior-page-shell';

const OUR_STORY =
  'Founded on a foundation of absolute integrity and a deep belief in hard work, KBR Reality Group began as a humble, family-owned operation with bare-bones beginnings in Metuchen, New Jersey. Established in 2018 during a shifting economic landscape, our journey started small, not in a corporate high-rise, but driven by a hands-on approach and a commitment to sweat equity. Our early focus on restoring and managing local residential property taught us firsthand that real estate is about the tangible quality of a space and the community it serves. By focusing on steady, deliberate growth and reinvesting back into our holdings, we have quietly expanded into a premier commercial and residential portfolio. Today, while we utilize modern technology and sophisticated market insights, we remain deeply committed to the same quiet humility, dedication, and long-term strategic vision that defined our very first days.';

export default function AboutPage() {
  return (
    <InteriorPageShell>
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="heading-overline">About</p>
        <h1 className="heading-display mt-3">KBR Reality Group</h1>

        <article className="mt-16 md:mt-20 lg:max-w-4xl">
          <div className="divider-gold" />
          <h2 className="mt-8 font-serif text-2xl text-brand-blue md:text-3xl">Our Story</h2>
          <p className="mt-6 text-base leading-relaxed text-brand-dark/80 md:text-lg md:leading-8">
            {OUR_STORY}
          </p>
        </article>
      </section>
    </InteriorPageShell>
  );
}
