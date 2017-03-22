onload = function(e) {
    listOfLiElements = document.getElementsByTagName('li');
    console.log(listOfLiElements);
    for (i = 0; i < listOfLiElements.length; i++) {
        updateHandler();
        deleteHandler();
    }
}
var updateHandler = function() {
    listOfLiElements[i].childNodes[5].addEventListener('click', function() {
        if(document.getElementById("name-input").value.length >0 && document.getElementById("quote-input").value.length > 0){
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
            console.log(data);
            window.location.reload(true);
        });
        }
    });
}
var deleteHandler = function() {
    listOfLiElements[i].childNodes[7].addEventListener('click', function() {
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
            console.log(data);
            window.location.reload();
        })
    });
}
