export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <link
          rel="preload"
          href="/frames/frame_001.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/hero-bg.webp"
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          href="/hero-people.webp"
          as="image"
          type="image/webp"
        />
      </head>
      {children}
    </>
  );
}

