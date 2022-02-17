function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }

      input {
        border-radius: 5px;
        padding: 4px;
        border: none
      }

      li.sknui-li.jsx-3689390651:hover {
        background: black !important
      }

      span.jsx-1537468523.sknui-span.sknui-text {
        color:black;
        font-weight: bold;
        font-size: 18px
      }

      a.sknui-a.jsx-3066179622:hover {
        background: white !important;
      }

     

      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

export default function CustomApp ({ Component , pageProps}) {
  return (
  <>
    <GlobalStyle/>
    <Component {...pageProps} />
  </>
  );
}