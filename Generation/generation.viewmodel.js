app.component("generator",
{
    templateUrl: "Generation/generation.view.html",
    controller: function () {
        
        var styleOpen = {
            height: "100%"
        };

        var styleClosed = {
            height: "70px"
        };

        this.style = styleClosed;
        this.Code = "Rien à générer";

        this.Toggle = function (show) {
            if (show == null) {
                this.open = !this.open;
            } else {
                this.open = show;
            }

            if (this.open) {
                this.Generate();
                this.style = styleOpen;
            } else {
                this.style = styleClosed;
            }
        };

        this.Generate = function (spec) {
            if (spec) {
                this.Code = Blockly.French.workspaceToCode(workspace);
            } else {
                this.Code = Blockly.CSharp.workspaceToCode(workspace);
            }
            if (this.Code === "") {
                this.Code = "Rien à générer";
            }
        };

        this.Toggle(false);
    }
});