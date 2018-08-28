default:
	make build
	make open
	make watch

build:
	xelatex <% if (minted) { %>-shell-escape <% } %><%= filename %>.tex
	xelatex <% if (minted) { %>-shell-escape <% } %><%= filename %>.tex

open:
	if type open &> /dev/null ; then open <%= filename %>.pdf ; else (nohup xdg-open <%= filename %>.pdf &> /dev/null &) ; fi

watch:
	echo <%= filename %>.tex | entr make build

clean:
	rm *.{aux,log,out,toc}
	rm -fr _minted*
