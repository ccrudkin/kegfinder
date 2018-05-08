function newInv() {
    let num = document.getElementById('newInvSize').value;
    let type = document.getElementById('kegType').value;
    let nameScheme = document.getElementById('nameScheme').value;

    console.log(num + ' ' + type + ' ' + nameScheme);

    $.ajax({
        url: '/newinventory=create',
        type: 'GET',
        success(response) {
            console.log(response);
        },
        error(jqXHR, status, errorThrown) {
            console.log(status);
        }
    });
}

function resetFields() {
    document.getElementById('newInvForm').reset();
}


document.getElementById('createNewInv').addEventListener('click', newInv);
document.getElementById('createNewInv').addEventListener('click', resetFields);
