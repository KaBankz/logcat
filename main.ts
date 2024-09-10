Deno.serve(
  {
    onListen: (addr) => {
      console.log('Listening on these addresses:');

      const networkInterfaces = Deno.networkInterfaces();

      for (const ni of networkInterfaces) {
        if (ni.name === 'lo0' || ni.name === 'en0') {
          if (ni.family === 'IPv6') {
            console.log(`\t%chttp://${ni.address}:${addr.port}`, 'color: red');
          } else {
            console.log(
              `\t%chttp://${ni.address}:${addr.port}`,
              'color: green'
            );
          }
        }
      }
    },
  },
  async (req) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      if (req.body) {
        const body = await req.text();
        console.log(body);
      }

      return new Response();
    }

    console.error('Invalid Method:', req.method);
    return new Response('Invalid Method', { status: 405 });
  }
);
