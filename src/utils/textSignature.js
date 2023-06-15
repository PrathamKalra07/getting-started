import TextSignature from "./module/TextSignature";

const createTextSignature = async (textValue) => {
  const listOfFonts = [
    {
      name: "'Great Vibes'",
      url: "https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap",
    },
    {
      name: "'Sofia'",
      url: "https://fonts.googleapis.com/css2?family=Sofia&display=swap",
    },
    {
      name: "'Allura'",
      url: "https://fonts.googleapis.com/css2?family=Allura&display=swap",
    },
    {
      name: "'Dancing Script'",
      url: "https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap",
    },
    {
      name: "'Marck Script'",
      url: "https://fonts.googleapis.com/css2?family=Marck+Script&display=swap",
    },
    {
      name: "'Seaweed Script'",
      url: "https://fonts.googleapis.com/css2?family=Seaweed+Script&display=swap",
    },
    {
      name: "'Aguafina Script'",
      url: "https://fonts.googleapis.com/css2?family=Aguafina+Script&display=swap",
    },
    {
      name: "'Lily Script One'",
      url: "https://fonts.googleapis.com/css2?family=Lily+Script+One&display=swap",
    },
    {
      name: "'Lobster'",
      url: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
    },
    {
      name: "'Caveat'",
      url: "https://fonts.googleapis.com/css2?family=Caveat&display=swap",
    },
    //   new
    {
      name: "'Satisfy'",
      url: "https://fonts.googleapis.com/css2?family=Satisfy&display=swap",
    },
    {
      name: "'Delius'",
      url: "https://fonts.googleapis.com/css2?family=Delius&display=swap",
    },
    {
      name: "'Leckerli One'",
      url: "https://fonts.googleapis.com/css2?family=Leckerli+One&display=swap",
    },
    {
      name: "'Rochester'",
      url: "https://fonts.googleapis.com/css2?family=Rochester&display=swap",
    },
    {
      name: "'Stalemate'",
      url: "https://fonts.googleapis.com/css2?family=Stalemate&display=swap",
    },
    {
      name: "'Yellowtail'",
      url: "https://fonts.googleapis.com/css2?family=Yellowtail&display=swap",
    },
    {
      name: "'Alex Brush'",
      url: "https://fonts.googleapis.com/css2?family=Alex+Brush&display=swap",
    },
    {
      name: "'Clicker Script'",
      url: "https://fonts.googleapis.com/css2?family=Clicker+Script&display=swap",
    },
  ];

  const listOfObjects = listOfFonts.map(async (item, i) => {
    var optionsParameter = {
      width: textValue.length * 100,
      height: 120,
      paddingX: 10,
      paddingY: 50,
      // paddingY: 100,
      canvasTargetDom: ".js-canvasTargetDom",
      font: ["50px", item.name],
      color: "black",
      textString: textValue,
      customFont: {
        name: item.name,
        url: item.url,
      },
      indexNo: i,
    };

    const textSignature = new TextSignature(optionsParameter);
    await textSignature.generateImage(optionsParameter);

    return textSignature.getImageData();
  });

  return await Promise.all(listOfObjects);

  // return listOfObjects;

  //   console.log(listOfObjects[17]);

  //   console.log(listOfFonts);
  // var optionsParameter = {
  //   width: 600,
  //   height: 200,
  //   paddingX: 100,
  //   paddingY: 100,
  //   canvasTargetDom: ".js-canvasTargetDom",
  //   font: ["50px", "'Homemade Apple'"],
  //   color: "black",
  //   textString: "Your Text HERE",
  //   customFont: {
  //     name: "'Homemade Apple'",
  //     url: "http://fonts.googleapis.com/css?family=Homemade+Apple",
  //   },
  // };

  //   const textSignature = new TextSignature(optionsParameter);

  //   textSignature.generateImage(optionsParameter);

  //   console.log(textSignature.getImageData());
};

export { createTextSignature };
