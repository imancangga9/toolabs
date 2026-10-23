<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />
  <xsl:strip-space elements="*" />
  <xsl:variable name="is-id" select="contains(string(/sm:urlset/sm:url[1]/sm:loc), '/id/')" />

  <xsl:template match="/">
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          <xsl:choose>
            <xsl:when test="$is-id">Peta Situs Toolabs</xsl:when>
            <xsl:otherwise>Toolabs Sitemap</xsl:otherwise>
          </xsl:choose>
        </title>
        <style>
          :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #182230; background: #f5f7fb; }
          * { box-sizing: border-box; }
          body { margin: 0; padding: 48px 20px; }
          main { width: min(100%, 1040px); margin: 0 auto; }
          .heading { margin-bottom: 24px; }
          h1 { margin: 0 0 8px; font-size: clamp(1.7rem, 4vw, 2.3rem); letter-spacing: -0.04em; }
          .description { margin: 0; color: #667085; }
          .count { display: inline-flex; align-items: center; margin-top: 18px; padding: 6px 11px; border: 1px solid #dce3ed; border-radius: 999px; background: #fff; color: #475467; font-size: .85rem; }
          .table-wrap { overflow: hidden; border: 1px solid #e2e8f0; border-radius: 14px; background: #fff; box-shadow: 0 8px 28px rgb(16 24 40 / 5%); }
          table { width: 100%; border-collapse: collapse; text-align: left; }
          th, td { padding: 15px 18px; vertical-align: top; }
          th { background: #f8fafc; color: #667085; font-size: .75rem; font-weight: 650; letter-spacing: .06em; text-transform: uppercase; }
          td { border-top: 1px solid #edf0f4; font-size: .9rem; }
          tbody tr:hover { background: #fafcff; }
          a { color: #175cd3; text-decoration: none; overflow-wrap: anywhere; }
          a:hover { color: #1849a9; text-decoration: underline; }
          .date { color: #667085; white-space: nowrap; }
          .languages { display: flex; flex-wrap: wrap; gap: 7px; }
          .language { display: inline-block; padding: 3px 8px; border: 1px solid #e4e7ec; border-radius: 6px; color: #475467; font-size: .78rem; }
          @media (max-width: 680px) {
            body { padding: 30px 14px; }
            .table-wrap { overflow: visible; border: 0; background: transparent; box-shadow: none; }
            table, tbody, tr, td { display: block; width: 100%; }
            thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
            tbody { display: grid; gap: 12px; }
            tbody tr { padding: 14px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; }
            td { padding: 5px 0; border: 0; }
            td:first-child { font-weight: 600; }
            .date { white-space: normal; }
          }
        </style>
      </head>
      <body>
        <main>
          <header class="heading">
            <h1>
              <xsl:choose>
                <xsl:when test="$is-id">Peta Situs Toolabs</xsl:when>
                <xsl:otherwise>Toolabs Sitemap</xsl:otherwise>
              </xsl:choose>
            </h1>
            <p class="description">
              <xsl:choose>
                <xsl:when test="$is-id">Daftar halaman Toolabs yang tersedia.</xsl:when>
                <xsl:otherwise>Available pages on Toolabs.</xsl:otherwise>
              </xsl:choose>
            </p>
            <span class="count">
              <xsl:value-of select="count(/sm:urlset/sm:url)" />
              <xsl:choose>
                <xsl:when test="$is-id"> halaman</xsl:when>
                <xsl:otherwise> pages</xsl:otherwise>
              </xsl:choose>
            </span>
          </header>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>
                    <xsl:choose>
                      <xsl:when test="$is-id">Halaman</xsl:when>
                      <xsl:otherwise>Page</xsl:otherwise>
                    </xsl:choose>
                  </th>
                  <th>
                    <xsl:choose>
                      <xsl:when test="$is-id">Terakhir diperbarui</xsl:when>
                      <xsl:otherwise>Last modified</xsl:otherwise>
                    </xsl:choose>
                  </th>
                  <th>
                    <xsl:choose>
                      <xsl:when test="$is-id">Bahasa alternatif</xsl:when>
                      <xsl:otherwise>Alternate languages</xsl:otherwise>
                    </xsl:choose>
                  </th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="/sm:urlset/sm:url">
                  <tr>
                    <td>
                      <a href="{sm:loc}"><xsl:value-of select="sm:loc" /></a>
                    </td>
                    <td class="date"><xsl:value-of select="sm:lastmod" /></td>
                    <td>
                      <div class="languages">
                        <xsl:for-each select="xhtml:link[@rel='alternate' and (@hreflang='en' or @hreflang='id')]">
                          <a class="language" href="{@href}">
                            <xsl:value-of select="@hreflang" />
                          </a>
                        </xsl:for-each>
                      </div>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
