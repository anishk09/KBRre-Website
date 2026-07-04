type MobileCtaBarProps = {
  href: string;
  label: string;
};

/**
 * Mobile-only sticky conversion bar. Pages rendering this bar should reserve
 * bottom clearance (pb-32 on mobile) so content never hides beneath it.
 */
export function MobileCtaBar({ href, label }: MobileCtaBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 w-full border-t border-slate-100 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_rgb(0_0_0/0.1)] backdrop-blur-md md:hidden">
      <div className="p-3">
        <a
          href={href}
          className="block w-full rounded-sm bg-[#0F2440] py-4 text-center font-sans text-sm font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-brand-gold hover:text-brand-blue-dark"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
