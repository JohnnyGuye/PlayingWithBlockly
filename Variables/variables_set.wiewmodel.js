app.component("configSet",
{
    templateUrl: "Variables/variables_set.view.html",
    controller: function() {
        this.name = "Configuration";
        this.sets = [];
        this.NewSet = function() {
            this.set = new Squid.VariablesSet(Squid.VariablesSet.Types.CONFIG);
            this.sets.push(this.set);
        }
        this.NewSet();

        AutoComplete.configSet = this.set;
    }
});

app.component("inventorySet",
{
    templateUrl: "Variables/variables_set.view.html",
    controller: function() {
        this.name = "Inventaire";
        this.sets = [];
        this.NewSet = function () {
            this.set = new Squid.VariablesSet(Squid.VariablesSet.Types.INVENTORY);
            this.sets.push(this.set);
        }
        this.NewSet();
        AutoComplete.inventorySet = this.set;
    }
});
