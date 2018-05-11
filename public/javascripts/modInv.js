
function getForm() {
    let kegIDs = document.getElementById('updateKegs').value;
    if (kegIDs === '') {
        document.getElementById('message').innerHTML = 'Please enter at least one keg ID.';
        return
    } else {
        kegIDs = kegIDs.replace(/\s+/g, '');
        kegIDs = kegIDs.split(',');
    }
    
    let condition = document.getElementById('condition').value;
    let contents = document.getElementById('contents').value;
    let batchid = document.getElementById('batchid').value;
    let location = document.getElementById('location').value;
    let othernotes = document.getElementById('othernotes').value;
    let user = document.getElementById('userID').value;

    // fix this heinous duplication later with refactored code
    if (condition === '') { 
        condition = '--';
    }
    if (contents === '') {
        contents = '--';
    }
    if (batchid === '') {
        batchid = '--';
    }
    if (location === '') {
        location = '--';
    }
    if (othernotes === '') {
        othernotes = '--';
    }
    if (user === '') {
        user = '--';
    }

    $.ajax({
        url: `/modInventory/${condition}/${contents}/${batchid}/${location}/${othernotes}/${user}/${kegIDs}`,
        type: 'GET',
        success(res) {
            console.log(res);
            document.getElementById('message').innerHTML = 'Inventory updated.' + 
                "&nbsp&nbsp<a href='/viewInventory'>View inventory</a>";
        }, 
        error(err) {
            console.log(err);
        }
    });
}

function resetFields() {
    document.getElementById('updateInvForm').reset();
    document.getElementById('message').innerHTML = '';
}

document.getElementById('updateButton').addEventListener('click', getForm);
document.getElementById('resetButton').addEventListener('click', resetFields);

