StartTest(function(t) {
    t.waitForCQ('gridpanel', function(grids) {
        var userGrid = grids[0];

        t.willFireNTimes(userGrid.store, 'write', 1);

        t.waitForRowsVisible(userGrid, function() {
        
            t.doubleClick(t.getCell(userGrid, 0, 0), function() {

                t.waitForCQ('button[text=Save]', function(buttons) {
                    var saveButton = buttons[0],
                        editWin = saveButton.up('window'),
                        nameField = editWin.down('field[name=firstname]');

                    t.click(nameField);
                    nameField.setValue();

                    t.type(nameField, 'foo', function() {
                        t.click(saveButton, function() {
                            t.matchGridCellContent(userGrid, 0, 0, 'foo Spencer', 'Updated name found in grid');
                        });
                    });
                });
            });
        });
    });
})    
