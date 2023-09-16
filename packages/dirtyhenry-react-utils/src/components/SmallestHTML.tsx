type Props = {
  lang: "fr" | "en";
  renderHeadExtra?: () => React.ReactNode;
  children?: React.ReactNode;
};

const SmallestHTML = ({ lang, children, renderHeadExtra }: Props) => {
  return (
    <html lang={lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {renderHeadExtra?.()}
      </head>
      <body>{children}</body>
    </html>
  );
};

export default SmallestHTML;
