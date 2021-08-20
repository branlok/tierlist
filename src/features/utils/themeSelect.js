export default function retrieveTheme(theme) {
  switch (theme) {
    case "purple":
      return {
        main: {
          primary: "hsl(259, 56%, 25%)",
          primaryVarient: "hsl(257, 44%, 20%)",
          accent: "hsl(245, 61%, 38%)",
          base: "hsl(240, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(240, 71%, 83%)",
          200: "hsl(240, 63%, 89%)",
        },
      };
    case "red":
      return {
        main: {
          primary: "hsl(0, 56%, 25%)",
          primaryVarient: "hsl(0, 44%, 20%)",
          accent: "hsl(0, 61%, 38%)",
          base: "hsl(0, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(0, 71%, 83%)",
          200: "hsl(0, 63%, 89%)",
        },
      };
    case "pink":
      return {
        main: {
          primary: "hsl(321, 56%, 25%)",
          primaryVarient: "hsl(321, 44%, 20%)",
          accent: "hsl(321, 61%, 38%)",
          base: "hsl(321, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(321, 71%, 83%)",
          200: "hsl(321, 63%, 89%)",
        },
      };
    case "orange":
      return {
        main: {
          primary: "hsl(32, 100%, 45%)",
          primaryVarient: "hsl(32, 43%, 20%)",
          accent: "hsl(32, 61%, 38%)",
          base: "hsl(32, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(32, 71%, 83%)",
          200: "hsl(32, 63%, 89%)",
        },
      };
    case "brightOrange":
      return {
        main: {
          primary: "hsl(32, 84%, 58%)",
          primaryVarient: "hsl(32, 74%, 24%)",
          accent: "hsl(32, 87%, 48%)",
          base: "hsl(32, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(32, 71%, 83%)",
          200: "hsl(32, 63%, 89%)",
        },
        bright: true,
      };
    case "blue":
      return {
        main: {
          primary: "hsl(236, 56%, 25%)",
          primaryVarient: "hsl(236, 44%, 20%)",
          accent: "hsl(236, 61%, 38%)",
          base: "hsl(236, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(236, 71%, 83%)",
          200: "hsl(236, 63%, 89%)",
        },
      };
    case "brightBlue":
      return {
        main: {
          primary: "hsl(236, 84%, 58%)",
          primaryVarient: "hsl(236,74%, 24%)",
          accent: "hsl(236, 87%, 48%)",
          base: "hsl(236, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(236, 71%, 83%)",
          200: "hsl(236, 63%, 89%)",
        },
        bright: true,
      };
    case "yellow":
      return {
        main: {
          primary: "hsl(57, 56%, 25%)",
          primaryVarient: "hsl(57, 44%, 20%)",
          accent: "hsl(57, 61%, 38%)",
          base: "hsl(63, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(63, 71%, 83%)",
          200: "hsl(63, 63%, 89%)",
        },
      };
    case "brightYellow":
      return {
        main: {
          primary: "hsl(63, 84%, 58%)",
          primaryVarient: "hsl(63,  74%, 24%)",
          accent: "hsl(63, 87%, 48%)",
          base: "hsl(63, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(63, 71%, 83%)",
          200: "hsl(63, 63%, 89%)",
        },
        bright: true,
      };
    case "brightRed":
      return {
        main: {
          primary: "hsl(0, 84%, 58%)",
          primaryVarient: "hsl(0,74%, 24%)",
          accent: "hsl(0, 87%, 48%)",
          base: "hsl(0, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(0, 71%, 83%)",
          200: "hsl(0, 63%, 89%)",
        },
        bright: true,
      };
    case "brightPink":
      return {
        main: {
          primary: "hsl(328, 84%, 58%)",
          primaryVarient: "hsl(328, 74%, 24%)",
          accent: "hsl(328, 84%, 58%)",
          base: "hsl(328, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(328, 71%, 83%)",
          200: "hsl(328, 63%, 89%)",
        },
        bright: true,
      };

    default: {
      return {
        main: {
          primary: "hsl(259, 56%, 25%)",
          primaryVarient: "hsl(257, 44%, 20%)",
          accent: "hsl(245, 61%, 38%)",
          base: "hsl(240, 39%, 20%)",
        },
        fontColor: {
          100: "hsl(240, 71%, 83%)",
          200: "hsl(240, 63%, 89%)",
        },
      };
    }
  }
}
