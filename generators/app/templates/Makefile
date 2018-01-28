default:
	xelatex <% if (minted) { %>-shell-escape <% } %><%= filename %>.tex
	xelatex <% if (minted) { %>-shell-escape <% } %><%= filename %>.tex

open:
	open <%= filename %>.pdf

clean:
	rm *.{aux,log,out,toc}
	rm -fr _minted*
