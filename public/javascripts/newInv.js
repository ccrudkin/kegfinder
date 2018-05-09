function newInv() {
    let num = document.getElementById('newInvSize').value;
    let type = document.getElementById('kegType').value;
    let nameScheme = document.getElementById('nameScheme').value;
    let user = document.getElementById('userID').value; // later will come from auth
    let add = document.getElementById('addToInvCheck');

    console.log(user + ' ' + num + ' ' + type + ' ' + nameScheme);

    $.ajax({
        url: '/newinventory=create/' + user + '/' + num + '/' + type + '/' + nameScheme + '/' + add.checked,
        type: 'GET',
        success(response) {
            if (response === 'Success.') {
                console.log(response);
            } else {
                document.getElementById('errorDialog').innerHTML = response;
            }
        },
        error(jqXHR, status, errorThrown) {
            console.log('Error: ' + status);
        }
    });
}

function resetFields() {
    document.getElementById('newInvForm').reset();
}


document.getElementById('createNewInv').addEventListener('click', newInv);
document.getElementById('createNewInv').addEventListener('click', resetFields);
