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
        this.CodeCSharp = "";
        this.CodeFrench = "";

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
            this.CodeFrench = Blockly.French.workspaceToCode(workspace);
            this.CodeCSharp = Blockly.CSharp.workspaceToCode(workspace);

            if (this.CodeCSharp === "") {
                this.CodeFrench = "Rien à générer";
                this.CodeCSharp = "Rien à générer";
            }
        };

        this.Toggle(false);
    }
});