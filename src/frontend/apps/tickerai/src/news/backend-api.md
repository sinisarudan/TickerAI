we get pure url (https://www.fool.com/investing/2021/06/24/why-rite-aid-is-sinking-this-week/)
and hash ()
we generate r and open in a new page 

+ Source
	+ Each news category has its own JSON (5 of them)
+ We get all 5 (and WAIT for all)
	+ first few rounds are fixed on the first 3 categories and
	+ then we go round robin
+ mixing news
+ Pagination
+ 

Each news has
+ tag category
+ sub-category (tag)

Search
+ ex: nvda
+ we ask Lazar's server
	+ it can be same backend query, either with or without search query
+ https://tickerai.io/index.php?q=gamestop+%2FCRYPTO

Top (3 images news)

	 *
	https://tickerai.io/r.php
	// hash
	?h=6983e24fe10a698455bfaa2e29a1e18e|13eac047d21f0840407024af691dd661
	// rang (position on the page, how user sees it (so if we filter in the frontend user sees different rankings and that is what we need))
	&r=2
	//
	&l=https%3A%2F%2Fwww.fool.com%2Finvesting%2F2021%2F06%2F24%2Fwhy-rite-aid-is-sinking-this-week%2F

	https://tickerai.io/r.php?h=6983e24fe10a698455bfaa2e29a1e18e|13eac047d21f0840407024af691dd661&r=2&l=https%3A%2F%2Fwww.fool.com%2Finvesting%2F2021%2F06%2F24%2Fwhy-rite-aid-is-sinking-this-week%2F
	 */
