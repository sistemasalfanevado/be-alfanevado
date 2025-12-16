export function defaultTemplate(params: {
    title: string;
    message: string;
    footer?: string;
}) {
    return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          font-family: Arial, Helvetica, sans-serif;
          background-color: #f4f6f8;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,.08);
        }
        .header {
          background: #0f172a;
          color: #ffffff;
          padding: 16px;
          text-align: center;
        }
        .content {
          padding: 24px;
          color: #334155;
          line-height: 1.6;
        }
        .footer {
          padding: 12px;
          font-size: 12px;
          text-align: center;
          color: #94a3b8;
          background: #f8fafc;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${params.title}</h2>
        </div>
        <div class="content">
          <p>${params.message}</p>
        </div>
        <div class="footer">
          ${params.footer ?? '© Alfa Nevado'}
        </div>
      </div>
    </body>
  </html>
  `;
}