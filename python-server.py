#!/usr/bin/env python

import os
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import subprocess


class MainHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        try:
            contentType = 'text/html'
            if self.path.startswith("/server/"):
                output = subprocess.Popen(os.path.dirname(os.path.realpath(__file__)) + os.sep + 'server/modules/shell_files/' + self.path.split(
                    '=')[1] + '.sh', shell=True, stdout=subprocess.PIPE)
                data = output.communicate()[0]
            else:
                if self.path == '/':
                    self.path = 'index.html'
                f = open(os.path.dirname(os.path.realpath(__file__)) + os.sep + self.path)
                data = f.read()
                if self.path.startswith('/css/'):
                    contentType = 'text/css'
                f.close()
            self.send_response(200)
            self.send_header('Content-type', contentType)
            self.end_headers()
            self.wfile.write(data)

        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)

if __name__ == '__main__':
    from BaseHTTPServer import HTTPServer
    server = HTTPServer(('localhost', 8081), MainHandler)
    print 'Starting server, use <Ctrl-C> to stop'
    server.serve_forever()
