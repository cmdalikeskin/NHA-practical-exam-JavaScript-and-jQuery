$(document).ready(() => {

    $("#slider").slider({

        min: 0,   //minimale value
        max: 100,   //maximale value
        value: 50,   //begin value
        animate: true,



        /* In de opdracht staat dat je het start-event moet gebruiken,
        alleen kreeg ik hiermee niet gelijk feedback op de gekozen value. Daarom
        heb ik slide ipv. start gebruikt hier */



        slide: (event, ui) => {

            $("#divSliderValue").html("Het aantal gekozen artikelen: " + ui.value);
        },
        stop: (event, ui) => {
            let productPrijs = 4.95;   // variable die weergeeft hoeveel een product kost
            let uiValue = ui.value;   // op welke waarde stopt je slider
            let eindPrijs;

            if (uiValue < 20) {
                eindPrijs = productPrijs * uiValue + 5;

                $("#aantalProducten").html("Aantal producten:" + ui.value);
                $("#eindPrijsProduct").html("Eindprijs: € " + eindPrijs.toFixed(2));
                $("#verzendkosten").html("De verzendkosten zijn: € 5")
            }
            else if (uiValue >= 20 && uiValue < 80) {
                eindPrijs = (uiValue * productPrijs);

                $("#aantalProducten").html("Aantal producten:" + ui.value);
                $("#eindPrijsProduct").html("Eindprijs: € " + eindPrijs.toFixed(2));
                $("#verzendkosten").html("De verzendkosten zijn: € 0")
            }
            else if (ui.value >= 80) {
                eindPrijs = (uiValue * productPrijs) * .9;

                $("#aantalProducten").html("Aantal producten:" + ui.value);
                $("#eindPrijsProduct").html("Eindprijs: € " + eindPrijs.toFixed(2));

            }

        }
    })
})