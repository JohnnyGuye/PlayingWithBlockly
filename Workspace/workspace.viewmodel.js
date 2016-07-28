app.component("toolbox",
{
    templateUrl: "Toolbox/toolbox.xml" 
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

            this.Refresh = function() {
                RefreshCategories(workspace, princToolboxId);
                //for autocompletion
                if (acTags) {
                    acTags.matcher_ = new goog.ui.ac.ArrayMatcher(AutoComplete.GetTags(), true);
                }
            };

            this.Save = function() {
                Squid.Storage.SaveFunction(workspace);
                Squid.Requests.SaveVariables(Squid.SimpleVariables);
                this.Refresh();
            };

            this.Clear = function () {
                function clearFunc(workspace_) {
                    var children = workspace_.getLinkedWorkspace();
                    for (var i = 0; i < children.length; i++) {
                        children[i].clear();
                        clearFunc(children[i]);
                    }
                    workspace_.clear();
                }

                if (window
                    .confirm("Êtes vous sûr de vouloir vider tout l'espace de travail ?")) {
                    clearFunc(workspace);
                    Refresh();
                }
            }

            this.Tags = "";
            /**
             * Searching with tags
             * @param {} workspace 
             * @param {} toolboxId 
             * @returns {} 
             */
            this.SearchTag = function () {
                //get all procedures defined in all existing workspaces
                var toolboxId = princToolboxId;
                var blocks = workspace.getAllDescendantBlocks();
                var procedures = blocks.filter(function (item) {
                    return item.getProcedureDef;
                });

                function parseTags(text) {
                    var tags = text.replace(/\s+/g, '');
                    return tags.split(",");
                }
                var searchWords = parseTags(this.Tags);
                var count = 0;

                // Get the results container tag and remove all the blocks it contains since the last research
                var tagCategory = document.getElementById("SearchCategory");
                while (tagCategory.firstChild) {
                    tagCategory.removeChild(tagCategory.firstChild);
                }

                // For each block is all workspaces
                for (var i = 0; i < procedures.length; i++) {

                    var tags = procedures[i].getField("tags").text_;
                    var procedureTags = parseTags(tags);

                    //for each searched word 
                    for (var j = 0; j < searchWords.length; j++) {
                        for (var k = 0; k < procedureTags.length; k++) {
                            if (searchWords[j] === procedureTags[k]) {
                                count++;
                                var newProcedure = document.createElement("block");
                                if (procedures[i].getProcedureDef()[2]) {
                                    newProcedure.setAttribute("type", "procedures_callreturn");
                                } else {
                                    newProcedure.setAttribute("type", "procedures_callnoreturn");
                                }

                                var mutator = document.createElement("mutation");
                                mutator.setAttribute("name", procedures[i].getProcedureDef()[0]);

                                newProcedure.appendChild(mutator);
                                tagCategory.appendChild(newProcedure);
                            }
                        }
                    }
                }
                // if no element has the tags requested :
                if (count === 0) {
                    alert("Aucun élément ne correspond à votre recherche.");
                }
                workspace.updateToolbox(document.getElementById(toolboxId));
            }

            //This method do not convince me. It seems not to work properly
            setTimeout(this.Refresh, 1000);

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