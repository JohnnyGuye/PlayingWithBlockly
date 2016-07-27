app.component("toolbox",
{
    templateUrl: "Toolbox/toolboxCoreGenerics.xml" 
});

app.component("workspace",
    {
        templateUrl: "Workspace/workspace.view.html",
        controller: function () {
            workspace = Blockly.inject(BASE_BLOCKLY_DIV,
                    {
                        toolbox: $(princToolboxId)[0],
                        zoom:
                        {
                            controls: true,
                            wheel: true,
                            startScale: 1.0,
                            maxScale: 3,
                            minScale: 0.2,
                            scaleSpeed: 1.2
                        },
                        trashcan: true
                    });
            hiddenWorkspace = Blockly.inject(BASE_BLOCKLY_DIV + "Hidden",
            {
                trashcan: true,
                zoom:
                {
                    controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 5.0,
                    minScale: 0.1,
                    scaleSpeed: 1.3
                }
            });

            workspace.attachChildWorkspace(hiddenWorkspace);
            Squid.Storage.ReloadWorkspace(null, hiddenWorkspace);
            //not optimal
            setTimeout(Refresh, 200);
            

            Squid.Dev.HideDevmode();

            /* AutoCompletion */
            AutoComplete.categoryWorkspace = workspace;

            var autoCompleteTags = AutoComplete.GetTags();
            acTags = goog.ui.ac
                .createSimpleAutoComplete(autoCompleteTags, document.getElementById('search-bar'), true, true);
            acTags.setAutoHilite(false);

            Squid.Requests.ReloadVariables();
        }
    });