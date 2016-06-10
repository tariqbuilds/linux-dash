// Copyright (c) 2015 Cesanta Software Limited
// All rights reserved

#include "mongoose.h"

static const char *s_http_port = "80";
static struct mg_serve_http_opts s_http_server_opts;

static void initial_ws_support_yes(struct mg_connection *nc) {

    mg_printf(nc, "%s", "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n");
    mg_printf_http_chunk(nc, "{\"websocket_support\": true}");
    mg_send_http_chunk(nc, "", 0); /* Send empty chunk, the end of response */
}

static void respond(struct mg_connection *nc, const struct mg_str wm) {
  // struct mg_connection *c;
  char buf[500];
  char addr[32];
  mg_sock_addr_to_str(&nc->sa, addr, sizeof(addr),
                      MG_SOCK_STRINGIFY_IP | MG_SOCK_STRINGIFY_PORT);

  snprintf(buf, sizeof(buf), "%.*s", (int) wm.len, wm.p);

  char * command;
  char * script_path = "/var/www/linux-dash/app/server/linux_json_api.sh";
  command = malloc(48 + strlen(buf) + 10);
  sprintf(command, "%s %s", script_path, buf);

  FILE* fp;
  char* line;
  char* parsed;

  line = malloc(5000 * sizeof(char));
  parsed = malloc(5000 * sizeof(char));

  fp = popen(command,"r");
  while((fgets(line, INT_MAX, fp)))
  {
    sprintf(parsed, "{ \"moduleName\": \"%s\", \"output\": \"%s\"}", buf, line);
    mg_send_websocket_frame(nc, WEBSOCKET_OP_TEXT, parsed, strlen(parsed));
  }
}

static void ev_handler(struct mg_connection *nc, int ev, void *p) {

  struct http_message *hm = (struct http_message *) p;

  // websocket support request
  if(ev == MG_EV_HTTP_REQUEST && mg_vcmp(&hm->uri, "/websocket") == 0) {
    initial_ws_support_yes(nc);
  }
  else if (ev == MG_EV_WEBSOCKET_FRAME) {

    struct websocket_message *wm = (struct websocket_message *) p;

    /* New websocket message. Tell everybody. */
    struct mg_str d = {(char *) wm->data, wm->size};
    respond(nc, d);

  }
  // serve http crap
  else if (ev == MG_EV_HTTP_REQUEST) {
    mg_serve_http(nc, (struct http_message *) p, s_http_server_opts);
  }
}

int main(void) {
  struct mg_mgr mgr;
  struct mg_connection *nc;

  mg_mgr_init(&mgr, NULL);
  nc = mg_bind(&mgr, s_http_port, ev_handler);

  // Set up HTTP server parameters
  mg_set_protocol_http_websocket(nc);
  s_http_server_opts.document_root = "/var/www/linux-dash/app";  // Serve current directory
  s_http_server_opts.enable_directory_listing = "yes";

  mg_set_protocol_http_websocket(nc);

  printf("Starting web server on port %s\n", s_http_port);
  for (;;) {
    mg_mgr_poll(&mgr, 200);
  }
  mg_mgr_free(&mgr);

  return 0;
}
