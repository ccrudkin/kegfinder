$(document).ready(() => { // ugly way to handle this -- find better solution
    $('#searchTermWarning').hide();
});

function printQuery() {
    let user = document.getElementById('userid').innerHTML;
    let searchBy = document.getElementById('searchBy').value;
    let searchTerm = document.getElementById('searchTerm').value;

    if (searchTerm === '') {
        document.getElementById('searchTermWarning').innerHTML = '&nbspEnter a valid search term or use "Show all".';
        $('#searchTermWarning').show();
    }

    $.ajax({
        url: `/viewInventory/${user}/${searchBy}/${searchTerm}/none`,
        type: 'GET',
        success(res) {
            let html = [];
            /* html.push(
                '<table>' + 
                '<thead>' +
                '<tr><th>Keg ID</th>' +
                '<th>Keg type</th>' +
                '<th>Status</th>' +
                '<th>Style</th>' +
                '<th>Batch ID</th>' +
                '<th>Location</th>' +
                '<th>Last change</th>' +
                '<th>Notes</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>'
            ); */
            res.forEach((row) => {
                html.push('<tr>');
                html.push('<td></td>');
                html.push('<td>' + row.id + '</td>');
                html.push('<td>' + row.type + '</td>');
                html.push('<td>' + row.condition + '</td>');
                html.push('<td>' + row.style + '</td>');
                html.push('<td>' + row.batchid + '</td>');
                html.push('<td>' + row.location + '</td>');
                html.push('<td>' + row.movedate + '</td>');
                html.push('<td>' + row.othernotes + '</td>');
                html.push('</tr>');
            });
            // html.push('</tbody></table>');
            document.getElementById('invSearchBody').innerHTML = html.join('');
            document.getElementById('searchTermWarning').innerHTML = '';
        }, error(jqXHR, status, errorThrown) {
            console.log(status + ' ' + errorThrown);
        }
    })
}

// TODO: Limit to # results per page
function allCatalog(sort) {
    let user = document.getElementById('userid').innerHTML;
    let searchBy = document.getElementById('searchBy').value;
    let searchTerm = 'getAll';

    console.log(sort);

    $.ajax({
        url: `/viewInventory/${user}/${searchBy}/${searchTerm}/${sort}`,
        type: 'GET',
        success(res) {
            let html = [];
            /* html.push(
                '<table>' + 
                '<thead>' +
                '<tr><th>Keg ID</th>' +
                '<th>Keg type</th>' +
                '<th>Status</th>' +
                '<th>Style</th>' +
                '<th>Batch ID</th>' +
                '<th>Location</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>'
            ); */
            res.forEach((row) => {
                html.push('<tr>');
                html.push('<td></td>');
                html.push('<td>' + row.id + '</td>');
                html.push('<td>' + row.type + '</td>');
                html.push('<td>' + row.condition + '</td>');
                html.push('<td>' + row.style + '</td>');
                html.push('<td>' + row.batchid + '</td>');
                html.push('<td>' + row.location + '</td>');
                html.push('<td>' + row.movedate + '</td>');
                html.push('<td>' + row.othernotes + '</td>');
                html.push('</tr>');
            });
            // html.push('</tbody></table>');
            document.getElementById('invSearchBody').innerHTML = html.join('');
            document.getElementById('searchTermWarning').innerHTML = '';
        }, error(jqXHR, status, errorThrown) {
            console.log(status + ' ' + errorThrown);
        }
    })
}

function resetFields() {
    document.getElementById('viewInvForm').reset();
    document.getElementById('searchTermWarning').innerHTML = '';
    $('#searchTermWarning').hide();
}

function resetCatalog() {
    allCatalog('id');
}

// TODO: display errors if fields left blank, etc.
document.getElementById('searchButton').addEventListener('click', printQuery);
document.getElementById('resetButton').addEventListener('click', resetFields);
document.getElementById('resetButton').addEventListener('click', resetCatalog);
document.getElementById('showallButton').addEventListener('click', allCatalog('id'));
document.getElementById('kegID').addEventListener('click', function () { allCatalog('id'); } );
document.getElementById('kegType').addEventListener('click', function () { allCatalog('type'); } );
document.getElementById('kegStatus').addEventListener('click', function () { allCatalog('condition'); } );
document.getElementById('kegStyle').addEventListener('click', function () { allCatalog('style'); } );
document.getElementById('kegbatchID').addEventListener('click', function () { allCatalog('batchid'); } );
document.getElementById('kegLocation').addEventListener('click', function () { allCatalog('location'); } );
document.getElementById('kegLastChange').addEventListener('click', function () { allCatalog('movedate'); } );
