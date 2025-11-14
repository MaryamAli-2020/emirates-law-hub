'use client';

import { Suspense } from 'react';
import { SearchComponent } from './search-component';
import { Loader } from 'lucide-react';

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <SearchComponent />
    </Suspense>
  );
}
