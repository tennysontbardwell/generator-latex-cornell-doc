default:
	xelatex <% if (minted) { %>-shell-escape <% } %><%= filename %>.tex
	xelatex <% if (minted) { %>-shell-escape <% } %><%= filename %>.tex
	open <%= filename %>.pdf

open:
	open <%= filename %>.pdf

clean:
	rm *.{aux,log,out}
