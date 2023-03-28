const addOtpNumbersInTemplates = (otpInText) => {
  const generateunderlineTexts = () => {
    return otpInText.split("").map((item) => {
      return `<span style="text-decoration: underline">${item}</span>`;
    });
  };

  return `
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!--<![endif]-->
        <title></title>
    
        <style type="text/css">
          table,
          td {
            color: #000000;
          }
          a {
            color: #0000ee;
            text-decoration: underline;
          }
          @media (max-width: 480px) {
            #u_content_image_1 .v-src-width {
              width: 600px !important;
            }
            #u_content_image_1 .v-src-max-width {
              max-width: 60% !important;
            }
            #u_content_image_4 .v-src-width {
              width: 500px !important;
            }
            #u_content_image_4 .v-src-max-width {
              max-width: 80% !important;
            }
            #u_content_menu_1 .v-container-padding-padding {
              padding: 26px 10px 10px !important;
            }
            #u_content_menu_1 .v-layout-display {
              display: block !important;
            }
            #u_content_menu_1 .v-padding {
              padding: 5px 14px !important;
            }
          }
          @media only screen and (min-width: 570px) {
            .u-row {
              width: 550px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
    
            .u-row .u-col-100 {
              width: 550px !important;
            }
          }
    
          @media (max-width: 570px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: calc(100% - 40px) !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col > div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
    
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
    
          p {
            margin: 0;
          }
    
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
    
          * {
            line-height: inherit;
          }
    
          a[x-apple-data-detectors="true"] {
            color: inherit !important;
            text-decoration: none !important;
          }
    
          @media (max-width: 480px) {
            .hide-mobile {
              max-height: 0px;
              overflow: hidden;
              display: none !important;
            }
          }
        </style>
    
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700"
          rel="stylesheet"
          type="text/css"
        />
        <!--<![endif]-->
      </head>
    
      <body
        class="clean-body u_body"
        style="
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          background-color: #ffffff;
          color: #000000;
        "
      >
        <!--[if IE]><div class="ie-container"><![endif]-->
        <!--[if mso]><div class="mso-container"><![endif]-->
        <table
          style="
            border-collapse: collapse;
            table-layout: fixed;
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            vertical-align: top;
            min-width: 320px;
            margin: 0 auto;
            background-color: #ffffff;
            width: 100%;
          "
          cellspacing="0"
          cellpadding="0"
        >
          <tbody>
            <tr style="vertical-align: top">
              <td
                style="
                  word-break: break-word;
                  border-collapse: collapse !important;
                  vertical-align: top;
                "
              >
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 550px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #038cfe;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #038cfe;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 550px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div style="width: 100% !important">
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                            "
                          ><!--<![endif]-->
                            <table
                              id="u_content_image_1"
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 30px 10px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                            align="center"
                                          >
                                            <!-- src="https://cdn.templates.unlayer.com/assets/1636373927075-KKK.png" -->
                                            <h1 style="color: white">EW SIGN</h1>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 550px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: transparent;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-image: url('https://cdn.templates.unlayer.com/assets/1636376675254-sdsdsd.png');
                        background-repeat: no-repeat;
                        background-position: center top;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1636376675254-sdsdsd.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 550px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div
                          style="
                            width: 100% !important;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        >
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                              border-radius: 0px;
                              -webkit-border-radius: 0px;
                              -moz-border-radius: 0px;
                            "
                          ><!--<![endif]-->
                            <table
                              id="u_content_image_4"
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 50px 10px 25px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                      border="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style="
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                            align="center"
                                          >
                                            <img
                                              src="https://cdn.templates.unlayer.com/assets/1636374086763-hero.png"
                                              alt="Hero Image"
                                              title="Hero Image"
                                              style="
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                clear: both;
                                                display: inline-block !important;
                                                border: none;
                                                height: auto;
                                                float: none;
                                                width: 54%;
                                                max-width: 286.2px;
                                              "
                                              class="v-src-width v-src-max-width"
                                              width="286.2"
                                              border="0"
                                              align="middle"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 10px 20px 5px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <h2
                                      style="
                                        margin: 0px;
                                        color: #141414;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                        font-weight: normal;
                                        font-family: 'Open Sans', sans-serif;
                                        font-size: 28px;
                                      "
                                    >
                                      <strong
                                        >Here Is Your One Time Password</strong
                                      >
                                    </h2>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 0px 10px 10px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      style="
                                        color: #a7a5a5;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="font-size: 14px; line-height: 140%">
                                        <strong
                                          ><span
                                            style="
                                              font-family: Lato, sans-serif;
                                              font-size: 14px;
                                              line-height: 19.6px;
                                            "
                                            >Submit Below Code To App For
                                            Confirmation</span
                                          ></strong
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 15px 10px 12px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <h1
                                      style="
                                        margin: 0px;
                                        color: #3b4d63;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                        font-weight: normal;
                                        font-family: arial, helvetica, sans-serif;
                                        font-size: 41px;
                                      "
                                    >
                                      <strong
                                        >
                                        ${generateunderlineTexts()}
                                        </strong
                                      >
                                      
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <table
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 0px 10px 117px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div
                                      style="
                                        color: #0081ff;
                                        line-height: 140%;
                                        text-align: center;
                                        word-wrap: break-word;
                                      "
                                    >
                                      <p style="font-size: 14px; line-height: 140%">
                                        <span
                                          style="
                                            font-size: 18px;
                                            line-height: 25.2px;
                                          "
                                          ><strong
                                            ><span
                                              style="
                                                font-family: Lato, sans-serif;
                                                line-height: 25.2px;
                                                font-size: 18px;
                                              "
                                              >Valid For 15 minutes Only!</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <div
                  class="u-row-container"
                  style="padding: 0px; background-color: transparent"
                >
                  <div
                    class="u-row"
                    style="
                      margin: 0 auto;
                      min-width: 320px;
                      max-width: 550px;
                      overflow-wrap: break-word;
                      word-wrap: break-word;
                      word-break: break-word;
                      background-color: #000000;
                    "
                  >
                    <div
                      style="
                        border-collapse: collapse;
                        display: table;
                        width: 100%;
                        background-color: transparent;
                      "
                    >
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:550px;"><tr style="background-color: #000000;"><![endif]-->
    
                      <!--[if (mso)|(IE)]><td align="center" width="550" style="width: 550px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                      <div
                        class="u-col u-col-100"
                        style="
                          max-width: 320px;
                          min-width: 550px;
                          display: table-cell;
                          vertical-align: top;
                        "
                      >
                        <div
                          style="
                            width: 100% !important;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        >
                          <!--[if (!mso)&(!IE)]><!--><div
                            style="
                              padding: 0px;
                              border-top: 0px solid transparent;
                              border-left: 0px solid transparent;
                              border-right: 0px solid transparent;
                              border-bottom: 0px solid transparent;
                              border-radius: 0px;
                              -webkit-border-radius: 0px;
                              -moz-border-radius: 0px;
                            "
                          ><!--<![endif]-->
                            <table
                              id="u_content_menu_1"
                              style="font-family: arial, helvetica, sans-serif"
                              role="presentation"
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              border="0"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="v-container-padding-padding"
                                    style="
                                      overflow-wrap: break-word;
                                      word-break: break-word;
                                      padding: 40px 10px 10px;
                                      font-family: arial, helvetica, sans-serif;
                                    "
                                    align="left"
                                  >
                                    <div class="menu" style="text-align: center">
                                      <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->
    
                                      <!--[if (mso)|(IE)]><td style="padding:5px 16px"><![endif]-->
    
                                      <a
                                        href="https://unlayer.com"
                                        target="_self"
                                        style="
                                          padding: 5px 16px;
                                          display: inline-block;
                                          color: #a3b2c3;
                                          font-family: 'Open Sans', sans-serif;
                                          font-size: 15px;
                                          text-decoration: none;
                                        "
                                        class="v-padding v-layout-display"
                                      >
                                        Thank You
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
    
                            <!--[if (!mso)&(!IE)]><!-->
                          </div>
                          <!--<![endif]-->
                        </div>
                      </div>
                      <!--[if (mso)|(IE)]></td><![endif]-->
                      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                    </div>
                  </div>
                </div>
    
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        <!--[if mso]></div><![endif]-->
        <!--[if IE]></div><![endif]-->
      </body>
    </html>
    
    `;
};
console.log(addOtpNumbersInTemplates("123321"));
