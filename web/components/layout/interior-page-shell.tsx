import type { ReactNode } from 'react';

type InteriorPageShellProps = {
  children: ReactNode;
};

export function InteriorPageShell({ children }: InteriorPageShellProps) {
  return (
    <div className="interior-page-shell relative w-full max-w-full flex-1 overflow-x-hidden">
      <div className="relative">{children}</div>
    </div>
  );
}
