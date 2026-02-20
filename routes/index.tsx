import * as T from "@baetheus/pick/tokens";

export default T.client_index.create(function ({ scripts, styles, title }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        {...styles.map((s, key) => (
          <link rel="stylesheet" key={key} href={s} />
        ))}
      </head>
      <body>
        {...scripts.map((s, key) => (
          <script type="module" key={key} src={s}></script>
        ))}
      </body>
    </html>
  );
});
