const $ = require("jquery");
var textSignature = {};

textSignature = function (options) {
  var self = this;
  self.isInitiated = false;
  self.imageData = null;

  this.init = function () {
    //inject
    const linkTagElements = $("head").find(
      `#text-signature-${options.indexNo}`
    );

    if (linkTagElements.length === 0) {
      var linkElem = $('<link rel="stylesheet">');
      linkElem.attr("id", `text-signature-${options.indexNo}`);
      $("head").append(linkElem);
      // //inject custom font face from external url
      // $("head").find("#text-signature").remove();
      // var linkElem = $('<link rel="stylesheet">');
      // linkElem.attr("id", "text-signature");
      // $("head").append(linkElem);

      linkElem.attr("href", options.customFont.url);
      if (linkElem[0].addEventListener) {
        linkElem[0].addEventListener(
          "load",
          function () {
            // wait abit slonger and call again -  if first time

            self.generateImage(options);
            if (!self.isInitiated) {
              setTimeout(function () {
                $(options.canvasTargetDom).html(" ");
                self.generateImage(options);
              }, 2800);
            }

            self.isInitiated = true;
          },
          false
        );
      }
    }
  };
  this.formatInput = function (options) {
    //handle errror
    if (!options || options == undefined) {
      throw "text-singature: parameter cannot be null or empty";
    }
    if (!options.font) {
      throw "text-singature: parameter font cannot be empty";
    }
    if (!options.textString) {
      throw "text-singature: parameter textString cannot be empty";
    }
    if (typeof options.font === "string") {
      return options;
    }

    options.font = options.font || ["12px", "Arial"];
    options.font = options.font.join(" ");

    options.fillStyle = options.color || "black";
    options.textString = options.textString || "Text-Signature !";
    options.paddingX = options.paddingX || 0;
    options.paddingY = options.paddingY || 0;

    return options;
  };

  this.generateImage = function (options) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //parameter sanity and defaults
        options = this.formatInput(options);

        var uniquetime = new Date().getUTCMilliseconds();

        //generate canvas
        var canvasSelectorDom = $("<canvas></canvas>");

        /** comented manually */
        canvasSelectorDom.attr("width", options.width);
        canvasSelectorDom.attr("height", options.height);
        /** comented manually */
        canvasSelectorDom.attr("id", "text-signature-" + uniquetime);

        var context = canvasSelectorDom[0].getContext("2d");
        context.font = options.font;
        context.fillStyle = options.fillStyle;
        context.fillText(
          options.textString,
          options.paddingX,
          options.paddingY
        );

        // here

        const { trimImageData } = require("./TrimImageData");

        const imageData = context.getImageData(
          0,
          0,
          options.width,
          options.height
        );

        const trimmedTransparent = trimImageData(imageData);

        canvasSelectorDom[0].width = trimmedTransparent.width;
        canvasSelectorDom[0].height = trimmedTransparent.height;
        canvasSelectorDom[0]
          .getContext("2d")
          .putImageData(trimmedTransparent, 0, 0);
        // here

        var dataUrl = canvasSelectorDom[0].toDataURL();
        self.imageData = dataUrl;

        var img = $("<img>"); //Equivalent: $(document.createElement('img'))
        img.attr("src", dataUrl);
        img.attr("text-signature-timestamp", uniquetime);
        img.attr("id", "text-signature-" + uniquetime);

        if (options.canvasTargetDom) {
          if (self.isInitiated) {
            $(options.canvasTargetDom).html(img);
          } else {
            $(options.canvasTargetDom).html();
          }
        } else {
          window.open(dataUrl, "text-signature image", "width=600, height=200");
        }

        resolve();
      }, 700);
    });
  };
  this.getImageData = function () {
    return self.imageData;
  };
  this.isDomObject = function (obj) {
    return obj.tagName ? "true" : "false";
  };

  this.ping = function () {
    console.log("Yup. text-singature is working");
  };

  this.init();
};

module.exports = textSignature;
