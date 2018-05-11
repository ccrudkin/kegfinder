function printQuery() {
    let user = document.getElementById('userID').value;
    let searchBy = document.getElementById('searchBy').value;
    let searchTerm = document.getElementById('searchTerm').value;

    if (searchTerm === '') {
        document.getElementById('searchTermWarning').innerHTML = '&nbspEnter a valid search term or use "Show all".'
    }

    $.ajax({
        url: `/viewInventory/${user}/${searchBy}/${searchTerm}`,
        type: 'GET',
        success(res) {
            let html = [];
            html.push(
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
            );
            res.forEach((row) => {
                html.push('<tr>');
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
            html.push('</tbody></table>');
            document.getElementById('invSearchResults').innerHTML = html.join('');
        }, error(jqXHR, status, errorThrown) {
            console.log(status + ' ' + errorThrown);
        }
    })
}

// TODO: Limit to # results per page
function allCatalog() {
    let user = document.getElementById('userID').value;
    let searchBy = document.getElementById('searchBy').value;
    let searchTerm = 'getAll';

    $.ajax({
        url: `/viewInventory/${user}/${searchBy}/${searchTerm}`,
        type: 'GET',
        success(res) {
            let html = [];
            html.push(
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
            );
            res.forEach((row) => {
                html.push('<tr>');
                html.push('<td>' + row.id + '</td>');
                html.push('<td>' + row.type + '</td>');
                html.push('<td>' + row.condition + '</td>');
                html.push('<td>' + row.style + '</td>');
                html.push('<td>' + row.batchid + '</td>');
                html.push('<td>' + row.location + '</td>');
                html.push('</tr>');
            });
            html.push('</tbody></table>');
            document.getElementById('invSearchResults').innerHTML = html.join('');
        }, error(jqXHR, status, errorThrown) {
            console.log(status + ' ' + errorThrown);
        }
    })
}

function resetFields() {
    document.getElementById('viewInvForm').reset();
}
function resetCatalog() {
    document.getElementById('invSearchResults').innerHTML = '';
}

// TODO: display errors if fields left blank, etc.
document.getElementById('searchButton').addEventListener('click', printQuery);
document.getElementById('resetButton').addEventListener('click', resetFields);
document.getElementById('resetButton').addEventListener('click', resetCatalog);
document.getElementById('showallButton').addEventListener('click', allCatalog);