export default function retrieveTheme(theme) {
  switch (theme) {
    case "purple":
      return {
        main: {
          primary: "hsl(259, 56%, 25%)",
          primaryVarient: "hsl(257, 44%, 20%)",
          accent: "hsl(245, 61%, 38%)",
        },
      };
    case "red":
      return {
        main: {
          primary: "hsl(0, 56%, 25%)",
          primaryVarient: "hsl(0, 44%, 20%)",
          accent: "hsl(0, 61%, 38%)",
        },
      };
    case "pink":
      return {
        main: {
          primary: "hsl(321, 56%, 25%)",
          primaryVarient: "hsl(321, 44%, 20%)",
          accent: "hsl(321, 61%, 38%)",
        },
      };
    case "orange":
      return {
        main: {
          primary: "hsl(32, 100%, 45%)",
          primaryVarient: "hsl(32, 43%, 20%)",
          accent: "hsl(32, 61%, 38%)",
        },
      };
    case "brightOrange":
      return {
        main: {
          primary: "hsl(32, 84%, 58%)",
          primaryVarient: "hsl(32, 74%, 24%)",
          accent: "hsl(32, 87%, 48%)",
        },
        bright: true,
      };
    case "blue":
      return {
        main: {
          primary: "hsl(236, 56%, 25%)",
          primaryVarient: "hsl(236, 44%, 20%)",
          accent: "hsl(236, 61%, 38%)",
        },
      };
    case "brightBlue":
      return {
        main: {
          primary: "hsl(236, 84%, 58%)",
          primaryVarient: "hsl(236,74%, 24%)",
          accent: "hsl(236, 87%, 48%)",
        },
        bright: true,
      };
    case "yellow":
      return {
        main: {
          primary: "hsl(57, 56%, 25%)",
          primaryVarient: "hsl(57, 44%, 20%)",
          accent: "hsl(57, 61%, 38%)",
        },
      };
    case "brightYellow":
      return {
        main: {
          primary: "hsl(63, 84%, 58%)",
          primaryVarient: "hsl(63,  74%, 24%)",
          accent: "hsl(63, 87%, 48%)",
        },
        bright: true,
      };
    case "brightRed":
      return {
        main: {
          primary: "hsl(0, 84%, 58%)",
          primaryVarient: "hsl(0,74%, 24%)",
          accent: "hsl(0, 87%, 48%)",
        },
        bright: true,
      };
    case "brightPink":
      return {
        main: {
          primary: "hsl(328, 84%, 58%)",
          primaryVarient: "hsl(328, 74%, 24%)",
          accent: "hsl(328, 84%, 58%)",
        },
        bright: true,
      };

    default: {
      return {
        main: {
          primary: "hsl(259, 56%, 25%)",
          primaryVarient: "hsl(257, 44%, 20%)",
          accent: "hsl(245, 61%, 38%)",
        },
      };
    }
  }
}
