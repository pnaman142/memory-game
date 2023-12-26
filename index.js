$(document).ready(function() {
	let ImgSource = [];

		for(let i =0;i<8;i++) {
			ImgSource[i] = `./assets/img-${i+1}.png`;
 	}

    let openedCards = [];
    let matchedCards = 0;
  
    function ShuffleImages() {
        let ImgAll = $(".container").children();
        ImgAll.sort(function() {
            return 0.5 - Math.random();
        });
        $(".container").append(ImgAll);
    }

    function ResetGame() {
        if($(".container").is(":hidden")) {
            $(".container").show();
        } 
        $(".container div").removeClass("matched").css("visibility", "visible");
        $(".container div img").hide();
        openedCards = [];
        matchedCards = 0;
        ShuffleImages();
        $(".message").empty();
    }

    function OpenCard() {
        let clickedImg = $(this).find('img');
        if (openedCards.length < 2 && !clickedImg.hasClass("matched") && clickedImg.is(":hidden")) {
            clickedImg.slideDown('fast', function() {
                openedCards.push(clickedImg);
                if (openedCards.length === 2) {
                    if (openedCards[0].attr("src") === openedCards[1].attr("src")) {
                        setTimeout(function() {
                            openedCards.forEach(function(card) {
                                card.parent().addClass("matched").css("visibility", "hidden");
                            });
                            matchedCards++;
                            checkGameCompletion();
                            openedCards = [];
                        }, 400);
                    } else {
                        setTimeout(function() {
                            openedCards.forEach(function(card) {
                                card.slideUp('fast');
                            });
                            openedCards = [];
                        }, 400);
                    }
                }
            });
        }
    }

    function checkGameCompletion() {
        if (matchedCards=== (ImgSource.length)) {
            $(".container").hide();
            $(".message").append("<h2>Congratulations! You've matched all the cards.</h2>");
        }
    }

    function InitializeGame() {
		for (let y = 0; y < 2; y++) {
			for(let i in ImgSource) {
			$(".container").append("<div class='gems'><img src=" + ImgSource[i] + " /></div>");
			 };
		}

        $(".container div").click(OpenCard);
        ResetGame();
	}

    $("#resetGame").on("click", function() {
        ResetGame();
    })
    InitializeGame();
   
});