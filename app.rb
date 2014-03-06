require 'sinatra'
require 'sinatra/reloader'
require 'sinatra-websocket'

set :server, 'thin'
set :sockets, []

get '/*'  do
  unless request.websocket?
    send_file "index.html"
  else
    request.websocket do |ws|
      ws.onopen do
        settings.sockets << ws
        File.open("tiny_titles").each_line do |l|
          ws.send(l.downcase.chomp)
          sleep(0.0000000000000001)
        end
        ws.close
      end
      ws.onclose do
        settings.sockets.delete(ws)
      end
    end
  end
end