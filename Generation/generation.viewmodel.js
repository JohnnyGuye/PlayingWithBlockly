app.component("generator",
{
    templateUrl: "Generation/generation.view.html",
    controller: function () {
        
        var styleOpen = {
            height: "100%",
            transition: "0.4s",
            overflow: "scroll"
        };
        var styleClosed = {
            height: "0px",
            transition: "0.4s",
            overflow: "auto"
        };

        var full = {
            height: "100%"
        };
        var halved = {
            height: "70px"
        };

        this.open = false;
        this.style = styleClosed;
        this.full = halved;

        this.Toggle = function() {
            this.open = !this.open;
            var gc = $("#generated-code");
            var fullSize = '100%';
            if (this.open) {
                generateCode();
                this.style = styleOpen;
                this.full = full;
            } else {
                this.style = styleClosed;
                this.full = halved;
            }
        };
    }
});