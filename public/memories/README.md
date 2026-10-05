# public/memories

Taruh foto asli (WebP/AVIF) di folder ini, mis.:

- first-meet.webp
- first-date.webp
- highlight-1.webp ... highlight-8.webp
- album-first-date.webp
- favorite.webp

Lalu isi field `photo` / `src` / `cover` di `data/timeline.ts`
dan `data/memories.ts`. Selama belum ada foto, komponen memakai
`PhotoPlaceholder` otomatis (tidak error).
