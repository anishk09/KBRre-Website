import type { ReactNode } from 'react';

type InteriorPageShellProps = {
  children: ReactNode;
};

export function InteriorPageShell({ children }: InteriorPageShellProps) {
  return (
    <div className="interior-page-shell relative w-full flex-1">
      <div className="relative">{children}</div>
    </div>
  );
}
