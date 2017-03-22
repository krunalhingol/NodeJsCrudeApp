onload = function(e) {
    lis = document.getElementsByTagName('li');
    console.log(lis);
    for (i = 0; i < lis.length; i++) {
        updateHandler();
        deleteHandler();
    }
}
var updateHandler = function() {
    lis[i].childNodes[5].addEventListener('click', function() {
        fetch('quotes/', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'oldname': this.parentNode.childNodes[3].innerText,
                'oldquote': this.parentNode.childNodes[1].innerText,
                'newname': document.getElementById("name-input").value,
                'newquote': document.getElementById("quote-input").value

            })
        }).then(data => {
            console.log(data)
            window.location.reload(true)
        });
    });
}
var deleteHandler = function() {
    lis[i].childNodes[7].addEventListener('click', function() {
        fetch('quotes', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': this.parentNode.childNodes[3].innerText,
                'quote': this.parentNode.childNodes[1].innerText,
            })
        }).then(data => {
            console.log(data)
            window.location.reload()
        })
    });
}
