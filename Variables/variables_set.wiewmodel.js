app.component("variablesSet",
    {
        templateUrl: "Variables/variables_set.view.html",
        controller: function () {

            this.variablesSet = new Squid.VariablesSet("Configuration", Squid.VariablesSet.Types.CONFIG);
            ////    Squid.Variables.InitWorkspaces(BASE_BLOCKLY_DIV + "Configuration", BASE_BLOCKLY_DIV + "Inventory");
            ////    AutoComplete.variablesWorkspace = Squid.Variables.getWorkspace(Squid.Variables.Types.CONFIG);
        }
    });

