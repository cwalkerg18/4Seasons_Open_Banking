$(function(){
    $("#simple-treeview").dxTreeView({ 
        createChildren: function(parent) {
            var parentId = parent ? parent.itemData.id : "";
            var fileNames = folderStructure[parentId];

            if (!fileNames) return [];

            return fileNames.map(function(fileName) {
                var fullName = parentId ? parentId + "\\" + fileName : fileName;
                return {
                    id: fullName,
                    parentId: parentId,
                    text: fileName,
                    hasItems: !!folderStructure[fullName]
                };
            });
        },
        dataStructure: "plain",
        rootValue: "",
        height: 500
    });
});