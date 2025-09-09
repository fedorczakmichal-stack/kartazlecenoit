/* Definiowanie podstawowych zmiennych kolorów dla łatwej modyfikacji */
:root {
  --primary-color: #3498db;
  --secondary-color: #2c3e50;
  --text-color: #ecf0f1;
  --background-color: #1a1a1a;
  --accent-color: #e74c3c;
}

/* Resetowanie domyślnych stylów przeglądarki */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Kluczowy element dla responsywności! */
}

/* Podstawowe style dla ciała dokumentu */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  -webkit-font-smoothing: antialiased; /* Poprawia wygląd czcionek na macOS */
  -moz-osx-font-smoothing: grayscale; /* Poprawia wygląd czcionek na macOS */
}

/* Zapewnia płynne przewijanie na stronie */
html {
  scroll-behavior: smooth;
}

/* Ułatwienie stylizacji linków */
a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
