type InviteToEdgeInTemplateProps = {
  senderName: string;
  senderEmail: string;
  signUpUrl: string;
};

const inviteToEdgeInTemplate = ({
  senderName,
  senderEmail,
  signUpUrl,
}: InviteToEdgeInTemplateProps) => {
  const html = `
  <div style="background-color: #f2f5fa; table-layout: fixed; width: 100%; vertical-align: top; padding: 0 10px;">
    <div style="line-height: 44px; height: 44px; font-size: 0px">&nbsp;</div>
    <table
      id="table"
      border="0"
      cellspacing="0"
      cellpadding="0"
      style="max-width: 600px; width: 600px; overflow: visible; margin: 0 auto; vertical-align: middle; border-radius: 8px; border-radius: 8px; box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.15);"
      valign="middle"
      align="center"
    >
      <tbody>
        <tr id="header">
          <td style="background-color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="min-width: 100%"
            >
              <tbody>
                <tr>
                  <td style="padding-left: 40px; padding-right: 40px; padding-top: 50px; padding-bottom: 30px;">
                    <table
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="min-width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td align="center">
                            <table
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="min-width: 100%"
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <div
                                      id="logo"
                                    >
                                      <a
                                        href="https://www.edgein.io"
                                        style="text-decoration: none; color: #5e41fe;"
                                        target="_blank"
                                        data-saferedirecturl="https://www.google.com/url?q=https://www.edgein.io"
                                      >
                                        <img
                                          src="https://d3k81ch9hvuctc.cloudfront.net/company/VFvqvF/images/5340f47e-30ed-450b-b975-cf5c352b5a3c.png"
                                          alt="EdgeIn"
                                          width="150"
                                          style="display: block"
                                          border="0"
                                        />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffffff">
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="min-width: 100%"
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    style="padding-left: 40px; padding-right: 40px; padding-top: 12px; padding-bottom: 12px;"
                  >
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="min-width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 24px; font-weight: normal; text-align: left; color: #525f7f;">
                            ${senderName} (${senderEmail}) has invited you
                              to use EdgeIn.
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffffff">
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="min-width: 100%"
            >
              <tbody>
                <tr>
                  <td align="center" style="padding-left: 40px; padding-right: 40px; padding-top: 8px; padding-bottom: 20px;">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="min-width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td align="left">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tbody>
                                <tr>
                                  <td style="margin-left: 20px; margin-right: 20px; margin-top: 10px; margin-bottom: 12px; background-color: #5e41fe; border-radius: 100px;">
                                    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: bold; text-align: center;">
                                      <a
                                        href="${signUpUrl}"
                                        style="color: #ffffff; text-decoration: none; display: block; padding: 10px 20px 12px 20px; text-align: center;"
                                        target="_blank"
                                        >Accept invitation</a
                                      >
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffffff">
            <div style="line-height: 28px; height: 28px; font-size: 0px">
              &nbsp;
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #e8ecf2; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <table
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              style="min-width: 100%"
            >
              <tbody>
                <tr>
                  <td align="center" style="padding-left: 40px; padding-right: 40px; padding-top: 40px; padding-bottom: 64px;">
                    <table
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      style="min-width: 100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 16px; font-weight: normal; text-align: left; color: #525f7f;">
                              New to EdgeIn? With EdgeIn you and your team
                              can gain clear, accessible, Web3 knowledge.
                              <a
                                href="https://edgein.io/"
                                target="_blank"
                                style="text-decoration: none; color: #5e41fe"
                                >Learn more</a
                              >
                              or
                              <a
                                href="https://edgein.io/support/"
                                target="_blank"
                                style="text-decoration: none; color: #5e41fe"
                                >Visit support</a
                              >.
                            </div>
                            <div style="line-height: 20px; height: 20px; font-size: 0px;">
                              &nbsp;
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="min-width: 100%"
                            >
                              <tbody>
                                <tr>
                                  <td align="left">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a
                                              href="https://www.edgein.io"
                                              style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 16px; font-weight: normal; text-align: left; color: #525f7f; "
                                              target="_blank"
                                            >
                                              <img src="https://www.edgein.io/email-edgein-text.png" alt="EdgeIn" width="50" style="display: block" border="0" />
                                              &copy; EdgeIn.io ${new Date().getFullYear()}
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                  <td
                                    width="20"
                                    style="width: 20px; min-width: 20px"
                                  >
                                    &nbsp;
                                  </td>
                                  <td align="right">
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <a
                                              href="https://www.linkedin.com/company/edgein/"
                                              style="text-decoration: none"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://www.edgein.io/email-linkedin.png"
                                                alt="LinkedIn"
                                                width="20"
                                                style="display: block"
                                                border="0"
                                              />
                                            </a>
                                          </td>
                                          <td width="4" style="width: 4px; min-width: 4px; font-size: 0px;">
                                            &nbsp;
                                          </td>
                                          <td>
                                            <a
                                              href="https://twitter.com/EdgeInio"
                                              style="text-decoration: none"
                                              target="_blank"
                                            >
                                              <img
                                                src="https://www.edgein.io/email-twitter.png"
                                                alt="Twitter"
                                                width="20"
                                                style="display: block"
                                                border="0"
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <div style="line-height: 44px; height: 44px; font-size: 0px">&nbsp;</div>
  </div>
  `;

  return html;
};

export default inviteToEdgeInTemplate;
